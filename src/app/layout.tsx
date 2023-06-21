import React from 'react'
import './globals.css'
import { Roboto } from 'next/font/google'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
})

export const metadata = {
  title: 'Marcelo Controles',
  description: 'Compre seu controle favorito e cote seu serviço.',
  googleSiteVerification: 'SgV4WTl0rnQYXDwTO4a3bi3XrwuR9kxWbYY9zxJMC4M',
  openGraph: {
    title: 'Marcelo Controles',
    description: 'Compre seu controle favorito e cote seu serviço.',
    url: process.env.NEXT_PUBLIC_API_URL_BASE,
    siteName: 'Marcelo Controles',
    images: [
      {
        url: './icon.png',
        width: 800,
        height: 600,
      },
    ],
    locale: 'pt-BR',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={roboto.className}>{children}</body>
    </html>
  )
}
