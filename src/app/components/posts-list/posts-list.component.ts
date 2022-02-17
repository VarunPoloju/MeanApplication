import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostsService } from 'src/app/services/posts.service';
import { posts } from '../../models/posts.model'

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit, OnDestroy {
  // posts = [
  //   { title: 'first post', content: 'This is the first post\'s content' },
  //   { title: 'second post', content: 'This is the second post\'s content' },
  //   { title: 'third post', content: 'This is the third post\'s content' },
  // ]

  posts: posts[] = [];
  private postSub: Subscription;

  constructor(private postservice: PostsService) { }

  ngOnInit() {
    this.postservice.getPosts();
    this.postSub = this.postservice.getpostsupdatedListener().subscribe((postsdata: posts[]) => {
      this.posts = postsdata;
    });
  }

  onDelete(postsId: string) {
    this.postservice.deletePost(postsId);
  }

  ngOnDestroy() {
    this.postSub.unsubscribe();
  }

}
