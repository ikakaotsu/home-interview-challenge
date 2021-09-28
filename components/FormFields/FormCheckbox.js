import React from "react";
import { useFormContext } from "react-hook-form";
import { FormGroup, Label, Input } from "reactstrap";

const FormCheckbox = ({ label, ...rest }) => {
  const methods = useFormContext();
  const { name } = rest;
  return (
    <FormGroup check>
      <Label check>
        <Input
          {...methods.register(name)}
          id={name}
          type="checkbox"
          {...rest}
        />{" "}
        {label || name}
      </Label>
    </FormGroup>
  );
};

export default FormCheckbox;
