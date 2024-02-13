
import { UserService } from './../../service/user.service';
import { PostService } from './../../service/post.service';
import { Component, ViewChild } from '@angular/core';
import { Post } from '../interfaces/post.interface';
import { User } from '../interfaces/user.interface';

import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent {

  postsList: Post[] = [];
  paginatedPosts: Post[] = [];
  filteredPosts: Post[] = [];
  selectedPost : Post = {} as Post;

  usersList: User[] = [];
  selectedUser : User = {} as User;

  pageSize: number = 5; 
  currentPage: number = 1; 

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private postService : PostService,
    private userService : UserService,
    private modal : MatDialog) {}

    ngOnInit() {
      this.getPosts();
      this.getUSers();
    }

    getPosts() {
      this.postService.getPosts().subscribe(
        (res : any)  => {
          this.postsList = res;
          this.filteredPosts = res;
          this.paginatedPosts = res;
          this.paginate();
      });
    }

    paginate() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      this.paginatedPosts = this.postsList.slice(startIndex, endIndex);
    }

    applyFilter(event: KeyboardEvent) {
      const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
      this.filteredPosts = this.postsList.filter(post => post.title.toLowerCase().includes(filterValue)); 
      this.paginatedPosts = this.filteredPosts.slice(0, this.pageSize);
    }


    getUSers() {
      this.userService.getUsers().subscribe(
        (res : any)  => {
          this.usersList = res;
      });
    }

    getUser(id :number): User | undefined {
      return this.usersList.find(user => user.id === id);
    }

    getUserInitials(userId: number): string {
      const user = this.usersList[userId];
      if (user) {
        const [firstName, lastName] = user.name.split(' ');
        const initials = firstName.charAt(0).toUpperCase() + (lastName ? lastName.charAt(0).toUpperCase() : '');
        return initials;
      }
      return '';
    }
  
    onPageChange(event: PageEvent) {
      this.currentPage = event.pageIndex + 1;
      this.pageSize = event.pageSize;
      this.paginate();
    }

    openInfoPost(content : any, id: number) {
      this.postService.getPost(id).subscribe(
        (res : Post) => {
          this.selectedPost = res;
        }
      )
      this.modal.open(content, {width: '500px', disableClose: true})
    }

    openInfoUser(content : any, id: number) {
      this.userService.getUser(id).subscribe(
        (res : User) => {
          this.selectedUser = res;
          console.log(this.selectedUser)
        }
      )
      this.modal.open(content, {width: '500px', disableClose: true})
    }
}

