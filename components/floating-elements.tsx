"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Tag, Clock, X } from "lucide-react"

export default function FloatingElements() {
  const [showBadge, setShowBadge] = useState(false)
  const [showBanner, setShowBanner] = useState(true)
  const badgeRef = useRef<HTMLDivElement>(null)
  const [countdown, setCountdown] = useState({
    hours: 2,
    minutes: 34,
    seconds: 59,
  })

  useEffect(() => {
    const timer = setTimeout(() => setShowBadge(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!showBadge || !badgeRef.current) return

    const animate = async () => {
      const gsapModule = await import("gsap")
      const gsap = gsapModule.default
      gsap.fromTo(
        badgeRef.current,
        { opacity: 0, x: 60, scale: 0.8 },
        { opacity: 1, x: 0, scale: 1, duration: 0.6, ease: "back.out(1.4)" }
      )
    }
    animate()
  }, [showBadge])

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((prev) => {
        let { hours, minutes, seconds } = prev
        seconds--
        if (seconds < 0) {
          seconds = 59
          minutes--
        }
        if (minutes < 0) {
          minutes = 59
          hours--
        }
        if (hours < 0) {
          hours = 2
          minutes = 34
          seconds = 59
        }
        return { hours, minutes, seconds }
      })
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const pad = (n: number) => n.toString().padStart(2, "0")

  return (
    <>
      {showBanner && (
        <div className="fixed top-0 left-0 right-0 z-[60] bg-secondary text-secondary-foreground">
          <div className="mx-auto max-w-7xl px-4 py-2.5 flex items-center justify-center gap-4">
            <div className="flex items-center gap-3 text-sm font-semibold">
              <Tag className="w-4 h-4" />
              <span>10% OFF no primeiro banho</span>
              <span className="hidden sm:inline text-secondary-foreground/70">|</span>
              <span className="hidden sm:flex items-center gap-1.5 text-secondary-foreground/80">
                <Clock className="w-3.5 h-3.5" />
                Expira em {pad(countdown.hours)}:{pad(countdown.minutes)}:
                {pad(countdown.seconds)}
              </span>
            </div>
            <button
              onClick={() => setShowBanner(false)}
              className="ml-2 flex h-6 w-6 items-center justify-center rounded text-secondary-foreground/60 hover:text-secondary-foreground transition-colors"
              aria-label="Fechar banner promocional"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {showBadge && (
        <div
          ref={badgeRef}
          className="fixed bottom-6 right-6 z-50"
          style={{ opacity: 0 }}
        >
          <Link
            href="#agendamento"
            className="group flex items-center gap-3 rounded-2xl bg-card border border-border px-5 py-3.5 shadow-2xl transition-all duration-300 hover:shadow-3xl hover:-translate-y-1"
          >
            <div className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-destructive opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-destructive" />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground">
                Últimos horários hoje
              </p>
              <p className="text-xs text-muted-foreground">
                3 vagas restantes
              </p>
            </div>
          </Link>
        </div>
      )}
    </>
  )
}
