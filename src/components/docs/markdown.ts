import { marked, type Tokens } from 'marked'

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\- ]/g, '')
    .trim()
    .replace(/ /g, '-')
}

export function renderMarkdown(source: string): string {
  const usedSlugs = new Map<string, number>()
  const renderer = new marked.Renderer()

  renderer.heading = ({ tokens, depth, text: plain }: Tokens.Heading) => {
    const text = renderer.parser.parseInline(tokens)
    let slug = slugify(plain)
    const count = usedSlugs.get(slug) ?? 0
    usedSlugs.set(slug, count + 1)
    if (count > 0) slug = `${slug}-${count}`
    return `<h${depth} id="${slug}">${text}</h${depth}>`
  }

  return marked.parse(source, { renderer, gfm: true, async: false }) as string
}
