"use client"

import { useEffect, useRef } from "react"
import { Users, PawPrint, Award, Star } from "lucide-react"

const stats = [
  {
    icon: Users,
    value: 98,
    suffix: "%",
    label: "Clientes satisfeitos",
  },
  {
    icon: PawPrint,
    value: 1200,
    suffix: "+",
    label: "Pets atendidos",
  },
  {
    icon: Award,
    value: 15,
    suffix: " anos",
    label: "De experiencia",
  },
  {
    icon: Star,
    value: 4.9,
    suffix: "",
    label: "Avaliacao media",
    isDecimal: true,
  },
]

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const countersRef = useRef<(HTMLSpanElement | null)[]>([])

  useEffect(() => {
    let ctx: ReturnType<typeof import("gsap").default.context> | undefined

    const initGSAP = async () => {
      const gsapModule = await import("gsap")
      const { ScrollTrigger } = await import("gsap/ScrollTrigger")
      const gsap = gsapModule.default
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        stats.forEach((stat, index) => {
          const el = countersRef.current[index]
          if (!el) return

          const target = { val: 0 }

          gsap.to(target, {
            val: stat.value,
            duration: 2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              once: true,
            },
            onUpdate: () => {
              if (stat.isDecimal) {
                el.textContent = target.val.toFixed(1)
              } else {
                el.textContent = Math.round(target.val).toLocaleString("pt-BR")
              }
            },
          })
        })

        gsap.fromTo(
          ".stat-card",
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              once: true,
            },
          }
        )
      }, sectionRef)
    }

    initGSAP()
    return () => ctx?.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-20 bg-card">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div
                key={stat.label}
                className="stat-card group rounded-2xl border border-border bg-background p-6 text-center transition-all duration-300 hover:shadow-lg hover:border-primary/30 hover:-translate-y-1"
                style={{ opacity: 0 }}
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-7 w-7" />
                </div>
                <div className="flex items-baseline justify-center gap-0.5">
                  <span
                    ref={(el) => { countersRef.current[index] = el }}
                    className="text-3xl lg:text-4xl font-black text-foreground"
                  >
                    0
                  </span>
                  <span className="text-xl lg:text-2xl font-bold text-primary">
                    {stat.suffix}
                  </span>
                </div>
                <p className="mt-2 text-sm font-semibold text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
