import React from "react";
import { getCookie } from "../utils/gen_fun";

export const Workflows = (props) => {
  if (getCookie("login")) return "<workflows>";
  props.history.push("/");
  return "";
};
