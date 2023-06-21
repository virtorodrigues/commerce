'use client'

import { ProductArea } from '@/components/Product/ProductArea'
import { Layout } from '@/components/Layout'
import { Hero } from '@/components/Hero'

export const metadata = {
  title: 'Lista de produtos',
  description: 'Encontre o controle ideal para você aqui.',
}

export default async function Home() {
  return (
    <Layout>
      <Hero />
      <div className="mt-7 flex w-full flex-col gap-6 md:mt-16 md:w-[1200px] md:flex-row md:gap-8">
        {/* <Suspense fallback={<SkeletonLayout />}> */}
        <ProductArea />
        {/* </Suspense> */}
      </div>
    </Layout>
  )
}
