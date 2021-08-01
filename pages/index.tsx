import { GetStaticProps } from "next";
import { IData, IDataObj } from "../helper/form-handler";

export default function index() {
  return (
    <div>
      <div>Crud Home</div>
    </div>
  );
}
export const getStaticProps: GetStaticProps = async () => {
  const data: IData<IDataObj> = await (
    await fetch("http://localhost:3000/api/hello")
  ).json();
  console.log(data);

  return {
    props: {
      data,
    },
  };
};
