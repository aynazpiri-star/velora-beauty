import Hero from '../sections/Hero'
import Benefits from '../sections/Benefits'
import Categories from '../sections/Categories'
import Bestsellers from '../sections/Bestsellers'
import SplitBanners from '../sections/SplitBanners'
import Values from '../sections/Values'
import Story from '../sections/Story'
import Testimonials from '../sections/Testimonials'
import InstagramGallery from '../sections/InstagramGallery'
import Newsletter from '../sections/Newsletter'

export default function Home() {
  return (
    <>
      <Hero />
      <Benefits />
      <Categories />
      <Bestsellers />
      <SplitBanners />
      <Values />
      <Story />
      <Testimonials />
      <InstagramGallery />
      <Newsletter />
    </>
  )
}
