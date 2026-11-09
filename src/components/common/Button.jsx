import { forwardRef } from 'react';
import { Loader2 } from 'lucide-react';
import { cn } from '../../utils/helpers.js';

const variantClass = {
  primary: 'btn-primary',
  secondary: 'btn-secondary',
  ghost: 'btn-ghost',
  danger: 'btn bg-danger-500 text-white px-5 py-2.5 hover:bg-danger-600 active:scale-[0.98]',
};

const sizeClass = {
  sm: 'text-sm px-3.5 py-2',
  md: '',
  lg: 'text-base px-6 py-3',
};

const Button = forwardRef(
  ({ variant = 'primary', size = 'md', isLoading = false, className, children, disabled, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(variantClass[variant], size !== 'md' && sizeClass[size], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
      {children}
    </button>
  )
);

Button.displayName = 'Button';

export default Button;
