// types/booking.ts
import { z } from "zod"

export const bookingSchema = z.object({
  nome: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  telefone: z
    .string()
    .min(10, "Telefone invalido")
    .regex(/^[\d\s()+-]+$/, "Formato invalido"),
  nomePet: z.string().min(2, "Nome do pet invalido"),
  servico: z.string().min(1, "Selecione um servico"),
  data: z.string().min(1, "Selecione uma data"),
  horario: z.string().min(1, "Selecione um horario"),
})

export type BookingData = z.infer<typeof bookingSchema>

export type Booking = BookingData & {
  id: string
  status: "pendente" | "confirmado" | "cancelado"
  createdAt: any
}