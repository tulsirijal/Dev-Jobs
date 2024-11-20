"use client";
import { useFormStatus } from "react-dom";
import LoadingBtn from "./LoadingBtn";

export default function FormSubmitBtn(
  props: React.ButtonHTMLAttributes<HTMLButtonElement>,
) {
  const { pending } = useFormStatus();
  return (
    <LoadingBtn loading={pending} {...props} type="submit" />
  );
}
