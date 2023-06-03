import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PostInterface } from 'src/app/models/post.interface';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {
  enteredTitle = '';
  enteredContent = '';
  @Output() postCreated = new EventEmitter<PostInterface>();
  @Input() storedPosts = [];

  onAddPost() {

    const post: PostInterface = {
      title: this.enteredTitle,
      content: this.enteredContent
    }

    this.postCreated.emit(post);

  }

}
