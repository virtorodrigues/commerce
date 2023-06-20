import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { ProductArea } from '@/components/Product/ProductArea'

// export const dynamic = 'force-dynamic'
// export const fetchCache = 'force-no-store'

// export const runtime = 'edge'

export const metadata = {
  title: 'Lista de produtos',
  description: 'Encontre o controle ideal para você aqui.',
}

export default async function Home() {
  return (
    <div className="flex flex-col items-center pb-12">
      <Header />
      <Hero />
      <div className="mt-5 flex w-full flex-col gap-3 md:mt-16 md:w-[1200px] md:flex-row md:gap-8">
        {/* <Suspense fallback={<SkeletonLayout />}> */}

        <ProductArea />
        {/* </Suspense> */}
      </div>
    </div>
  )
}
