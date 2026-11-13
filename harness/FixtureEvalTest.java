package com.acjb.server.qa;

import java.io.IOException;
import java.io.UncheckedIOException;
import java.lang.reflect.Method;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.EnumSet;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.junit.jupiter.api.Test;

import com.acjb.server.github.GithubClient;
import com.acjb.server.qa.ClaudeQaComparator.Binding;
import com.acjb.server.qa.FigmaFacts.Element;
import com.acjb.server.qa.FigmaFacts.Fact;
import com.acjb.server.qa.QaComparator.Finding;
import com.acjb.server.qa.QaComparator.Target;

import tools.jackson.databind.JsonNode;
import tools.jackson.databind.json.JsonMapper;

/**
 * 평가 하네스(QAting 저장소에 넣지 않는 임시 테스트) — 평가용 프로젝트 "모아룸"을 QAting 첫 QA·Re-QA의 실제 결정적 코드
 * (FigmaFacts·Repo.bundle·TailwindValues·CssValues·StyleRules·judgeWith·reread)에 넣는다. LLM 자리에는 정답표의 코드 위치(oracle)를 넣는다.
 * 그래서 이 결과는 "LLM이 맞는 줄을 골랐을 때 서버가 맞게 판정하는가"와 "LLM이 틀린 줄을 고르면 서버가 막아 주는가"를 본다.
 */
class FixtureEvalTest {

    private static final JsonMapper JSON = JsonMapper.builder().build();
    private final Path root = Path.of(System.getenv("QE_FIXTURE"));
    private final Path outDir = Path.of(System.getenv("QE_OUT"));
    private int seq;
    private final Map<String, String> idByPath = new HashMap<>();
    private final Map<String, JsonNode> nodeById = new HashMap<>();
    private final Map<String, JsonNode> frameByName = new LinkedHashMap<>();

    record Block(String frame, String path, String codePath) {
    }

    /** 이상적인 노드 매핑(정답표 mapping.nodes) — 비교 분석 LLM이 맞게 짝지었다고 가정 */
    private static final List<Block> BLOCKS = List.of(
        new Block("HOME-01 홈", "Header", "src/components/layout/AppHeader.tsx"),
        new Block("HOME-01 홈", "Hero", "src/components/home/HeroBanner.tsx"),
        new Block("HOME-01 홈", "Search Bar", "src/components/home/SearchBar.tsx"),
        new Block("HOME-01 홈", "Recommended Rooms", "src/components/home/RecommendedRooms.tsx"),
        new Block("ROOM-01 스터디룸 상세", "Header", "src/components/layout/AppHeader.tsx"),
        new Block("ROOM-01 스터디룸 상세", "Body > Left Column > Room Info", "src/components/room/RoomInfoPanel.tsx"),
        new Block("ROOM-01 스터디룸 상세", "Body > Left Column > Rules", "src/components/room/RulesList.tsx"),
        new Block("ROOM-01 스터디룸 상세", "Body > Booking Box", "src/components/room/BookingBox.tsx"),
        new Block("BOOK-01 예약 확인", "Header", "src/components/layout/AppHeader.tsx"),
        new Block("BOOK-01 예약 확인", "Summary Card", "src/components/booking/PaymentSummary.tsx"),
        new Block("BOOK-01 예약 확인", "Confirm Actions", "src/components/booking/ConfirmActions.tsx"),
        new Block("MY-01 내 예약", "Header", "src/components/layout/AppHeader.tsx"),
        new Block("MY-01 내 예약", "Body > Profile Card", "src/components/mypage/ProfileCard.tsx"),
        new Block("MY-01 내 예약", "Body > Booking List", "src/components/mypage/BookingList.tsx"));

    record Unit(Target target, List<Element> elements) {
    }

