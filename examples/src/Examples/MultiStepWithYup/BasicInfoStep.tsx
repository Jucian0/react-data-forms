import { Box, Input, Text } from '@chakra-ui/react';
import { usePersonForm } from './usePersonForm';
import { Button, Stack } from '@chakra-ui/react';
import { useWizard } from 'react-use-wizard';
import * as yup from 'yup';

export function BasicInfoStep() {
  const { previousStep, nextStep } = useWizard();
  const { register, state } = usePersonForm();
  const { touched, errors } = state;

  return (
    <Box p={10}>
      <Text fontWeight={'bold'}>Basic Info</Text>
      <Input mt={25} placeholder="First name" {...register('firstName')} />
      <Text color="red.500">{touched.firstName && errors.firstName}</Text>
      <Input mt={25} placeholder="Last name" {...register('lastName')} />
      <Text color="red.500">{touched.lastName && errors.lastName}</Text>
      <Input mt={25} placeholder="Age" type="number" {...register('age')} />
      <Text color="red.500">{touched.age && errors.age}</Text>

      <Stack direction="row" spacing={4} justify="center" mt={5}>
        <Button type="reset">Reset</Button>
        <Button onClick={nextStep}>Next</Button>
      </Stack>
    </Box>
  );
}
