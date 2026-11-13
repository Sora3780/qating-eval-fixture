package com.acjb.server.analysis;

import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Stream;

import org.junit.jupiter.api.Test;

import com.acjb.server.github.GithubClient.TreeFile;

import tools.jackson.databind.JsonNode;
import tools.jackson.databind.json.JsonMapper;

/** 평가 하네스(임시) — 비교 분석(매핑) LLM이 모아룸에서 받게 될 입력을 QAting 실제 코드(CodeSelector·FigmaFrames)로 만든다 */
class FixtureMappingInputTest {

    private static final JsonMapper JSON = JsonMapper.builder().build();

    @Test
    void 매핑_입력() throws Exception {
        Path root = Path.of(System.getenv("QE_FIXTURE"));
        List<TreeFile> tree;
        try (Stream<Path> s = Files.walk(root)) {
            tree = s.filter(Files::isRegularFile).map(p -> root.relativize(p).toString().replace('\\', '/'))
                .filter(p -> !p.startsWith("node_modules/") && !p.startsWith("dist/") && !p.startsWith(".git/")).sorted()
                .map(p -> new TreeFile(p, root.resolve(p).toFile().length())).toList();
        }
        List<TreeFile> ui = CodeSelector.select(tree);
        long chars = 0;
        for (TreeFile f : ui) {
            chars += Files.readString(root.resolve(f.path())).length();
        }
        StringBuilder md = new StringBuilder("# 비교 분석(매핑) 입력 — QAting CodeSelector·FigmaFrames로 만든 것\n\n");
        md.append("## UI 코드 파일 (CodeSelector)\n\n").append(ui.size()).append("개 / ").append(chars).append("자 (한도 300개 · 100만 자)\n\n");
        ui.forEach(f -> md.append("- `").append(f.path()).append("`\n"));

        JsonNode spec = JSON.readTree(Files.readString(root.resolve("design/spec.json")));
        md.append("\n## 프레임 요약 (프레임 단계에서 LLM이 보는 것: 자식 이름 8개 · 글자 12개)\n\n| 프레임 | 자식 | 글자 |\n| --- | --- | --- |\n");
        int[] seq = {0};
        for (JsonNode f : spec.get("frames")) {
            JsonNode node = JSON.valueToTree(rest(f, seq));
            DesignCodeMapper.FrameSummary s = FigmaFrames.summary(node, spec.get("section").asString());
            md.append("| ").append(s.name()).append(" | ").append(String.join("<br>", s.children())).append(" | ")
                .append(String.join(" · ", s.texts())).append(" |\n");
        }
        Files.createDirectories(Path.of(System.getenv("QE_OUT")));
        Files.writeString(Path.of(System.getenv("QE_OUT")).resolve("harness-mapping.md"), md.toString(), StandardCharsets.UTF_8);
        System.out.println(md);
    }

    private static Map<String, Object> rest(JsonNode n, int[] seq) {
        Map<String, Object> m = new LinkedHashMap<>();
        m.put("id", "9:" + (++seq[0]));
        m.put("name", n.get("name").asString());
        m.put("type", n.get("type").asString().equals("RECT") ? "RECTANGLE" : n.get("type").asString());
        if (n.has("text")) {
            m.put("characters", n.get("text").asString());
        }
        List<Object> kids = new ArrayList<>();
        if (n.has("children")) {
            n.get("children").forEach(c -> kids.add(rest(c, seq)));
        }
        m.put("children", kids);
        return m;
    }
}
