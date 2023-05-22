import { waitFor } from "@testing-library/react";
import { createStore } from "./Store";

function makeSut(state = {}) {
  const spy = jest.fn();
  const sut = createStore(state);

  return {
    sut,
    spy,
  };
}

describe("Store", () => {
  it("Should set initial state when createStore is called", () => {
    const initialState = {
      foo: "bar",
    };
    const { sut } = makeSut(initialState);
    expect(sut.get()).toEqual(initialState);
  });

  it("Should set a new state when set is called", () => {
    const { sut } = makeSut();
    const newState = {
      foo: "bar",
    };
    sut.set(newState);
    expect(sut.get()).toEqual(newState);
  });

  it("Should call subscribers when set is called", async () => {
    const { sut, spy } = makeSut();
    sut.subscribe(spy);
    sut.set({ foo: "bar" }).notify();
    await waitFor(() => expect(spy).toHaveBeenCalledWith({ foo: "bar" }));
  });

  it("Should not call subscribers when set is called and not call notify", async () => {
    const { sut, spy } = makeSut();
    sut.subscribe(spy);
    sut.set({ foo: "bar" });
    await waitFor(() => expect(spy).not.toHaveBeenCalled());
  });

  it("Should patch a state when patch is called", () => {
    const { sut } = makeSut();
    sut.patch("foo", "bar").notify();
    expect(sut.get()).toEqual({ foo: "bar" });
  });

  it("Should call subscribers when patch is called", async () => {
    const { sut, spy } = makeSut();
    sut.subscribe(spy);
    sut.patch("foo", "bar").notify();
    await waitFor(() => expect(spy).toHaveBeenCalledWith({ foo: "bar" }));
  });

  it("Should get a property value when getPropertyValue is called", () => {
    const { sut } = makeSut();
    sut.patch("foo", "bar");
    expect(sut.getPropertyValue("foo")).toEqual("bar");
  });

  it("Should get an initial property value when getInitialPropertyValue is called", () => {
    const { sut } = makeSut();
    expect(sut.getInitialPropertyValue("foo")).toEqual(undefined);
  });

  it("Should get an initial state when getInitialState is called", () => {
    const { sut } = makeSut();
    expect(sut.getInitialState()).toEqual({});
  });
});
