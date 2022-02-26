import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { PostsService } from 'src/app/services/posts.service';
import { posts } from '../../models/posts.model'

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit, OnDestroy {
  posts: posts[] = [];
  isLoading = false;
  private postsSub: Subscription;
  totalPosts = 0;
  postsperpage = 2;
  currentPage = 1;
  private authStatusSub: Subscription;
  userIsAuthenticated = false;
  constructor(public postsService: PostsService , private authService: AuthService) { }

  ngOnInit() {
    this.isLoading = true;
    this.postsService.getPosts(this.postsperpage, this.currentPage);
    this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe((postsData: { Posts: posts[], postcount: number }) => {
        this.isLoading = false;
        this.totalPosts = postsData.postcount
        this.posts = postsData.Posts;
      });
      this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
      });
  }

  onDelete(postId: string) {
    this.isLoading = true;
    this.postsService.deletePost(postId).subscribe(() => {
      this.postsService.getPosts(this.postsperpage, this.currentPage)
    })
  }
  onChangePage(pagedata: PageEvent) {
    console.log(pagedata);
    this.isLoading = true
    this.currentPage = pagedata.pageIndex + 1;
    this.postsperpage = pagedata.pageSize;
    this.postsService.getPosts(this.postsperpage, this.currentPage);

  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}
