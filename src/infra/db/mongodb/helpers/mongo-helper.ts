import { Collection, MongoClient, ObjectId } from 'mongodb'
import env from '../../../../main/config/env'

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

  map (collection: any): any {
    const { _id, ...collectionWithoutId } = collection
    return Object.assign({}, collectionWithoutId, { id: _id.toHexString() })
  },

  mapArray (collectionArray: any): any {
    const newCollectionArray: any = []
    for (const collection of collectionArray) {
      const { _id, ...collectionWithoutId } = collection
      newCollectionArray.push(Object.assign({}, collectionWithoutId, { id: _id.toHexString() }))
    }
    return newCollectionArray
  },

  parseToObjectId (id: string): ObjectId {
    return new ObjectId(id)
  }
}
