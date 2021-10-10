import { useEffect } from 'react'
import { isCheckbox, isParsableToNumber } from './Utils'
import { get } from './ObjectPath'
import { FormValuesState } from '../StateManagement/FormValuesState'
import { Validate } from '../Validation/Validate'
import { CreateField, FieldType } from './CreateField'

type Options = {
   mode: 'onBlur' | 'onChange' | 'onSubmit'
   validateOn?: 'onBlur' | 'onChange' | 'onSubmit'
}

/**
 * CREATE FORM
 *
 * @param {Function} function - This function receives a `CreateField` function as a parameter, and returns a custom hook.
 * @example const useForm = create(register => ({
 *    name: register('') }),
 *    email => ({ email: register('')
 * })) `or`
 *
 * const useForm = create(register => ({
 *    name: register(['', required('This field is required'),...more validators]),
 *    email: register(['', required('This field is required',...more validators)])
 * }))
 */
export function create(fn: Function) {
   const state = new FormValuesState({})
   const validate = new Validate()

   return (options: Options) => {
      const fields = fn(CreateField)

      function register(name: string, type?: FieldType) {
         const field = get(fields, name)

         function onChange(event: any) {
            if (isCheckbox(field.type)) {
               return state.setFieldValue(name, event.target.checked)
            }
            const value = isParsableToNumber(event.target.value)
               ? parseInt(event.target.value, 10)
               : event.target.value

            return state.setFieldValue(name, value)
         }

         function handleValidate(event: any) {
            console.log(
               validate.validate(event.target.value, field.validations)
            )
         }

         useEffect(() => {
            if (field.ref.current) {
               field.ref.current.addEventListener('input', (e: any) => {
                  onChange(e)
                  handleValidate(e)
               })
            }

            return () => {
               field.ref.current.removeEventListener('input', (e: any) => {
                  onChange(e)
                  handleValidate(e)
               })
            }
         }, [field.ref])

         useEffect(() => {
            if (field.ref.current && type === 'radio') {
               Array.from(
                  (field.ref.current as HTMLDivElement).getElementsByTagName(
                     'input'
                  )
               ).forEach((radio: any) => {
                  radio.checked = radio.value == field.defaultChecked
               })
            }
         }, [field.ref])

         return field
      }

      return {
         state: state.getFormValues(),
         register
      }
   }
}