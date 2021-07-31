import { useRouter } from "next/dist/client/router";
import { FormEvent, useRef } from "react";
import { onSumbitHandler } from "../helper/form-handler";

export default function NewDataForm() {
  const inputRef = useRef<HTMLInputElement>(null);
  const newInputRef = useRef<HTMLInputElement>(null);

  const router = useRouter();
  const cParam = router.query.dta;

  return (
    <form
      action=""
      onSubmit={(e: FormEvent) =>
        onSumbitHandler(
          e,
          "PUT",
          { dta: inputRef.current?.value as string },
          newInputRef.current?.value as string,
          cParam
        )
      }
    >
      <label htmlFor="title">UPDATE</label>
      <input type="text" id="title" ref={inputRef} />
      <input type="text" id="title" ref={newInputRef} />
      <button>update</button>
    </form>
  );
}
