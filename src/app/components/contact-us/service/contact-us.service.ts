import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ContactUsInterface } from '../interface/contact-us-interface';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContactUsService {
  private backendUrl: string = 'http:localhost:8080/contact-us';
  private fakeBackEnd:string='https://jsonplaceholder.typicode.com/posts/';

  constructor(private Http: HttpClient) {}

  postToBackend(formData: ContactUsInterface): Observable<ContactUsInterface> {
    return this.Http.post<ContactUsInterface>(this.fakeBackEnd, formData).pipe(
      catchError((error)=>{
        console.error('error in postToBacked',error);
        return throwError(()=>error);
      })
    );
  }
}
