import { ChakraProvider } from "@chakra-ui/react";
import "react-datepicker/dist/react-datepicker.css";
import { FormExample } from "./Examples/FormExample";
import { FormDataWay } from "./Examples/FormData";
export function App() {
  return (
    <ChakraProvider>
      <FormDataWay />
    </ChakraProvider>
  );
}
