export function SkeletonLayout() {
  const skeletonCards = Array.from({ length: 6 })

  return (
    <ul className="auto-rows grid w-full grid-cols-2 gap-2 md:grid-cols-3 md:gap-5">
      {skeletonCards.map((_, index: number) => (
        <li
          key={index}
          className="animate-pulse cursor-pointer rounded-lg border bg-white duration-100 hover:shadow-2xl"
        >
          <div className="border-b-2 border-b-[#EBEBEB] px-5 py-8 md:p-7">
            <div className="h-32 w-full rounded-md bg-gray-300 md:h-40 "></div>
          </div>
          <div className="flex flex-col gap-5 p-4 md:p-5">
            <div className="flex flex-col gap-1">
              <div className="h-2 w-full rounded-md bg-gray-300 "></div>
              <div className="h-2 w-4/5 rounded-md bg-gray-300 "></div>
              <div className="h-2 w-2/4 rounded-md bg-gray-300 "></div>
            </div>

            <div className="flex flex-col items-start justify-between gap-3 md:flex-row">
              <div className="flex flex-col items-baseline justify-between gap-2 md:flex-col">
                <div className="flex items-baseline gap-2">
                  <div className="h-4 w-20 rounded-md bg-gray-300 "></div>
                  <div className="h-3 w-16 rounded-md bg-gray-300 "></div>
                </div>
                <div className="h-3 w-20 rounded-md bg-gray-300 "></div>
              </div>
              <div className="h-6 w-12 rounded-md bg-gray-300 "></div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  )
}
