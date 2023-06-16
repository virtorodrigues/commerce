'use client'

import { useEffect, useState } from 'react'
import Stripe from 'stripe'

interface Product {
  id: string
  image: string
  name: string
  price: any
  description: string
}

export default function Home() {
  const [products, setProducts] = useState<Product[] | []>([])

  async function LoadStripe() {
    const stripe = new Stripe(
      process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY as string,
      {
        apiVersion: '2022-11-15',
        appInfo: {
          name: 'Commerce',
          version: '0.1.0',
        },
      },
    )

    try {
      const response = await stripe.products.list()
      const data = response.data

      const productFiltred = data.filter(
        (product) => new Date(product.created * 1000).getFullYear() >= 2023,
      )

      const newProducts = productFiltred.map(async (product) => {
        const price = (await stripe.prices.retrieve(
          product.default_price as string,
        )) as any

        return {
          id: product.id,
          image: product.images[0],
          name: product.name,
          price: price.unit_amount / 100,
          description: product.description || '',
        }
      })

      Promise.all(newProducts)
        .then((resolvedProducts) => {
          console.log(resolvedProducts)
          setProducts(resolvedProducts)
        })
        .catch((error) => {
          // Lida com erros ocorridos durante a resolução das Promises
          console.error(error)
        })

      // const products = response.data

      // console.log(products)
      // Handle the products array
    } catch (error) {
      console.log(error)

      // Handle errors
    }
  }

  useEffect(() => {
    LoadStripe()
  }, [])

  return (
    <div>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <img width={200} src={product.image} alt="" />
            {product.name}
            {product.price}
            {product.description}
          </li>
        ))}
      </ul>
    </div>
  )
}
