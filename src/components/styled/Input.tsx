import { ComponentProps, ReactNode, forwardRef } from 'react';

export default forwardRef<HTMLInputElement, { children: ReactNode } & ComponentProps<'input'>>(function Input(
  { children, ...props },
  ref
) {
  return (
    <input ref={ref} {...props}>
      {children}
    </input>
  );
});
