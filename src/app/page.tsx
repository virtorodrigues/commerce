import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { ProductArea } from '@/components/ProductArea'

export default function Home({ searchParams }: { searchParams: {} }) {
  return (
    <div className="flex flex-col items-center pb-12">
      <Header />
      <Hero />
      <div className="mt-10 flex w-full flex-row gap-8 md:mt-16 md:w-[1200px]">
        <ProductArea searchParams={searchParams} />
      </div>
    </div>
  )
}
