import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import Stripe from 'stripe'

export async function GET(request: NextRequest) {
  /* const { searchParams } = new URL(request.url)
  const condition = searchParams.get('condition') as string

  const redirectURL = new URL('/', request.url)
  redirectURL.searchParams.set('condition', condition)

  return NextResponse.redirect(redirectURL) */

  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  const condition = searchParams.get('condition')
  if (condition) {
    const products = await getListOfProducts({ searchParams: { condition } })

    return NextResponse.json({ products })
    // const products = await getListOfProducts({
    //   searchParams: { condition },
    // })

    // return NextResponse.json({ products })
  }

  const products = id ? await getProduct({ id }) : await getListOfProducts({})

  return NextResponse.json({ products })
}

interface Product {
  id: string
  image: string
  name: string
  price: number
  description?: string
  condition: string
}

type ResponseType = {
  response: { data: Stripe.Product[] }
}

async function getProduct({ id }: { id: string }) {
  const response = await stripe.products.list({ ids: [id as string] })

  const product: Product[] = await getData({ response })

  return product[0] || []
}

async function getListOfProducts({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}): Promise<Product[]> {
  const fiterType = searchParams && Object.keys(searchParams)
  const fiterValues = searchParams && Object.values(searchParams)

  const response = await stripe.products.list()

  const listOfProducts = getData({ response })

  let listFiltred = (await listOfProducts) as Product[]
  if (fiterType?.length) {
    listFiltred = listFiltred.filter(
      (product) => fiterValues && product.condition === fiterValues[0],
    )
  }

  return listFiltred
}

async function getData({ response }: ResponseType) {
  try {
    const data = response.data

    const productFiltred = data.filter(
      (product: Stripe.Product) =>
        new Date(product.created * 1000).getFullYear() >= 2023,
    )

    const newProducts = productFiltred.map(async (product: Stripe.Product) => {
      const price = (await stripe.prices.retrieve(
        product.default_price as string,
      )) as any

      const condition = product.metadata?.condition || ''

      return {
        id: product.id,
        image: product.images[0],
        name: product.name,
        price: price.unit_amount / 100,
        description: product.description || '',
        condition,
      }
    })

    return Promise.all(newProducts)
      .then((resolvedProducts) => {
        return resolvedProducts
      })
      .catch(() => {
        return []
      })
  } catch (error) {
    return []
  }
}
