import { ChakraProvider } from '@chakra-ui/react';
import 'react-datepicker/dist/react-datepicker.css';
import { FormYupValidation } from './Examples/YupValidation';
import { FormZodValidation } from './Examples/ZodValidation';

export function App() {
  return (
    <ChakraProvider>
      <FormZodValidation />
    </ChakraProvider>
  );
}
