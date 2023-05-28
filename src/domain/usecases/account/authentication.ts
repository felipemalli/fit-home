import { AuthenticationModel } from '@/domain/models/accounts/authentication'

export interface AuthenticationParams {
  email: string
  password: string
}

export interface Authentication {
  auth: (authentication: AuthenticationParams) => Promise<AuthenticationModel | null>
}
