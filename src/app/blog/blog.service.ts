import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private baseUrl: string = "https://blogapp.edwisor.com/api/v1/blogs";
  private authToken: string = "YmQ1Nzk4NGJmYmFjMWQ1NTlhYTdhMWY4OTM5NDg2M2VlZjM4YWMwYjY2MjIyOTBhZmYyNTc5OGQ1NzhlNDc1OTE4ZGY2OTA4NmM3MGVjYTg1NmU5N2Q4MWFiNmJhODYyMzlhYmM5NzViMTgyNmM2NDQ3NmMyNTk5YTQ3OWVmMjY3NA==";

  constructor(private _http: HttpClient) { }

  // get the whole data response
  getAllData = () => {
    return this._http.get<any>(`${this.baseUrl}/all?authToken=${this.authToken}`, { observe: 'response', responseType: "json" }).pipe(catchError(this.handleError));
  }
  // get only a single blog data
  getASingleBlog = (blogId) => {
    return this._http.get<any>(`${this.baseUrl}/view/${blogId}?authToken=${this.authToken}`).pipe(catchError(this.handleError));
  }
  // create a blog
  createABlog = (blogBody) => {
    return this._http.post<any>(`${this.baseUrl}/create?authToken=${this.authToken}`, blogBody).pipe(catchError(this.handleError));
  }
  // edit a blog
  editABlog = (blogId, blogBody) => {
    return this._http.put<any>(`${this.baseUrl}/${blogId}/edit?authToken=${this.authToken}`, blogBody).pipe(catchError(this.handleError));
  }
  // delete a perticular blog
  deleteABlog = (blogId) => {
    return this._http.post<any>(`${this.baseUrl}/${blogId}/delete?authToken=${this.authToken}`, blogId).pipe(catchError(this.handleError));
  }

  // handle Error
  private handleError = (errorRes: HttpErrorResponse) => {
    let errorResponse = `An Unknown Error occured!`;
    if (!errorRes.message) {
      return throwError(errorResponse)
    }
    return throwError(errorRes.message);
  }
}
