// QAting 평가용 시안 생성 플러그인.
// 이 파일은 템플릿이다 — `npm run spec`이 __SPEC__ 자리에 design/spec.json을 넣어 code.js를 만든다. code.js를 직접 고치지 않는다.

const SPEC = __SPEC__;

const WEIGHT_STYLES = {
  400: ['Regular'],
  500: ['Medium'],
  600: ['SemiBold', 'Semi Bold', 'Semibold', 'DemiBold'],
  700: ['Bold'],
};

function paint(hex) {
  const h = hex.replace('#', '');
  return {
    type: 'SOLID',
    color: {
      r: parseInt(h.slice(0, 2), 16) / 255,
      g: parseInt(h.slice(2, 4), 16) / 255,
      b: parseInt(h.slice(4, 6), 16) / 255,
    },
  };
}

function toHex(p) {
  if (!p || p.type !== 'SOLID') return null;
  const ch = (x) => Math.round(x * 255).toString(16).padStart(2, '0');
  return '#' + ch(p.color.r) + ch(p.color.g) + ch(p.color.b);
}

function weightsIn(node, out) {
  if (node.type === 'TEXT') out.add(node.weight);
  (node.children || []).forEach((c) => weightsIn(c, out));
  return out;
}

async function pickFonts(families, weights) {
  const available = await figma.listAvailableFontsAsync();
  const tried = [];
  for (const family of families) {
    const styles = new Set(available.filter((f) => f.fontName.family === family).map((f) => f.fontName.style));
    if (styles.size === 0) {
      tried.push(family + '(없음)');
      continue;
    }
    const map = {};
    let missing = null;
    for (const w of weights) {
      const style = WEIGHT_STYLES[w].find((s) => styles.has(s));
      if (!style) {
        missing = w;
        break;
      }
      map[w] = { family: family, style: style };
    }
    if (missing === null) return map;
    tried.push(family + '(' + missing + ' 굵기 없음)');
  }
  throw new Error('필요한 굵기를 모두 가진 글꼴이 없어요: ' + tried.join(', '));
}

function isAutoLayout(node) {
  return node && node.type === 'FRAME' && node.layoutMode !== 'NONE';
}

/** 고정·채우기 크기는 자식보다 먼저, 내용 맞춤(HUG)은 자식을 다 만든 뒤에 정한다 */
function sizeBefore(node, spec, parent) {
  if (spec.type === 'RECT') {
    node.resize(typeof spec.w === 'number' ? spec.w : 100, spec.h);
  } else if (typeof spec.w === 'number') {
    node.resize(spec.w, node.height);
    if (spec.type === 'TEXT' || isAutoLayout(node) || isAutoLayout(parent)) node.layoutSizingHorizontal = 'FIXED';
  } else if (spec.type === 'TEXT' && spec.w === undefined) {
    node.textAutoResize = 'WIDTH_AND_HEIGHT';
  }
  if (spec.w === 'fill' && isAutoLayout(parent)) node.layoutSizingHorizontal = 'FILL';
}

function sizeAfter(node, spec) {
  if (spec.type === 'FRAME' && isAutoLayout(node)) {
    if (spec.w === undefined) node.layoutSizingHorizontal = 'HUG';
    node.layoutSizingVertical = 'HUG';
  }
}

function build(spec, parent, fonts) {
  let node;
  if (spec.type === 'TEXT') {
    node = figma.createText();
    node.fontName = fonts[spec.weight];
    node.characters = spec.text;
    node.fontSize = spec.size;
    node.fills = [paint(spec.color)];
  } else if (spec.type === 'RECT') {
    node = figma.createRectangle();
    node.fills = spec.fill ? [paint(spec.fill)] : [];
    if (spec.radius) node.cornerRadius = spec.radius;
  } else {
    node = figma.createFrame();
    node.fills = spec.fill ? [paint(spec.fill)] : [];
    node.clipsContent = false;
    if (spec.layout && spec.layout !== 'NONE') {
      node.layoutMode = spec.layout;
      const p = spec.padding || [0, 0, 0, 0];
      node.paddingTop = p[0];
      node.paddingRight = p[1];
      node.paddingBottom = p[2];
      node.paddingLeft = p[3];
      node.itemSpacing = spec.gap || 0;
      node.primaryAxisAlignItems = spec.primary || 'MIN';
      node.counterAxisAlignItems = spec.counter || 'MIN';
    }
    if (spec.radius) node.cornerRadius = spec.radius;
    if (spec.stroke) {
      node.strokes = [paint(spec.stroke)];
      node.strokeAlign = 'INSIDE';
      if (spec.strokeSides === 'BOTTOM' || spec.strokeSides === 'TOP') {
        node.strokeTopWeight = spec.strokeSides === 'TOP' ? 1 : 0;
        node.strokeBottomWeight = spec.strokeSides === 'BOTTOM' ? 1 : 0;
        node.strokeLeftWeight = 0;
        node.strokeRightWeight = 0;
      } else {
        node.strokeWeight = 1;
      }
    }
  }
  node.name = spec.name;
  parent.appendChild(node);
  sizeBefore(node, spec, parent);
  (spec.children || []).forEach((c) => build(c, node, fonts));
  sizeAfter(node, spec);
  return node;
}

