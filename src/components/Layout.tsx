import { ReactNode } from 'react'
import { Header } from './Header'
import { ProductContextProvider } from '@/app/contexts/ProductContext'

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col items-center pb-12">
      <ProductContextProvider>
        <Header />
        {children}
      </ProductContextProvider>
    </div>
  )
}
