import { fireEvent } from '@testing-library/react';

export function changeInput(element: HTMLElement) {
  return (value: any) => {
    fireEvent.change(element, { target: { value } });
    fireEvent.blur(element);
  };
}