    @Test
    void 모아룸_정답표를_QAting_결정적_비교_규칙에_넣는다() throws Exception {
        JsonNode spec = JSON.readTree(Files.readString(root.resolve("design/spec.json")));
        for (JsonNode f : spec.get("frames")) {
            String name = f.get("name").asString();
            JsonNode rest = JSON.valueToTree(rest(f, name));
            index(rest);
            frameByName.put(name, rest);
        }
        JsonNode key = JSON.readTree(Files.readString(root.resolve("answer-key/answer-key.json")));
        Object repo = openRepo(new FixtureGithub(root, Map.of()));
        TailwindValues theme = (TailwindValues) call(repo, "styleValues");

        // 첫 QA compare()와 같은 순서 — 블록마다 요소를 모으고, 같은 파일·같은 입력의 요소는 처음 것만 묻는다
        List<Unit> units = new ArrayList<>();
        Set<String> seenInputs = new HashSet<>();
        int repeated = 0;
        StringBuilder blocksMd = new StringBuilder("| 화면 | 매핑 노드 | 코드 | 비교 요소 | 반복이라 건너뜀 | 코드 묶음(LLM에 보내는 파일) |\n| --- | --- | --- | --- | --- | --- |\n");
        for (Block b : BLOCKS) {
            JsonNode frame = frameByName.get(b.frame());
            String nodeId = id(b.frame() + " > " + b.path());
            JsonNode node = nodeById.get(nodeId);
            Target t = new Target(frame.get("id").asString(), b.frame(), nodeId, node.get("name").asString(), b.codePath(), null);
            List<Element> all = FigmaFacts.collect(node, EnumSet.allOf(Fact.class));
            List<Element> fresh = all.stream().filter(e -> seenInputs.add(ClaudeQaComparator.sameInput(b.codePath(), e))).toList();
            repeated += all.size() - fresh.size();
            units.add(new Unit(t, fresh));
            @SuppressWarnings("unchecked")
            Map<String, String> bundle = (Map<String, String>) call(repo, "bundle", b.codePath());
            blocksMd.append("| ").append(b.frame()).append(" | ").append(b.path()).append(" | `").append(b.codePath()).append("` | ")
                .append(fresh.size()).append(" | ").append(all.size() - fresh.size()).append(" | ")
                .append(bundle.keySet().stream().map(p -> "`" + p.replace("src/components/", "") + "`").collect(Collectors.joining(" "))).append(" |\n");
        }

        // sameInput 키의 values()에 double[](padding)가 있으면 toString이 배열 주소라 같은 입력도 다른 키가 된다 — 고친 키로 다시 세어 본다
        Set<String> fixedSeen = new HashSet<>();
        int fixedRepeated = 0;
        int paddingKeysDiffer = 0;
        for (Block b : BLOCKS) {
            JsonNode node = nodeById.get(id(b.frame() + " > " + b.path()));
            for (Element e : FigmaFacts.collect(node, EnumSet.allOf(Fact.class))) {
                String k = b.codePath() + "|" + e.path() + "|" + e.type() + "|" + e.values().entrySet().stream()
                    .map(en -> en.getKey() + "=" + (en.getValue() instanceof double[] d ? java.util.Arrays.toString(d) : en.getValue()))
                    .collect(Collectors.joining(",")) + "|" + e.width() + "|" + e.height() + "|" + e.lead();
                if (!fixedSeen.add(k)) {
                    fixedRepeated++;
                }
            }
        }
        Element probe = FigmaFacts.collect(nodeById.get(id("HOME-01 홈 > Header")), EnumSet.allOf(Fact.class)).get(0);
        Element probe2 = FigmaFacts.collect(nodeById.get(id("ROOM-01 스터디룸 상세 > Header")), EnumSet.allOf(Fact.class)).get(0);
        if (!ClaudeQaComparator.sameInput("x", probe).equals(ClaudeQaComparator.sameInput("x", probe2))) {
            paddingKeysDiffer = 1;
        }

        StringBuilder md = new StringBuilder();
        md.append("# QAting 결정적 비교 규칙 하네스 결과\n\n");
        md.append("QAting `main`의 실제 코드(FigmaFacts·Repo.bundle·TailwindValues·CssValues·StyleRules·judgeWith·reread)에 모아룸 시안·코드를 넣고, ")
            .append("LLM 응답 자리에 정답표의 줄·토큰을 넣어 돌렸다. Figma 노드 JSON은 design/spec.json을 REST 형태로 바꾼 것이다.\n\n");
        md.append("## 1. 비교 입력\n\n").append(blocksMd).append("\n같은 입력이라 LLM에 다시 묻지 않은 요소: ").append(repeated).append("개\n\n");
        md.append("padding 배열을 내용으로 비교하도록 키를 고치면 다시 묻지 않을 요소: ").append(fixedRepeated).append("개 (차이 ")
            .append(fixedRepeated - repeated).append("개). 화면마다 같은 Header 프레임 요소의 sameInput 키가 ")
            .append(paddingKeysDiffer == 1 ? "**서로 다르다**(double[] toString이 배열 주소)" : "같다").append(".\n\n");

        // ---------------------------------------------------------------- 정답표 항목별 판정
        md.append("## 2. 정답표 항목별 — LLM이 이 줄·토큰을 골랐을 때 서버 판정\n\n");
        md.append("| ID | 종류 | LLM 응답(가정) | 서버 판정 | 정답표와 | 의미 |\n| --- | --- | --- | --- | --- | --- |\n");
        int dOk = 0;
        int dTotal = 0;
        for (JsonNode c : key.get("cases")) {
            String caseId = c.get("id").asString();
            String kind = c.get("kind").asString();
            Fact fact = Fact.of(c.get("fact").asString()).orElseThrow();
            String elementId = id(c.get("frame").asString() + " > " + c.get("element").asString());
            Unit unit = units.stream().filter(u -> u.elements().stream().anyMatch(e -> e.id().equals(elementId))).findFirst().orElse(null);
            if (unit == null) {
                boolean ok = caseId.equals("P01");
                md.append("| ").append(caseId).append(" | ").append(kind).append(" | - | 비교 요소 목록에 없음(블록의 ")
                    .append(FigmaFacts.MAX_ELEMENTS).append("개 상한 밖) — LLM에 묻지도 않는다 | ").append(ok ? "예상대로" : "❌ 예상 밖").append(" | ")
                    .append(ok ? "README에 없는 제한 확인" : "").append(" |\n");
                continue;
            }
            @SuppressWarnings("unchecked")
            Map<String, String> code = (Map<String, String>) call(repo, "bundle", unit.target().codePath());
            for (String[] o : oracles(c)) {
                String file = o[0];
                int line = Integer.parseInt(o[1]);
                String token = o[2];
                String label = o[3];
                Binding b = new Binding(elementId, fact.key, file, line, token);
                ClaudeQaComparator.JobResult r = ClaudeQaComparator.judgeWith(unit.target(), unit.elements(), code, List.of(b), theme);
                String verdict;
                String match;
                String meaning = "";
                if (r.dropped() > 0) {
                    verdict = code.containsKey(file) ? "버림 — 그 줄에 토큰 없음" : "버림 — `" + file + "`가 코드 묶음에 없음";
                    boolean ok = caseId.equals("P02");
                    match = ok ? "예상대로" : "❌";
                    meaning = ok ? "`@/` 별칭 import는 따라가지 않음(README에 없는 제한)" : "";
                } else if (!r.findings().isEmpty()) {
                    Finding f = r.findings().get(0);
                    verdict = "차이 `" + f.expectedValue() + "` → `" + f.actualValue() + "`";
                    if (kind.equals("D") || kind.equals("P")) {
                        boolean ok = f.expectedValue().equals(c.get("figma").asString()) && f.actualValue().equals(c.get("code").asString());
                        match = ok ? "✅ 값까지 일치" : "❌ 값 다름";
                    } else {
                        match = "❌ 이슈가 됨";
                        meaning = kind.equals("N") ? "같은 값을 다르게 판정 — 서버 규칙 오탐" : "서버 규칙은 못 막음 — LLM이 이 줄을 빼 줘야만 이슈가 안 됨";
                    }
                } else {
                    Object v = theme.value(fact, token, file, code.get(file).split("\n", -1)[line - 1]);
                    verdict = v == null ? "읽을 수 없는 값 → 비교 안 함" : "같음";
                    match = kind.equals("D") ? "❌ 놓침" : "✅ 이슈 없음";
                    if (kind.equals("S")) {
                        meaning = v == null ? "서버 규칙이 막아 줌" : "";
                    }
                }
                if (kind.equals("D")) {
                    dTotal++;
                    if (match.startsWith("✅")) {
                        dOk++;
                    }
                }
                md.append("| ").append(caseId).append(" | ").append(kind).append(" | ").append(label).append(" `").append(file.replace("src/components/", ""))
                    .append(":").append(line).append("` `").append(token.replace("|", "\\|")).append("` | ").append(verdict).append(" | ").append(match)
                    .append(" | ").append(meaning).append(" |\n");
            }
        }
        md.append("\nD 항목: LLM이 정답 줄을 고르면 ").append(dOk).append("/").append(dTotal).append("개가 정답표와 같은 값의 이슈가 된다.\n\n");

        // ---------------------------------------------------------------- 중복 제거
        md.append("## 3. 반복 요소의 중복 제거 — 같은 컴포넌트를 여러 번 그린 경우\n\n| ID | 시안의 반복 | LLM에 묻는 요소 | 차이 판정 | 이슈(중복 제거 뒤) |\n| --- | --- | --- | --- | --- |\n");
        for (String caseId : List.of("D01", "D05", "D06", "D14", "D17")) {
            JsonNode c = find(key, caseId);
            Fact fact = Fact.of(c.get("fact").asString()).orElseThrow();
            List<String> instances = instances(c.get("frame").asString(), c.get("element").asString());
            if (caseId.equals("D01")) {
                instances = new ArrayList<>();
                for (String fr : List.of("HOME-01 홈", "ROOM-01 스터디룸 상세", "BOOK-01 예약 확인", "MY-01 내 예약")) {
                    instances.add(id(fr + " > Header > Nav"));
                }
            }
            int asked = 0;
            List<Finding> findings = new ArrayList<>();
            for (Unit u : units) {
                List<Binding> bs = new ArrayList<>();
                for (String eid : instances) {
                    if (u.elements().stream().anyMatch(e -> e.id().equals(eid))) {
                        asked++;
                        bs.add(new Binding(eid, fact.key, c.get("file").asString(), c.get("line").asInt(), c.get("token").asString()));
                    }
                }
                if (!bs.isEmpty()) {
                    @SuppressWarnings("unchecked")
                    Map<String, String> code = (Map<String, String>) call(repo, "bundle", u.target().codePath());
                    findings.addAll(ClaudeQaComparator.judgeWith(u.target(), u.elements(), code, bs, theme).findings());
                }
            }
            Set<String> seen = new HashSet<>();
            long issues = findings.stream()
                .filter(f -> seen.add(f.codePath() + "|" + f.codeLine() + "|" + f.property() + "|" + f.expectedValue() + "|" + f.actualValue())).count();
            md.append("| ").append(caseId).append(" | ").append(instances.size()).append("곳 | ").append(asked).append(" | ").append(findings.size())
                .append(" | ").append(issues == 1 ? "✅ 1개" : "❌ " + issues + "개").append(" |\n");
        }

        // ---------------------------------------------------------------- Re-QA
        md.append("\n## 4. Re-QA — `npm run reqa:apply`를 푸시한 커밋을 다시 읽었을 때\n\n| ID | 바뀐 줄의 토큰(LLM 응답 가정) | 다시 읽은 값 | 판정 | 기대 | 결과 |\n| --- | --- | --- | --- | --- | --- |\n");
        Map<String, Map<Integer, String[]>> edits = new HashMap<>();
        for (JsonNode c : key.get("cases")) {
            JsonNode rq = c.get("reqa");
            if (rq != null && rq.has("from")) {
                edits.computeIfAbsent(c.get("file").asString(), k -> new HashMap<>())
                    .put(c.get("line").asInt(), new String[] {rq.get("from").asString(), rq.get("to").asString()});
            }
        }
        Object fixedRepo = openRepo(new FixtureGithub(root, edits));
        TailwindValues fixedTheme = (TailwindValues) call(fixedRepo, "styleValues");
        Method reread = ClaudeQaComparator.class.getDeclaredMethod("reread", Element.class, Fact.class, List.class, Map.class, TailwindValues.class);
        reread.setAccessible(true);
        int reOk = 0;
        int reTotal = 0;
        for (JsonNode c : key.get("cases")) {
            JsonNode rq = c.get("reqa");
            if (rq == null) {
                continue;
            }
            reTotal++;
            Fact fact = Fact.of(c.get("fact").asString()).orElseThrow();
            String eid = id(c.get("frame").asString() + " > " + c.get("element").asString());
            Element e = FigmaFacts.element(nodeById.get(eid), FigmaFacts.name(nodeById.get(eid)), Set.of(fact)).orElseThrow();
            String token = rq.has("to") ? rq.get("to").asString().replaceAll("[;,]$", "") : c.get("token").asString();
            if (c.get("id").asString().equals("D03")) {
                token = "px-6 py-3";
            }
            String blockPath = BLOCKS.stream().filter(b -> c.get("frame").asString().equals(b.frame()) && c.get("element").asString().startsWith(b.path()))
                .map(Block::codePath).findFirst().orElseThrow();
            @SuppressWarnings("unchecked")
            Map<String, String> code = (Map<String, String>) call(fixedRepo, "bundle", blockPath);
            Binding b = new Binding(eid, fact.key, c.get("file").asString(), c.get("line").asInt(), token);
            @SuppressWarnings("unchecked")
            Optional<String> observed = (Optional<String>) reread.invoke(null, e, fact, List.of(b), code, fixedTheme);
            String verdict = observed.map(v -> v.trim().equalsIgnoreCase(c.get("figma").asString().trim()) ? "PASS" : "FAIL").orElse("판정 안 함");
            boolean ok = verdict.equals(rq.get("expect").asString()) && (!rq.has("observed") || observed.map(v -> v.equals(rq.get("observed").asString())).orElse(false));
            if (ok) {
                reOk++;
            }
            md.append("| ").append(c.get("id").asString()).append(" | `").append(token).append("` | ").append(observed.orElse("-")).append(" | ").append(verdict)
                .append(" | ").append(rq.get("expect").asString()).append(rq.has("observed") ? " (" + rq.get("observed").asString() + ")" : "").append(" | ")
                .append(ok ? "✅" : "❌").append(" |\n");
        }
        md.append("\nRe-QA: ").append(reOk).append("/").append(reTotal).append(" 기대대로\n");

        Files.createDirectories(outDir);
        Files.writeString(outDir.resolve("harness-qa.md"), md.toString(), StandardCharsets.UTF_8);
        System.out.println(md);
    }

