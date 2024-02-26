import { Container } from '@/components/ui'
import { Hero } from './component/Hero'

export default function HomePage() {
  return (
    <>

      <Hero />

      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 my-8 min-h-[220px]">
          <div className="">
            <h2 className="text-xl font-bold text-gray-800 sm:text-3xl sm:leading-tight my-2">
              Easy, simple and powerful
            </h2>
            <p>Customize your workflow to match your unique processes, adapting columns, labels, and statuses to fit your specific needs. Say goodbye to chaos and hello to productivity!</p>
          </div>
          <div className=""></div>
        </div>
      </Container>

      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 my-8 min-h-[220px]">
          <div className="">
            <h2 className="text-xl font-bold text-gray-800 sm:text-3xl sm:leading-tight my-2">
              Seamless Collaboration
            </h2>
            <p>Work collaboratively with your team in real-time. Share boards, assign tasks, and keep everyone in sync to accomplish goals efficiently.</p>
          </div>
        </div>
      </Container>

      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 my-8 min-h-[220px]">
          <div className="">
            <h2 className="text-xl font-bold text-gray-800 sm:text-3xl sm:leading-tight my-2">
              Customize Your Workflow
            </h2>
            <p>{"Tailor your boards and workflow to match your team`&apos;`s unique processes. Adapt columns, labels, and statuses to fit your specific needs."}</p>
          </div>
        </div>
      </Container>

      <Container>
        <div className="my-2">
          <div className="flex items-center justify-center flex-col bg-rose-300 rounded min-h-[220px]">
            <h2 className="text-xl font-bold text-gray-800 sm:text-3xl sm:leading-tight my-2">
              Start now and create a task with just one click
            </h2>
            <a href="signup" className='bg-[--main-color] text-white p-2 px-3 rounded'>Get started for free</a>
          </div>
        </div>
      </Container>
    </>
  )
}
