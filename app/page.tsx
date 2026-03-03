import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import StatsSection from "@/components/stats-section"
import PetCareSection from "@/components/pet-care-section"
import ServicesSection from "@/components/services-section"
import TestimonialsSection from "@/components/testimonials-section"
import BookingSection from "@/components/booking-section"
import UrgencySection from "@/components/urgency-section"
import Footer from "@/components/footer"
import FloatingElements from "@/components/floating-elements"

export default function Page() {
  return (
    <>
      <FloatingElements />
      <Header />
      <main>
        <HeroSection />
        <StatsSection />
        <PetCareSection />
        <ServicesSection />
        <TestimonialsSection />
        <BookingSection />
        <UrgencySection />
      </main>
      <Footer />
    </>
  )
}
