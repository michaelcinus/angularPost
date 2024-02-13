import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../component/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private postList : Array<User> = [];
  private url : string = 'https://jsonplaceholder.typicode.com/users'

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get<User>(this.url);
  }

  getUser(id: number) {
    return this.http.get<User>(`${this.url}/${id}`)
  }
}
