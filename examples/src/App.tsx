import { ChakraProvider } from "@chakra-ui/react";
import "react-datepicker/dist/react-datepicker.css";
import { FormZodInlineValidation } from "./Examples/ZodInlineValidation";
import { MultiForm } from "./Examples/MultiStep/Form";
import { FormDataWay } from "./Examples/FormData";

export function App() {
  return (
    <ChakraProvider>
      <FormDataWay />
    </ChakraProvider>
  );
}
