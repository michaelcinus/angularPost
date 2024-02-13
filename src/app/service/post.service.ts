import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../component/interfaces/post.interface';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private postList : Array<Post> = [];
  private url : string = 'https://jsonplaceholder.typicode.com/posts'

  constructor(private http: HttpClient) { }

  getPosts() {
    return this.http.get<Post>(this.url);
  }

  getPost(id: number) {
    return this.http.get<Post>(`${this.url}/${id}`)
  }
}
