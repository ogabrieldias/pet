"use client"

import { useEffect, useRef, useState } from "react"
import { Calendar, Clock, User, Phone, PawPrint, CheckCircle, X } from "lucide-react"
import { z } from "zod"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { db } from "@/lib/firebase"

const bookingSchema = z.object({
  nome: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  telefone: z
    .string()
    .min(10, "Telefone invalido")
    .regex(/^[\d\s()+-]+$/, "Formato de telefone invalido"),
  nomePet: z.string().min(2, "Nome do pet deve ter pelo menos 2 caracteres"),
  servico: z.string().min(1, "Selecione um servico"),
  data: z.string().min(1, "Selecione uma data"),
  horario: z.string().min(1, "Selecione um horario"),
})

type BookingData = z.infer<typeof bookingSchema>

export default function BookingSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  const [formData, setFormData] = useState<BookingData>({
    nome: "",
    telefone: "",
    nomePet: "",
    servico: "",
    data: "",
    horario: "",
  })
  const [errors, setErrors] = useState<Partial<Record<keyof BookingData, string>>>({})
  const [showModal, setShowModal] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    let ctx: ReturnType<typeof import("gsap").default.context> | undefined

    const initGSAP = async () => {
      const gsapModule = await import("gsap")
      const { ScrollTrigger } = await import("gsap/ScrollTrigger")
      const gsap = gsapModule.default
      gsap.registerPlugin(ScrollTrigger)

      ctx = gsap.context(() => {
        gsap.fromTo(
          ".booking-content",
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 75%",
              once: true,
            },
          }
        )
      }, sectionRef)
    }

    initGSAP()
    return () => ctx?.revert()
  }, [])

  useEffect(() => {
    if (!showModal || !modalRef.current) return

    const animateModal = async () => {
      const gsapModule = await import("gsap")
      const gsap = gsapModule.default
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.9, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "back.out(1.7)" }
      )
    }
    animateModal()
  }, [showModal])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof BookingData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)

    const result = bookingSchema.safeParse(formData)

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof BookingData, string>> = {}
      result.error.errors.forEach((err) => {
        const field = err.path[0] as keyof BookingData
        fieldErrors[field] = err.message
      })
      setErrors(fieldErrors)
      setSubmitting(false)
      return
    }

    try {
      setErrors({})

      // 🔥 1️⃣ SALVA NO FIREBASE
      await addDoc(collection(db, "agendamentos"), {
        ...formData,
        status: "pendente",
        createdAt: serverTimestamp(),
      })

      // 🔥 2️⃣ ENVIA PARA WHATSAPP
      const numeroWhatsApp = "5524998558044" // 🔴 COLOQUE SEU NÚMERO AQUI

      const mensagem = `
  🐾 *Novo Agendamento - PetShop*

  👤 Cliente: ${formData.nome}
  📞 Telefone: ${formData.telefone}
  🐶 Pet: ${formData.nomePet}
  🛁 Serviço: ${formData.servico}
  📅 Data: ${formData.data}
  ⏰ Horário: ${formData.horario}

  Status: Pendente
      `

      const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(
        mensagem
      )}`

      window.open(url, "_blank")

      // 🔥 3️⃣ MOSTRA MODAL
      setShowModal(true)

      // 🔄 RESET FORM
      setFormData({
        nome: "",
        telefone: "",
        nomePet: "",
        servico: "",
        data: "",
        horario: "",
      })
    } catch (error) {
      console.error(error)
      alert("Erro ao enviar agendamento")
    } finally {
      setSubmitting(false)
    }
  }

  const inputClass = (field: keyof BookingData) =>
    `w-full rounded-xl border ${
      errors[field] ? "border-destructive" : "border-border"
    } bg-background px-4 py-3.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-300`

  return (
    <section ref={sectionRef} id="agendamento" className="py-24 bg-muted">
      <div className="mx-auto max-w-3xl px-4">
        <div className="booking-content" style={{ opacity: 0 }}>
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4 py-2 mb-6">
              <Calendar className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold text-primary">
                Agendamento Online
              </span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-black text-foreground text-balance">
              Agende o cuidado do seu pet{" "}
              <span className="text-primary">agora mesmo</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-lg mx-auto leading-relaxed">
              Preencha o formulário abaixo e nossa equipe confirmará seu
              agendamento em até 30 minutos.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-border bg-card p-8 lg:p-10 shadow-xl"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
                  <User className="w-4 h-4 text-primary" />
                  Seu Nome
                </label>
                <input
                  type="text"
                  name="nome"
                  value={formData.nome}
                  onChange={handleChange}
                  placeholder="Ex: Maria Silva"
                  className={inputClass("nome")}
                />
                {errors.nome && (
                  <p className="mt-1 text-xs text-destructive">{errors.nome}</p>
                )}
              </div>

              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Phone className="w-4 h-4 text-primary" />
                  Telefone
                </label>
                <input
                  type="tel"
                  name="telefone"
                  value={formData.telefone}
                  onChange={handleChange}
                  placeholder="(11) 99999-9999"
                  className={inputClass("telefone")}
                />
                {errors.telefone && (
                  <p className="mt-1 text-xs text-destructive">
                    {errors.telefone}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
                  <PawPrint className="w-4 h-4 text-primary" />
                  Nome do Pet
                </label>
                <input
                  type="text"
                  name="nomePet"
                  value={formData.nomePet}
                  onChange={handleChange}
                  placeholder="Ex: Thor"
                  className={inputClass("nomePet")}
                />
                {errors.nomePet && (
                  <p className="mt-1 text-xs text-destructive">
                    {errors.nomePet}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  Tipo de Serviço
                </label>
                <select
                  name="servico"
                  value={formData.servico}
                  onChange={handleChange}
                  className={inputClass("servico")}
                >
                  <option value="">Selecione um serviço</option>
                  <option value="banho-tosa">Banho & Tosa</option>
                  <option value="consulta">Consulta Veterinária</option>
                  <option value="vacinacao">Vacinação</option>
                  <option value="checkup">Checkup Completo</option>
                </select>
                {errors.servico && (
                  <p className="mt-1 text-xs text-destructive">
                    {errors.servico}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Calendar className="w-4 h-4 text-primary" />
                  Data
                </label>
                <input
                  type="date"
                  name="data"
                  value={formData.data}
                  onChange={handleChange}
                  className={inputClass("data")}
                />
                {errors.data && (
                  <p className="mt-1 text-xs text-destructive">{errors.data}</p>
                )}
              </div>

              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Clock className="w-4 h-4 text-primary" />
                  Horário
                </label>
                <select
                  name="horario"
                  value={formData.horario}
                  onChange={handleChange}
                  className={inputClass("horario")}
                >
                  <option value="">Selecione um horário</option>
                  <option value="08:00">08:00</option>
                  <option value="09:00">09:00</option>
                  <option value="10:00">10:00</option>
                  <option value="11:00">11:00</option>
                  <option value="13:00">13:00</option>
                  <option value="14:00">14:00</option>
                  <option value="15:00">15:00</option>
                  <option value="16:00">16:00</option>
                  <option value="17:00">17:00</option>
                </select>
                {errors.horario && (
                  <p className="mt-1 text-xs text-destructive">
                    {errors.horario}
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="mt-8 w-full rounded-2xl bg-primary px-8 py-4 text-base font-bold text-primary-foreground shadow-xl shadow-primary/25 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/35 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <span className="inline-flex items-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Agendando...
                </span>
              ) : (
                "Confirmar Agendamento"
              )}
            </button>
          </form>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/50 backdrop-blur-sm p-4">
          <div
            ref={modalRef}
            className="relative w-full max-w-md rounded-3xl bg-card p-8 shadow-2xl text-center"
            style={{ opacity: 0 }}
          >
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted transition-colors"
              aria-label="Fechar modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary/20">
              <CheckCircle className="h-8 w-8 text-secondary" />
            </div>

            <h3 className="text-2xl font-black text-foreground mb-2">
              Agendamento Confirmado!
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Recebemos seu agendamento com sucesso. Nossa equipe entrará em
              contato pelo telefone informado para confirmar os detalhes.
            </p>

            <button
              onClick={() => setShowModal(false)}
              className="mt-6 w-full rounded-2xl bg-primary px-6 py-3.5 text-sm font-bold text-primary-foreground shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5"
            >
              Entendido
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
