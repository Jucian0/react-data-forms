import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import { useState } from 'react';
import * as yup from 'yup';
import './styles.css';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import { createForm, Wrapper } from '@use-form/use-form';
import { z } from 'zod';
import 'react-datepicker/dist/react-datepicker.css';

const zValidatiton = z.object({
  email: z.string().email(),
  password: z.string().max(3),
  agree: z.boolean(),
  gender: z.string(),
});

const useLoginForm = createForm({
  initialValues: {
    email: 'juciano@juciano.com',
    password: '1234567',
    agree: true,
    gender: 'masculine',
    distance: 10,
    location: {
      city: '',
      state: '',
      zip: '',
    },
    select: {
      label: 'Outro',
      value: 'other',
    },
    date: null,
  },
  validationSchema: zValidatiton,
});

const options = [
  { value: 'masculine', label: 'Masculino' },
  { value: 'feminine', label: 'Feminino' },
  { value: 'other', label: 'Outro' },
];

export function FormExampleZod() {
  const {
    state,
    register,
    form,
    setFieldValue,
    setFieldsValue,
    reset,
    resetValues,
    resetTouched,
    resetErrors,
    setFieldsError,
    setFieldsTouched,
    handleSubmit,
  } = useLoginForm({
    mode: 'onChange',
    onChange: (values) => {
      // console.log('onChange', values)
      // return values
    },
  });

  function handleEmail() {
    setFieldValue('email', 'jose@jose.com');
  }

  function handleReset() {
    reset();
  }

  function handleResetValues() {
    resetValues();
  }

  function handleResetTouched() {
    resetTouched();
  }

  function handleResetErrors() {
    resetErrors();
  }

  function handleAllValues() {
    setFieldsValue({
      email: 'jose@jose.com',
      password: '1234567891011121314151618',
      gender: 'female',
      agree: false,
      distance: 10,
      location: {
        city: 'São Paulo',
        state: 'SP',
        zip: '01001-000',
      },
      select: {
        value: 'masculine',
        label: 'Masculino',
      },
      date: null,
    });

    setFieldsTouched((state) => ({
      ...state,
      email: true,
    }));
  }

  function handleSetErrors() {
    setFieldsError((state) => ({
      ...state,
      password: 'Senha deve conter no mínimo 8 caracteres',
    }));
  }

  console.log('state', state.errors);

  return (
    <div>
      <h1>Form</h1>
      <form
        onSubmit={handleSubmit((e, isValid) => {
          // console.log(e, isValid)
        })}
      >
        <input type="text" {...register('email')} />
        <input type="password" autoComplete="on" {...register('password')} />
        <input type="checkbox" {...register('agree')} />
        <select {...register('location.state')}>
          <option value="">Select a state</option>
          <option value="SP">SP</option>
          <option value="RJ">RJ</option>
          <option value="MG">MG</option>
        </select>
        <div {...register('gender')}>
          <input type="radio" name="gender" id="1" value="masculine" />
          Masculine
          <input type="radio" name="gender" id="2" value="female" />
          Female
          <input type="radio" name="gender" id="2" value="other" />
          Other
        </div>
        <input type="text" {...register('location.city')} />
        <input type="text" {...register('location.zip')} />
        <input type="range" {...register('distance')} />

        <Wrapper
          component={Select}
          {...register('select')}
          options={options}
          label="Select"
        />

        <Wrapper component={DatePicker} {...register('date')} />

        <button type="submit">Submit</button>
        <button onClick={handleEmail} type="button">
          Set email
        </button>
        <button onClick={handleAllValues} type="button">
          Set All values
        </button>
        <button onClick={handleReset} type="button">
          Reset
        </button>
        <button onClick={handleResetValues} type="button">
          Reset Values
        </button>
        <button onClick={handleResetTouched} type="button">
          Reset Touched
        </button>
        <button onClick={handleResetErrors} type="button">
          Reset Errors
        </button>
        <button onClick={handleSetErrors} type="button">
          Set Errors
        </button>
      </form>
    </div>
  );
}

function FormComponent2() {
  const { register, form } = useLoginForm();
  return (
    <div>
      <h1>Form2</h1>
      <form>
        <input type="text" {...register('email')} />
        <input type="password" {...register('password')} />
        <input type="text" {...register('location.city')} />
        <input type="text" {...register('location.state')} />
        <input type="text" {...register('location.zip')} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
