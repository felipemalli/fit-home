export interface HttpResponse {
  statusCode: number
  body: any
}

export interface HttpRequest<TBody = any, TParams = any, THeaders = any> {
  body?: TBody
  params?: TParams
  headers?: THeaders
  accountId?: string
}
