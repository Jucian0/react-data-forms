import { Box, Input } from "@chakra-ui/react";
import { Button, Stack, Text } from "@chakra-ui/react";
import { usePersonForm } from "./usePersonForm";
import { useWizard } from "react-use-wizard";
import React from "react";

export function AddressStep() {
  const { previousStep } = useWizard();
  const { register } = usePersonForm();

  return (
    <Box p={10}>
      <Text fontWeight={"bold"}>Address</Text>
      <Input mt={25} placeholder="Street" {...register("address.street")} />
      <Input mt={25} placeholder="City" {...register("address.city")} />
      <Input mt={25} placeholder="Zip Code" {...register("address.zipCode")} />

      <Stack direction="row" spacing={4} justify="center" mt={5}>
        <Button onClick={previousStep}>Previous</Button>
        <Button type="reset">reset</Button>
        <Button type="submit">Submit</Button>
      </Stack>
    </Box>
  );
}
