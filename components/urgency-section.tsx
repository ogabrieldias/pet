"use client"

import { useEffect, useRef } from "react"
import { ArrowRight, AlertCircle } from "lucide-react"

export default function UrgencySection() {
  const sectionRef = useRef<HTMLElement>(null)
  const btnRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    let ctx: ReturnType<typeof import("gsap").default.context> | undefined

    const initGSAP = async () => {
      const gsapModule = await import("gsap")
      const { ScrollTrigger } = await import("gsap/ScrollTrigger")
      const { ScrollToPlugin } = await import("gsap/ScrollToPlugin")

      const gsap = gsapModule.default

      gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)

      ctx = gsap.context(() => {
        // Fade in da seção
        gsap.fromTo(
          ".urgency-content",
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 80%",
              once: true,
            },
          }
        )

        // Pulsação elegante do botão
        if (btnRef.current) {
          gsap.to(btnRef.current, {
            scale: 1.05,
            duration: 0.8,
            ease: "power2.inOut",
            repeat: -1,
            yoyo: true,
            scrollTrigger: {
              trigger: btnRef.current,
              start: "top 90%",
            },
          })
        }
      }, sectionRef)
    }

    initGSAP()
    return () => ctx?.revert()
  }, [])

  // 🔥 Scroll GSAP profissional
  const handleScrollToBooking = async () => {
    const gsapModule = await import("gsap")
    const { ScrollToPlugin } = await import("gsap/ScrollToPlugin")
    const gsap = gsapModule.default

    gsap.registerPlugin(ScrollToPlugin)

    gsap.to(window, {
      duration: 1.2,
      scrollTo: {
        y: "#agendamento",
        offsetY: 80, // ajuste se tiver header fixo
      },
      ease: "power3.inOut",
    })
  }

  return (
    <section
      ref={sectionRef}
      className="relative py-24 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a3a5c] via-[#1e4d6b] to-[#0f2b3d]" />
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center">
        <div className="urgency-content" style={{ opacity: 0 }}>
          <div className="inline-flex items-center gap-2 rounded-full bg-destructive/20 border border-destructive/30 px-4 py-2 mb-8">
            <AlertCircle className="w-4 h-4 text-red-300" />
            <span className="text-sm font-semibold text-red-200">
              Não deixe para depois
            </span>
          </div>

          <h2 className="text-3xl lg:text-5xl font-black text-card leading-tight text-balance mb-6">
            Não espere seu pet precisar de{" "}
            <span className="text-secondary">emergência.</span>
          </h2>

          <p className="text-lg text-card/80 max-w-xl mx-auto leading-relaxed mb-10">
            Agende hoje e garanta mais saúde e felicidade para quem te ama
            incondicionalmente. A prevenção é o melhor presente que você pode
            dar.
          </p>

          <button
            ref={btnRef}
            onClick={handleScrollToBooking}
            className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-secondary px-10 py-5 text-lg font-bold text-secondary-foreground shadow-xl shadow-secondary/30 transition-all duration-300 hover:shadow-2xl hover:shadow-secondary/40"
          >
            Agendar Agora
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </button>

          <p className="mt-6 text-sm text-card/50">
            Atendimento de segunda a sábado, das 8h às 18h
          </p>
        </div>
      </div>
    </section>
  )
}