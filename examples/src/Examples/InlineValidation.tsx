import { createForm } from '@use-form/use-form';
import { Button, Input, Stack, Text } from '@chakra-ui/react';
import * as yup from 'yup';

const useLoginForm = createForm({
  initialValues: {
    email: 'juciano',
    password: '12d',
  },
  mode: 'onSubmit',
});

export function FormInlineValidation() {
  const { register, handleReset, handleSubmit, state } = useLoginForm();
  const { errors, touched } = state;

  function onSubmit(e: any) {
    console.log(e);
  }

  function onReset(e: any) {
    console.log(e);
  }

  return (
    <Stack p={30}>
      <h1>Form</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        onReset={handleReset(onReset)}
        noValidate
      >
        <Input
          mt={15}
          type="email"
          {...register({
            name: 'email',
            validate: yup.string().email().required(),
          })}
        />
        {touched.email && <Text color="red.500">{errors.email}</Text>}
        <Input
          mt={15}
          type="password"
          {...register({
            name: 'password',
            validate: yup.string().min(8).required(),
          })}
        />
        {touched.password && <Text color="red.500">{errors.password}</Text>}
        <Stack direction="row" spacing={4} justify="center" mt={5}>
          <Button type="reset">Reset</Button>
          <Button type="submit">Submit</Button>
        </Stack>
      </form>
    </Stack>
  );
}
