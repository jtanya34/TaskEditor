import React from "react";
import { getCookie } from "../utils/gen_fun";

export const CreateWorkflow = (props) => {
  if (getCookie("login")) return "<CreateWorkflow>";
  props.history.push("/");
  return "";
};
