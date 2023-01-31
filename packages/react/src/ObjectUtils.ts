function propToPath(prop: any) {
   return prop.replace(/["|']|\]/g, '').split(/\.|\[/)
}

export function set<T extends { [k: string]: any }>(
   defaultObject: T,
   prop: string,
   value: any
) {
   const paths = propToPath(prop)

   function setPropertyValue(object: Partial<T> = {}, index: number) {
      let clone: any = Object.assign({}, object)

      if (paths.length > index) {
         if (Array.isArray(object)) {
            paths[index] = parseInt(paths[index])
            clone = object.slice() as any
         }
         clone[paths[index]] = setPropertyValue(object[paths[index]], index + 1)

         return clone
      }
      return value
   }

   return setPropertyValue(defaultObject, 0)
}

export function get<T extends { [k: string]: any }>(
   defaultObject: T,
   prop: string
) {
   const paths: Array<string> = propToPath(prop)

   function getPropertyValue(
      object: { [k: string]: any } = {},
      index: number
   ): any {
      const clone: any = Object.assign({}, object)
      if (paths.length === index + 1) {
         if (Array.isArray(clone[paths[index]])) {
            return clone[paths[index]].slice()
         } else if (typeof clone[paths[index]] === 'object') {
            if (clone[paths[index]] === null) {
               return null
            }
            return Object.assign({}, clone[paths[index]])
         }
         return clone[paths[index]]
      }
      return getPropertyValue(object[paths[index]], index + 1)
   }

   return getPropertyValue(defaultObject, 0)
}

export function isEmpty(obj: any) {
   for (const key in obj) {
      if (Object.hasOwnProperty.call(obj, key)) {
         return false
      }
   }
   return true
}
