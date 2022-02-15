import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { posts } from '../models/posts.model';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor() { }

  private posts: posts[] = [];
  private postsUpdated = new Subject<posts[]>();

  getPosts() {
    return this.posts;
  }

  gtepostsupdatedListener() {
    return this.postsUpdated.asObservable();
  }

  addPosts(title: string, content: string) {
    const post: posts = { title: title, content: content };
    this.posts.push(post);
    this.postsUpdated.next([...this.posts]);
  }

}
