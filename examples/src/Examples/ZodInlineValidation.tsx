import { createForm } from '@use-form/use-form';
import { Button, Input, Stack, Text } from '@chakra-ui/react';
import { z } from 'zod';

const useLoginForm = createForm({
  initialValues: {
    email: 'juciano',
    password: '12d',
  },
  mode: 'onChange',
});

export function FormZodInlineValidation() {
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
            validate: z.string().email(),
          })}
        />
        {touched.email && <Text color="red.500">{errors.email}</Text>}
        <Input
          mt={15}
          type="password"
          {...register({
            name: 'password',
            validate: z.string().min(8),
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
