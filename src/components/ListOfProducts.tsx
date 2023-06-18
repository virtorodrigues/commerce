import { getListOfProducts } from '@/utils/getStripeProducts'
import Image from 'next/image'
import Link from 'next/link'

interface Product {
  id: string
  image: string
  name: string
  price: number
  description?: string
  condition: string
}

export async function ListOfProducts({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const products = await getListOfProducts({ searchParams })

  return (
    <ul className="auto-rows grid w-full grid-cols-2 gap-2 md:grid-cols-3 md:gap-5">
      {products.map((product: Product) => (
        <li
          key={product.id}
          className="cursor-pointer rounded-lg border bg-white duration-100 hover:shadow-2xl"
        >
          <Link href={`/product/${product.id}`} target="_top">
            <div className="flex border-b-2 border-b-[#EBEBEB] p-2 md:p-7">
              <Image
                className="h-40 w-96 object-contain"
                width={200}
                height={400}
                src={product.image}
                alt=""
              />
            </div>
            <div className="flex flex-col gap-5 p-4 md:p-5">
              <span className="text-base font-medium">
                {product.name.slice(0, 50)} {product.name.length > 50 && '...'}
              </span>
              <div className="flex flex-col items-start justify-between gap-2 md:flex-row">
                <div className="flex flex-col items-baseline justify-between md:flex-col">
                  <div className="flex items-baseline gap-2">
                    <span className="text-lg md:text-2xl">
                      R$ {product.price}
                    </span>
                    <span className="text-sm text-green-500">10% OFF</span>
                  </div>
                  <span className="text-xs">
                    em 12x R$ {Math.floor(product.price / 12)}
                  </span>
                </div>
                {product.condition && (
                  <span
                    className={`rounded-lg ${
                      product.condition === 'novo'
                        ? 'bg-green-500'
                        : 'bg-purple-500/70'
                    } max-w-fit px-3 py-1 text-sm text-white`}
                  >
                    {product.condition}
                  </span>
                )}
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  )
}
