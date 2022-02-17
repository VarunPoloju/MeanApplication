import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { posts } from '../models/posts.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private httpclient: HttpClient) { }

  private posts: posts[] = [];
  private postsUpdated = new Subject<posts[]>();

  getPosts() {
    this.httpclient.get<{ message: string, posts: any }>('http://localhost:3000/api/posts')
      .pipe(map((postdata) => {
        return postdata.posts.map(post => {
          return {
            title: post.title,
            content: post.content,
            id: post._id
          }
        })
      }))
      .subscribe((transformedposts) => {
        this.posts = transformedposts;
        this.postsUpdated.next([...this.posts])
      });
  }

  getpostsupdatedListener() {
    return this.postsUpdated.asObservable();
  }

  addPosts(id: string, title: string, content: string) {
    const post: posts = { id: null, title: title, content: content };
    this.httpclient.post<{ message: string }>('http://localhost:3000/api/posts', post).subscribe((responsedata) => {
      console.log(responsedata.message);
      this.posts.push(post);
      this.postsUpdated.next([...this.posts]);
    })

  }

  deletePost(postId: string) {
    this.httpclient.delete('http://localhost:3000/api/posts/' + postId)
      .subscribe(() => {
        const updatedPosts = this.posts.filter(post => post.id !== postId);
        this.posts = updatedPosts;
        this.postsUpdated.next([...this.posts])
      })
  }

}
