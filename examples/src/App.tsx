import { ChakraProvider } from "@chakra-ui/react";
import "react-datepicker/dist/react-datepicker.css";
import { FormDataWay } from "./Examples/FormData";
import { FormYupValidation } from "./Examples/YupValidation";
import { FormZodValidation } from "./Examples/ZodValidation";

export function App() {
  return (
    <ChakraProvider>
      <FormDataWay />
    </ChakraProvider>
  );
}
