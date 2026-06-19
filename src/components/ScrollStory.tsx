import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(SplitText)

const TAB_CONTENT = [
  {
    id: "teams",
    label: "From Remote Villages",
    text: "From the remote villages of rural India to bustling urban slums, our dedicated team works tirelessly to bring education, healthcare, and livelihood opportunities to those who need them most."
  },
  {
    id: "founders",
    label: "Access Creates Change",
    text: "We believe true empowerment begins with access – to classrooms, clean water, and healthcare. We create a ripple effect that lifts entire communities."
  },
  {
    id: "designers",
    label: "Environmental Impact",
    text: "Through grassroots awareness and direct action, we plant trees, clean waterways, and teach the next generation to be stewards of the earth."
  },
  {
    id: "engineers",
    label: "Building Resilience",
    text: "We don't just build infrastructure; we build resilience. By training community members, we ensure every initiative is sustainable long after we leave."
  }
]

const DURATION = 0.4
const STAGGER = 0.06
const OVERLAP = "<0.24"
const Y_OFFSET = 150

export default function ScrollStory() {
  const tabsRef = useRef<HTMLDivElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const activeIndexRef = useRef(0)
  const isAnimatingRef = useRef(false)
  const queuedIndexRef = useRef<number | null>(null)
  const tlRef = useRef<gsap.core.Timeline | null>(null)
  const splitsRef = useRef<any[]>([])

  useEffect(() => {
    if (!tabsRef.current || !wrapperRef.current) return

    const tabsEl = tabsRef.current
    const wrapper = wrapperRef.current

    // Create buttons and panels
    TAB_CONTENT.forEach((item, i) => {
      const btn = document.createElement("button")
      btn.className = "tab" + (i === 0 ? " active" : "")
      btn.textContent = item.label
      tabsEl.appendChild(btn)

      const panel = document.createElement("div")
      panel.className = "role-content"
      panel.textContent = item.text
      wrapper.appendChild(panel)
    })

    const panels = [...wrapper.querySelectorAll(".role-content")]

    // Create SplitText instances
    const splits = panels.map((el, i) => {
      return SplitText.create(el as HTMLElement, {
        type: "lines",
        mask: "lines",
        linesClass: "himaaax-split-line",
        autoSplit: true,
        onSplit(self: any) {
          gsap.set(el, { opacity: 1 })
          if (i === activeIndexRef.current) {
            gsap.set(self.lines, { yPercent: 0, opacity: 1 })
          } else {
            gsap.set(self.lines, { yPercent: Y_OFFSET, opacity: 1 })
          }
        }
      })
    })

    splitsRef.current = splits

    // Click handlers
    const buttons = tabsEl.querySelectorAll(".tab")
    buttons.forEach((btn, i) => {
      btn.addEventListener("click", () => switchTab(i))
    })

    return () => {
      buttons.forEach((btn, i) => {
        btn.removeEventListener("click", () => switchTab(i))
      })
    }
  }, [])

  function runTransition(nextIndex: number) {
    const currentLines = splitsRef.current[activeIndexRef.current].lines
    const nextLines = splitsRef.current[nextIndex].lines

    gsap.killTweensOf(currentLines)
    gsap.killTweensOf(nextLines)

    gsap.set(currentLines, { yPercent: 0, opacity: 1 })
    gsap.set(nextLines, { yPercent: Y_OFFSET, opacity: 1 })

    tlRef.current?.kill()

    tlRef.current = gsap.timeline({
      onComplete: () => {
        activeIndexRef.current = nextIndex
        isAnimatingRef.current = false

        if (queuedIndexRef.current !== null && queuedIndexRef.current !== activeIndexRef.current) {
          const q = queuedIndexRef.current
          queuedIndexRef.current = null
          switchTab(q)
        }
      }
    })

    tlRef.current.to(currentLines, {
      yPercent: Y_OFFSET,
      duration: DURATION,
      stagger: STAGGER,
      ease: "power1.in"
    })

    tlRef.current.to(nextLines, {
      yPercent: 0,
      duration: DURATION,
      stagger: STAGGER,
      ease: "power1.out"
    }, OVERLAP)
  }

  function switchTab(nextIndex: number) {
    if (nextIndex === activeIndexRef.current) return

    if (isAnimatingRef.current) {
      queuedIndexRef.current = nextIndex
      return
    }

    isAnimatingRef.current = true

    // Update UI immediately
    const buttons = tabsRef.current?.querySelectorAll(".tab")
    buttons?.forEach((b, i) => b.classList.toggle("active", i === nextIndex))

    runTransition(nextIndex)
  }

  return (
    <div className="tabs-demo">
      <div className="tabs" ref={tabsRef}></div>
      <div className="content-wrapper" ref={wrapperRef}></div>
      
      <style>{`
        * {
          box-sizing: border-box;
        }

        .tabs-demo {
          width: 100%;
          max-width: 1020px;
          padding: 0 clamp(2rem, 8vw, 5rem);
          margin: 100px auto;
        }

        .tabs {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-bottom: 32px;
          flex-wrap: wrap;
        }

        .tab {
          border: none;
          padding: 10px 16px;
          border-radius: 999px;
          font-size: 16px;
          font-weight: 500;
          letter-spacing: 0.02em;
          color: #000;
          cursor: pointer;
          background: rgba(0,0,0,0.08);
          transition: all 0.25s cubic-bezier(0.256, 0.009, 0.125, 0.997);
        }

        .tab:hover {
          background: rgba(0,0,0,0.16);
        }

        .tab.active {
          background: #111;
          color: #fff;
        }

        .content-wrapper {
          position: relative;
          display: grid;
          grid-template-columns: 1fr;
        }

        .role-content {
          grid-column: 1;
          grid-row: 1;
          text-align: center;
          font-size: clamp(2rem, 3vw, 3rem);
          font-weight: 600;
          line-height: 1.15;
          letter-spacing: -0.03em;
          color: #000;
        }

        /* SplitText mask */
        .himaaax-split-line {
          overflow: hidden;
          display: block;
        }
      `}</style>
    </div>
  )
}
