import Image from 'next/image'
import logo from '../assets/logo.svg'
import Link from 'next/link'

export function Header() {
  return (
    <div className="fixed top-0 z-[99] h-24 w-full bg-purple-500">
      <div className="mx-auto my-0 flex h-full w-full items-center justify-between px-8 xl:w-[1200px]">
        <Image src={logo} width={90} alt="" />
        <input
          className="hidden h-10 w-96 rounded pl-5 md:block"
          type="text"
          placeholder="Digite o que você quer encontrar"
        />
        <nav className="flex gap-5 text-white">
          <Link
            href="/"
            className="cursor-pointer duration-200 hover:opacity-90"
          >
            Ver produtos
          </Link>
          <Link
            href="/contacts"
            className="cursor-pointer duration-200 hover:opacity-90"
          >
            Contato
          </Link>
          {/* <Link className="cursor-pointer duration-200 hover:opacity-90">
            Meu carrinho
          </Link> */}
        </nav>
      </div>
    </div>
  )
}
