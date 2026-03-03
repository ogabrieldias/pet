"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import { Check, AlertTriangle, Heart } from "lucide-react"

const careData = [
  {
    icon: AlertTriangle,
    stat: "67%",
    text: "dos cães acima de 3 anos tem problemas dentários não diagnosticados",
    color: "text-destructive",
    bgColor: "bg-destructive/10",
  },
  {
    icon: AlertTriangle,
    stat: "45%",
    text: "dos pets sofrem com obesidade, reduzindo sua expectativa de vida",
    color: "text-amber-600",
    bgColor: "bg-amber-100",
  },
  {
    icon: Check,
    stat: "60%",
    text: "de redução no risco de doenças graves com checkups regulares",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
]

export default function PetCareSection() {
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
          ".care-text",
          { opacity: 0, x: -50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              once: true,
            },
          }
        )

        gsap.fromTo(
          ".care-image",
          { opacity: 0, x: 50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              once: true,
            },
          }
        )

        gsap.fromTo(
          ".care-stat",
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".care-stats-list",
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
    <section ref={sectionRef} id="sobre" className="py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="care-text" style={{ opacity: 0 }}>
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4 py-2 mb-6">
              <Heart className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary">
                Por que cuidar importa?
              </span>
            </div>

            <h2 className="text-3xl lg:text-4xl font-black text-foreground leading-tight text-balance mb-4">
              A saúde do seu pet{" "}
              <span className="text-primary">começa com prevenção</span>
            </h2>

            <p className="text-muted-foreground leading-relaxed mb-8 max-w-lg">
              A maioria dos problemas de saúde em pets podem ser evitados com
              acompanhamento regular. Na PetVida, acreditamos que prevenir é a
              melhor forma de amar.
            </p>

            <div className="care-stats-list flex flex-col gap-4">
              {careData.map((item) => {
                const Icon = item.icon
                return (
                  <div
                    key={item.stat}
                    className="care-stat flex items-start gap-4 rounded-2xl border border-border bg-card p-5 transition-all duration-300 hover:shadow-md hover:border-primary/20"
                    style={{ opacity: 0 }}
                  >
                    <div
                      className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${item.bgColor}`}
                    >
                      <Icon className={`h-6 w-6 ${item.color}`} />
                    </div>
                    <div>
                      <span className={`text-2xl font-black ${item.color}`}>
                        {item.stat}
                      </span>
                      <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div
            className="care-image relative"
            style={{ opacity: 0 }}
          >
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/images/vet-care.jpg"
                alt="Veterinario examinando um filhote na PetVida"
                width={600}
                height={700}
                className="object-cover w-full h-[500px] lg:h-[600px]"
              />
            </div>
            <div className="absolute -bottom-6 -right-6 hidden lg:block">
              <div className="bg-card rounded-2xl p-5 shadow-xl border border-border">
                <p className="text-3xl font-black text-primary">98%</p>
                <p className="text-sm text-muted-foreground font-semibold">
                  Taxa de satisfação
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
