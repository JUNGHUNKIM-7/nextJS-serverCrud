import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "../../helper/db";
import { MongoOperator } from "../../helper/service";
import { IRes } from "./crud/[[...slug]]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IRes>
) {
  const { client, collection } = await connectDB();
  const handler = new MongoOperator(client, collection);

  const dblist = await handler.getLogger();
  const documnet = await handler.getAll();
  res.status(200).json({ 200: documnet, 999: dblist });
}