/** 만든 노드가 시안 정의와 같은 값을 갖는지 다시 읽어 본다(글꼴 대체·반올림 확인) */
function verify(spec, node, path, problems) {
  const where = path + ' > ' + spec.name;
  if (node.name !== spec.name) problems.push(where + ': 이름 ' + node.name);
  if (spec.type === 'TEXT') {
    if (node.fontSize !== spec.size) problems.push(where + ': 글자 크기 ' + String(node.fontSize));
    if (node.fontWeight !== spec.weight) problems.push(where + ': 굵기 ' + String(node.fontWeight) + ' (시안 ' + spec.weight + ')');
    if (toHex(node.fills[0]) !== spec.color.toLowerCase()) problems.push(where + ': 글자색 ' + toHex(node.fills[0]));
    if (node.characters !== spec.text) problems.push(where + ': 문구');
    return;
  }
  if (spec.fill && toHex(node.fills[0]) !== spec.fill.toLowerCase()) problems.push(where + ': 배경 ' + toHex(node.fills[0]));
  if (spec.radius && node.cornerRadius !== spec.radius) problems.push(where + ': 모서리 ' + String(node.cornerRadius));
  if (spec.type === 'FRAME' && spec.layout) {
    const p = spec.padding || [0, 0, 0, 0];
    const got = [node.paddingTop, node.paddingRight, node.paddingBottom, node.paddingLeft];
    if (got.join(',') !== p.join(',')) problems.push(where + ': padding ' + got.join(' '));
    if ((spec.gap || 0) !== node.itemSpacing) problems.push(where + ': gap ' + node.itemSpacing);
  }
  (spec.children || []).forEach((c, i) => verify(c, node.children[i], where, problems));
}

async function main() {
  const weights = [];
  SPEC.frames.forEach((f) => weightsIn(f, new Set()).forEach((w) => weights.indexOf(w) < 0 && weights.push(w)));
  const fonts = await pickFonts(SPEC.fontFamilies, weights);
  await Promise.all(Object.keys(fonts).map((w) => figma.loadFontAsync(fonts[w])));

  let pageName = SPEC.page;
  const names = figma.root.children.map((p) => p.name);
  for (let i = 2; names.indexOf(pageName) >= 0; i++) pageName = SPEC.page + ' (' + i + ')';
  const page = figma.createPage();
  page.name = pageName;
  await figma.setCurrentPageAsync(page);

  const section = figma.createSection();
  section.name = SPEC.section;
  page.appendChild(section);

  const GAP = 160;
  const PAD = 120;
  let x = PAD;
  let maxH = 0;
  const built = [];
  for (const f of SPEC.frames) {
    const node = build(f, section, fonts);
    node.x = x;
    node.y = PAD;
    x += node.width + GAP;
    maxH = Math.max(maxH, node.height);
    built.push(node);
  }
  section.resizeWithoutConstraints(x - GAP + PAD, maxH + PAD * 2);

  const problems = [];
  SPEC.frames.forEach((f, i) => verify(f, built[i], '', problems));
  figma.viewport.scrollAndZoomIntoView([section]);

  const family = fonts[weights[0]].family;
  if (problems.length > 0) {
    console.log('시안 정의와 다른 값:\n' + problems.join('\n'));
    figma.closePlugin('만들었지만 시안 정의와 다른 값이 ' + problems.length + '개 있어요. 콘솔(Plugins > Development > Show console)을 확인하세요.');
    return;
  }
  figma.closePlugin('완료: "' + pageName + '" 페이지에 화면 ' + SPEC.frames.length + '개를 만들었어요(글꼴 ' + family + '). 이 페이지 링크를 QAting에 연결하세요.');
}

main().catch((e) => figma.closePlugin('실패: ' + (e && e.message ? e.message : String(e))));
