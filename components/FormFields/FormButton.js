import React from "react";
import { FormGroup, Label, Button } from "reactstrap";

const FormButton = ({ label, ...rest }) => {
  return (
    <FormGroup className="formBtn">
      <Button outline color="primary" size="sm">
        {label}
      </Button>
    </FormGroup>
  );
};

export default FormButton;
