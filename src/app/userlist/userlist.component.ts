import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css'],
})
export class UserlistComponent {
  posts: any[] = [];

  // Loading user data using get request

  constructor(private http: HttpClient) {
    this.loadPosts();
  }

  loadPosts() {
    this.http.get('https://gorest.co.in/public/v2/users').subscribe(
      (posts: any) => {
        this.posts = posts;
      },
      (error) => {
        alert('Content not loaded because of no internet');
      }
    );
  }
}
