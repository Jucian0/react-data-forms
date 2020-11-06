// import {act,  fireEvent,screen } from "@testing-library/react"
import { fireEvent, screen, waitFor } from "@testing-library/react"
import { act } from "react-test-renderer"
import { setup } from "../utils"

describe('Set initial options', () => {
  test('should set initial properties', async () => {
    const hookParams = {
      initialValues: {
        name: 'value-1'
      },
      initialErrors: {
        name: 'invalid value'
      },
      initialTouched: {
        name: false
      },
      isControlled: true,
    }

    const inputParams = {
      name: 'name',
      type: 'text',
    }

    const result = setup({ hookParams, inputParams })

    expect(result.state).toEqual({
      values: {
        name: 'value-1'
      },
      errors: {
        name: 'invalid value'
      },
      touched: {
        name: false
      },
    })
  })
})

describe('Test input', () => {

  it("should change text input's value when dispatch input event", async () => {
    const hookParams = {
      initialValues: { text: 'my-name-test' },
      isControlled: true,
    }

    const inputParams = {
      name: 'text',
      type: 'text',
    }

    const result = setup({ hookParams, inputParams })

    const input = screen.getByTestId(inputParams.name)

    act(() => {
      fireEvent.input(input, { target: { value: 'new-name-test' } })
    })

    await waitFor(() => {
      expect(result.state.values).toEqual({ text: 'new-name-test' })
    })
  })

  it("should change checkbox input's value when dispatch change event", async () => {
    const hookParams = {
      initialValues: { checkbox: false },
      isControlled: true,
    }

    const inputParams = {
      name: 'checkbox',
      type: 'checkbox',
    }

    const result = setup({ hookParams, inputParams })

    const input = screen.getByTestId(inputParams.name)

    act(() => {
      fireEvent.change(input, { target: { checked: true } })
    })

    await waitFor(() => {
      expect(result.state.values).toEqual({ checkbox: true })
    })
  })

  it("should change radio input's value when dispatch change event", async () => {
    const hookParams = {
      initialValues: { radio: 'radio-1' },
      isControlled: true,
    }

    const inputParams = {
      name: 'radio',
      type: 'radio',
      value: 'radio',
    }

    const result = setup({ hookParams, inputParams })

    const input = screen.getByTestId(inputParams.name)

    act(() => {
      fireEvent.change(input, { target: { checked: true } })
    })

    await waitFor(() => {
      expect(result.state.values).toEqual({ radio: 'radio' })
    })
  })

})