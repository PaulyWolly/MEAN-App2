import { Injectable } from "@angular/core";
import { PostInterface } from "src/app/models/post.interface";
import { Subject }  from 'rxjs';

@Injectable({ providedIn: 'root'})
export class PostsService {
  private posts: PostInterface[] = [];
  private postsUpdated = new Subject<PostInterface[]>();

  getPosts() {
    return [...this.posts];
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addpost(title: string, content: string) {
    const post: PostInterface = {
      title: title,
      content: content
    }
    this.posts.push(post);
    this.postsUpdated.next([...this.posts]);
  }
}
