'use client'

import Image from 'next/image'
import logo from '../assets/logo.png'
import Link from 'next/link'

import React, { useCallback, useContext, useEffect, useState } from 'react'
import * as DropdownMenu from '@radix-ui/react-dropdown-menu'
import { HamburgerMenuIcon } from '@radix-ui/react-icons'
import { ProductContext } from '@/contexts/ProductContext'

const DropdownMenuDemo = () => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild className="">
        <button
          className="inline-flex h-8 w-8 text-white"
          aria-label="Customise options"
        >
          <HamburgerMenuIcon className="h-8 w-8" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal className="">
        <DropdownMenu.Content
          className="data-[side=top]:animate-slideDownAndFade data-[side=right]:animate-slideLeftAndFade data-[side=bottom]:animate-slideUpAndFade data-[side=left]:animate-slideRightAndFade z-[999999] min-w-[220px] rounded-md bg-white p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] will-change-[opacity,transform]"
          sideOffset={5}
        >
          <DropdownMenu.Item className="flex flex-col gap-4 p-5">
            <Link
              href="/"
              className="cursor-pointer font-medium text-purple-500 duration-200 hover:opacity-90"
            >
              Ver produtos
            </Link>
            <Link
              href="/contacts"
              className="cursor-pointer font-medium text-purple-500 duration-200 hover:opacity-90"
            >
              Contato
            </Link>
          </DropdownMenu.Item>

          <DropdownMenu.Arrow className="fill-white" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  )
}

export function Header() {
  const { getListOfProductsName, handleFilters } = useContext(ProductContext)
  const [search, setSearch] = useState('')
  const [productFiltred, setProductFiltred] = useState(
    [] as string[] | undefined,
  )
  const getProductFiltredName = useCallback(
    () =>
      getListOfProductsName()?.filter((product) => {
        return product.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      }) || undefined,
    [search, getListOfProductsName],
  )

  useEffect(() => {
    setProductFiltred(getProductFiltredName())
  }, [getProductFiltredName])

  return (
    <div className="fixed top-0 z-[99] h-24 w-full bg-purple-500">
      <div className="mx-auto my-0 flex h-full w-full items-center justify-between gap-8 px-4 xl:w-[1200px]">
        <Image src={logo} width={70} alt="" />
        <div className="w-2/3">
          <input
            className=" h-10 w-full rounded pl-3 md:block"
            type="text"
            placeholder="Digite o que você quer encontrar"
            value={search}
            onChange={(value) => setSearch(value.target.value)}
          />
          {productFiltred && search && (
            <div className="fixed mt-1.5 flex flex-col rounded-lg bg-white py-2">
              {productFiltred.map((product, index) => (
                <button
                  onClick={() => {
                    const label =
                      product.slice(0, 20) + (product.length > 20 ? '...' : '')
                    setSearch('')
                    handleFilters({
                      type: 'productName',
                      value: product,
                      label,
                    })
                  }}
                  className="px-2 text-left hover:bg-purple-500 hover:text-white"
                  key={index}
                >
                  {product.slice(0, 50) + (product.length > 50 ? '...' : '')}
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="block h-8 w-8 text-white md:hidden">
          <DropdownMenuDemo />
        </div>
        <nav className=" hidden gap-5 text-white md:flex">
          <Link
            href="/"
            className="cursor-pointer duration-200 hover:opacity-90"
          >
            Ver produtos
          </Link>
          <Link
            href="/contacts"
            className="cursor-pointer duration-200 hover:opacity-90"
          >
            Contato
          </Link>
          {/* <Link className="cursor-pointer duration-200 hover:opacity-90">
            Meu carrinho
          </Link> */}
        </nav>
      </div>
    </div>
  )
}
