import React from "react";
import Form from "../components/UserForm";
import FourOhFour from "./404";

const Page = ({ data, path }) => {
  data = path ? { ...data, path: path } : null;
  return (
    <div className={path}>
      {data === null ? <FourOhFour /> : <Form {...data} />}
    </div>
  );
};

Page.getInitialProps = async (ctx) => {
  const path = ctx.query.path;
  try {
    const res = await fetch(`http://localhost:3000/configuration/${path}`);
    const json = await res.json();

    if (!res.ok) throw { status: res.status, statusText: res.statusText };

    return { data: json, path: path };
  } catch (err) {
    let message = err.statusText || "Error 404";
    console.log("Error:", message);
    return { data: null, path: null };
  }
};

export default Page;
