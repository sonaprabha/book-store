import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { StorageServiceService } from './storage-service.service';
import { Booksinterface } from '../interface/booksinterface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private baseURL = environment.baseURL;
  constructor(private http:HttpClient, private storageService: StorageServiceService) { }
private httpOption={
  headers: new HttpHeaders({
    "Access-Control-Allow-Origin": "*",
    Authorization: `Bearer ${this.storageService.getItem("token")}`,
  }),
}


  add(data:any):Observable<Booksinterface> {
    return this.http.post<Booksinterface>(`${this.baseURL}/books/`, data, this.httpOption);
  }
  getbooks():Observable<Booksinterface> {
    return this.http.get<Booksinterface>(`${this.baseURL}/books/`, this.httpOption);
  }

  getBooksById(id:any):Observable<any>{
    return this.http.get<Booksinterface>(`${this.baseURL}/books/${id}`, this.httpOption);
 
  }
  deleteBook(id:any):Observable<any>{
    return this.http.get<Booksinterface>(`${this.baseURL}/books/${id}`, this.httpOption);

  }
}
