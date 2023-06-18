import { Suspense } from 'react'
import { Filter } from './Filter'
import { ListOfProducts } from './ListOfProducts'

// export const runtime = 'edge'

export async function ProductArea({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  return (
    <>
      <Filter searchParams={searchParams} />
      <Suspense fallback={<div>Carregando...</div>}>
        {/* @ts-expect-error Async Component */}
        <ListOfProducts searchParams={searchParams} />
      </Suspense>
    </>
  )
}
