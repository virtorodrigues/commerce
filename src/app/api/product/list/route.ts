import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import Stripe from 'stripe'
import { Product } from '@/types/product.types'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  if (id) {
    const product = await getProduct({ id })
    return NextResponse.json({ product })
  }

  const products = await getListOfProducts({})

  return NextResponse.json({ products })
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
  const response = await stripe.products.list()

  const listOfProducts = getData({ response })

  const listFiltred = (await listOfProducts) as Product[]

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
