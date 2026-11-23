import Hero from '../components/Hero.jsx';
import Marquee from '../components/sections/Marquee.jsx';
import Collections from '../components/sections/Collections.jsx';
import NewArrivals from '../components/sections/NewArrivals.jsx';
import Editorial from '../components/sections/Editorial.jsx';
import OfferBanner from '../components/sections/OfferBanner.jsx';
import Features from '../components/sections/Features.jsx';
import Quote from '../components/sections/Quote.jsx';
import Newsletter from '../components/sections/Newsletter.jsx';
import '../styles/sections.css';

export default function Home() {
  return (
    <>
      <Hero />
      <Marquee />
      <Collections />
      <NewArrivals />
      <Editorial />
      <OfferBanner />
      <Features />
      <Quote />
      <Newsletter />
    </>
  );
}
