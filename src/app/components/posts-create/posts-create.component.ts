import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';
import { posts } from '../../models/posts.model'
@Component({
  selector: 'app-posts-create',
  templateUrl: './posts-create.component.html',
  styleUrls: ['./posts-create.component.css']
})
export class PostsCreateComponent implements OnInit {

  constructor(private postservice: PostsService, public route: ActivatedRoute) { }
  post: posts
  private mode = 'create';
  private postid: string;
  isLoading = false;

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postid')) {
        this.mode = 'edit';
        this.postid = paramMap.get('postid');
        // show spinner when starts fetching
        this.isLoading = true;
        this.postservice.getPost(this.postid).subscribe(postdata => {
          //  hide spinner after fetching results
          this.isLoading = true;
          this.post = { id: postdata._id, title: postdata.title, content: postdata.content }
        })
      }
      else {
        this.mode = 'create';
        this.postid = null
      }
    })
  }

  onSaveposts(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'create') {
      this.postservice.addPosts(form.value.id, form.value.title, form.value.content);
    }
    else {
      this.postservice.updatePost(this.postid, form.value.title, form.value.content)
    }
    form.resetForm();
  }

}
