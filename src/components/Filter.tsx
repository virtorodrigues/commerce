interface Product {
  id: string
  image: string
  name: string
  price: number
  description?: string
  condition: string
}

export function Filter({
  getProductsFromApi,
}: {
  getProductsFromApi: ({ type }: { type?: string }) => Promise<Product[]>
}) {
  return (
    <div className="hidden min-w-fit flex-col md:block ">
      <div className="flex flex-col">
        <strong className="text-2xl font-normal text-gray-700">
          Controle xbox 360
        </strong>
        <span className="text-xs text-gray-700">10 resultados</span>
      </div>
      <div className="flex flex-col gap-2 pt-5">
        <strong className="text-lg font-normal">Condição</strong>
        <button
          // href="/api/product/filter?condition=usado"
          onClick={() => getProductsFromApi({ type: 'novo' })}
          className="cursor-pointer text-left text-xs text-gray-700"
        >
          Novo
        </button>
        <button
          // href="/api/product/filter?condition=usado"
          onClick={() => getProductsFromApi({ type: 'usado' })}
          className="cursor-pointer text-left text-xs text-gray-700"
        >
          Usado
        </button>
        <span className="cursor-pointer text-xs text-gray-700">
          Recondicionado
        </span>
      </div>
      <div className="flex flex-col gap-2 pt-5">
        <strong className="text-lg font-normal text-gray-700">Preço</strong>
        <span className="cursor-pointer text-xs text-gray-700">Até R$ 300</span>
        <span className="cursor-pointer text-xs text-gray-700">
          R$200 a R$400
        </span>

        <div className="flex flex-row gap-2">
          <input
            className="w-20 rounded p-2 px-3 text-xs"
            type="text"
            name=""
            id=""
            placeholder="Mínimo"
          />
          <span className="text-gray-400">__</span>
          <input
            className="w-20 rounded p-2 px-3 text-xs"
            type="text"
            name=""
            id=""
            placeholder="Máximo"
          />
        </div>
      </div>
    </div>
  )
}
