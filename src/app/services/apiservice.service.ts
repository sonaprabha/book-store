import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  private baseURL = environment.baseURL;

  httpOptions = {
    headers: new HttpHeaders({
      "Access-Control-Allow-Origin": "*",
    }),
  };
  constructor(private http :HttpClient) { }

   login(data:any):Observable<any> {
    const response = this.http.post(`${this.baseURL}/user/login`,data);
    return response;
  }

    // Error handling
    // errorHandl(error:any) {
    //   let errorMessage = '';
    //   if (error.error instanceof ErrorEvent) {
  
    //     // Get client-side error
    //     errorMessage = error.error.message;
    //   } else {
  
    //     // Get server-side error
    //     errorMessage = error;
    //     if (error.status === 401) {
    //     }
    //   }
    //   return throwError(errorMessage);
    // }
    checkLogin() {
      let token = this.getToken();
      return (token) ? true : false;
    }
  

   register(data:any):Observable<any> {
    return this.http.post<any>(`${this.baseURL}/user/register`, data,this.httpOptions);
  }


  getToken() {
    const token = localStorage.getItem('token');
    if (token) {
      return `${token}`;
    }

    return null;
  }

}

