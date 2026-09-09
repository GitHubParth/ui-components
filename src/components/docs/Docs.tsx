import { useEffect, useMemo, useState } from 'react'
import rawDocs from '../../../COMPONENTS.md?raw'
import { renderMarkdown } from './markdown'

export function Docs() {
  const [activeHeading, setActiveHeading] = useState<string>('')
  const html = useMemo(() => renderMarkdown(rawDocs), [])

  useEffect(() => {
    const headings = document.querySelectorAll('[data-docs-content] h2, [data-docs-content] h3')
    if (headings.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHeading(entry.target.id)
          }
        })
      },
      { rootMargin: '-10% 0px -80% 0px' }
    )

    headings.forEach((h) => observer.observe(h))
    return () => observer.disconnect()
  }, [html])

  const tocItems = useMemo(() => {
    const container = document.createElement('div')
    container.innerHTML = html
    return Array.from(container.querySelectorAll('h2')).map((h) => ({
      id: h.id,
      text: h.textContent || '',
    }))
  }, [html])

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-8 items-start">
      {/* Sticky table of contents */}
      <nav className="hidden lg:block sticky top-24 self-start max-h-[calc(100vh-7rem)] overflow-y-auto pr-2 border-r border-slate-800">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">On this page</p>
        <ul className="space-y-1">
          {tocItems.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`block text-xs py-1.5 px-2.5 rounded-lg transition-colors truncate ${
                  activeHeading === item.id
                    ? 'bg-blue-600/15 text-blue-400 font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Rendered markdown */}
      <div
        data-docs-content
        className="docs-prose bg-slate-900/80 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm min-w-0"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
}