    // ------------------------------------------------------------------ LLM 응답 가정(oracle)

    /** {파일, 줄, 토큰, 설명}. 기본은 정답표 줄·토큰. S는 LLM이 그 줄을 "잘못" 골랐다고 가정하는 함정 응답도 함께 넣는다 */
    private List<String[]> oracles(JsonNode c) {
        String file = c.get("file").asString();
        String line = String.valueOf(c.get("line").asInt());
        String token = c.get("token").asString();
        return switch (c.get("id").asString()) {
            case "N10" -> List.<String[]>of(new String[] {file, line, "px-5", "정답 줄"});
            case "S05" -> List.of(new String[] {file, line, "placeholder:text-slate-500", "정답(변형)"}, new String[] {file, line, "text-slate-900", "함정: 입력 글자색"});
            case "S02" -> List.<String[]>of(new String[] {file, line, token, "함정: hover 줄"});
            case "S03" -> List.<String[]>of(new String[] {file, line, token, "함정: 데이터 객체 문구"});
            case "S01", "S04" -> List.<String[]>of(new String[] {file, line, token, "그 줄의 선언"});
            default -> List.<String[]>of(new String[] {file, line, token, "정답 줄"});
        };
    }

    // ------------------------------------------------------------------ spec.json → Figma REST 노드 JSON

