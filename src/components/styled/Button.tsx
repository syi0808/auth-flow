import { ComponentProps, ReactNode, forwardRef } from 'react';

export default forwardRef<HTMLButtonElement, { children: ReactNode } & ComponentProps<'button'>>(function Button(
  { children, ...props },
  ref
) {
  return (
    <button ref={ref} {...props}>
      {children}
    </button>
  );
});
