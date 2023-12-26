import { Container } from '@/components/ui'
import { Hero } from './component/Hero'

export default function HomePage() {
  return (
    <>
    
      <Hero /> 
      


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
