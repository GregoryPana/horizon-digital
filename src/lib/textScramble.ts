type QueueItem = {
  from: string
  to: string
  start: number
  end: number
  char?: string
}

export class TextScramble {
  private readonly el: HTMLElement

  private readonly chars = '!<>-_\\/[]{}-=+*^?#'

  private queue: QueueItem[] = []

  private frame = 0

  private rafId = 0

  private resolve: (() => void) | null = null

  constructor(el: HTMLElement) {
    this.el = el
    this.update = this.update.bind(this)
  }

  setText(newText: string): Promise<void> {
    const oldText = this.el.innerText
    const length = Math.max(oldText.length, newText.length)

    const promise = new Promise<void>((resolve) => {
      this.resolve = resolve
    })

    this.queue = Array.from({ length }, (_, index) => ({
      from: oldText[index] ?? '',
      to: newText[index] ?? '',
      start: Math.floor(Math.random() * 18),
      end: Math.floor(Math.random() * 18) + Math.floor(Math.random() * 18),
    }))

    cancelAnimationFrame(this.rafId)
    this.frame = 0
    this.update()

    return promise
  }

  private update(): void {
    let output = ''
    let complete = 0

    for (const item of this.queue) {
      if (this.frame >= item.end) {
        complete += 1
        output += item.to
      } else if (this.frame >= item.start) {
        if (!item.char || Math.random() < 0.28) {
          item.char = this.chars[Math.floor(Math.random() * this.chars.length)]
        }

        output += `<span style="color:var(--mut2)">${item.char}</span>`
      } else {
        output += item.from
      }
    }

    this.el.innerHTML = output

    if (complete === this.queue.length) {
      this.resolve?.()
      this.resolve = null
      return
    }

    this.rafId = requestAnimationFrame(this.update)
    this.frame += 1
  }
}
