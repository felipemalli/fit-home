import env from '@/main/config/env'
import { Collection, MongoClient, ObjectId } from 'mongodb'

export { ObjectId, Collection }
export const MongoHelper = {
  client: null as unknown as MongoClient,
  uri: null as unknown as string,

  async connect (uri: string = env.mongoUrl): Promise<void> {
    this.uri = uri
    this.client = await MongoClient.connect(uri)
  },

  async disconnect (): Promise<void> {
    await this.client?.close()
    this.client = null
  },

  async getCollection (name: string): Promise<Collection> {
    if (!this.client) {
      await this.connect(this.uri)
    }
    return this.client.db().collection(name)
  },

  map (data: any): any {
    const { _id, ...collectionWithoutId } = data
    return { ...collectionWithoutId, id: _id.toHexString() }
  },

  mapCollection (collection: any[], propertyWithCollection: string): any[] {
    collection.map((c) => {
      c[propertyWithCollection] = c[propertyWithCollection].map((p: any) => MongoHelper.map(p))
      return MongoHelper.map(c)
    })

    return collection.map((c) => MongoHelper.map(c))
  },

  createObjectId (id?: string): ObjectId {
    return new ObjectId(id)
  }
}
