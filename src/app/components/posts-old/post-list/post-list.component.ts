import { Component, OnDestroy, OnInit } from '@angular/core';

import { PostInterface } from 'src/app/models/post.interface';
import { PostsService } from '../posts.service';
import { Subscription } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  posts:PostInterface[] = [];
  postsService: PostsService;
  isLoading = false;
  totalPosts = 5;
  postsPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1, 2, 3, 5, 10];
  private postsSub: Subscription;

  constructor( public postService: PostsService ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.postService.getPosts(this.postsPerPage, this.currentPage);
    this.postsSub = this.postService.getPostUpdateListener()
      .subscribe((posts: PostInterface[]) => {
        this.isLoading = false;
        this.posts = posts;
      });
  }

  onChangedPage(pageData: PageEvent) {
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.postsService.getPosts(this.postsPerPage, this.currentPage)
  }

  onAction() {
    alert('you clicked for an action: ');
  }

  onDelete(postId: string) {
    this.postService.deletePost(postId);
  }


  ngOnDestroy(): void {
    this.postsSub.unsubscribe();
  }

}
