"use client"

import { useState } from "react"
import { BookingData, bookingSchema } from "@/types/booking"
import { createBooking } from "@/lib/booking-service"


export function useBooking() {
  const [formData, setFormData] = useState<BookingData>({
    nome: "",
    telefone: "",
    nomePet: "",
    servico: "",
    data: "",
    horario: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // 🔎 Validação
    const result = bookingSchema.safeParse(formData)

    if (!result.success) {
      const fieldErrors: Record<string, string> = {}
      result.error.errors.forEach((err) => {
        const field = err.path[0] as string
        fieldErrors[field] = err.message
      })
      setErrors(fieldErrors)
      setLoading(false)
      return
    }

    try {
      // 🔥 1. Salva no Firebase
      await createBooking(formData)

      // 🔥 2. Envia para WhatsApp
      const numeroWhatsApp = "5521999999999" // 🔴 ALTERE PARA O NÚMERO DO PETSHOP

      const mensagem = `
🐾 *Novo Agendamento - Pet Vida*

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

      // 🔄 Reset
      setFormData({
        nome: "",
        telefone: "",
        nomePet: "",
        servico: "",
        data: "",
        horario: "",
      })

      setErrors({})
      setSuccess(true)
    } catch (error: any) {
      alert(error.message || "Erro ao enviar agendamento")
    } finally {
      setLoading(false)
    }
  }

  return {
    formData,
    errors,
    loading,
    success,
    setSuccess,
    handleChange,
    handleSubmit,
  }
}