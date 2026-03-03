"use client"

import Link from "next/link"
import { Heart, MapPin, Phone, Clock, Instagram, Facebook } from "lucide-react"

const quickLinks = [
  { label: "Início", href: "#inicio" },
  { label: "Serviços", href: "#servicos" },
  { label: "Sobre", href: "#sobre" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "Agendamento", href: "#agendamento" },
]

const services = [
  "Banho & Tosa",
  "Consulta Veterinária",
  "Vacinação",
  "Loja Premium",
  "Checkup Completo",
]

export default function Footer() {
  return (
    <footer className="bg-[#0f2b3d] text-card/80">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Link href="#inicio" className="flex items-center gap-2 mb-5">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary text-primary-foreground">
                <Heart className="w-5 h-5" fill="currentColor" />
              </div>
              <span className="text-xl font-extrabold text-card">
                Pet<span className="text-secondary">Vida</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-card/60 mb-6">
              Há mais de 15 anos cuidando de quem você mais ama. Somos
              referencia em cuidado pet premium com equipe veterinária
              especializada.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                aria-label="Instagram da PetVida"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-card/10 text-card/70 transition-all hover:bg-primary hover:text-primary-foreground"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                aria-label="Facebook da PetVida"
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-card/10 text-card/70 transition-all hover:bg-primary hover:text-primary-foreground"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-card uppercase tracking-wider mb-5">
              Links Rápidos
            </h4>
            <ul className="flex flex-col gap-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-card/60 transition-colors hover:text-secondary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-card uppercase tracking-wider mb-5">
              Servicos
            </h4>
            <ul className="flex flex-col gap-3">
              {services.map((service) => (
                <li key={service}>
                  <Link
                    href="#servicos"
                    className="text-sm text-card/60 transition-colors hover:text-secondary"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold text-card uppercase tracking-wider mb-5">
              Contato
            </h4>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <p className="text-sm text-card/60">
                  Rua dos Animais, 123
                  <br />
                  Centro - Sao Paulo, SP
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-secondary shrink-0" />
                <p className="text-sm text-card/60">(11) 1111-1111</p>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                <div className="text-sm text-card/60">
                  <p>Seg - Sex: 8h as 18h</p>
                  <p>Sabado: 8h as 14h</p>
                  <p>Domingo: Fechado</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-card/10">
        <div className="mx-auto max-w-7xl px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-card/40">
            2026 PetVida. Todos os direitos reservados.
          </p>
          <p className="text-xs text-card/40">
            Feito com{" "}
            <Heart className="inline w-3 h-3 text-destructive" fill="currentColor" />{" "}
            para quem ama animais
          </p>
        </div>
      </div>
    </footer>
  )
}
