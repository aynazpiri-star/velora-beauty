import Button from '../components/Button'
import ContactSection from '../components/ContactSection'
import HeroSection from '../components/HeroSection'
import JournalSection from '../components/JournalSection'
import ProjectCarousel from '../components/ProjectCarousel'
import Reveal from '../components/Reveal'
import SectionHeading from '../components/SectionHeading'
import ServicesSection from '../components/ServicesSection'
import StatisticsSection from '../components/StatisticsSection'
import WaveDivider from '../components/WaveDivider'
import WhyChooseUs from '../components/WhyChooseUs'
import { projects } from '../data/projects'

export default function Home() {
  return (
    <>
      <HeroSection />

      <section id="projects" className="relative bg-ivory py-20 lg:py-28">
        <WaveDivider position="top" tone="ivory" />

        <div className="shell relative z-10">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="منتخب پروژه‌ها"
              title="پروژه‌های شاخص ما"
              description="نگاهی به مجموعه‌ای از پروژه‌های معماری و ساخت‌وساز با رویکردی متفاوت."
            />
            <Reveal delay={200} className="shrink-0">
              <Button to="/projects" variant="outlineLight" arrow>
                مشاهده همه پروژه‌ها
              </Button>
            </Reveal>
          </div>

          <div className="mt-14">
            <ProjectCarousel projects={projects} />
          </div>
        </div>
      </section>

      <StatisticsSection />
      <ServicesSection />
      <WhyChooseUs />
      <JournalSection />
      <ContactSection />
    </>
  )
}
