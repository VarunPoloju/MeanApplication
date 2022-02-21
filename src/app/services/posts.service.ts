import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { posts } from '../models/posts.model';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private httpclient: HttpClient, private router: Router) { }

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

  getPost(id: string) {
    return this.httpclient.get<{ _id: string, title: string, content: string }>('http://localhost:3000/api/posts/' + id)
  }

  updatePost(id: string, title: string, content: string) {
    const post: posts = { id: id, title: title, content: content };
    this.httpclient.put('http://localhost:3000/api/posts' + id, post).subscribe(response => {
      const updatedPosts = [...this.posts];
      const oldPostIndex = updatedPosts.findIndex(p => p.id === post.id);
      updatedPosts[oldPostIndex] = post;
      this.posts = updatedPosts;
      console.log(this.posts);
      this.postsUpdated.next([...this.posts]);
      this.router.navigate(['/'])

    })
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
      this.router.navigate(['/'])
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
