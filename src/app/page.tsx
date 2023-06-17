import { Suspense } from 'react'
import { ListOfProducts } from '../components/ListOfProducts'
import backgroundImage from '../assets/background.png'
import Image from 'next/image'
import { Header } from '@/components/Header'

export default function Home() {
  return (
    <div className="flex flex-col items-center pb-12">
      <Header />
      <div className="relative inline-block">
        <Image
          className=""
          src={backgroundImage}
          width={1520}
          height={800}
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
      <div className="mt-16 flex w-[1200px] flex-row gap-8">
        <div className="flex min-w-fit flex-col">
          <div className="flex flex-col">
            <strong className="text-2xl font-normal text-gray-700">
              Controle xbox 360
            </strong>
            <span className="text-xs text-gray-700">10 resultados</span>
          </div>
          <div className="flex flex-col gap-2 pt-5">
            <strong className="text-lg font-normal">Condição</strong>
            <span className="cursor-pointer text-xs text-gray-700">Novo</span>
            <span className="cursor-pointer text-xs text-gray-700">Usado</span>
            <span className="cursor-pointer text-xs text-gray-700">
              Recondicionado
            </span>
          </div>
          <div className="flex flex-col gap-2 pt-5">
            <strong className="text-lg font-normal text-gray-700">Preço</strong>
            <span className="cursor-pointer text-xs text-gray-700">
              Até R$ 300
            </span>
            <span className="cursor-pointer text-xs text-gray-700">
              R$200 a R$400
            </span>

            <div className="flex flex-row gap-2">
              <input
                className="w-20 rounded p-2 px-3 text-xs"
                type="text"
                name=""
                id=""
                placeholder="Mínimo"
              />
              <span className="text-gray-400">__</span>
              <input
                className="w-20 rounded p-2 px-3 text-xs"
                type="text"
                name=""
                id=""
                placeholder="Máximo"
              />
            </div>
          </div>
        </div>
        <Suspense fallback={<div>Carregando...</div>}>
          <ListOfProducts />
        </Suspense>
      </div>
    </div>
  )
}
