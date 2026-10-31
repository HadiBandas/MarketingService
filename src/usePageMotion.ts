import { useEffect, useRef, useState } from "react"

export function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "instant"
      : "smooth",
  })
}

export function usePageMotion() {
  const pageRef = useRef<HTMLElement>(null)
  const [activeSection, setActiveSection] = useState("top")

  useEffect(() => {
    const page = pageRef.current
    if (!page) return

    const hero = page.querySelector<HTMLElement>("#top")
    const sections = Array.from(
      page.querySelectorAll<HTMLElement>("section[id]"),
    )
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)")
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)")
    let frame = 0
    let pointerFrame = 0

    const updateScroll = () => {
      const range = document.documentElement.scrollHeight - window.innerHeight
      const progress =
        range > 0 ? Math.min(1, Math.max(0, window.scrollY / range)) : 0
      page.style.setProperty("--reading-progress", String(progress))
      let current = "top"
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= window.innerHeight * 0.35) {
          current = section.id
        }
      }
      setActiveSection(current)
      frame = 0
    }

    const scheduleScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(updateScroll)
    }

    const moveGlow = (event: PointerEvent) => {
      if (!hero || reducedMotion.matches || !finePointer.matches) return
      const bounds = hero.getBoundingClientRect()
      const x = (event.clientX - bounds.left) / bounds.width - 0.5
      const y = (event.clientY - bounds.top) / bounds.height - 0.5
      window.cancelAnimationFrame(pointerFrame)
      pointerFrame = window.requestAnimationFrame(() => {
        hero.style.setProperty("--glow-x", `${x * 70}px`)
        hero.style.setProperty("--glow-y", `${y * 50}px`)
      })
    }

    const resetGlow = () => {
      window.cancelAnimationFrame(pointerFrame)
      hero?.style.removeProperty("--glow-x")
      hero?.style.removeProperty("--glow-y")
    }

    // Reveal once; keep the sticky layouts and interactive forms outside transforms.
    const revealTargets = Array.from(
      page.querySelectorAll<HTMLElement>(
        "#content > section:not(#top) .section-title, #proof article, #process h3, #about blockquote",
      ),
    )
    const observer =
      "IntersectionObserver" in window
        ? new IntersectionObserver(
            (entries) => {
              for (const entry of entries) {
                if (!entry.isIntersecting) continue
                entry.target.setAttribute("data-visible", "true")
                observer?.unobserve(entry.target)
              }
            },
            { threshold: 0.12 },
          )
        : null

    for (const target of revealTargets) {
      if (observer && !reducedMotion.matches) {
        target.dataset.reveal = ""
        observer.observe(target)
      }
    }

    const handleMotionChange = () => {
      resetGlow()
      if (reducedMotion.matches) {
        for (const target of revealTargets) target.dataset.visible = "true"
        observer?.disconnect()
      }
    }

    updateScroll()
    window.addEventListener("scroll", scheduleScroll, { passive: true })
    window.addEventListener("resize", scheduleScroll)
    hero?.addEventListener("pointermove", moveGlow)
    hero?.addEventListener("pointerleave", resetGlow)
    reducedMotion.addEventListener("change", handleMotionChange)

    return () => {
      observer?.disconnect()
      window.cancelAnimationFrame(frame)
      window.cancelAnimationFrame(pointerFrame)
      window.removeEventListener("scroll", scheduleScroll)
      window.removeEventListener("resize", scheduleScroll)
      hero?.removeEventListener("pointermove", moveGlow)
      hero?.removeEventListener("pointerleave", resetGlow)
      reducedMotion.removeEventListener("change", handleMotionChange)
      for (const target of revealTargets) {
        target.removeAttribute("data-reveal")
        target.removeAttribute("data-visible")
      }
    }
  }, [])

  return { pageRef, activeSection }
}
