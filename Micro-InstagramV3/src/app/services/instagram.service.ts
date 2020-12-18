import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Post } from '../models/post.model';
import { InstagramRepoService } from './instagram-repo.service';
import { v4 } from 'uuid';


@Injectable({
  providedIn: 'root'
})
export class InstagramService {
  
  private _posts: BehaviorSubject<Post[]> = new BehaviorSubject<Post[]>([])

  get posts(): Observable<Post[]> {
    return this._posts.asObservable();
  }

  constructor(private instagramRepoService: InstagramRepoService) { }

  getPosts() {
    this.instagramRepoService.getPosts().subscribe(posts => {
      this._posts.next(posts);
    });
  }

  addPost(post: Post) {
    let posts = this._posts.getValue();
    const newPost = {...post, id: v4() }
    posts = [...posts, newPost];
    this._posts.next(posts)
  }

  editPost(post: Post) {
    let posts = this._posts.getValue();
    let index = posts.findIndex(a => a.id === post.id);
    posts[index] = post;
    this._posts.next(posts);
  }


    
}
