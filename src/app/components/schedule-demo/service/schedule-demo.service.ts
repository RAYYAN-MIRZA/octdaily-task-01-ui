import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ScheduleDemoInterface } from '../interface/schedule-demo-interface';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScheduleDemoService {
  //  Sample
  private backendUrl: string = 'http:localhost:8080/schedule-demo'; 
  private fakeBackEnd: string = 'https://jsonplaceholder.typicode.com/posts/';

  constructor(private Http: HttpClient) {}

  postToBackend(
    formData: ScheduleDemoInterface
  ): Observable<ScheduleDemoInterface> {
    return this.Http.post<ScheduleDemoInterface>(
      this.fakeBackEnd,
      formData
    ).pipe(
      catchError((error) => {
        console.error('error in postToBacked', error);
        return throwError(() => error);
      })
    );
  }
}
