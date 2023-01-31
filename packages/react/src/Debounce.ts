/**
 * Returns a debounced version of the passed function that will only be executed after `wait` milliseconds
 * have elapsed since the last time the debounced function was invoked.
 *
 * @template TThis The type of `this` to be used for the function.
 * @template TFn The type of function to debounce.
 * @param this The `this` context for the function.
 * @param fn The function to debounce.
 * @param wait The number of milliseconds to wait before executing the debounced function.
 * @param [immediate=false] A boolean indicating whether the function should be executed immediately
 * before the debounce timer starts.
 * @returns A debounced version of the passed function.
 */
export function debounce<TThis, TFn extends Function>(
  this: TThis,
  fn: TFn,
  wait: number,
  immediate?: boolean
) {
  let timeout: any;

  return <TArgs>(...args: Array<TArgs>) => {
    const context = this;

    const later = () => {
      timeout = null;
      if (!immediate) fn.apply(context, args);
    };

    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);

    if (callNow) {
      fn.apply(context, args);
    }
  };
}
