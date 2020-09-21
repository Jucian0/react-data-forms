import { Observable } from "./observable"
import dot from 'dot-prop-immutable'
import { ValidationError, Schema as YupSchema } from "yup"

export type InitialErrors<TValues> = { [k in keyof TValues]?: TValues[k] extends object ? any : string }
export type InitialTouched<TValues> = { [k in keyof TValues]?: TValues[k] extends object ? any : string }

// export type CreateReturn<TValues> = {
//    setValues: <TValue extends TValues>(e: { name: string, value: TValue }) => void,
//    setErrors: <TValue extends TValues>(e: { name: string, value: TValue }) => void,
//    setTouched: <TValue extends TValues>(e: { name: string, value: TValue }) => void,
//    context: ReturnType<typeof state>,
//    getValues: () => TValues,
//    getErrors: () => {},
//    getTouched: () => {},
//    onSubmit: (fn: (e: TValues) => void) => void
//    reset: () => void
// }

// type CreateParams<TValues> = {
//    initialValues: TValues,
//    schemaValidation?: any,
//    initialErrors?: InitialErrors<TValues>
//    initialTouched?: InitialTouched<TValues>
// }


// export function create<TValues>({ initialValues, schemaValidation, initialErrors = {}, initialTouched = {} }: CreateParams<TValues>): CreateReturn<TValues> {

//    const context = state({
//       values: initialValues,
//       errors: initialErrors,
//       touched: initialTouched
//    })

//    function setState(path: string, nextValues: TValues) {
//       const state = context.get
//       context.set = dot.set(state, path, nextValues)
//       notify()
//    }

//    function getValues() {
//       return context.get.values
//    }

//    function getTouched() {
//       return context.get.touched
//    }

//    function getErrors() {
//       return context.get.errors
//    }

//    function notify() {
//       context.notify()
//    }

//    function setValues<TValue extends TValues>(e: { name: string, value: TValue }) {
//       if (e.name) {
//          setState('values', dot.set(context.get.values, e.name, e.value))
//       } else {
//          setState('values', Object.assign(context.get.values, e.value))
//       }
//    }

//    function setErrors<TValue extends TValues>(e: { name: string, value: TValue }) {
//       if (e.name) {
//          setState('errors', dot.set(context.get.errors, e.name, e.value))
//       } else {
//          setState('errors', Object.assign(context.get.errors, e.value))
//       }
//    }

//    function setTouched<TValue extends TValues>(e: { name: string, value: TValue }) {
//       if (e.name) {
//          setState('touched', dot.set(context.get.touched, e.name, e.value))
//       } else {
//          setState('touched', Object.assign(context.get.touched, e.value))
//       }
//    }

//    function onSubmit(fn: any) {
//       return fn(getValues())
//    }

//    function reset() {
//       setState('values', initialValues)
//       setState('errors', initialErrors)
//       setState('touched', initialTouched)
//    }

//    return {
//       setValues,
//       setErrors,
//       setTouched,
//       context,
//       getValues,
//       getErrors,
//       getTouched,
//       onSubmit,
//       reset
//    }
// }


interface Test {
   initialValues: any
   initialErrors: any
   initialTouched: any
}
class Create<T extends Test> extends Observable<T>{

   private initialState: Test = Object.assign({})

   constructor(state: T) {
      super(state)
      this.initialState = {
         initialValues: state.initialValues,
         initialErrors: state.initialErrors,
         initialTouched: state.initialTouched
      }
   }

   get getValues() {
      return this.get.initialValues
   }

   get getErrors() {
      return this.get.initialErrors
   }

   get getTouched() {
      return this.get.initialTouched
   }

   set setValues(values) {
      this.set = dot.set(this.get, 'values', values)
   }

   set setErrors(errors) {
      this.set = dot.set(this.get, 'errors', errors)
   }

   set setTouched(touched) {
      this.set = dot.set(this.get, 'touched', touched)
   }

   reset() {
      this.set = {
         values: this.initialState.initialValues,
         errors: this.initialState.initialErrors,
         touched: this.initialState.initialTouched
      }
   }

}

export const create = <T extends Test>(state: T) => new Create(state)