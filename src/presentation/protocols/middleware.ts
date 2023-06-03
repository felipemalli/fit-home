import { request, HttpResponse } from './http'

export interface Middleware {
  handle: (request: request) => Promise<HttpResponse>
}
