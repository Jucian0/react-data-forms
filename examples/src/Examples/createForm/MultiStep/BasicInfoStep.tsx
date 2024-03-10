import { Box, Input, Text } from "@chakra-ui/react";
import { usePersonForm } from "./usePersonForm";
import { Button, Stack } from "@chakra-ui/react";
import { useWizard } from "react-use-wizard";
import Select from "react-select";
import ReactDatePicker from "react-datepicker";
import React from "react";

export function BasicInfoStep() {
  const { nextStep } = useWizard();
  const { register, state, setFieldValue, setFieldTouched } = usePersonForm();
  const { touched, errors, values } = state;

  return (
    <Box p={10}>
      <Text fontWeight={"bold"}>Basic Info</Text>
      <ReactDatePicker
        className="border border-gray-200"
        name="date"
        onBlur={() => setFieldTouched("date")}
        onChange={(e) => setFieldValue("date", e)}
        value={values.date.toString()}
      />
      <Select
        placeholder="Profession"
        onChange={(e) => setFieldValue("profession", e)}
        value={values.profession}
        options={[
          { label: "Software developer", value: "1" },
          { label: "Devops", value: "2" },
        ]}
      />
      <Input mt={25} placeholder="First name" {...register("firstName")} />
      <Text color="red.500">{touched.firstName && errors.firstName}</Text>
      <Input mt={25} placeholder="Last name" {...register("lastName")} />
      <Text color="red.500">{touched.lastName && errors.lastName}</Text>
      <Input mt={25} placeholder="Age" type="number" {...register("age")} />
      <Text color="red.500">{touched.age && errors.age}</Text>

      <Stack direction="row" spacing={4} justify="center" mt={5}>
        <Button type="reset">Reset</Button>
        <Button onClick={nextStep}>Next</Button>
      </Stack>
    </Box>
  );
}