    private Map<String, Object> rest(JsonNode n, String path) {
        Map<String, Object> m = new LinkedHashMap<>();
        String id = "9:" + (++seq);
        m.put("id", id);
        m.put("name", n.get("name").asString());
        idByPath.put(path, id);
        String type = n.get("type").asString();
        Double w = n.has("w") && n.get("w").isNumber() ? n.get("w").asDouble() : null;
        Map<String, Object> box = new LinkedHashMap<>();
        if (w != null) {
            box.put("width", w);
        }
        switch (type) {
            case "TEXT" -> {
                m.put("type", "TEXT");
                m.put("characters", n.get("text").asString());
                m.put("style", Map.of("fontWeight", n.get("weight").asDouble(), "fontSize", n.get("size").asDouble()));
                m.put("fills", List.of(solid(n.get("color").asString())));
            }
            case "RECT" -> {
                m.put("type", "RECTANGLE");
                m.put("fills", n.has("fill") ? List.of(solid(n.get("fill").asString())) : List.of());
                if (n.has("radius")) {
                    m.put("cornerRadius", n.get("radius").asDouble());
                }
                box.put("height", n.get("h").asDouble());
            }
            default -> {
                m.put("type", "FRAME");
                m.put("fills", n.has("fill") ? List.of(solid(n.get("fill").asString())) : List.of());
                if (n.has("radius")) {
                    m.put("cornerRadius", n.get("radius").asDouble());
                }
                if (n.has("layout")) {
                    m.put("layoutMode", n.get("layout").asString());
                    JsonNode p = n.get("padding");
                    m.put("paddingTop", p == null ? 0.0 : p.get(0).asDouble());
                    m.put("paddingRight", p == null ? 0.0 : p.get(1).asDouble());
                    m.put("paddingBottom", p == null ? 0.0 : p.get(2).asDouble());
                    m.put("paddingLeft", p == null ? 0.0 : p.get(3).asDouble());
                    m.put("itemSpacing", n.has("gap") ? n.get("gap").asDouble() : 0.0);
                }
                if (n.has("stroke")) {
                    m.put("strokes", List.of(solid(n.get("stroke").asString())));
                    m.put("strokeWeight", 1.0);
                }
            }
        }
        if (!box.isEmpty()) {
            m.put("absoluteBoundingBox", box);
        }
        List<Object> kids = new ArrayList<>();
        Map<String, Integer> count = new HashMap<>();
        if (n.has("children")) {
            for (JsonNode c : n.get("children")) {
                String name = c.get("name").asString();
                int i = count.merge(name, 1, Integer::sum) - 1;
                kids.add(rest(c, path + " > " + name + "[" + i + "]"));
            }
        }
        m.put("children", kids);
        return m;
    }

