type ErrorType = Record<
  string,
  {
    value: any
    msg: string
    path: string
    location: string
    [key: string]: any
  }
>

export class ErrorWithStatus {
  message: string
  status: number
  constructor({ message, status }: { message: string; status: number }) {
    this.message = message
    this.status = status
  }
}

export class EntityError extends ErrorWithStatus {
  error: ErrorType
  constructor({ message, status, error }: { message: string; status: number; error: ErrorType }) {
    super({ message, status })
    this.error = error
  }
}
