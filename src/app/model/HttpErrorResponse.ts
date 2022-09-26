/**
 * Class is used to map HttpErrorResponse to access error messages and response codes
 */
export class HttpErrorResponse {
  error: {
    error: string,
    errors: [{
      arguments: [],
      bindingFailure: boolean,
      code: string,
      codes: [],
      defaultMessage: string,
      field: string,
      objectName: string,
    }],
    message: string,
    path: string,
    status: number,
    timestamp: Date,
    trace: string
  }
  headers:[]
  message: string
  name: string
  ok: boolean
  status: number
  statusText: string
  url: string
}
