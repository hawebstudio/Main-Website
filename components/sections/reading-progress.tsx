'use client'

import { useEffect, useState } from 'react'

export function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollableDistance = documentHeight - windowHeight

      if (scrollableDistance <= 0) {
        setProgress(0)
      } else {
        setProgress((scrollPosition / scrollableDistance) * 100)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    // Initial calculation
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className="fixed top-0 left-0 w-full h-1 z-50 bg-transparent">
      <div 
        className="h-full bg-primary transition-all duration-150 ease-out" 
        style={{ width: `${progress}%` }} 
      />
    </div>
  )
}
