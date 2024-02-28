import { Container } from '@/components/ui'
import { Hero } from './component/Hero'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Container>
        <section className="py-10  sm:py-16 lg:py-24">
          <div className="max-w-5xl px-4 mx-auto sm:px-6 lg:px-8">
            <div className="grid items-center md:grid-cols-2 md:gap-x-20 gap-y-10">
              <div className="relative pl-16 pr-10 sm:pl-6 md:pl-0 xl:pr-0 md:order-2">
                <img className="absolute top-6 -right-4 xl:-right-12" src="https://cdn.rareblocks.xyz/collection/celebration/images/features/3/dots-pattern.svg" alt="" />

                <div className="relative max-w-xs ml-auto">
                  <div className="overflow-hidden aspect-w-3 aspect-h-4">
                    <img className="object-cover w-full h-full scale-150" src="https://cdn.rareblocks.xyz/collection/celebration/images/features/3/man-woman-discussing.jpg" alt="" />
                  </div>

                  <div className="absolute bottom-0 -left-16">
                    <div className="bg-yellow-300">
                      <div className="py-4 pl-4 pr-10 sm:py-6 sm:pl-8 sm:pr-16">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="#FFF"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                        </svg>
                        <span className="block mt-3 text-xl font-bold text-black sm:mt-6 sm:text-4xl lg:text-5xl"> 2,984 </span>
                        <span className="block mt-2 text-sm font-medium leading-snug text-amber-900 sm:text-base"> Customer chat<br />served on July </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:order-1">
                <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">Easy, simple and powerful.</h2>
                <p className="mt-4 text-base leading-relaxed text-gray-600">
                  Customize your workflow to match your unique processes, adapting columns, labels, and statuses to fit your specific needs. Say goodbye to chaos and hello to productivity!
                </p>
              </div>
            </div>
          </div>
        </section>
      </Container>

      <section className="py-10 bg-gray-50 sm:py-16 lg:py-24">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid items-center grid-cols-1 gap-y-12 lg:grid-cols-2 lg:gap-x-24">
            <div>
              <img className="w-full max-w-sm mx-auto" src="https://cdn.rareblocks.xyz/collection/celebration/images/integration/2/services-icons.png" alt="" />
            </div>

            <div className="text-center lg:text-left">
              <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">Easy, simple and powerful.</h2>
              <p className="mt-6 text-base text-gray-600">
                Customize your workflow to match your unique processes, adapting columns, labels, and statuses to fit your specific needs. Say goodbye to chaos and hello to productivity!
              </p>
            </div>
          </div>
        </div>
      </section>

      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 my-20 min-h-[220px] max-w-5xl px-4 mx-auto gap-8">
          <div className="">
            <h2 className="text-3xl font-bold leading-tight text-black sm:text-3xl lg:text-4xl text-center">
              Seamless Collaboration
            </h2>
            <p className="mt-6 text-base text-gray-600 text-center">
              Work collaboratively with your team in real-time. Share boards, assign tasks, and keep everyone in sync to accomplish goals efficiently.</p>
          </div>
          <div className="">
          <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-4xl text-center">
              Customize Your Workflow
            </h2>
            <p className="mt-6 text-base text-gray-600 text-center">
              {"Tailor your boards and workflow to match your team's unique processes. Adapt columns, labels, and statuses to fit your specific needs."}</p>
          </div>
        </div>
      </Container>



      <Container>
        <div className="my-2">
          <div className="flex items-center justify-center flex-col gap-2 bg-rose-300 rounded min-h-[220px]">
          <h2 className="text-2xl font-semibold text-gray-800 sm:text-4xl sm:leading-tight">
              Start now and create a task with just one click
            </h2>
            <a href="signup" className='bg-[--main-color] text-white p-2 px-3 rounded'>Get started for free</a>
          </div>
        </div>
      </Container>
    </>
  )
}
