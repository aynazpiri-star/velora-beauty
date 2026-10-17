import AnnouncementBar from '../components/home/AnnouncementBar'
import BenefitsBar from '../components/home/BenefitsBar'
import BrandIntro from '../components/home/BrandIntro'
import CategorySection from '../components/home/CategorySection'
import DiscoverySection from '../components/home/DiscoverySection'
import FeaturedPerfumes from '../components/home/FeaturedPerfumes'
import GiftCollection from '../components/home/GiftCollection'
import Hero from '../components/home/Hero'
import Newsletter from '../components/home/Newsletter'
import ReviewsSection from '../components/home/ReviewsSection'
import ScentQuiz from '../components/home/ScentQuiz'

export default function Home() {
  return (
    <>
      <Hero />
      <AnnouncementBar />
      <BrandIntro />
      <CategorySection />
      <FeaturedPerfumes />
      <DiscoverySection />
      <GiftCollection />
      <ScentQuiz />
      <BenefitsBar />
      <ReviewsSection />
      <Newsletter />
    </>
  )
}
