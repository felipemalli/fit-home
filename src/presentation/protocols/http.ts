export interface HttpResponse {
  statusCode: number
  body: any
}

export interface HttpRequest<TBody = any, THeaders = any> {
  accountId?: string
  body?: TBody
  headers?: THeaders
}
