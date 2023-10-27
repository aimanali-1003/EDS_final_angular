// common.service.ts
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  getApiUrl(): string {
    return environment.baseApiUrl;
  }
}