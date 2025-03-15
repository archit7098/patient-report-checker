
import { FadeIn } from './transitions';
import { cn } from '@/lib/utils';

type HeaderProps = {
  title: string;
  subtitle?: string;
  className?: string;
};

const Header = ({ title, subtitle, className }: HeaderProps) => {
  return (
    <FadeIn className={cn("mb-8 text-center", className)}>
      <h1 className="text-3xl font-display font-medium text-clinical-950 tracking-tight mb-2">
        {title}
      </h1>
      {subtitle && (
        <p className="text-clinical-600 text-lg max-w-xl mx-auto">
          {subtitle}
        </p>
      )}
    </FadeIn>
  );
};

export default Header;
