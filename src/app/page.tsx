import { Suspense } from 'react'
import { ListOfProducts } from '../components/ListOfProducts'
import backgroundImage from '../assets/background.png'
import Image from 'next/image'
import { Header } from '@/components/Header'
import { Filter } from '@/components/Filter'

export default function Home() {
  return (
    <div className="flex flex-col items-center pb-12">
      <Header />
      <div className="relative inline-block">
        <Image
          className="h-96 w-full object-cover md:w-[1200px]"
          src={backgroundImage}
          width={1200}
          height={400}
          alt=""
        />
        <div className="absolute left-[50%] top-[50%] w-full translate-x-[-50%] translate-y-[-50%] text-center">
          <h1 className="text-4xl text-white">
            Bem-vindo ao Marcelo Controles
          </h1>
          <span className="mt-2 block text-center text-sm text-white">
            Compre seu controle ou cote seu serviço da maneira mais fácil e
            segura possível em Presidente Prudente e Região
          </span>
        </div>
      </div>
      <div className="mt-10 flex w-full flex-row gap-8 md:mt-16 md:w-[1200px]">
        <Filter />
        <Suspense fallback={<div>Carregando...</div>}>
          <ListOfProducts />
        </Suspense>
      </div>
    </div>
  )
}
