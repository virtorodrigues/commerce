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

type FilterType = {
  type: string
  value: string
  label: string
}

export function ProductArea() {
  const [products, setProducts] = useState<Product[] | null>(null)
  const [filters, setFilters] = useState<FilterType[]>([])

  useEffect(() => {
    async function getProductsFromApi(): Promise<Product[]> {
      const params =
        '?' +
        filters.map((filter) => `${filter.type}=${filter.value}`).join('&')

      const apiUrl =
        `${process.env.NEXT_PUBLIC_API_URL_BASE}api/product/list` + params
      const result = await fetch(apiUrl, {
        cache: 'force-cache',
        next: {
          revalidate: 60,
        },
      }).then(async (response) => {
        const data = await response.json()
        return data
      })

      setProducts(result.products)
      return result.products
    }

    getProductsFromApi()
  }, [filters])

  function handleFilters({ type, value, label }: FilterType) {
    const newFilter = { type, value, label }
    const isAccumulatorFilter = filters.every((filter) => filter.type !== type)

    if (isAccumulatorFilter) {
      setFilters((state) => [...state, newFilter])
    } else {
      const newFilters = filters.map((filter) =>
        filter.type === type ? newFilter : filter,
      )
      setFilters(newFilters)
    }
  }

  function removeFilter({ key }: { key: string }) {
    const newFilters = filters.filter((filter) => filter.label !== key)

    setFilters(newFilters)
  }

  function handleFilterByPriceForm() {}

  return (
    <>
      <Filter
        handleFilters={handleFilters}
        filters={filters}
        productCounter={products?.length || 0}
        removeFilter={removeFilter}
        handleFilterByPriceForm={handleFilterByPriceForm}
      />
      {products ? <ListOfProducts products={products} /> : <SkeletonLayout />}
    </>
  )
}
