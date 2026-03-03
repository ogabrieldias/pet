"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Scissors, Stethoscope, Syringe, ShoppingBag } from "lucide-react"

const services = [
  {
    icon: Scissors,
    title: "Banho & Tosa",
    description:
      "Tratamentos completos com produtos premium, secagem adequada e tosa personalizada para cada raça.",
    image: "/images/bath-dog.jpg",
    cta: "Agendar Banho",
  },
  {
    icon: Stethoscope,
    title: "Consulta Veterinária",
    description:
      "Equipe de veterinários especializados prontos para cuidar da saúde do seu pet com carinho.",
    image: "/images/vet-care.jpg",
    cta: "Agendar Consulta",
  },
  {
    icon: Syringe,
    title: "Vacinação",
    description:
      "Calendário vacinal completo e atualizado, garantindo proteção total para seu companheiro.",
    image: "/images/vaccination.jpg",
    cta: "Agendar Vacina",
  },
  {
    icon: ShoppingBag,
    title: "Loja Premium",
    description:
      "Rações super premium, brinquedos, acessórios e tudo que seu pet precisa em um só lugar.",
    image: "/images/pet-products.jpg",
    cta: "Ver Produtos",
  },
]

export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    let ctx: ReturnType<typeof import("gsap").default.context> | undefined

    const initGSAP = async () => {
      const gsapModule = await import("gsap")
      const { ScrollTrigger } = await import("gsap/ScrollTrigger")
      const gsap = gsapModule.default
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        gsap.fromTo(
          ".service-header",
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
          ".service-card",
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".services-grid",
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
    <section ref={sectionRef} id="servicos" className="py-24 bg-card">
      <div className="mx-auto max-w-7xl px-4">
        <div className="service-header text-center mb-16" style={{ opacity: 0 }}>
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4 py-2 mb-6">
            <Stethoscope className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">
              Nossos Serviços
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-black text-foreground text-balance">
            Tudo que seu pet precisa,{" "}
            <span className="text-primary">em um só lugar</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Oferecemos serviços completos de saúde, beleza e bem-estar para o
            seu companheiro, com profissionais qualificados e muito amor.
          </p>
        </div>

        <div className="services-grid grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <div
                key={service.title}
                className="service-card group rounded-2xl border border-border bg-background overflow-hidden transition-all duration-500 hover:shadow-xl hover:border-primary/30 hover:-translate-y-2"
                style={{ opacity: 0 }}
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-card/90 backdrop-blur-sm text-primary shadow-lg">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {service.description}
                  </p>
                  <Link
                    href="#agendamento"
                    className="group/btn inline-flex items-center gap-1.5 text-sm font-bold text-primary transition-colors hover:text-primary/80"
                  >
                    {service.cta}
                    <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </Link>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
