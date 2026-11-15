import { createContext, ReactNode, useCallback, useContext, useRef, useState } from 'react';

type Ctx = (message: string) => void;
const ToastContext = createContext<Ctx>(() => undefined);
export const useToast = () => useContext(ToastContext);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState('');
  const timer = useRef<number>();
  const show = useCallback((m: string) => {
    setMessage(m);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setMessage(''), 2600);
  }, []);
  return (
    <ToastContext.Provider value={show}>
      {children}
      <div id="toast" role="status" className={message ? 'on' : ''}>{message}</div>
    </ToastContext.Provider>
  );
}
