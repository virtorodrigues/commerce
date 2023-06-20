import Image from 'next/image'
import arrowLeftIcon from '../assets/arrow-right.svg'
import { Formik } from 'formik'

type FilterType = {
  type: string
  value: string
  label: string
}

export function Filter({
  handleFilters,
  handleFilterByPriceForm,
  removeFilter,
  filters,
  productCounter,
}: {
  handleFilters: ({ type, value, label }: FilterType) => void
  handleFilterByPriceForm: () => void
  removeFilter: ({ key }: { key: string }) => void
  filters: FilterType[]
  productCounter: number
}) {
  return (
    <div className="min-w-fit flex-col">
      <div className="flex flex-col gap-2">
        {!!filters.length && (
          <div className="flex flex-col gap-2">
            {filters &&
              filters.map((filter) => (
                <button
                  onClick={() => removeFilter({ key: filter.label })}
                  key={filter.label}
                  className="flex w-fit items-center gap-2 rounded-lg bg-gray-300 px-2 py-1 text-xs font-medium text-gray-500"
                >
                  <span>{filter.label}</span>
                  <span>x</span>
                </button>
              ))}
          </div>
        )}
        <span className="text-xs text-gray-700">
          {productCounter} resultados
        </span>
      </div>

      <div className="flex flex-col gap-2 pt-5">
        <strong className="text-lg font-normal">Condição</strong>
        <button
          name="filter-by-new"
          onClick={() =>
            handleFilters({ type: 'condition', value: 'novo', label: 'Novo' })
          }
          className="cursor-pointer text-left text-xs text-gray-700"
        >
          Novo
        </button>
        <button
          id="filter-by-used"
          name="filter-by-used"
          onClick={() =>
            handleFilters({ type: 'condition', value: 'usado', label: 'Usado' })
          }
          className="cursor-pointer text-left text-xs text-gray-700"
        >
          Usado
        </button>
      </div>
      <div className="flex flex-col gap-2 pt-5">
        <strong className="text-lg font-normal text-gray-700">Preço</strong>
        <button
          id="filter-by-price-fixed"
          name="filter-by-price-fixed"
          onClick={() =>
            handleFilters({
              type: 'price',
              value: '0 | 300',
              label: 'Até R$ 300',
            })
          }
          className="cursor-pointer text-left text-xs text-gray-700"
        >
          Até R$ 300
        </button>
        <button
          id="filter-by-price-range"
          name="filter-by-price-range"
          className="cursor-pointer text-left text-xs text-gray-700"
          onClick={() =>
            handleFilters({
              type: 'price',
              value: '300 | 400',
              label: 'R$300 a R$400',
            })
          }
        >
          R$300 a R$400
        </button>

        <div className="flex flex-row gap-2">
          <Formik
            initialValues={{ minPrice: 0, maxPrice: 0 }}
            validate={(values) => {
              const errors = {} as { minPrice?: string; maxPrice?: string }
              if (values.maxPrice <= 0) {
                errors.maxPrice = 'Invalid maxPrice'
              }
              if (values.minPrice > values.maxPrice) {
                errors.minPrice = 'Invalid minPrice'
              }
              return errors
            }}
            onSubmit={(values, { setSubmitting }) => {
              handleFilters({
                type: 'price',
                value: `${values.minPrice} | ${values.maxPrice}`,
                label: `R$${values.minPrice} a R$${values.maxPrice}`,
              })
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <form
                onSubmit={handleSubmit}
                action=""
                className="flex flex-row gap-2"
              >
                <input
                  className="w-20 rounded border border-gray-300 p-2 px-3 text-xs md:border-white"
                  type="number"
                  onChange={handleChange}
                  value={values.minPrice}
                  name="minPrice"
                  id="minPrice"
                  placeholder="Mínimo"
                  required
                  step={50}
                  min={0}
                />
                <span className="text-gray-400">__</span>
                <input
                  className="w-20 rounded border border-gray-300 p-2 px-3 text-xs md:border-white"
                  type="number"
                  onChange={handleChange}
                  value={values.maxPrice}
                  name="maxPrice"
                  id="maxPrice"
                  placeholder="Máximo"
                  required
                  step={50}
                  min={0}
                />
                <button
                  className="text-white"
                  name="filter-by-price-button-form"
                  id="filter-by-price-button-form"
                  type="submit"
                >
                  <Image
                    src={arrowLeftIcon}
                    width={30}
                    height={10}
                    alt=""
                    className="rotate-180 rounded-full bg-purple-500 p-2 text-white"
                  />
                </button>
              </form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}