    private static Map<String, Object> solid(String hex) {
        String h = hex.replace("#", "");
        return Map.of("type", "SOLID", "color", Map.of(
            "r", Integer.parseInt(h.substring(0, 2), 16) / 255.0,
            "g", Integer.parseInt(h.substring(2, 4), 16) / 255.0,
            "b", Integer.parseInt(h.substring(4, 6), 16) / 255.0,
            "a", 1.0));
    }

    private void index(JsonNode n) {
        nodeById.put(n.get("id").asString(), n);
        for (JsonNode c : n.get("children")) {
            index(c);
        }
    }

    /** "화면 > A > B[1]" → id. 인덱스 없는 칸은 [0] */
    private String id(String path) {
        String[] parts = path.split(" > ");
        StringBuilder sb = new StringBuilder(parts[0]);
        for (int i = 1; i < parts.length; i++) {
            sb.append(" > ").append(parts[i].matches(".*\\[\\d+]$") ? parts[i] : parts[i] + "[0]");
        }
        String id = idByPath.get(sb.toString());
        if (id == null) {
            throw new IllegalStateException("시안에 없는 경로: " + path);
        }
        return id;
    }

    /** 경로의 마지막 칸만 바꿔 가며 같은 이름의 형제(반복 요소)를 모두 찾는다. 상위 칸에 반복이 있으면 그 칸도 돈다 */
    private List<String> instances(String frame, String element) {
        String[] parts = element.split(" > ");
        List<String> paths = List.of(frame);
        for (String part : parts) {
            String name = part.replaceAll("\\[\\d+]$", "");
            List<String> next = new ArrayList<>();
            for (String p : paths) {
                for (int i = 0; idByPath.containsKey(p + " > " + name + "[" + i + "]"); i++) {
                    next.add(p + " > " + name + "[" + i + "]");
                }
            }
            paths = next;
        }
        return paths.stream().map(idByPath::get).toList();
    }

