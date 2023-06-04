import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PostInterface } from 'src/app/models/post.interface';
import { NgForm } from '@angular/forms';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent {
  enteredTitle = '';
  enteredContent = '';
  // @Output() postCreated = new EventEmitter<PostInterface>();
  @Input() storedPosts = [];

  constructor(public postsService: PostsService) {}

  onAddPost(form: NgForm) {

    if (form.invalid) {
      return;
    }

    const post: PostInterface = {
      title: form.value.title,
      content: form.value.content
    }

    this.postsService.addpost(form.value.title, form.value.content)
    form.resetForm();

  }

}
