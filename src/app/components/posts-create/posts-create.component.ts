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

  constructor(private ps: PostsService) { }

  ngOnInit(): void {
  }

  onAddPosts(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const post: posts = {
      title: form.value.title,
      content: form.value.content
    };
    this.ps.addPosts(form.value.title, form.value.content);
    form.resetForm();
  }

}
