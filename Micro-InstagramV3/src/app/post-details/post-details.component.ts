import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { find, map, mergeMap } from 'rxjs/operators';

import { Post } from '../models/post.model';

import { InstagramService } from '../services/instagram.service';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit, OnDestroy {

  postId: string = '';
  post: Post;
  subscription = new Subscription();
  
  constructor(private route: ActivatedRoute, private InstagramService: InstagramService, private router: Router) { }

  ngOnInit(): void {
    this.subscription.add(
      this.route.paramMap.pipe(
        mergeMap((params) => {
          this.postId = params.get('id');
          
          return this.InstagramService.posts
        }),
        map((posts) => posts.find(a => a.id.toString() === this.postId))
      ).subscribe(post => {
        this.post = post;
      })
    );


    // this.route.paramMap.subscribe(params => {
    //   this.postId = params.get('id');

    //   this.InstagramService.posts.subscribe(posts => {
    //     this.post = posts.find(a => a.id.toString() === this.postId)
    //   })
    // })
  }


  onBack() {
    this.router.navigateByUrl('home/posts');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
