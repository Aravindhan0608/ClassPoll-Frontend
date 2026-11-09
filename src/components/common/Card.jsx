import { cn } from '../../utils/helpers.js';

const Card = ({ className, children, hover = false, ...props }) => (
  <div
    className={cn('glass-card p-6', hover && 'transition-transform hover:-translate-y-0.5 hover:shadow-glow', className)}
    {...props}
  >
    {children}
  </div>
);

export default Card;
