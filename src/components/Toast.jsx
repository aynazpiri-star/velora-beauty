import { useStore } from '../lib/store.jsx';

export default function Toast() {
  const { toast } = useStore();
  if (!toast) return null;

  return (
    <div className="toast" role="status" aria-live="polite">
      <div className="toast__inner" key={toast.id}>
        <span className="toast__dot" aria-hidden="true" />
        {toast.message}
      </div>
    </div>
  );
}
