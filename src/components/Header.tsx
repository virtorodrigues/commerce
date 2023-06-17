import Image from 'next/image'
import logo from '../assets/logo.svg'

export function Header() {
  return (
    <div className="fixed top-0 z-[99] h-24 w-full bg-purple-500">
      <div className="mx-auto my-0 flex h-full w-[1200px] items-center justify-between">
        <Image src={logo} width={90} alt="" />
        <input
          className="h-10 w-96 rounded pl-5"
          type="text"
          placeholder="Digite o que você quer encontrar"
        />
        <nav className="flex gap-5 text-white">
          <a href="/" className="cursor-pointer duration-200 hover:opacity-90">
            Ver produtos
          </a>
          <a className="cursor-pointer duration-200 hover:opacity-90">
            Contato
          </a>
          <a className="cursor-pointer duration-200 hover:opacity-90">
            Meu carrinho
          </a>
        </nav>
      </div>
    </div>
  )
}
