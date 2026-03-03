import type { Metadata, Viewport } from 'next'
import { Nunito } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const nunito = Nunito({ 
  subsets: ['latin'],
  variable: '--font-nunito',
  weight: ['400', '600', '700', '800', '900'],
})

export const metadata: Metadata = {
  title: 'PetVida | Cuidado Premium para seu Pet',
  description: 'PetVida - O melhor cuidado para o seu melhor amigo. Banho & Tosa, Consulta Veterinaria, Vacinacao e Produtos Premium. Agende agora!',
  generator: 'v0.app',
  keywords: ['pet shop', 'veterinario', 'banho e tosa', 'pet', 'cuidado animal'],
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#5b9bd5',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${nunito.variable} font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
