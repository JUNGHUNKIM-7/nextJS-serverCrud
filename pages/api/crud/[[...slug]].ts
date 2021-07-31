import type { NextApiRequest, NextApiResponse } from "next";
import { MongoOperator } from "../../../helper/service";
import { connectDB } from "../../../helper/db";

enum METHOD {
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  GET = "GET",
}

export interface IRes {
  [StatusCode: number]: unknown;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<IRes>
) {
  //make DB
  const { client, collection } = await connectDB();
  const handler = new MongoOperator(client, collection);

  //body parse
  const { dta, newDta, cParam } = JSON.parse(req.body);

  //validation
  const matchedParam = Number(req.query.slug[0]) === Number(cParam);
  const matched = await collection.findOne({ data: dta });

  switch (req.method) {
    case METHOD.POST:
      try {
        if (!matched) {
          await handler.add(dta);
          res.status(201).json({ 201: "added Successfully" });
        } else {
          (await client).close();
          res.status(401).json({ 401: "failed" });
          return;
        }
      } catch (error) {
        (await client).close();
        throw Error(error);
      }
      break;

    case METHOD.PUT:
      try {
        if (matchedParam && matched && newDta) {
          await handler.update(dta, newDta);
          res.status(200).json({ 200: "updated" });
        } else {
          (await client).close();
          res.status(404).json({ 404: "not updated" });
          return;
        }
      } catch (error) {
        (await client).close();
        throw Error(error as string | undefined);
      }
      break;

    case METHOD.DELETE:
      try {
        if (matched) {
          await handler.deleteObj(dta);
          res.status(200).json({ 200: `Deleted : ${dta}` });
        } else {
          (await client).close();
          res.status(404).json({ 404: `NotFound : ${dta}` });
        }
      } catch (error) {
        (await client).close();
        throw Error(error as string | undefined);
      }
      break;

    case METHOD.GET:
      const documnet = await handler.getAll();
      res.status(200).json({ 200: documnet });

    default:
      res.status(500).json({ 200: "Internal Server Error" });
  }
}
