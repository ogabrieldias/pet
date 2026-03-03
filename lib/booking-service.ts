// lib/booking-service.ts
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore"
import { db } from "./firebase"
import { BookingData } from "@/types/booking"

export async function createBooking(data: BookingData) {
  // Verifica conflito de horário
  const q = query(
    collection(db, "agendamentos"),
    where("data", "==", data.data),
    where("horario", "==", data.horario),
    where("status", "in", ["pendente", "confirmado"])
  )

  const snapshot = await getDocs(q)

  if (!snapshot.empty) {
    throw new Error("Horario ja reservado")
  }

  await addDoc(collection(db, "agendamentos"), {
    ...data,
    status: "pendente",
    createdAt: serverTimestamp(),
  })
}

export function listenBookings(callback: any) {
  return onSnapshot(collection(db, "agendamentos"), (snapshot) => {
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    callback(data)
  })
}

export async function updateBookingStatus(
  id: string,
  status: "confirmado" | "cancelado"
) {
  const ref = doc(db, "agendamentos", id)
  await updateDoc(ref, { status })
}