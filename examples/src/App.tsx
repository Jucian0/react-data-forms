import { ChakraProvider } from '@chakra-ui/react';
import 'react-datepicker/dist/react-datepicker.css';
import { FormZodInlineValidation } from './Examples/ZodInlineValidation';
import { FormYupValidation } from './Examples/YupValidation';
import { FormZodValidation } from './Examples/ZodValidation';
import { FormExample } from './Examples/FormExample';

export function App() {
  return (
    <ChakraProvider>
      <FormExample />
    </ChakraProvider>
  );
}
