import { HttpStatusCode } from '@/utils/constants/http'
import { UserMessage } from '@/utils/constants/message'

type ErrorType = Record<
  string,
  {
    type: string
    msg: string
    [key: string]: any
  }
>

// type ErrorType = {
//   [key: string]: {
//     type: string
//     msg: string
//     [key: string]: any
//   }
// }

export class ErrorWithStatus {
  message: string
  status: number
  constructor({ message, status }: { message: string; status: number }) {
    this.message = message
    this.status = status
  }
}

export class EntityError extends ErrorWithStatus {
  errors: ErrorType
  constructor({ message = UserMessage.VALIDATION_ERROR, error }: { message?: string; error: ErrorType }) {
    super({ message, status: HttpStatusCode.UNPROCESSABLE_ENTITY })
    this.errors = error
  }
}
