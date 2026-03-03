"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Menu, X, Heart } from "lucide-react"

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navLinks = [
    { label: "Inicio", href: "#inicio" },
    { label: "Servicos", href: "#servicos" },
    { label: "Sobre", href: "#sobre" },
    { label: "Depoimentos", href: "#depoimentos" },
    { label: "Contato", href: "#agendamento" },
  ]

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-card/95 backdrop-blur-md shadow-lg py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 flex items-center justify-between">
        <Link href="#inicio" className="flex items-center gap-2 group">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-primary text-primary-foreground transition-transform duration-300 group-hover:scale-110">
            <Heart className="w-5 h-5" fill="currentColor" />
          </div>
          <span
            className={`text-xl font-extrabold tracking-tight transition-colors duration-300 ${
              scrolled ? "text-foreground" : "text-card"
            }`}
          >
            Pet<span className="text-primary">Vida</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-semibold transition-colors duration-300 hover:text-primary ${
                scrolled ? "text-foreground" : "text-card"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link
            href="#agendamento"
            className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-2.5 text-sm font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0"
          >
            Agendar Agora
          </Link>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`md:hidden p-2 rounded-lg transition-colors ${
            scrolled ? "text-foreground" : "text-card"
          }`}
          aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-card/98 backdrop-blur-xl border-t border-border mt-2 shadow-2xl">
          <nav className="flex flex-col px-4 py-4 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-foreground font-semibold py-3 px-4 rounded-xl hover:bg-muted transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="#agendamento"
              onClick={() => setMobileOpen(false)}
              className="mt-2 inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-bold text-primary-foreground shadow-lg"
            >
              Agendar Agora
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
