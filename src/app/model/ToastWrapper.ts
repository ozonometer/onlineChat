import {ToastType} from './ToastType';
import {HttpErrorResponse} from "../model/HttpErrorResponse";

/**
 * Wrapper class to emmit toast messages of type ERROR, SUCCESS and INFO
 */
export class ToastWrapper {
  public type: ToastType;
  public response: HttpErrorResponse
  public message: string


  constructor(type: ToastType, response: HttpErrorResponse, message: string) {
    this.type = type;
    this.response = response;
    this.message = message;
  }


}
