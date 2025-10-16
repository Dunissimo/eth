import { cn } from '@/lib/utils';
import type { PropsWithChildren } from 'react';

interface ContainerProps {
    className?: string;
}

function Container({ children, className }: PropsWithChildren<ContainerProps>) {
  return (
    <div className={cn("container max-w-[1440px] mx-auto", className)}>
        {children}        
    </div>
  )
}

export default Container;
