import { useShop } from '../lib/store.jsx';
import { CheckIcon } from './Icons.jsx';

export default function Toast() {
  const { toast } = useShop();
  if (!toast) return null;

  return (
    <div className={`toast ${toast.tone === 'error' ? 'toast--error' : ''}`} role="status" aria-live="polite" key={toast.id}>
      <span className="toast__icon">
        <CheckIcon size={15} />
      </span>
      <span>{toast.message}</span>
    </div>
  );
}
