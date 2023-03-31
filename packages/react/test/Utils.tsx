import { fireEvent } from "@testing-library/react";
import { faker } from "@faker-js/faker";

export function changeInput(element: HTMLElement) {
  return (value: any) => {
    fireEvent.change(element, { target: { value } });
    fireEvent.blur(element);
  };
}

export function makeMockedValues() {
  return {
    name: faker.name.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
}
