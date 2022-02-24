import { Builder } from "@vbs/mini-request-utils";

export const ping = () => {
  return "success";
};

export const catchBuilder = () => {
  return Builder;
};
