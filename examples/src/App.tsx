import { ChakraProvider } from "@chakra-ui/react";
import "react-datepicker/dist/react-datepicker.css";
import { FormExample } from "./Examples/createForm/FormExample";
import { FormDataWay } from "./Examples/useForm/FormData";
import React from "react";
import { FormZodValidation } from "./Examples/createForm/ZodValidation";
export function App() {
  return (
    <ChakraProvider>
      <FormZodValidation />
    </ChakraProvider>
  );
}
