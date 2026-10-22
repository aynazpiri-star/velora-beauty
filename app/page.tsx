import { HeroSlider } from "@/components/hero-slider";
import { OccasionGallery } from "@/components/occasion-gallery";
import { PromoPanels } from "@/components/promo-panels";
import { AccessoriesBanner } from "@/components/accessories-banner";
import { StylingSuggestions } from "@/components/styling-suggestions";
import { FeaturedBestsellers } from "@/components/featured-bestsellers";
import { Testimonials } from "@/components/testimonials";

export default function HomePage() {
  return (
    <>
      <HeroSlider />
      <OccasionGallery />
      <PromoPanels />
      <AccessoriesBanner />
      <StylingSuggestions />
      <FeaturedBestsellers />
      <Testimonials />
    </>
  );
}
