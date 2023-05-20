export interface HttpResponse {
  statusCode: number
  body: any
}

export interface HttpRequest<TBody = any, THeaders = any, TParams = any> {
  accountId?: string
  body?: TBody
  headers?: THeaders
  params?: TParams
}
