import * as Dot from './ObjectUtils';

type Subscribe<TValues> = (e: TValues) => void;

export function createStore<T extends {}>(initialState: T = Object.assign({})) {
  let state = initialState;
  let subscribers: Set<Subscribe<T>> = new Set();

  function get(): T {
    return state;
  }

  function subscribe(fn: Subscribe<T>) {
    subscribers.add(fn);

    return () => {
      subscribers.delete(fn);
    };
  }

  function set(nextState: T) {
    state = nextState;
    return {
      notify: (is = true) => is && notify(),
    };
  }

  function patch(path: string, next: any) {
    const nextState = Dot.set(state, path, next);
    if (typeof nextState !== 'undefined') {
      state = nextState;
    } else {
      throw new Error(`The path '${path}' is not defined`);
    }
    return {
      notify: (is = true) => is && notify(),
    };
  }

  function getPropertyValue(path: string) {
    return Dot.get(state, path);
  }

  function getInitialPropertyValue(path: string) {
    return Dot.get(initialState, path);
  }

  function getInitialState(): T {
    return initialState;
  }

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
