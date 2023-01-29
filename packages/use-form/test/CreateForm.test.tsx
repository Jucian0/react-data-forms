import each from 'jest-each';
import { faker } from '@faker-js/faker';
import { createForm } from './../src/CreateForm';
import { CreateFormArgs } from '../src/Types';
import { changeInput } from './Utils';
import { waitFor, render, fireEvent, renderHook } from '@testing-library/react';
import * as yup from 'yup';

function makeMockedValues() {
  return {
    name: faker.name.firstName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
}

function makeCreateFormSut(
  args: CreateFormArgs<any> = {},
  mode = 'onChange' as any
) {
  const state = {};

  const spy = jest.fn();
  const useForm = createForm({ ...args, mode });

  const { result: sut } = renderHook(() =>
    useForm({ onChange: spy, onBlur: spy, onSubmit: spy })
  );
  function Component() {
    const form = sut.current;
    Object.assign(state, form);

    return (
      <form onSubmit={form.handleSubmit(spy)} onReset={form.handleReset(spy)}>
        <input data-testid="name" {...form.register('name')} />
        <input data-testid="email" {...form.register('email')} />
        <input data-testid="password" {...form.register('password')} />
        <button type="submit" data-testid="submit">
          Submit
        </button>
        <button type="reset" data-testid="reset">
          reset
        </button>
      </form>
    );
  }

  const element = render(<Component />);

  return {
    element,
    spy,
    sut,
  };
}

describe('CreateForm', () => {
  each(['onChange', 'debounce']).it(
    'Should init the hook with the initial properties - [%s] mode',
    (mode) => {
      const initialValues = makeMockedValues();
      const form = makeCreateFormSut({ initialValues }, mode);
      expect(form.sut.current.state.values).toEqual(initialValues);
    }
  );

  each(['onChange', 'debounce']).it(
    'Should update the hook when run setFieldValue - [%s] mode',
    async (mode) => {
      const initialValues = makeMockedValues();
      const form = makeCreateFormSut({ initialValues }, mode);
      const newValue = faker.name.firstName();
      form.sut.current.setFieldValue('name', newValue);

      await waitFor(() => {
        expect(form.sut.current.state.values.name).toEqual(newValue);
      });
    }
  );

  each(['onChange', 'debounce']).it(
    'Should update the hook when run setFieldError - [%s] mode',
    async (mode) => {
      const initialValues = makeMockedValues();
      const form = makeCreateFormSut({ initialValues }, mode);
      const newError = faker.name.firstName();
      form.sut.current.setFieldError('name', newError);

      await waitFor(() => {
        expect(form.sut.current.state.errors.name).toEqual(newError);
      });
    }
  );

  each(['onChange', 'debounce']).it(
    'Should update the hook when run setFieldTouched - [%s] mode',
    async (mode) => {
      const initialValues = makeMockedValues();
      const form = makeCreateFormSut({ initialValues }, mode);
      form.sut.current.setFieldTouched('name', true);

      await waitFor(() => {
        expect(form.sut.current.state.touched.name).toEqual(true);
      });
    }
  );

  each(['onChange', 'debounce']).it(
    'Should update the hook when run setFieldsValue - [%s] mode',
    async (mode) => {
      const initialValues = makeMockedValues();
      const newValues = makeMockedValues();
      const form = makeCreateFormSut({ initialValues }, mode);
      form.sut.current.setFieldsValue(newValues);

      await waitFor(() => {
        expect(form.sut.current.state.values).toEqual(newValues);
      });
    }
  );

  each(['onChange', 'debounce']).it(
    'Should update the hook when run setFieldsError - [%s] mode',
    async (mode) => {
      const initialValues = makeMockedValues();
      const form = makeCreateFormSut({ initialValues }, mode);
      const newErrors = makeMockedValues();
      form.sut.current.setFieldsError(newErrors);

      await waitFor(() => {
        expect(form.sut.current.state.errors).toEqual(newErrors);
      });
    }
  );

  each(['onChange', 'debounce']).it(
    'Should update the hook when run setFieldsTouched - [%s] mode',
    async (mode) => {
      const initialValues = makeMockedValues();
      const form = makeCreateFormSut({ initialValues }, mode);
      const newTouched = {
        name: true,
        email: true,
        password: true,
      };
      form.sut.current.setFieldsTouched(newTouched);

      await waitFor(() => {
        expect(form.sut.current.state.touched).toEqual(newTouched);
      });
    }
  );

  each(['onChange', 'debounce']).it(
    'Should update the hook when run resetErrors - [%s] mode',
    async (mode) => {
      const initialValues = makeMockedValues();
      const form = makeCreateFormSut({ initialValues }, mode);
      const newErrors = makeMockedValues();
      form.sut.current.setFieldsError(newErrors);

      await waitFor(() => {
        expect(form.sut.current.state.errors).toEqual(newErrors);
      });
      form.sut.current.resetErrors();
      await waitFor(() => {
        expect(form.sut.current.state.errors).toEqual({});
      });
    }
  );

  each(['onChange', 'debounce']).it(
    'Should update the hook when run resetValues - [%s] mode',
    async (mode) => {
      const initialValues = makeMockedValues();
      const form = makeCreateFormSut({ initialValues }, mode);
      const newValues = makeMockedValues();
      form.sut.current.setFieldsValue(newValues);

      await waitFor(() => {
        expect(form.sut.current.state.values).toEqual(newValues);
      });
      form.sut.current.resetValues();
      await waitFor(() => {
        expect(form.sut.current.state.values).toEqual(initialValues);
      });
    }
  );

  each(['onChange', 'debounce']).it(
    'Should update the hook when run resetTouched - [%s] mode',
    async (mode) => {
      const initialValues = makeMockedValues();
      const form = makeCreateFormSut({ initialValues }, mode);
      const newTouched = {
        name: true,
        email: true,
        password: true,
      };
      form.sut.current.setFieldsTouched(newTouched);
      await waitFor(() => {
        expect(form.sut.current.state.touched).toEqual(newTouched);
      });

      form.sut.current.resetTouched();

      await waitFor(() => {
        expect(form.sut.current.state.touched).toEqual({});
      });
    }
  );

  each(['onChange', 'debounce']).it(
    'Should call handleReset function when run onReset - [%s] mode',
    async (mode) => {
      const initialValues = makeMockedValues();
      const form = makeCreateFormSut({ initialValues }, mode);
      const resetButton = form.element.getByTestId('reset');

      fireEvent.click(resetButton);

      await waitFor(() => {
        expect(form.spy).toHaveBeenCalledWith(initialValues);
      });
    }
  );

  each(['onChange', 'debounce']).it(
    'Should call handleSubmit function when run onSubmit with errors - [%s] mode',
    async (mode) => {
      const initialValues = makeMockedValues();
      const initialErrors = {
        name: faker.name.firstName(),
      };

      const form = makeCreateFormSut({ initialValues, initialErrors }, mode);
      const submitButton = form.element.getByTestId('submit');

      fireEvent.click(submitButton);
      // since we are passing an error validation we assume the form is invalid
      const submittedValues = [initialValues, false];

      await waitFor(() => {
        expect(form.spy).toHaveBeenCalledWith(...submittedValues);
      });
    }
  );

  each(['onChange', 'debounce']).it(
    'Should call onChange function when any change event happens - [%s] mode',
    async (mode) => {
      const initialValues = makeMockedValues();
      const form = makeCreateFormSut({ initialValues }, mode);
      const input = form.element.getByTestId('name');
      const nextValue = faker.name.firstName();
      const nextValues = {
        ...initialValues,
        name: nextValue,
      };

      changeInput(input)(nextValue);

      await waitFor(() => {
        expect(form.spy).toHaveBeenCalledWith(nextValues);
      });
    }
  );

  each(['onChange', 'debounce']).it(
    'Should call onBlur function when any blur event happens - [%s] mode',
    async (mode) => {
      const initialValues = makeMockedValues();
      const form = makeCreateFormSut({ initialValues }, mode);
      const input = form.element.getByTestId('name');
      fireEvent.blur(input);

      await waitFor(() => {
        expect(form.spy).toHaveBeenCalledWith(initialValues);
      });
    }
  );

  each(['onChange', 'debounce']).it(
    'Should update hook state when a change event happens - [%s] mode',
    async (mode) => {
      const initialValues = makeMockedValues();
      const form = makeCreateFormSut({ initialValues }, mode);
      const input = form.element.getByTestId('name');
      const nextValue = faker.name.firstName();
      const nextValues = {
        ...initialValues,
        name: nextValue,
      };

      changeInput(input)(nextValue);

      await waitFor(() => {
        expect(form.sut.current.state.values).toEqual(nextValues);
      });
    }
  );

  each(['onChange', 'debounce']).it(
    'Should update hook state when a blur event happens - [%s] mode',
    async (mode) => {
      const initialValues = makeMockedValues();
      const form = makeCreateFormSut({ initialValues }, mode);
      const input = form.element.getByTestId('name');
      fireEvent.blur(input);

      await waitFor(() => {
        expect(form.sut.current.state.touched).toEqual({ name: true });
      });
    }
  );
});

function makeRegisterByObjectSut(
  args: CreateFormArgs<any> = {},
  mode = 'onChange' as any,
  validate?: any
) {
  const state = {};

  const spy = jest.fn();
  const useForm = createForm({ ...args, mode });

  const { result: sut } = renderHook(() =>
    useForm({ onChange: spy, onBlur: spy, onSubmit: spy })
  );
  function Component() {
    const form = sut.current;
    Object.assign(state, form);

    return (
      <form onSubmit={form.handleSubmit(spy)} onReset={form.handleReset(spy)}>
        <input
          data-testid="name"
          {...form.register({ name: 'name', validate })}
        />
        <input
          data-testid="email"
          {...form.register({ name: 'email', validate })}
        />
        <input
          data-testid="password"
          {...form.register({ name: 'password' })}
        />
        <button type="submit" data-testid="submit">
          Submit
        </button>
        <button type="reset" data-testid="reset">
          reset
        </button>
      </form>
    );
  }

  const element = render(<Component />);

  return {
    element,
    spy,
    sut,
  };
}

describe('Register by object', () => {
  each(['onChange', 'debounce']).it(
    'Should init the hook with the initial properties - [%s] mode',
    (mode) => {
      const initialValues = makeMockedValues();
      const form = makeRegisterByObjectSut({ initialValues }, mode);
      expect(form.sut.current.state.values).toEqual(initialValues);
    }
  );

  each(['onChange', 'debounce']).it(
    'Should update the hook when dispatch a change event - [%s] mode',
    async (mode) => {
      const initialValues = makeMockedValues();
      const form = makeRegisterByObjectSut({ initialValues }, mode);
      const newValue = faker.name.firstName();
      const input = form.element.getByTestId('name');

      changeInput(input)(newValue);

      await waitFor(() => {
        expect(form.sut.current.state.values.name).toEqual(newValue);
      });
    }
  );
});

describe('Inline validation', () => {
  each(['onChange', 'debounce']).it(
    'Should update errors state when dispatch a change event - [%s] mode',
    async (mode) => {
      const initialValues = makeMockedValues();
      const errorMessage = faker.datatype.string();
      const form = makeRegisterByObjectSut(
        { initialValues },
        mode,
        yup.string().min(10, errorMessage)
      );
      const newValue = faker.datatype.string(5);
      const input = form.element.getByTestId('name');

      changeInput(input)(newValue);

      await waitFor(() => {
        expect(form.sut.current.state.errors.name).toEqual(errorMessage);
      });
    }
  );

  it('Should update errors state when run onSubmit with errors - onSubmit mode', async () => {
    const initialValues = makeMockedValues();
    const errorMessage = faker.datatype.string();

    const form = makeRegisterByObjectSut(
      { initialValues },
      'onSubmit',
      yup.string().min(10, errorMessage)
    );

    const newValue = faker.datatype.string(5);
    const input = form.element.getByTestId('name');

    changeInput(input)(newValue);

    const submitButton = form.element.getByTestId('submit');

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(form.sut.current.state.errors.name).toEqual(errorMessage);
    });
  });

  each(['onChange', 'debounce']).it(
    'Should update errors state when dispatch a change event - [%s] mode',
    async (mode) => {
      const initialValues = makeMockedValues();
      const form = makeRegisterByObjectSut(
        { initialValues, validationSchema },
        mode
      );
      const newValue = faker.datatype.string(5);
      const input = form.element.getByTestId('name');

      changeInput(input)(newValue);

      await waitFor(() => {
        expect(form.sut.current.state.errors.name).toEqual(errorMessage);
      });
    }
  );

  it('Should errors state when run onSubmit with errors - onSubmit mode', async () => {
    const initialValues = makeMockedValues();

    const form = makeRegisterByObjectSut(
      { initialValues, validationSchema },
      'onSubmit'
    );

    const newValue = faker.datatype.string(5);
    const input = form.element.getByTestId('name');

    changeInput(input)(newValue);

    const submitButton = form.element.getByTestId('submit');

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(form.sut.current.state.errors.name).toEqual(errorMessage);
    });
  });
});