    private static JsonNode find(JsonNode key, String id) {
        for (JsonNode c : key.get("cases")) {
            if (c.get("id").asString().equals(id)) {
                return c;
            }
        }
        throw new IllegalStateException(id);
    }

    // ------------------------------------------------------------------ ClaudeQaComparator.Repo (private) 를 그대로 쓴다

    private static Object openRepo(GithubClient github) throws Exception {
        Class<?> repoClass = Class.forName("com.acjb.server.qa.ClaudeQaComparator$Repo");
        Method open = repoClass.getDeclaredMethod("open", GithubClient.class, String.class, String.class);
        open.setAccessible(true);
        return open.invoke(null, github, "Sora3780/qating-eval-fixture", "fixture");
    }

    private static Object call(Object target, String name, Object... args) throws Exception {
        for (Method m : target.getClass().getDeclaredMethods()) {
            if (m.getName().equals(name) && m.getParameterCount() == args.length) {
                m.setAccessible(true);
                return m.invoke(target, args);
            }
        }
        throw new NoSuchMethodException(name);
    }

    /** 로컬 폴더를 GitHub 저장소처럼 읽는다. edits: 파일 → 줄 → {from, to}(Re-QA 커밋 흉내) */
    static final class FixtureGithub implements GithubClient {
        private final Path root;
        private final Map<String, Map<Integer, String[]>> edits;

