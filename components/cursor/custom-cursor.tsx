'use client'

import { useEffect, useRef } from 'react'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], input, textarea, select, summary, [data-cursor="interactive"]'
const TEXT_SELECTOR = 'p, h1, h2, h3, h4, h5, h6, span, li, label'

/**
 * CustomCursor — a reactbits-style dot-and-ring cursor that replaces the
 * native pointer on fine-pointer (mouse/trackpad) devices. The ring trails
 * the dot with a lerp for a soft, weighted feel, and both grow on hover
 * over interactive elements. Falls back to the native cursor entirely on
 * touch devices and when the user prefers reduced motion.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    if (prefersReducedMotion) return
    if (!window.matchMedia('(pointer: fine)').matches) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    document.documentElement.classList.add('has-custom-cursor')

    const pointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const ringPos = { x: pointer.x, y: pointer.y }
    let raf = 0
    let visible = false

    function show() {
      if (visible) return
      visible = true
      dot!.style.opacity = '1'
      ring!.style.opacity = '1'
    }

    function hide() {
      visible = false
      dot!.style.opacity = '0'
      ring!.style.opacity = '0'
    }

    function onPointerMove(e: PointerEvent) {
      pointer.x = e.clientX
      pointer.y = e.clientY
      show()

      const target = e.target as Element | null
      const isInteractive = !!target?.closest(INTERACTIVE_SELECTOR)
      const isText = !isInteractive && !!target?.closest(TEXT_SELECTOR)
      ring!.dataset.state = isInteractive ? 'interactive' : isText ? 'text' : 'default'
    }

    function onPointerLeave() {
      hide()
    }

    function onPointerDown() {
      ring!.dataset.pressed = 'true'
    }

    function onPointerUp() {
      ring!.dataset.pressed = 'false'
    }

    const loop = () => {
      // Dot tracks the pointer exactly; the ring eases toward it so it
      // reads as a weighted trail rather than a rigid duplicate.
      dot!.style.transform = `translate3d(${pointer.x}px, ${pointer.y}px, 0)`

      ringPos.x += (pointer.x - ringPos.x) * 0.18
      ringPos.y += (pointer.y - ringPos.y) * 0.18
      ring!.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0)`

      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })
    document.addEventListener('pointerleave', onPointerLeave)
    window.addEventListener('pointerdown', onPointerDown)
    window.addEventListener('pointerup', onPointerUp)
    raf = requestAnimationFrame(loop)

    return () => {
      document.documentElement.classList.remove('has-custom-cursor')
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onPointerMove)
      document.removeEventListener('pointerleave', onPointerLeave)
      window.removeEventListener('pointerdown', onPointerDown)
      window.removeEventListener('pointerup', onPointerUp)
    }
  }, [prefersReducedMotion])

  if (prefersReducedMotion) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-[999] hidden [.has-custom-cursor_&]:block" aria-hidden="true">
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" data-state="default" data-pressed="false" />
    </div>
  )
}
