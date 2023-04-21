export interface HttpResponse {
  statusCode: number
  body: any
}

export interface HttpRequest<TBody = any, THeaders = any> {
  body?: TBody
  headers?: THeaders
}
