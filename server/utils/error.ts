export class CustomError extends Error {
  status: number

  constructor(status: number, message: string) {
    super(message)
    this.status = status
  }
}

export const errorHandler = (status: number, message: string) => {
  return new CustomError(status, message)
}
