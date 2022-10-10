import { Component, OnInit } from '@angular/core';
import {ToastService} from '../service/toast.service';
import {ToastType} from '../model/ToastType';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css']
})
export class ToastComponent implements OnInit {

  errors: string[] = [];
  success: string[] = [];
  infos: string[] = [];

  /**
   * Constructor subscribes to toastService to receive type of ERROR, SUCCESS and INFO messages
   * and subscribes to Event Emitter
   */
  constructor(private toastService: ToastService) {

    this.toastService.toastMessage.subscribe(toast => {
      if (toast.type === ToastType.ERROR) {
        if (toast.response.status === 401) {
          this.errors.push('Invalid password or user name!');
        } else if (toast.response.status === 403) {
          this.errors.push('Authentication failed! Please login again.');
        } else if (toast.response.status === 406) {
          this.errors.push('Username already in use!');
        } else {
          if (toast.response.error) {
            if (toast.response.error.errors) {
              for(let err in toast.response.error.errors){
                this.errors.push(toast.response.error.errors[err].defaultMessage);
              }
            }
          } else {
            this.errors.push(toast.message);
          }
        }
      } else if (toast.type === ToastType.SUCCESS) {
        this.success.push(toast.message);
      } else if (toast.type === ToastType.INFO) {
        this.infos.push('Info toast.');
      }
    });

    this.toastService.clearMessages.subscribe(value => {
      if (value) {
        this.success = [];
        this.errors = [];
      }
    });

  }
  ngOnInit(): void {
  }

  /**
   * Removes (deletes) error/success/info element from errors/success/infos array when x button clicked on toast message in UI
   */
  closeToastError(index: number) {
    this.errors.splice(this.errors.indexOf(String(index)), 1);
  }
  closeToastSuccess(index: number) {
    this.success.splice(this.success.indexOf(String(index)), 1);
  }
  closeToastInfo(index: number) {
    this.infos.splice(this.infos.indexOf(String(index)), 1);
  }
}
