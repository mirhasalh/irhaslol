import hljs from 'highlight.js/lib/core'
import html from 'highlight.js/lib/languages/xml'
import plaintext from 'highlight.js/lib/languages/plaintext'
import powershell from 'highlight.js/lib/languages/powershell'
import yaml from 'highlight.js/lib/languages/yaml'
import json from 'highlight.js/lib/languages/json'
import bash from 'highlight.js/lib/languages/bash'
import dart from 'highlight.js/lib/languages/dart'
import css from 'highlight.js/lib/languages/css'
import scss from 'highlight.js/lib/languages/scss'
import javascript from 'highlight.js/lib/languages/javascript'
import typescript from 'highlight.js/lib/languages/typescript'
// NOTE: Use HTML, XML for svelte while 'highlight.svelte' is troublesome.
// import svelte from 'highlight.svelte'

export class PostPageState {
  registerLanguages = () => {
    hljs.registerLanguage('html', html)
    hljs.registerLanguage('plaintext', plaintext)
    hljs.registerLanguage('powershell', powershell)
    hljs.registerLanguage('yaml', yaml)
    hljs.registerLanguage('json', json)
    hljs.registerLanguage('bash', bash)
    hljs.registerLanguage('dart', dart)
    hljs.registerLanguage('css', css)
    hljs.registerLanguage('sass', scss)
    hljs.registerLanguage('javascript', javascript)
    hljs.registerLanguage('typescript', typescript)
    // hljs.registerLanguage('svelte', svelte)
  }

  highlightElement = (htmlElement: HTMLElement) => {
    htmlElement.querySelectorAll('pre code:not(.hljs)').forEach((block) => hljs.highlightElement(block as HTMLElement))
  }

  setCodeStyle = (htmlElement: HTMLElement) => {
    const codeStyle = ['badge', 'badge-soft', 'badge-secondary', 'badge-sm', 'whitespace-nowrap']

    htmlElement.querySelectorAll('p > code').forEach((codeEl) => {
      codeEl.classList.add(...codeStyle)
    })
  }

  setLinkStyle = (htmlElement: HTMLElement) => {
    const linkStyle = ['link', 'link-primary', 'link-hover']

    htmlElement.querySelectorAll('p > a').forEach((linkEl) => {
      linkEl.classList.add(...linkStyle)
    })
  }

  setBlockquoteStyle = (htmlElement: HTMLElement) => {
    const linkStyle = ['blockquote']

    htmlElement.querySelectorAll('blockquote').forEach((blockquoteEl) => {
      blockquoteEl.classList.add(...linkStyle)
    })
  }

  setTableStyle = (htmlElement: HTMLElement) => {
    const tableStyle = ['table', 'table-zebra']

    htmlElement.querySelectorAll('table').forEach((tableEl) => {
      tableEl.classList.add(...tableStyle)
    })
  }

  setTableHeaderStyle = (htmlElement: HTMLElement) => {
    const tableHeadStyle = ['bg-base-300']

    htmlElement.querySelectorAll('thead').forEach((tableHeadEl) => {
      tableHeadEl.classList.add(...tableHeadStyle)
    })
  }

  setUnorderedListStyle = (htmlElement: HTMLElement) => {
    const ulStyle = ['list', 'list-disc', 'pl-6']

    htmlElement.querySelectorAll('ul').forEach((ulEl) => {
      ulEl.classList.add(...ulStyle)
    })
  }

  setOrderedListStyle = (htmlElement: HTMLElement) => {
    const olStyle = ['list', 'list-decimal', 'pl-6']

    htmlElement.querySelectorAll('ol').forEach((ulEl) => {
      ulEl.classList.add(...olStyle)
    })
  }

  onHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      if (typeof element.focus === "function") {
        element.focus();
      }

      element.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      console.warn(`Element with id "${id}" not found.`)
    }
  }

  getHeadings = (htmlElement: HTMLElement): string[] => {
    const headings: string[] = []
    htmlElement.querySelectorAll('h2').forEach((headingEl) => {
      const id = headingEl.getAttribute('id')
      if (id) headings.push(id)
    })
    return headings
  }
}
