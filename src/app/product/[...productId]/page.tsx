import { Header } from '@/components/Header'
import Image from 'next/image'
import mlPayment from '../../../assets/payment-methods/ml-payment.svg'
import eloPayment from '../../../assets/payment-methods/elo-payment.svg'
import hipercardPayment from '../../../assets/payment-methods/hipercard-payment.svg'
import mastercardPayment from '../../../assets/payment-methods/mastercard-payment.svg'
import visaPayment from '../../../assets/payment-methods/visa-payment.svg'
import boletoPayment from '../../../assets/payment-methods/boleto-payment.svg'
import arrowLeftIcon from '../../../assets/arrow-left.svg'
import Link from 'next/link'
import axios from 'axios'

export const metadata = {
  title: 'Lista de produtos',
  description: 'Encontre o controle ideal para você aqui.',
}

interface Product {
  id: string
  image: string
  name: string
  price: number
  description?: string
  condition: string
}

function BuyNow({ product }: { product: Product }) {
  function getHrefToBuyProduct() {
    const href = `https://api.whatsapp.com/send?phone=5518988020195&text=Olá Marcelo, gostaria de saber mais informações sobre um produto!%0A%0A
    - Controle de código: ${product.id} %0A
    - Condição: ${product.condition}%0A
    - Valor: ${product.price}%0A%0A
    - Título: ${product.name}%0A
    - Descrição: ${product.description}%0A
      `
    return href
  }

  return (
    <div className="flex h-fit w-full min-w-[288px] flex-col gap-4 rounded-lg border border-gray-200 p-5 md:w-72">
      <strong>Último disponível!</strong>
      <div className="flex flex-col gap-2">
        <Link
          href={getHrefToBuyProduct()}
          target="_blank"
          rel="noreferrer"
          className="rounded-md bg-green-500 py-3 text-center text-white duration-150 hover:opacity-90"
        >
          Comprar agora
        </Link>
        {/* <button className="rounded-md bg-green-500/20 py-3 text-green-500 duration-150 hover:opacity-90">
                Adicionar ao carrinho
              </button> */}
      </div>
      <span className="text-xs text-gray-500">
        <span className="font-bold text-green-500">Devolução grátis.</span> Você
        tem 7 dias a partir da data de recebimento.
      </span>
      <span className="text-xs text-gray-500">
        <span className="font-bold text-green-500">
          Entregas em mãos imediata.
        </span>{' '}
        Se você é da região de Presidente Prudente, podemos agendar um horário
        para você ir até minha casa retirar seu produto.
      </span>
    </div>
  )
}

export default async function ProductDetails({
  params: { productId },
}: {
  params: { productId: string[] }
}) {
  // const product = await getProduct({ id: productId[0] })
  const { products } = await axios
    .get(`http://localhost:3000/api/product/list`, {
      params: {
        id: productId[0],
      },
    })
    .then((response) => response.data)
  return (
    <>
      <Header />
      <div className="mx-auto mb-5 mt-28 flex w-full items-center pl-3 text-sm text-gray-500 md:w-[1200px] md:flex-row md:pl-0">
        <Link href={'/'} className="flex gap-1">
          <Image
            className="text-gray-500"
            src={arrowLeftIcon}
            width={15}
            height={15}
            alt=""
          />
          Voltar
        </Link>
      </div>
      <div className="mx-auto my-0 flex w-full flex-col justify-between gap-10 bg-white p-5 md:w-[1200px] md:flex-row md:p-10">
        <div className="flex flex-col">
          <div className="flex flex-col border-b border-gray-200 pb-5 md:flex-row">
            <div className="flex justify-center md:py-5 md:pr-10">
              <Image width={300} height={200} src={products.image} alt="" />
            </div>
            <div className="flex max-w-sm flex-col">
              <span className="mb-2 text-sm font-medium text-gray-500 first-letter:uppercase">
                {products.condition}
              </span>
              <strong className="mb-3 text-xl font-medium">
                {products.name}
              </strong>
              <span className="text-3xl ">R$ {products.price}</span>
              <div>
                <span className="text-sm">em </span>
                <span className="text-sm font-bold text-green-500">
                  12x R${Math.floor(products.price / 12)}
                </span>
              </div>
            </div>
            <div className="block py-5 md:hidden">
              <BuyNow product={products} />
            </div>
          </div>
          <div className="">
            <span className="mb-3 mt-10 block text-xl">Descrição</span>
            <p className="text-md leading-7 text-gray-600">
              {products.description}
            </p>
          </div>
        </div>
        <div className="flex flex-col-reverse gap-5 md:flex-col">
          <BuyNow product={products} />
          <div className="flex h-fit w-full min-w-[288px] flex-col gap-4 rounded-lg border border-gray-200 p-5 md:w-72">
            <strong>Meios de pagamento</strong>
            <div>
              <span className="text-sm">Até 12x sem cartão de crédito</span>
              <Image width={73} height={32} src={mlPayment} alt="" />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col">
                <span className="text-sm">Cartões de crédito</span>
                <span className="text-xs text-gray-400">Page em até 12x!</span>
              </div>
              <div className="flex flex-row justify-between">
                <Image width={31} height={32} src={mastercardPayment} alt="" />
                <Image width={42} height={32} src={visaPayment} alt="" />
                <Image width={37} height={32} src={eloPayment} alt="" />
                <Image width={53} height={32} src={hipercardPayment} alt="" />
              </div>
            </div>
            <div>
              <span className="text-sm">Boleto bancário</span>
              <Image width={28} height={32} src={boletoPayment} alt="" />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
