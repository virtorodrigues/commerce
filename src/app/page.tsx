import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { ProductArea } from '@/components/ProductArea'

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
      <div className="mt-10 flex w-full flex-row gap-8 md:mt-16 md:w-[1200px]">
        {/* <Suspense fallback={<SkeletonLayout />}> */}

        <ProductArea />
        {/* </Suspense> */}
      </div>
    </div>
  )
}
