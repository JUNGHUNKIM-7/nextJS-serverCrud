import { MongoClient } from "mongodb";

export async function connectDB(
  coll: string = `${process.env.MONGO_COLLECTION}`
) {
  const client = MongoClient.connect(`
  mongodb+srv://${process.env.MONGO_ID}:${process.env.MONGO_SECRET}@cluster0.ezqho.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`);

  const collection = (await client).db().collection(coll);
  return { client, collection };
}
