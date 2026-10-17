import { Truck, ShieldCheck, Gift, Headset } from 'lucide-react'
import { BENEFITS } from '../../data/content'

const ICONS = {
  truck: Truck,
  shield: ShieldCheck,
  gift: Gift,
  headset: Headset,
}

/** Four service promises with hairline dividers. */
export default function BenefitsBar() {
  return (
    <section aria-label="خدمات AURA" className="border-y border-ivory-line bg-white">
      <div className="container-x grid divide-y divide-ivory-line py-2 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x lg:divide-x-reverse">
        {BENEFITS.map((benefit) => {
          const Icon = ICONS[benefit.icon] ?? Truck
          return (
            <div
              key={benefit.title}
              className="flex items-start gap-4 px-0 py-6 lg:px-8 lg:first:ps-0 lg:last:pe-0"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-ivory-line bg-ivory text-ocean">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-[13.5px] font-semibold text-ink">{benefit.title}</h3>
                <p className="mt-1 text-[11.5px] leading-6 text-ink-muted">{benefit.text}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
