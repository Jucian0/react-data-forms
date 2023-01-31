export function debounce<TThis, TFn extends Function>(
   this: TThis,
   fn: TFn,
   wait: number,
   immediate?: boolean
) {
   let timeout: any

   return <TArgs>(...args: Array<TArgs>) => {
      const context = this

      const later = () => {
         timeout = null
         if (!immediate) fn.apply(context, args)
      }

      const callNow = immediate && !timeout
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)

      if (callNow) {
         fn.apply(context, args)
      }
   }
}
