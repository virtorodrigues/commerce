import { Suspense } from 'react'
import { Filter } from './Filter'
import { ListOfProducts } from './ListOfProducts'
import { getListOfProducts } from '@/utils/getStripeProducts'

export async function ProductArea({ searchParams }: { searchParams: {} }) {
  const products = await getListOfProducts({ searchParams })

  return (
    <>
      <Filter searchParams={searchParams} />
      <Suspense fallback={<div>Carregando...</div>}>
        <ListOfProducts products={products} />
      </Suspense>
    </>
  )
}
