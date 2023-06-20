'use client'
import { ReactNode, useEffect, useState } from 'react'
import { Filter } from './Filter'
import { ListOfProducts } from './ListOfProducts'
import { SkeletonLayout } from './SkeletonLayout'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { Cross1Icon, CaretDownIcon } from '@radix-ui/react-icons'

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
const DropdownMenuDemo = ({ children }: { children: ReactNode }) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className="ml-auto mr-2 flex w-fit items-center gap-1 rounded-lg bg-white px-2 py-1 text-gray-500"
          aria-label="Customise"
        >
          Filtrar
          <CaretDownIcon />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          collisionPadding={10}
          className="min-w-[220px] rounded-md  bg-white p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform]"
          sideOffset={5}
        >
          <DropdownMenu.Item className=" rounded-lg p-5">
            <div className="  flex justify-end">
              <Cross1Icon className="z-[9999]" />
            </div>
          </DropdownMenu.Item>
          <div className="mt-[-50px] rounded-lg p-5">{children}</div>

          <DropdownMenu.Arrow className="fill-white" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}

export function ProductArea() {
  const [products, setProducts] = useState<Product[] | null>(null)
  const [filters, setFilters] = useState<FilterType[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function getProductsFromApi(): Promise<Product[]> {
      await setIsLoading(true)
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
      setIsLoading(false)
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
      <div className="hidden min-w-fit flex-col md:block">
        <Filter
          handleFilters={handleFilters}
          filters={filters}
          productCounter={products?.length || 0}
          removeFilter={removeFilter}
          handleFilterByPriceForm={handleFilterByPriceForm}
        />
      </div>
      <div className="block min-w-fit flex-col md:hidden">
        <DropdownMenuDemo>
          <Filter
            handleFilters={handleFilters}
            filters={filters}
            productCounter={products?.length || 0}
            removeFilter={removeFilter}
            handleFilterByPriceForm={handleFilterByPriceForm}
          />
        </DropdownMenuDemo>
      </div>

      {isLoading || !products ? (
        <SkeletonLayout />
      ) : (
        <ListOfProducts products={products} />
      )}
    </>
  )
}
