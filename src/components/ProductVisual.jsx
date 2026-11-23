import WatchArt from './WatchArt'

export default function ProductVisual({ product, className = '' }) {
  if (product.art) {
    return (
      <span className={`product-visual product-visual--art ${className}`}>
        <WatchArt />
      </span>
    )
  }

  return (
    <img
      src={product.image}
      alt={product.name}
      className={className}
      loading="lazy"
    />
  )
}
