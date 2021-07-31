import { Collection, MongoClient } from "mongodb";

export class MongoOperator {
  constructor(
    private readonly client: Promise<MongoClient>,
    private readonly collection: Collection
  ) {}

  async getLogger() {
    return (await this.client).getLogger();
  }

  async getAll() {
    return await this.collection.find({}).toArray();
  }

  async add(data: string) {
    await this.collection.insertOne({ data: data });
  }

  async update(data: string, newDta: string) {
    await this.collection.updateOne({ data: data }, { $set: { data: newDta } });
  }

  async deleteObj(data: string) {
    await this.collection.deleteOne({ data: data });
  }
}
