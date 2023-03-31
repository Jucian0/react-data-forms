import * as Dot from "./ObjectUtils";

/**
 * A function for subscribing to store updates
 * @template TValues
 * @callback Subscribe
 * @param {TValues} e - The updated state object
 */
type Subscribe<TValues> = (e: TValues) => void;

/**
 * Creates a store with the given initial state
 * @template T - The type of the store's state object
 * @param {T} [initialState={}] - The initial state of the store
 * @returns {Object} - The created store object
 */
export function createStore<T extends {}>(initialState: T = Object.assign({})) {
  let state = initialState;
  let subscribers: Set<Subscribe<T>> = new Set();

  /**
   * Gets the current state of the store
   * @returns {T} - The current state of the store
   */
  function get(): T {
    return state;
  }

  /**
   * Subscribes a function to receive updates when the store's state changes
   * @param {Subscribe<T>} fn - The function to subscribe
   * @returns {Function} - A function for unsubscribing the provided function
   */
  function subscribe(fn: Subscribe<T>) {
    subscribers.add(fn);

    return () => {
      subscribers.delete(fn);
    };
  }

  /**
   * Sets the state of the store to the provided next state
   * @param {T} nextState - The state to set the store to
   * @returns {{notify: Function}} - An object with a `notify` function to trigger a notification of subscribers
   */
  function set(nextState: T) {
    state = nextState;
    return {
      notify: (is = true) => is && notify(),
    };
  }

  /**
   * Patches the state of the store with the provided value at the given path
   * @param {string} path - The path to set the value at
   * @param {*} next - The value to set at the given path
   * @returns {{notify: Function}} - An object with a `notify` function to trigger a notification of subscribers
   */
  function patch(path: string, next: any) {
    const nextState = Dot.set(state, path, next);
    if (typeof nextState !== "undefined") {
      state = nextState;
    } else {
      throw new Error(`The path '${path}' is not defined`);
    }
    return {
      notify: (is = true) => is && notify(),
    };
  }

  /**
   * Gets the value of a property at the given path in the store's state
   * @param {string} path - The path to the desired property
   * @returns {*} - The value of the property at the given path
   */
  function getPropertyValue(path: string) {
    return Dot.get(state, path);
  }

  /**
   * Returns the initial property value located at the specified path using the Dot library.
   * @param {string} path - The path to the property in the initial state object.
   * @returns {*} The initial property value.
   */
  function getInitialPropertyValue(path: string) {
    return Dot.get(initialState, path);
  }

  /**
   * Returns the initial state object.
   * @returns {T} The initial state object.
   */
  function getInitialState(): T {
    return initialState;
  }

  /**
   * Notifies subscribers by calling each of their callback functions with the current state as an argument.
   * @returns {void}
   */
  function notify() {
    subscribers.forEach((fn) => fn(get()));
  }

  return {
    get,
    set,
    patch,
    subscribe,
    getPropertyValue,
    getInitialState,
    getInitialPropertyValue,
  };
}
