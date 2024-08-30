import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class BluetoothStatusService {

  // BehaviorSubject to hold the connection status
  private connectionStatus = new BehaviorSubject<string>('disconnected');
  private message: string='';
  constructor() { }

  // Get the current connection status as an observable
  getStatus() {
    return this.connectionStatus.asObservable();
  }

  // Update the connection status
  updateStatus(status: string) {
    this.connectionStatus.next(status);
  }

  getMessage() {
    return this.message
  }

  setMessage(message: string) {
    this.message = message
  }

}

