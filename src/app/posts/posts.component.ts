import { BadInputError } from './../common/bad-input-error';
import { NotFoundError } from './../common/not-found-error';
import { AppError } from './../common/app-error';
import { PostService } from './../services/post.service';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { stringify } from '@angular/compiler/src/util';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: any[];

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.postService.getAll().subscribe(posts => (this.posts = posts));
  }

  createPost(input: HTMLInputElement) {
    const post = { title: input.value };
    this.posts.splice(0, 0, post);

    input.value = '';

    this.postService.create(post).subscribe(
      createdPost => {
        post['id'] = createdPost.id;
      },
      (error: AppError) => {
        this.posts.splice(0, 1);

        if (error instanceof BadInputError) {
          // this.form.setErrors(error.originalError);
        } else {
          throw error;
        }
      }
    );
  }

  updatePost(post) {
    this.postService
      .create(post)
      .subscribe(updatedPost => console.log(updatedPost));
  }

  deletePost(post) {
    const index: number = this.posts.indexOf(post);
    this.posts.splice(index, 1);

    this.postService.delete(post.id).subscribe(null, (error: AppError) => {
      this.posts.splice(index, 0, post);

      if (error instanceof NotFoundError) {
        alert('This post has already been deleted.');
      } else {
        throw error;
      }
    });
  }
}
