import { useId } from 'react';
import toast, { ToastOptions } from 'react-hot-toast';

const useToast = (options?: ToastOptions) => {
  const id = useId();

  const success = (message: string) =>
    toast.success(message, {
      id,
      ...options,
    });

  const info = (message: string) =>
    toast.success(message, {
      id,
      ...options,
      className: '!bg-[#1e40af]',
    });

  const error = (message: string) =>
    toast.error(message, {
      id,
      ...options,
      iconTheme: {
        primary: '#fff',
        secondary: '#f44336', 
      },
    });

  return { success, info, error };
};

export { useToast };
