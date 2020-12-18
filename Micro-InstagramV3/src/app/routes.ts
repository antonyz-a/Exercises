import { Routes } from '@angular/router';
import { AddPostComponent } from './add-post/add-post.component';

import { HomeComponent } from './home/home.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { PostsContainerComponent } from './posts-container/posts-container.component';
import { PostsListComponent } from './posts-list/posts-list.component';



export const routes: Routes = [
    {
        path: 'home',
        component: PostsContainerComponent,
        children: [
            {
                path: 'welcome',
                component: HomeComponent
            },
            {
                path: 'posts',
                component: PostsListComponent
            },
            {
                path:'posts/:id',
                component: PostDetailsComponent
            },
            {
                path: 'add-post',
                component: AddPostComponent
            },
            {
                path: 'add-post/:id',
                component: AddPostComponent
            },
            {
                path: 'home',
                redirectTo: '/home/welcome',
                pathMatch: 'full'
            },
            {
                path: '',
                redirectTo: '/home/welcome',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: '/home/welcome',
        pathMatch: 'full'
    }

]