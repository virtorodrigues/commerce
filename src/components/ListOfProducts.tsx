import { getListOfProducts } from '@/utils/getStripeProducts'
import Image from 'next/image'
import Link from 'next/link'

export async function ListOfProducts() {
  const products = await getListOfProducts()
  // prod_O5oeuJxFlLditF
  return (
    <ul className="auto-rows grid grid-cols-3 gap-5">
      {products.map((product) => (
        <li
          // href="/prod_O5oeuJxFlLditF"
          key={product.id}
          className="cursor-pointer rounded-lg border bg-white duration-100 hover:scale-105 hover:shadow-xl"
        >
          <Link href={`/products/${product.id}`}>
            <div className="border-b-2 border-b-[#EBEBEB] p-7">
              <Image
                className="max-h-40 w-96 object-contain"
                width={200}
                height={400}
                src={product.image}
                alt=""
              />
            </div>
            <div className="flex flex-col gap-5 p-5">
              <span className="text-base">{product.name}</span>
              <div className="flex flex-col gap-2">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl">R$ {product.price}</span>
                  <span className="text-sm text-green-500">10% OFF</span>
                </div>
                <span className="text-xs">
                  em 12x R$ {Math.floor(product.price / 12)}
                </span>
              </div>
            </div>
            {/* {product.description} */}
          </Link>
        </li>
      ))}
    </ul>
  )
}
