import { FormEvent } from "react";

export interface IData<T> {
  data: T[];
}
export interface IDataObj {
  dta: string;
}

export async function onSumbitHandler(
  e: FormEvent,
  method: string,
  dataObj: IDataObj,
  newData: string | null = null,
  cParam: string | string[] | undefined = undefined
) {
  const newobj = newData ? { ...dataObj, newData, cParam } : dataObj;

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
}
