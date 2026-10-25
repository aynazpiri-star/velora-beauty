export const categories = [
  { slug: 'rings', label: 'انگشتر', image: '/images/cat-rings.jpg' },
  { slug: 'necklaces', label: 'گردنبند', image: '/images/cat-necklaces.jpg' },
  { slug: 'earrings', label: 'گوشواره', image: '/images/cat-earrings.jpg' },
  { slug: 'bracelets', label: 'دستبند', image: '/images/cat-bracelets.jpg' },
  { slug: 'wedding', label: 'جواهرات عروس', image: '/images/cat-wedding-ring.jpg' },
  { slug: 'mens', label: 'مجموعه مردانه', image: '/images/cat-mens.jpg' },
  { slug: 'gifts', label: 'هدایا', image: '/images/cat-gifts.jpg' },
]

export const categoryLabel = (slug) =>
  categories.find((c) => c.slug === slug)?.label ?? 'همه'
