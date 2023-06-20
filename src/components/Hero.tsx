import Image from 'next/image'
import backgroundImage from '../assets/background.png'

export function Hero() {
  return (
    <div className="relative mt-20 inline-block">
      <Image
        className="h-96 w-full object-cover md:w-[1200px]"
        src={backgroundImage}
        priority
        width={1200}
        height={400}
        alt=""
      />
      <div className="absolute left-[50%] top-[50%] w-full translate-x-[-50%] translate-y-[-50%] text-center">
        <h1 className="text-4xl text-white">Bem-vindo ao Marcelo Controles</h1>
        <span className="mt-2 block text-center text-sm text-white">
          Compre seu controle ou cote seu serviço da maneira mais fácil e segura
          possível em Presidente Prudente e Região
        </span>
      </div>
    </div>
  )
}
