"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Shield } from "lucide-react"

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let ctx: ReturnType<typeof import("gsap").default.context> | undefined
    const initGSAP = async () => {
      const gsapModule = await import("gsap")
      const gsap = gsapModule.default

      ctx = gsap.context(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

        tl.fromTo(
          headlineRef.current,
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, duration: 1 }
        )
          .fromTo(
            subRef.current,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.8 },
            "-=0.5"
          )
          .fromTo(
            ctaRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.7 },
            "-=0.4"
          )
          .fromTo(
            imageRef.current,
            { opacity: 0, scale: 0.95 },
            { opacity: 1, scale: 1, duration: 1 },
            "-=0.6"
          )
      }, sectionRef)
    }

    initGSAP()
    return () => ctx?.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="inicio"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a3a5c] via-[#1e4d6b] to-[#0f2b3d]" />

      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-32 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/20 border border-primary/30 px-4 py-2 w-fit">
              <Shield className="w-4 h-4 text-secondary" />
              <span className="text-sm font-semibold text-secondary">
                Cuidado Premium para seu Pet
              </span>
            </div>

            <h1
              ref={headlineRef}
              className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight text-card text-balance"
              style={{ opacity: 0 }}
            >
              Seu melhor amigo merece o{" "}
              <span className="text-secondary">melhor cuidado.</span>
            </h1>

            <p
              ref={subRef}
              className="text-lg text-card/80 max-w-lg leading-relaxed"
              style={{ opacity: 0 }}
            >
              Mais de <strong className="text-secondary">78% dos pets</strong>{" "}
              desenvolvem problemas de saúde por falta de acompanhamento
              preventivo. Na PetVida, cuidamos de quem você mais ama.
            </p>

            <div
              ref={ctaRef}
              className="flex flex-col sm:flex-row gap-4 mt-2"
              style={{ opacity: 0 }}
            >
              <Link
                href="#agendamento"
                className="group inline-flex items-center justify-center gap-2 rounded-2xl bg-primary px-8 py-4 text-base font-bold text-primary-foreground shadow-xl shadow-primary/30 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/40 hover:-translate-y-1 active:translate-y-0"
              >
                Agendar Agora
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="#servicos"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border-2 border-card/30 px-8 py-4 text-base font-bold text-card transition-all duration-300 hover:bg-card/10 hover:border-card/50"
              >
                Conhecer Servicos
              </Link>
            </div>

            <div className="flex items-center gap-6 mt-4">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-card bg-muted flex items-center justify-center text-xs font-bold text-muted-foreground"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <svg key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-card/70 mt-0.5">
                  <strong className="text-card">4.9/5</strong> - 1.200+ avaliações
                </p>
              </div>
            </div>
          </div>

          <div
            ref={imageRef}
            className="relative hidden lg:block"
            style={{ opacity: 0 }}
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/images/hero-dog.jpg"
                alt="Cachorro feliz sendo cuidado na PetVida"
                width={600}
                height={700}
                className="object-cover w-full h-[600px]"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a3a5c]/30 to-transparent" />
            </div>

            <div className="absolute -bottom-6 -left-6 bg-card rounded-2xl p-4 shadow-xl flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center">
                <Shield className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <p className="font-bold text-card-foreground text-sm">Certificado</p>
                <p className="text-xs text-muted-foreground">CRMV Ativo</p>
              </div>
            </div>

            <div className="absolute -top-4 -right-4 bg-card rounded-2xl p-4 shadow-xl">
              <p className="text-2xl font-black text-primary">15+</p>
              <p className="text-xs text-muted-foreground font-semibold">Anos de experiencia</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
