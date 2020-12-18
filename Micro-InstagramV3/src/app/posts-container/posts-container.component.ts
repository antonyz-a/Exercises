import { Component, OnInit } from '@angular/core';
import { InstagramService } from '../services/instagram.service';

@Component({
  selector: 'app-posts-container',
  templateUrl: './posts-container.component.html',
  styleUrls: ['./posts-container.component.css']
})
export class PostsContainerComponent implements OnInit {

  constructor(private instagramService: InstagramService) { }

  ngOnInit(): void {
    this.instagramService.getPosts();

  }

}
