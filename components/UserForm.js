import { useForm, FormProvider } from "react-hook-form";
import * as Fields from "./FormFields";
import { Form, Alert } from "reactstrap";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Link from "next/link";

const schema = yup.object().shape({
  custom_country: yup.string().when("country", {
    is: "other",
    then: yup
      .string()
      .required("Country is Required")
      .matches(/^((?!argentina).)*$/, "palabra no aceptada"),
  }),
  password: yup.string().required("Password is required"),
  confirm_password: yup
    .string()
    .required()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const UserForm = (fields) => {
  const baseURL = "http://localhost:3000";
  const { title, inputs, path } = fields;
  const [success, setSuccess] = useState(false);
  const [err, setErr] = useState(false);
  const methods =
    path === "register"
      ? useForm({ resolver: yupResolver(schema) })
      : useForm();

  const hideSuccess = () => setSuccess(false);
  const hideError = () => setErr(false);

  if (!fields) return null;

  const onSubmit = async (values) => {
    console.log("Desde onSubmit", values);
    const url = `${baseURL}/${path}`;
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    };
    try {
      const res = await fetch(url, requestOptions);
      res.ok ? setSuccess(true) : setErr(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <h1>{title}</h1>
      <Alert color="success" isOpen={success} toggle={hideSuccess}>
        {path === "login" ? "Usuario Logeado" : "Usuario Registrado con Exito"}
      </Alert>
      <Alert color="danger" isOpen={err} toggle={hideError}>
        {path === "login"
          ? "Usuario o Contraseña incorrecta"
          : "Ocurrio un Error"}
      </Alert>
      <FormProvider {...methods}>
        <Form onSubmit={methods.handleSubmit(onSubmit)}>
          {inputs.map(({ type, ...input }, index) => {
            let __typename = "";
            switch (type) {
              case "checkbox":
                __typename = "FormCheckbox";
                break;
              case "select":
                __typename = "FormSelect";
                break;
              case "button":
                __typename = "FormButton";
                break;
              case "link":
                return (
                  <a key={index} href={input.to}>
                    {input.label}
                  </a>
                );
              default:
                __typename = "FormInput";
                break;
            }
            const Field = Fields[__typename];

            if (!__typename) return null;

            return <Field key={index} type={type} path={path} {...input} />;
          })}
        </Form>
      </FormProvider>
      <Link href="/">
        <a>Go back home</a>
      </Link>
    </>
  );
};

export default UserForm;
