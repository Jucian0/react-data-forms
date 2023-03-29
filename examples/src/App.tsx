import { ChakraProvider } from '@chakra-ui/react';
import 'react-datepicker/dist/react-datepicker.css';
import { FormZodInlineValidation } from './Examples/ZodInlineValidation';


export function App() {
  return (
    <ChakraProvider>
      <FormZodInlineValidation />
    </ChakraProvider>
  );
}
