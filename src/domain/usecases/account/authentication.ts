export interface AuthenticationData {
  email: string
  password: string
}

export interface Authentication {
  auth: (authentication: AuthenticationData) => Promise<string | null>
}
