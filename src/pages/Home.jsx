import { products } from '../../shared/catalog.js';
import Hero from '../components/Hero.jsx';
import Marquee from '../components/sections/Marquee.jsx';
import CategoryGrid from '../components/sections/CategoryGrid.jsx';
import ProductGrid from '../components/sections/ProductGrid.jsx';
import OffersBanner from '../components/sections/OffersBanner.jsx';
import NewArrivals from '../components/sections/NewArrivals.jsx';
import WhyVelora from '../components/sections/WhyVelora.jsx';
import Reviews from '../components/sections/Reviews.jsx';
import Newsletter from '../components/sections/Newsletter.jsx';
import '../styles/sections.css';

export default function Home() {
  const featured = products.filter((item) => item.featured).slice(0, 4);
  const newArrivals = products.filter((item) => item.isNew).slice(0, 4);
  const bestSellers = products.filter((item) => item.bestSeller).slice(0, 4);

  return (
    <>
      <Hero />
      <Marquee />
      <CategoryGrid />
      <ProductGrid
        eyebrow="انتخاب سردبیر"
        title={
          <>
            محصولات <em>منتخب</em> ولورا
          </>
        }
        sub="پرطرفدارترین مدل‌های این فصل، با موجودی محدود و رنگ‌بندی کامل."
        products={featured}
      />
      <OffersBanner />
      <NewArrivals products={newArrivals} />
      <ProductGrid
        eyebrow="محبوب‌ترین‌ها"
        title={
          <>
            پرفروش‌ترین‌های <em>ماه</em>
          </>
        }
        sub="بر اساس خرید واقعی مشتریان در ۳۰ روز گذشته."
        products={bestSellers}
        ranked
        action={{ label: 'همه پرفروش‌ها', to: '/bestsellers' }}
      />
      <WhyVelora />
      <Reviews />
      <Newsletter />
    </>
  );
}
