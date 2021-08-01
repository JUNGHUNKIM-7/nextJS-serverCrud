import { FormEvent, useRef } from "react";
import { IData, IDataObj, onSumbitHandler } from "../../helper/form-handler";

export default function Index({ data }: IData<IDataObj>) {
  const inputRef = useRef<HTMLInputElement>(null);
  const deleteRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <form
        action=""
        onSubmit={(e: FormEvent) =>
          onSumbitHandler(e, "POST", { dta: inputRef.current?.value as string })
        }
      >
        <label htmlFor="title">POST</label>
        <input type="text" id="title" ref={inputRef} />
        <button>Post</button>
      </form>
      <form
        action=""
        onSubmit={(e: FormEvent) =>
          onSumbitHandler(e, "DELETE", {
            dta: deleteRef.current?.value as string,
          })
        }
      >
        <label htmlFor="title">Delete</label>
        <input type="text" id="title" ref={deleteRef} />
        <button>Delete</button>
      </form>
    </>
  );
}
