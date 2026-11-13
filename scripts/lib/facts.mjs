// QAting 첫 QA가 Figma 쪽 값을 읽는 규칙(FigmaFacts.java)과 이슈 값 표기(StyleRules.format)를 옮긴 것.
// 정답표의 "시안 값" 문자열이 QAting이 실제로 적을 문자열과 같은지 검증하는 데 쓴다.
// 기준 코드: tjfakstn/ACJB backend/src/main/java/com/acjb/server/qa/{FigmaFacts,StyleRules}.java (2026-11-13 main)

export const MAX_ELEMENTS = 40
const SHAPES = new Set(['VECTOR', 'BOOLEAN_OPERATION', 'LINE', 'ELLIPSE', 'STAR', 'POLYGON'])

/** fact 키 → QAting StyleMismatch.property(소문자) */
export const PROPERTY_OF = {
  text: 'text',
  color: 'color',
  background: 'color',
  border: 'color',
  font_weight: 'font_weight',
  font_size: 'font_size',
  radius: 'radius',
  padding: 'spacing',
  gap: 'spacing',
}

// ---------------------------------------------------------------- design-spec.mjs 노드

export function specFacts(n) {
  const v = {}
  if (n.type === 'TEXT') {
    const chars = n.text.trim()
    if (chars) v.text = chars.length > 80 ? chars.slice(0, 80) : chars
    if (n.color) v.color = n.color.toLowerCase()
    v.font_weight = n.weight
    v.font_size = n.size
    return v
  }
  if (n.fill) v.background = n.fill.toLowerCase()
  if (n.radius > 0) v.radius = n.radius
  if (n.type === 'FRAME' && (n.layout === 'HORIZONTAL' || n.layout === 'VERTICAL')) {
    const p = n.padding ?? [0, 0, 0, 0]
    if (p.some((x) => x !== 0)) v.padding = p
    if (n.gap) v.gap = n.gap
  }
  if (n.stroke) v.border = n.stroke.toLowerCase()
  return v
}

export const specTree = {
  facts: specFacts,
  children: (n) => n.children ?? [],
  name: (n) => n.name,
  hidden: () => false,
  type: (n) => (n.type === 'RECT' ? 'RECTANGLE' : n.type),
}

// ---------------------------------------------------------------- Figma REST 노드 JSON

function solid(paints, nodeOpacity) {
  if (typeof nodeOpacity === 'number' && nodeOpacity < 0.999) return null
  if (!Array.isArray(paints)) return null
  for (const p of paints) {
    if (p.visible === false) continue
    if (p.type !== 'SOLID' || (typeof p.opacity === 'number' && p.opacity < 0.999) || !p.color) return null
    if (typeof p.color.a === 'number' && p.color.a < 0.999) return null
    const ch = (k) => Math.round(Math.max(0, Math.min(1, p.color[k] ?? 0)) * 255).toString(16).padStart(2, '0')
    return `#${ch('r')}${ch('g')}${ch('b')}`
  }
  return null
}

export function restFacts(n) {
  const v = {}
  if (n.type === 'TEXT') {
    const chars = (n.characters ?? '').trim()
    if (chars) v.text = chars.length > 80 ? chars.slice(0, 80) : chars
    const c = solid(n.fills, n.opacity)
    if (c) v.color = c
    if (typeof n.style?.fontWeight === 'number') v.font_weight = n.style.fontWeight
    if (typeof n.style?.fontSize === 'number') v.font_size = n.style.fontSize
    return v
  }
  const bg = solid(n.fills, n.opacity)
  if (bg) v.background = bg
  const corners = n.rectangleCornerRadii
  if (Array.isArray(corners) && corners.length === 4) {
    if (corners.every((c) => c === corners[0]) && corners[0] > 0) v.radius = corners[0]
  } else if (n.cornerRadius > 0) {
    v.radius = n.cornerRadius
  }
  if (n.layoutMode === 'HORIZONTAL' || n.layoutMode === 'VERTICAL') {
    const p = [n.paddingTop ?? 0, n.paddingRight ?? 0, n.paddingBottom ?? 0, n.paddingLeft ?? 0]
    if (p.some((x) => x !== 0)) v.padding = p
    if (n.itemSpacing) v.gap = n.itemSpacing
  }
  if (n.strokeWeight > 0) {
    const b = solid(n.strokes, null)
    if (b) v.border = b
  }
  return v
}

export const restTree = {
  facts: restFacts,
  children: (n) => n.children ?? [],
  name: (n) => n.name ?? '',
  hidden: (n) => n.visible === false,
  type: (n) => n.type,
}

// ---------------------------------------------------------------- 공통

/** FigmaFacts.collect — 위→아래 깊이 우선, 값이 있는 요소 최대 40개 */
export function collect(root, tree) {
  const out = []
  const walk = (n, path) => {
    if (out.length >= MAX_ELEMENTS || tree.hidden(n)) return
    if (!SHAPES.has(tree.type(n))) {
      const facts = tree.facts(n)
      if (Object.keys(facts).length > 0) out.push({ node: n, path, facts })
    }
    for (const c of tree.children(n)) walk(c, `${path} > ${tree.name(c)}`)
  }
  walk(root, tree.name(root))
  return out
}

/** 이름 경로("Booking List > Booking Item[7] > Date")로 노드를 찾는다. [i]는 같은 이름 형제 중 i번째(0부터) */
export function findByPath(root, path, tree) {
  const parts = path.split('>').map((s) => s.trim())
  const head = parts.shift()
  if (tree.name(root) !== head.replace(/\[\d+]$/, '')) return null
  let node = root
  for (const part of parts) {
    const m = part.match(/^(.*?)(?:\[(\d+)])?$/)
    const same = tree.children(node).filter((c) => tree.name(c) === m[1])
    node = same[m[2] ? Number(m[2]) : 0]
    if (!node) return null
  }
  return node
}

export function px(v) {
  return `${Number.isInteger(v) ? v : v}px`
}

function paddingText(p, horizontalOnly) {
  if (horizontalOnly) return `padding 좌우 ${p[3] === p[1] ? px(p[1]) : `${px(p[3])} ${px(p[1])}`}`
  if (p[0] === p[1] && p[1] === p[2] && p[2] === p[3]) return `padding ${px(p[0])}`
  if (p[0] === p[2] && p[1] === p[3]) return `padding ${px(p[0])} ${px(p[1])}`
  return `padding ${p.map(px).join(' ')}`
}

/** StyleRules.format — 이슈의 expected_value / actual_value 문자열 */
export function format(fact, v, fixedHeight = false) {
  switch (fact) {
    case 'color':
      return `글자 ${v}`
    case 'background':
      return `배경 ${v}`
    case 'border':
      return `테두리 ${v}`
    case 'font_weight':
      return String(Math.round(v))
    case 'font_size':
      return px(v)
    case 'radius':
      return v === 'full' || v >= 100 ? 'full' : px(v)
    case 'gap':
      return `gap ${px(v)}`
    case 'padding':
      return paddingText(v, fixedHeight)
    case 'text':
      return v
    default:
      throw new Error(`알 수 없는 fact: ${fact}`)
  }
}