        FixtureGithub(Path root, Map<String, Map<Integer, String[]>> edits) {
            this.root = root;
            this.edits = edits;
        }

        @Override
        public List<TreeFile> tree(String owner, String repo, String sha) {
            try (Stream<Path> s = Files.walk(root)) {
                return s.filter(Files::isRegularFile)
                    .map(p -> root.relativize(p).toString().replace('\\', '/'))
                    .filter(p -> !p.startsWith("node_modules/") && !p.startsWith("dist/") && !p.startsWith(".git/"))
                    .sorted()
                    .map(p -> new TreeFile(p, root.resolve(p).toFile().length()))
                    .toList();
            } catch (IOException e) {
                throw new UncheckedIOException(e);
            }
        }

        @Override
        public String fileContent(String owner, String repo, String sha, String path) {
            try {
                String text = Files.readString(root.resolve(path)).replace("\r\n", "\n");
                Map<Integer, String[]> e = edits.get(path);
                if (e == null) {
                    return text;
                }
                String[] lines = text.split("\n", -1);
                e.forEach((line, ft) -> lines[line - 1] = lines[line - 1].replace(ft[0], ft[1]));
                return String.join("\n", lines);
            } catch (IOException ex) {
                throw new UncheckedIOException(ex);
            }
        }

        @Override
        public RepoInfo repository(String owner, String repo) {
            throw new UnsupportedOperationException();
        }

        @Override
        public List<String> branches(String owner, String repo) {
            throw new UnsupportedOperationException();
        }

        @Override
        public boolean branchExists(String owner, String repo, String branch) {
            throw new UnsupportedOperationException();
        }

        @Override
        public String commitSha(String owner, String repo, String branch) {
            return "fixture";
        }

        @Override
        public Optional<String> latestDeploymentUrl(String owner, String repo) {
            return Optional.empty();
        }

        @Override
        public Optional<Origin> blameLine(String owner, String repo, String sha, String path, int line) {
            return Optional.empty();
        }

        @Override
        public Optional<CommitInfo> lastCommitForPath(String owner, String repo, String sha, String path) {
            return Optional.empty();
        }

        @Override
        public List<PullInfo> pullsForCommit(String owner, String repo, String sha) {
            return List.of();
        }

        @Override
        public List<CommitInfo> commitsSince(String owner, String repo, String branch, java.time.Instant since) {
            return List.of();
        }

        @Override
        public List<PullInfo> recentPulls(String owner, String repo) {
            return List.of();
        }

        @Override
        public Optional<CommitInfo> commit(String owner, String repo, String sha) {
            return Optional.empty();
        }

        @Override
        public Optional<PullInfo> pull(String owner, String repo, int number) {
            return Optional.empty();
        }

        @Override
        public boolean hasToken() {
            return false;
        }
    }
}
