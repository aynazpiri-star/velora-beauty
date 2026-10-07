import Hero from '../components/home/Hero.jsx';
import BenefitsBar from '../components/home/BenefitsBar.jsx';
import CategorySection from '../components/home/CategorySection.jsx';
import PromoSplit from '../components/home/PromoSplit.jsx';
import BestSellers from '../components/home/BestSellers.jsx';
import StorySection from '../components/home/StorySection.jsx';
import FeaturedCollection from '../components/home/FeaturedCollection.jsx';
import NewArrivals from '../components/home/NewArrivals.jsx';
import SpecialOffer from '../components/home/SpecialOffer.jsx';
import RoutineSection from '../components/home/RoutineSection.jsx';
import Testimonials from '../components/home/Testimonials.jsx';
import InstagramSection from '../components/home/InstagramSection.jsx';
import Newsletter from '../components/home/Newsletter.jsx';

export default function Home() {
  return (
    <>
      <Hero />
      <BenefitsBar />
      <CategorySection />
      <PromoSplit />
      <BestSellers />
      <StorySection />
      <FeaturedCollection />
      <NewArrivals />
      <SpecialOffer />
      <RoutineSection />
      <Testimonials />
      <InstagramSection />
      <Newsletter />
    </>
  );
}
