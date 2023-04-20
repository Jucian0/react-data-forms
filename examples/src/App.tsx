import { ChakraProvider } from "@chakra-ui/react";
import "react-datepicker/dist/react-datepicker.css";
import { FormZodInlineValidation } from "./Examples/ZodInlineValidation";
import { MultiForm } from "./Examples/MultiStep/Form";

export function App() {
  return (
    <ChakraProvider>
      <MultiForm />
    </ChakraProvider>
  );
}
