import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
import { Post } from 'src/app/models/post.model';
import { InstagramService } from 'src/app/services/instagram.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit, OnDestroy {

  postForm: FormGroup;
  postId: string = '';
  post: Post;
  isInEditMode: boolean = false;
  subscription = new Subscription();

  get titleValid() {
    return this.postForm.get('title').invalid && (this.postForm.get('title').touched && this.postForm.get('title').dirty);
  }

  get urlValid() {
    return this.postForm.get('url').invalid && (this.postForm.get('url').touched && this.postForm.get('url').dirty);
  }

  get thumbnailUrlValid() {
    return this.postForm.get('thumbnailUrl').invalid && (this.postForm.get('thumbnailUrl').touched && this.postForm.get('thumbnailUrl').dirty);
  }

  constructor(private fb: FormBuilder, private instagramService: InstagramService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.isInEditMode = false;
    this.postForm = this.fb.group({
      title: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
      url: ['', Validators.required],
      thumbnailUrl: ['', Validators.required]
    });

    this.subscription.add(
      this.route.paramMap.pipe(
        mergeMap(params => {
          this.postId = params.get('id');
          return this.instagramService.posts
        }),
        map(posts => posts.find(a => a.id.toString() === this.postId))
      )
      .subscribe(post => {
        if (post) {
          this.isInEditMode = true;
          this.post = post;
          this.postForm.patchValue(post);
          this.postForm.updateValueAndValidity();
          console.log(post);
        }
      })
    )

  }

  onSubmit() {
    const post: Post = {
      ...this.post,
      ...this.postForm.value
    }

    this.isInEditMode
    ? this.instagramService.editPost(post)
    : this.instagramService.addPost(post);
    this.router.navigateByUrl('/home/posts');

  }

  onBack(): void {
    this.router.navigateByUrl('/home/posts');
  }

  


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
