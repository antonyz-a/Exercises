import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Post } from 'src/app/models/post.model';
import { InstagramRepoService } from 'src/app/services/instagram-repo.service';
import { InstagramService } from 'src/app/services/instagram.service';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('searchInput') searchInput: ElementRef;


 
  posts: Post[] = [];
  filteredPosts: Post[];
  firstPages: number = 0;
  lastPages: number = 20;
  filter:string = 'All';
  subscription = new Subscription();
 


  constructor(private instagramService: InstagramService, private instagramRepo: InstagramRepoService) { }

  ngOnInit(): void {
    this.subscription.add(
      this.instagramService.posts.subscribe(posts => {
        this.posts = posts;
        this.filteredPosts = posts
      })
    )
  }

  ngAfterViewInit() {
    console.log(this.searchInput)
    this.searchInput.nativeElement.focus();
    
  }

  filterPosts(event) {
    console.log(event)
    this.filteredPosts = this.posts.filter(
      a => a.title.toLowerCase().includes(event.target.value.toLowerCase())
    )
  }

  deletePost(postId: number): void {
    if (confirm("Really delete this post ?")) {
      this.instagramRepo.deletePost(postId)
      .subscribe(
        (data:void) => {
          let index: number = this.filteredPosts.findIndex(post => post.id.toString() === postId.toString());
          this.filteredPosts.splice(index, 1);
        },
        (err:any) => console.log(err)
      );

    }
    
  }

  onNext() {
    this.firstPages +=20;
    this.lastPages +=20;
  }

  onPrevious() {
    this.firstPages -=20;
    this.lastPages -=20;

  }

  onFirst() {
    this.firstPages = 0;
    this.lastPages = 20;
  }

  onLast() {
    this.firstPages = 4980;
    this.lastPages = 5500;
  }
  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
