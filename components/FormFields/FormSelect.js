import React from "react";
import { useFormContext } from "react-hook-form";
import { FormGroup, Label, Input } from "reactstrap";

const FormSelect = ({ label, options, ...rest }) => {
  const methods = useFormContext();
  const { name } = rest;

  const handleClick = (event) => {
    //console.log("Se hizo un Click", value);
    if (event.target.value === "other") {
      const form = event.target.form;
      const index = Array.prototype.indexOf.call(form, event.target);
      console.log(index);
      form.elements[index + 7].focus();
      form.elements[index + 7].removeAttribute("disabled");
      event.preventDefault();
    } else {
      const form = event.target.form;
      const index = Array.prototype.indexOf.call(form, event.target);
      form.elements[index + 7].setAttribute("disabled", "");
      event.preventDefault();
    }
  };

  if (!options) return null;
  return (
    <FormGroup>
      <Label htmlFor={name}>{label || name}</Label>
      <Input {...methods.register(name)} type="select" id={name} {...rest}>
        {options.map(({ option, ...opt }, index) => (
          <option
            key={index}
            {...opt}
            onClick={(e) => {
              handleClick(e);
            }}
          >
            {option}
          </option>
        ))}
      </Input>
    </FormGroup>
  );
};

export default FormSelect;
