import { FormEvent } from "react";

export interface IData<T> {
  data: T[];
}
export interface IDataObj {
  dta: string;
}
type SubmitHandler<T, U> = {
  (e: FormEvent, method: T, dta: IDataObj): Promise<U>;
  (
    e: FormEvent,
    method: T,
    dta: IDataObj,
    newDta?: T | null,
    cParam?: T | T[] | undefined
  ): Promise<U>;
};
export const onSumbitHandler: SubmitHandler<string, void> = async (
  e,
  method,
  dta,
  newDta = null,
  cParam = undefined
) => {
  const newobj = newDta ? { ...dta, newDta, cParam } : dta;

  e.preventDefault();
  const res = await fetch(`/api/crud/${cParam}`, {
    method: method,
    body: JSON.stringify(newobj),
    headers: {
      "Content-Type": "application.json",
    },
  });

  const data = await res.json();
  //for debugging
  console.log(data);

  if (!res.ok) {
    throw new Error("something went wrong");
  }
};
