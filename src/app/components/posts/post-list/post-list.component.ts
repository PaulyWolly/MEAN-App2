import { Component, Input } from '@angular/core';

import { PostInterface } from 'src/app/models/post.interface';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent {

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

  @Input() posts:PostInterface[] = [];

  onAction() {
    alert('you click for an action: ');
  }

}
