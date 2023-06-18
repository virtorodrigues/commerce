import { Header } from '@/components/Header'
import Image from 'next/image'
import whatsappIcon from '../../assets/social-media/whatsapp-icon.png'
import instagramIcon from '../../assets/social-media/instagram-icon.png'
import facebookIcon from '../../assets/social-media/facebook-icon.png'
import Link from 'next/link'

export default function Contacts() {
  return (
    <>
      <Header />
      <div className="mt-36 flex flex-col gap-2">
        <Link
          target="_blank"
          rel="noreferrer"
          href="https://wa.me/5518988020195"
          className="mx-auto flex w-full flex-row items-center gap-3 bg-white px-4 py-4 duration-150 hover:shadow-2xl md:w-[1200px] md:p-10"
        >
          <Image
            className=""
            width={40}
            height={40}
            src={whatsappIcon}
            alt=""
          />
          <div className="flex flex-col">
            <span className="text-md font-bold text-purple-500">
              (18) 98802-0195
            </span>
            <span className="text-sm text-gray-500">
              Entre em contato para agendar serviço, para ver os produtos
              disponíveis, para tirar dúvidas, para devolver um produto...
            </span>
          </div>
        </Link>
        <Link
          target="_blank"
          rel="noreferrer"
          href="https://www.instagram.com/manutencao.controles.games/"
          className="mx-auto flex flex-row items-center gap-3 bg-white px-4 py-4 duration-150 hover:shadow-2xl md:w-[1200px] md:p-10"
        >
          <Image width={40} height={40} src={instagramIcon} alt="" />
          <div className="flex flex-col">
            <span className="text-md font-bold text-purple-500">
              @manutencao.controles.games
            </span>
            <span className="text-sm text-gray-500">
              Acompanhe o instagram para ficar por dentro das novidades.
            </span>
          </div>
        </Link>
        <Link
          target="_blank"
          rel="noreferrer"
          href="https://www.facebook.com/marcelo.fiorentino.14"
          className="mx-auto flex flex-row items-center gap-3 bg-white px-4 py-4 duration-150 hover:shadow-2xl md:w-[1200px] md:p-10"
        >
          <Image width={40} height={40} src={facebookIcon} alt="" />
          <div className="flex flex-col">
            <span className="text-md font-bold text-purple-500">
              Marcelo Controles Fontes
            </span>
            <span className="text-sm text-gray-500">
              Entre em contato para agendar serviço, para ver os produtos
              disponíveis, para tirar dúvidas, para devolver um produto...
            </span>
          </div>
        </Link>
      </div>
    </>
  )
}
