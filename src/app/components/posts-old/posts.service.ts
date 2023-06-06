import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject }  from 'rxjs';
import { map } from "rxjs/operators";

import { PostInterface } from "src/app/models/post.interface";
import { Router } from "@angular/router";


@Injectable({ providedIn: 'root'})
export class PostsService {
  private posts: PostInterface[] = [];
  private postsUpdated = new Subject<PostInterface[]>();

  constructor(
    private http: HttpClient,
    public router: Router
  ) {}

  getPosts(postsPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${postsPerPage}&page=${currentPage}`
    this.http.get<{message: string, posts: any}>('http://localhost:3000/api/posts' + queryParams)
    .pipe(map((postData) => {
      return postData.posts.map(post => {
        return {
          id: post._id,
          title: post.title,
          content: post.content
        }
      });
    }))
    .subscribe((transformedPosts) => {
        this.posts = transformedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  getPost(id: string) {
    return this.http.get<{ _id: string, title: string, content: string}>('http://localhost:3000/api/posts/' + id)
  }

  addpost(title: string, content: string) {
    const post: PostInterface = {
      id: null,
      title: title,
      content: content
    }
    this.http.post<{message: string, postId: string}>('http://localhost:3000/api/posts', post)
      .subscribe((responseData) => {
        const id = responseData.postId;
        post.id = id;
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(['/list']);
      });

  }

  updatePost(id: string, title: string, content: string) {
    const post: PostInterface = {
      id: id,
      title: title,
      content: content
    }
    this.http
      .put('http://localhost:3000/api/posts/' + id, post)
      .subscribe(response => {
        const updatedPosts = [...this.posts];
        const oldPostIndex = updatedPosts.findIndex(p => p.id === post.id);
        updatedPosts[oldPostIndex] = post;
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts]);
        this.router.navigate(['/list']);
      });
  }

  deletePost(postId: string) {
    this.http.delete('http://localhost:3000/api/posts/' + postId)
    .subscribe(() => {
      const updatedPosts = this.posts.filter(post => post.id !== postId);
      this.posts = updatedPosts;
      this.postsUpdated.next([...this.posts]);
    })
  }
}
