import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { FormGroup, Label, Input, FormFeedback } from "reactstrap";

const FormInput = ({ label, path, type, ...input }) => {
  const { name, regex, required = false } = input;
  const [valid, setValid] = useState(false);
  const methods = useFormContext();
  let reg = "";

  const onValidation = (event) => {
    reg = RegExp(regex, "g");
    let ok = reg.test(event.target.value);
    ok ? setValid(true) : setValid(false);
  };

  return (
    <FormGroup>
      {label && <Label htmlFor={name}>{label || name}</Label>}

      <Input
        {...methods.register(name)}
        id={name}
        type={type}
        pattern={regex}
        required={required}
        onChange={(event) => onValidation(event)}
        valid={valid}
        invalid={!valid}
        disabled={name === "custom_country" ? true : false}
      />

      {name === "confirm_password" && (
        <FormFeedback>
          {methods.formState.errors.confirm_password?.message}
        </FormFeedback>
      )}

      {name === "password" && (
        <FormFeedback>
          {methods.formState.errors.password?.message}
        </FormFeedback>
      )}
      {name === "custom_country" && (
        <FormFeedback>
          {methods.formState.errors.custom_country?.message}
        </FormFeedback>
      )}
    </FormGroup>
  );
};

export default FormInput;
