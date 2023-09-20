import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private createClientSubject = new Subject<void>();

  createClient() {
    this.createClientSubject.next();
  }

  onClientCreated() {
    return this.createClientSubject.asObservable();
  }
}
