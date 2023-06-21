'use client'

import { Product } from '@/types/product.types'
import { ReactNode, createContext, useEffect, useState } from 'react'

type FilterType = {
  type: string
  value: string
  label: string
}

interface ProductContextProps {
  products: Product[] | null
  filters: FilterType[]
  isLoading: boolean
  handleFilters: ({ type, value, label }: FilterType) => void
  removeFilter: ({ key }: { key: string }) => void
  getListOfProductsName: () => string[] | undefined
  handleFilterByProductName: ({ productName }: { productName: string }) => void
}

export const ProductContext = createContext({} as ProductContextProps)

export function ProductContextProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[] | null>(null)
  const [filters, setFilters] = useState<FilterType[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function getProductsFromApi(): Promise<Product[]> {
      await setIsLoading(true)

      const apiUrl = `${process.env.NEXT_PUBLIC_API_URL_BASE}api/product/list`

      const result = await fetch(apiUrl, {
        cache: 'force-cache',
        next: {
          revalidate: 60,
        },
      }).then(async (response) => {
        const data = await response.json()
        return data
      })
      setIsLoading(false)
      setProducts(result.products)
      return result.products
    }

    getProductsFromApi()
  }, [])

  function filterAsPrice({
    productList,
    value,
  }: {
    productList: Product[]
    value: string
  }) {
    const [minPrice, maxPrice] = value.split('|')
    return productList.filter(
      (product: Product) =>
        product.price >= (Number(minPrice) as number) &&
        product.price <= (Number(maxPrice) as number),
    )
  }

  function filterAsCondition({
    productList,
    value,
  }: {
    productList: Product[]
    value: string
  }) {
    return productList.filter(
      (product: Product) => product.condition === (value as string),
    )
  }

  function filterAsProductName({
    productList,
    value,
  }: {
    productList: Product[]
    value: string
  }) {
    return productList.filter((product: Product) =>
      product.name.includes(value as string),
    )
  }

  function applyProductFilter() {
    let newProducts = products as Product[]

    filters.flatMap((filter, index) => {
      switch (filter.type) {
        case 'condition':
          newProducts = filterAsCondition({
            productList: newProducts,
            value: filter.value as string,
          })
          break
        case 'price':
          newProducts = filterAsPrice({
            productList: newProducts,
            value: filter.value as string,
          })
          break
        case 'productName':
          newProducts = filterAsProductName({
            productList: newProducts,
            value: filter.value as string,
          })
          break
      }
      return newProducts
    })

    return newProducts
  }

  function handleFilterByProductName({ productName }: { productName: string }) {
    const newProducts =
      products?.filter((product) => product.name === productName) || null

    setProducts(newProducts)
  }

  function getListOfProductsName() {
    const listOfProductsName = products?.map((product) => product.name) || []
    const uniqueArray = listOfProductsName.filter((value, index, self) => {
      return self.indexOf(value) === index
    })
    return uniqueArray
  }

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

  const productsFiltred = applyProductFilter()

  return (
    <ProductContext.Provider
      value={{
        products: productsFiltred,
        isLoading,
        filters,
        handleFilters,
        removeFilter,
        getListOfProductsName,
        handleFilterByProductName,
      }}
    >
      {children}
    </ProductContext.Provider>
  )
}
