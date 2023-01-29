import { Input } from '@chakra-ui/react';
import { Button, Stack, Text, Box } from '@chakra-ui/react';
import { usePersonForm } from './usePersonForm';
import { useWizard } from 'react-use-wizard';
import * as yup from 'yup';

export function AddressStep() {
  const { previousStep } = useWizard();
  const { register, state } = usePersonForm();
  const { touched, errors } = state;

  return (
    <Box p={10}>
      <Text fontWeight={'bold'}>Address</Text>
      <Input mt={35} placeholder="Street" {...register('address.street')} />
      <Text color="red.500">
        {touched.address?.street && errors.address?.street}
      </Text>
      <Input mt={35} placeholder="City" {...register('address.city')} />
      <Text color="red.500">
        {touched.address?.city && errors.address?.city}
      </Text>
      <Input mt={35} placeholder="Zip Code" {...register('address.zipCode')} />
      <Text color="red.500">
        {touched.address?.zipCode && errors.address?.zipCode}
      </Text>

      <Stack direction="row" spacing={4} justify="center" mt={5}>
        <Button onClick={previousStep}>Previous</Button>
        <Button type="reset">reset</Button>
        <Button type="submit">Submit</Button>
      </Stack>
    </Box>
  );
}
