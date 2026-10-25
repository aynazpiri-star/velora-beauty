import { IconArrowLeft, IconInstagram } from '../components/Icons'
import { useStore } from '../context/StoreContext'

const tiles = [1, 2, 3, 4, 5, 6].map((n) => ({
  src: `/images/insta-${n}.jpg`,
  alt: `تصویر اینستاگرام AURELIA ${n}`,
}))

export default function InstagramGallery() {
  const { notify } = useStore()

  return (
    <section className="py-14 lg:py-20">
      <div className="container-site">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">
              <span dir="ltr">@AURELIAJEWELRY</span>
            </p>
            <h2 className="heading-lg mt-3">به جمع درخشان ما بپیوندید</h2>
          </div>
          <button
            type="button"
            onClick={() => notify('صفحه اینستاگرام به‌زودی فعال می‌شود')}
            className="group inline-flex items-center gap-2 text-[11.5px] text-ink transition-colors hover:text-gold"
          >
            مشاهده در اینستاگرام
            <IconArrowLeft
              size={15}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />
          </button>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-2 sm:gap-3 lg:grid-cols-6">
          {tiles.map((tile) => (
            <button
              key={tile.src}
              type="button"
              onClick={() => notify('گالری اینستاگرام در نسخه نمایشی است')}
              className="group relative aspect-[104/96] overflow-hidden bg-cream"
              aria-label={tile.alt}
            >
              <img
                src={tile.src}
                alt={tile.alt}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 ease-smooth group-hover:scale-[1.06]"
              />
              <span className="absolute inset-0 grid place-items-center bg-ink/25 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <IconInstagram size={22} />
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
