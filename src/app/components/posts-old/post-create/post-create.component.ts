import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PostInterface } from 'src/app/models/post.interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostsService } from '../posts.service';
import { ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  enteredTitle = '';
  enteredContent = '';
  public post: PostInterface;
  isLoading = false;
  form: FormGroup;
  imagePreview: string;
  public mode = 'create';
  private postId: string;

  @Input() storedPosts = [];

  constructor(
    public postsService: PostsService,
    public route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      content: new FormControl(null, {
        validators: [Validators.required]
      }),
      image: new FormControl(null, {
        validators: [Validators.required]
      })
    });

    this.route.paramMap
      .subscribe((paramMap: ParamMap) => {
        if (paramMap.has("postId")) {
          this.mode = 'edit'
          this.postId = paramMap.get('postId');
          // Show spinner
          this.isLoading = true;
          this.postsService.getPost(this.postId).subscribe(postData => {
           // Hide spinner
           this.isLoading = false;
            this.post = {
              id: postData._id,
              title: postData.title,
              content: postData.content
            };
            this.form.setValue({
              title: this.post.title,
              content: this.post.content
            });
          });
        } else {
          this.mode = 'create';
          this.postId = null;
        }
      });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSavePost() {

    if (this.form.invalid) {
      return;
    }

    this.isLoading = true;
    if (this.mode === 'create') {
      this.postsService.addpost(
        this.form.value.title,
        this.form.value.content
      );
    } else {
      this.postsService.updatePost(
        this.postId,
        this.form.value.title,
        this.form.value.content
      );
    }

    this.form.reset();
  }
}