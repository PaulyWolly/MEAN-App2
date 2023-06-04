import { Component, OnDestroy, OnInit } from '@angular/core';

import { PostInterface } from 'src/app/models/post.interface';
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  // posts = [
  //   {
  //     title: 'First post',
  //     content: 'This is the first post content'
  //   },
  //   {
  //     title: 'Second post',
  //     content: 'This is the second post content'
  //   },
  //   {
  //     title: 'Third post',
  //     content: 'This is the third post content'
  //   }
  // ]

  posts:PostInterface[] = [];
  postsService: PostsService
  private postsSub: Subscription;

  constructor( public postService: PostsService ) {}

  ngOnInit(): void {
      this.postService.getPosts();
      this.postsSub = this.postService.getPostUpdateListener()
        .subscribe((posts: PostInterface[]) => {
          this.posts = posts;
        });
  }

  onAction() {
    alert('you click for an action: ');
  }

  onDelete(postId: string) {
    this.postService.deletePost(postId);
  }

  ngOnDestroy(): void {
    this.postsSub.unsubscribe();
  }

}
