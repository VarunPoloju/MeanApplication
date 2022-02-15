import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostsService } from 'src/app/services/posts.service';
import { posts } from '../../models/posts.model'
@Component({
  selector: 'app-posts-create',
  templateUrl: './posts-create.component.html',
  styleUrls: ['./posts-create.component.css']
})
export class PostsCreateComponent implements OnInit {

  constructor(private postservice: PostsService) { }

  ngOnInit(): void {
  }

  onAddPosts(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const post: posts = {
      id: form.value.id,
      title: form.value.title,
      content: form.value.content
    };
    this.postservice.addPosts(form.value.id, form.value.title, form.value.content);
    form.resetForm();
  }

}
