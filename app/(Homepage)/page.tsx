import { Inter } from 'next/font/google'

import { Container } from '@/components/ui'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Container width='regular'>
        <div className="max-w-4xl mx-auto">
          <h1 className={`${inter.className} text-center font-bold text-2xl md:text-5xl`}>Manage Your Tasks easily and efficiently!</h1>
          <p>Tasky is a platform which provides a powerful and intuitive Kanban board system designed to streamline your workflow and optimize task management.</p>
          <div className="">
            <a href="">Get started for free</a>
            <a href="">Start enterprise edition</a>
            <p>No credit card required</p>
          </div>
        </div>

      </Container>

      <Container>
        <h2>Easy, simple and powerful </h2>
        <p>Customize your workflow to match your unique processes, adapting columns, labels, and statuses to fit your specific needs. Say goodbye to chaos and hello to productivity!</p>
      </Container>

      <Container>
        <h2>Seamless Collaboration </h2>
        <p>Work collaboratively with your team in real-time. Share boards, assign tasks, and keep everyone in sync to accomplish goals efficiently.</p>
      </Container>

      <Container>
        <h2>Customize Your Workflow </h2>
        <p>Tailor your boards and workflow to match your team's unique processes. Adapt columns, labels, and statuses to fit your specific needs.</p>
      </Container>

      <Container>
        <h2>Start now and create a task with just one click</h2>
        <a href="">Get started for free</a>
      </Container>


      
    </>
  )
}
