import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  apiUrl= 'http://100.105.154.10:8099' 

  constructor(private http: HttpClient , private authService : AuthService) { }

  create(body : any){
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`, 
    });
    return  this.http.post(this.apiUrl+"/applications/",body , {
      
      headers: headers
    });
  }

  getUserApps(id : any){
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`,
      'Content-Type': 'application/json',
    });
    return this.http.get(this.apiUrl+'/applications/byUser/'+id  , {
      
      headers: headers
    });
  }
}
