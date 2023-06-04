import { render, renderHook } from "@testing-library/react";
import { useForm } from ".";
import { faker } from "@faker-js/faker";
import "@testing-library/jest-dom";

function makeSut() {
  const spy = jest.fn();
  const sut = renderHook(() =>
    useForm({
      onSubmit: spy,
      initialValues: {
        name: "",
        lastname: "",
        email: "",
      },
    })
  );

  return {
    sut,
    spy,
  };
}

describe("useForm return object properties", () => {
  it("should be defined", () => {
    expect(useForm).toBeDefined();
  });

  it("should be a function", () => {
    expect(typeof useForm).toBe("function");
  });

  it("register should be a function", () => {
    const { sut } = makeSut();
    expect(typeof sut.result.current.register).toBe("function");
  });

  it("getValues should be a function", () => {
    const { sut } = makeSut();
    expect(typeof sut.result.current.getValues).toBe("function");
  });

  it("getErrors should be a function", () => {
    const { sut } = makeSut();
    expect(typeof sut.result.current.getErrors).toBe("function");
  });

  it("setFieldValue should be a function", () => {
    const { sut } = makeSut();
    expect(typeof sut.result.current.setFieldValue).toBe("function");
  });

  it("errors should be an object", () => {
    const { sut } = makeSut();
    expect(typeof sut.result.current.errors).toBe("object");
  });
});

function makeUseFormSut(args = {}) {
  function Component() {
    const form = useForm({ ...args });

    return (
      <form {...form.register()} role="form">
        <input data-testid="name" />
        <input data-testid="email" />
        <input data-testid="password" />
        <button type="submit" data-testid="submit">
          Submit
        </button>
        <button type="reset" data-testid="reset">
          reset
        </button>
      </form>
    );
  }

  const sut = render(<Component />);

  return {
    sut,
  };
}

function makeMockedValues() {
  return {
    name: faker.name.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
}

describe("useForm functions", () => {
  it("render the form component", () => {
    const { sut } = makeUseFormSut();

    expect(sut.container).toBeDefined();
    expect(sut.getByRole("form")).toBeTruthy();
  });
});
