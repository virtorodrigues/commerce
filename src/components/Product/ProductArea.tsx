'use client'
import { ReactNode, useContext } from 'react'
import { Filter } from './Filter'
import { ListOfProducts } from './ListOfProducts'
import { SkeletonLayout } from './SkeletonLayout'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import {
  Cross1Icon,
  MixerHorizontalIcon,
  LightningBoltIcon,
} from '@radix-ui/react-icons'
import { ProductContext } from '@/app/contexts/ProductContext'

const DropdownMenuDemo = ({ children }: { children: ReactNode }) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className="flex w-fit items-center gap-2 rounded-lg bg-purple-500/20 px-3 py-1 text-sm text-purple-500"
          aria-label="Customise"
        >
          <MixerHorizontalIcon />
          Filtrar
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
  const { products, isLoading } = useContext(ProductContext)

  return (
    <>
      <div className="hidden min-w-fit flex-col md:block">
        <Filter productCounter={products?.length || 0} />
      </div>
      <div className="mr-2 flex flex-row justify-end gap-2 md:hidden">
        <span className="flex items-center gap-1 rounded-lg bg-purple-500/20 px-3 py-1 text-sm text-purple-500">
          <LightningBoltIcon />
          <span>{products?.length || 0} resultados</span>
        </span>
        <DropdownMenuDemo>
          <Filter productCounter={products?.length || 0} />
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
