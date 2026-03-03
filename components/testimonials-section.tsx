"use client"

import { useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

const testimonials = [
  {
    name: "Marina Oliveira",
    pet: "Tutora do Thor",
    text: "Meu cachorro nunca foi tão bem tratado. O atendimento é incrível e ele sempre volta super feliz! Recomendo a todos.",
    rating: 5,
    initials: "MO",
  },
  {
    name: "Carlos Eduardo",
    pet: "Tutor da Luna",
    text: "A equipe veterinária da PetVida é excepcional. Descobriram um problema na minha Luna que outro veterinário não viu. Sou eternamente grato!",
    rating: 5,
    initials: "CE",
  },
  {
    name: "Patricia Santos",
    pet: "Tutora do Simba",
    text: "Desde que comecei a levar o Simba na PetVida, a saúde dele melhorou muito. O banho e tosa deixa ele lindo e cheiroso por dias!",
    rating: 5,
    initials: "PS",
  },
  {
    name: "Roberto Almeida",
    pet: "Tutor do Rex e da Mel",
    text: "Atendo meus dois pets na PetVida ha 3 anos. Confiança total na equipe. Os preços são justos pela qualidade que oferecem.",
    rating: 5,
    initials: "RA",
  },
  {
    name: "Fernanda Lima",
    pet: "Tutora da Pipoca",
    text: "A Pipoca tinha muito medo de veterinário, mas na PetVida ela ficou super tranquila. O ambiente é acolhedor e a equipe tem muita paciência.",
    rating: 5,
    initials: "FL",
  },
]

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [current, setCurrent] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const next = () => setCurrent((p) => (p + 1) % testimonials.length)
  const prev = () => setCurrent((p) => (p - 1 + testimonials.length) % testimonials.length)

  useEffect(() => {
    if (!isAutoPlaying) return
    const interval = setInterval(next, 5000)
    return () => clearInterval(interval)
  }, [isAutoPlaying])

  useEffect(() => {
    let ctx: ReturnType<typeof import("gsap").default.context> | undefined

    const initGSAP = async () => {
      const gsapModule = await import("gsap")
      const { ScrollTrigger } = await import("gsap/ScrollTrigger")
      const gsap = gsapModule.default
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        gsap.fromTo(
          ".testimonial-header",
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
        gsap.fromTo(
          ".testimonial-card-wrapper",
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".testimonial-card-wrapper",
              start: "top 85%",
              once: true,
            },
          }
        )
      }, sectionRef)
    }

    initGSAP()
    return () => ctx?.revert()
  }, [])

  const t = testimonials[current]

  return (
    <section ref={sectionRef} id="depoimentos" className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4">
        <div className="testimonial-header text-center mb-16" style={{ opacity: 0 }}>
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4 py-2 mb-6">
            <Quote className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">
              Depoimentos
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-black text-foreground text-balance">
            O que nossos clientes{" "}
            <span className="text-primary">dizem sobre nós</span>
          </h2>
        </div>

        <div
          className="testimonial-card-wrapper mx-auto max-w-3xl"
          style={{ opacity: 0 }}
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div className="relative rounded-3xl border border-border bg-card p-8 lg:p-12 shadow-lg">
            <Quote className="absolute top-6 right-6 w-12 h-12 text-primary/10" />

            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-lg font-bold text-primary">
                {t.initials}
              </div>
              <div>
                <p className="font-bold text-foreground">{t.name}</p>
                <p className="text-sm text-muted-foreground">{t.pet}</p>
              </div>
            </div>

            <p className="text-lg text-foreground/90 leading-relaxed mb-6 min-h-[80px]">
              &ldquo;{t.text}&rdquo;
            </p>

            <div className="flex items-center gap-1">
              {Array.from({ length: t.rating }).map((_, i) => (
                <svg key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>

            <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
              <div className="flex items-center gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      i === current
                        ? "w-8 bg-primary"
                        : "w-2.5 bg-border hover:bg-primary/40"
                    }`}
                    aria-label={`Ver depoimento ${i + 1}`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={prev}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background text-foreground transition-all hover:bg-muted hover:border-primary/30"
                  aria-label="Depoimento anterior"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={next}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-background text-foreground transition-all hover:bg-muted hover:border-primary/30"
                  aria-label="Proximo depoimento"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
