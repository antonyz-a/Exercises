import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Post } from '../models/post.model';
import { catchError, map, tap } from 'rxjs/operators';



@Injectable({
  providedIn: 'root'
})
export class InstagramRepoService {

  constructor(private http: HttpClient) { }

  getPosts(): Observable<Post[]> {
    return this.http.get('http://jsonplaceholder.typicode.com/photos').pipe(
        map(res => (res as Post[]))
    );
  }

  deletePost(postId: number): Observable<void> {
    return this.http.delete<void>(`http://jsonplaceholder.typicode.com/photos/${postId}`)
}






}
