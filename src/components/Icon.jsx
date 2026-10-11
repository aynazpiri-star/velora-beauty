import {
  Award,
  Building2,
  ClipboardList,
  Compass,
  Hammer,
  HeartHandshake,
  Home,
  Layers,
  Lightbulb,
  Ruler,
  ShieldCheck,
  Sofa,
  Target,
  Trees,
  Users,
  Wallet,
} from 'lucide-react'

const registry = {
  compass: Compass,
  home: Home,
  building: Building2,
  sofa: Sofa,
  hammer: Hammer,
  clipboard: ClipboardList,
  layers: Layers,
  handshake: HeartHandshake,
  users: Users,
  shield: ShieldCheck,
  ruler: Ruler,
  trees: Trees,
  lightbulb: Lightbulb,
  target: Target,
  wallet: Wallet,
  award: Award,
}

/** آیکون‌های خطی یکنواخت سایت؛ کلید آیکون در فایل‌های داده ذخیره می‌شود. */
export default function Icon({ name, className = 'h-6 w-6', ...rest }) {
  const Component = registry[name] ?? Compass
  return <Component className={className} aria-hidden="true" {...rest} />
}
