import { Injectable } from "@angular/core";
import { PostInterface } from "src/app/models/post.interface";
import { Subject }  from 'rxjs';
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: 'root'})
export class PostsService {
  private posts: PostInterface[] = [];
  private postsUpdated = new Subject<PostInterface[]>();

  constructor(private http: HttpClient) {}

  getPosts() {
    this.http.get<{message: string, posts: PostInterface[]}>('http://localhost:3000/api/posts')
      .subscribe((postData) => {
        this.posts = postData.posts;
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addpost(title: string, content: string) {
    const post: PostInterface = {
      id: null,
      title: title,
      content: content
    }
    this.posts.push(post);
    this.postsUpdated.next([...this.posts]);
  }
}