const errorMessage = faker.datatype.string();
const validationSchema = yup.object({
  name: yup.string().min(10, errorMessage).required(errorMessage),
  email: yup.string().email(errorMessage),
  password: yup.string().min(12, errorMessage),
});

describe('SchemaValidation', () => {
  each(['onChange', 'debounce']).it(
    'Should update errors state when dispatch a change event - [%s] mode',
    async (mode) => {
      const initialValues = makeMockedValues();
      const form = makeRegisterByObjectSut(
        { initialValues, validationSchema },
        mode
      );
      const newValue = faker.datatype.string(5);
      const input = form.element.getByTestId('name');

      changeInput(input)(newValue);

      await waitFor(() => {
        expect(form.sut.current.state.errors.name).toEqual(errorMessage);
      });
    }
  );

  it('Should errors state when run onSubmit with errors - onSubmit mode', async () => {
    const initialValues = makeMockedValues();

    const form = makeRegisterByObjectSut(
      { initialValues, validationSchema },
      'onSubmit'
    );

    const newValue = faker.datatype.string(5);
    const input = form.element.getByTestId('name');

    changeInput(input)(newValue);

    const submitButton = form.element.getByTestId('submit');

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(form.sut.current.state.errors.name).toEqual(errorMessage);
    });
  });
});
