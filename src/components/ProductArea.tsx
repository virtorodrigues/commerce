'use client'
import { useEffect, useState } from 'react'
import { Filter } from './Filter'
import { ListOfProducts } from './ListOfProducts'
import { SkeletonLayout } from './SkeletonCard'

interface Product {
  id: string
  image: string
  name: string
  price: number
  description?: string
  condition: string
}

export function ProductArea() {
  const [products, setProducts] = useState<Product[] | null>(null)

  async function getProductsFromApi({
    type,
  }: {
    type?: string
  }): Promise<Product[]> {
    const param = type ? `?condition=${type}` : ''

    const apiUrl = `http://localhost:3000/api/product/list` + param
    const result = await fetch(apiUrl, {
      cache: 'force-cache',
      next: {
        revalidate: 60 * 60,
      },
    }).then(async (response) => {
      const data = await response.json()
      return data
    })

    setProducts(result.products)
    return result.products
  }

  useEffect(() => {
    async function getProducts() {
      await getProductsFromApi({})
    }

    getProducts()
  }, [setProducts])

  return (
    <>
      <Filter getProductsFromApi={getProductsFromApi} />
      {products ? <ListOfProducts products={products} /> : <SkeletonLayout />}
    </>
  )
}
