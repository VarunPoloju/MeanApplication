import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { posts } from '../models/posts.model';
import { HttpClient } from '@angular/common/http'
@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private hc: HttpClient) { }

  private posts: posts[] = [];
  private postsUpdated = new Subject<posts[]>();

  getPosts() {
    this.hc.get<{ message: string, posts: posts[] }>('http://localhost:3000/api/posts').subscribe((postdata) => {
      this.posts = postdata.posts;
      this.postsUpdated.next([...this.posts])
    });
  }

  getpostsupdatedListener() {
    return this.postsUpdated.asObservable();
  }

  addPosts(id: string, title: string, content: string) {
    const post: posts = { id: null, title: title, content: content };
    this.hc.post<{ message: string }>('http://localhost:3000/api/posts', post).subscribe((responsedata) => {
      console.log(responsedata.message);
      this.posts.push(post);
      this.postsUpdated.next([...this.posts]);
    })

  }

}
