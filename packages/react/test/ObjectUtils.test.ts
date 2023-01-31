import * as Dot from './../src/ObjectUtils'

describe('Dot set', () => {
   it('Should set a value', () => {
      const obj = (value: string) => ({ foo: value })
      const newValue = 'baz'
      const newObj = Dot.set(obj('bar'), 'foo', newValue)
      expect(newObj).toEqual(obj(newValue))
   })

   it('Should set a value in an array', () => {
      const obj = (value: string) => ({ foo: [value] })
      const newValue = 'bar'
      const newObj = Dot.set(obj('bar'), 'foo[0]', newValue)
      expect(newObj).toEqual(obj(newValue))
   })

   it('Should set a value in an array with a number', () => {
      const newValue = 'baz'
      const newObj = Dot.set({ foo: [] }, 'foo.1', newValue)
      expect(newObj).toEqual({ foo: [undefined, newValue] })
   })

   it('Should set a value in a nested object', () => {
      const newValue = 'baz'
      const newObj = Dot.set({ foo: { bar: 'bar' } }, 'foo.bar', newValue)
      expect(newObj).toEqual({ foo: { bar: newValue } })
   })
})

describe('Dot get', () => {
   it('Should get a value', () => {
      const obj = { foo: 'bar' }
      expect(Dot.get(obj, 'foo')).toEqual('bar')
   })

   it('Should get a value in an array', () => {
      const obj = { foo: ['bar'] }
      expect(Dot.get(obj, 'foo[0]')).toEqual('bar')
   })

   it('Should get a value in an array with a number', () => {
      const obj = { foo: [undefined, 'bar'] }
      expect(Dot.get(obj, 'foo.1')).toEqual('bar')
   })

   it('Should get a value in a nested object', () => {
      const obj = { foo: { bar: 'bar' } }
      expect(Dot.get(obj, 'foo.bar')).toEqual('bar')
   })

   it('Should return undefined when property does not exist', () => {
      const obj = { foo: 'bar' }
      expect(Dot.get(obj, 'bar')).toEqual(undefined)
   })

   it('Should return undefined when property does not exist in an array', () => {
      const obj = { foo: ['bar'] }
      expect(Dot.get(obj, 'foo[1]')).toEqual(undefined)
   })
})
