import { ChakraProvider } from "@chakra-ui/react";
import "react-datepicker/dist/react-datepicker.css";
import { FormExample } from "./Examples/FormExample";
export function App() {
  return (
    <ChakraProvider>
      <FormExample />
    </ChakraProvider>
  );
}
