import Navbar from '../../components/Navbar/Navbar'
import Hero from '../../components/Hero/Hero'
import AiAssistantSection from './sections/AiAssistantSection'
import CtaBannerSection from './sections/CtaBannerSection'
import DashboardPreviewSection from './sections/DashboardPreviewSection'
import FeaturesSection from './sections/FeaturesSection'
import FooterSection from './sections/FooterSection'
import HowItWorksSection from './sections/HowItWorksSection'
import TestimonialsSection from './sections/TestimonialsSection'
import TrustIndicatorsSection from './sections/TrustIndicatorsSection'

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TrustIndicatorsSection />
        <HowItWorksSection />
        <FeaturesSection />
        <CtaBannerSection />
        <AiAssistantSection />
        <TestimonialsSection />
        <DashboardPreviewSection />
      </main>
      <FooterSection />
    </>
  )
}
