import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css'],
})
export class UserlistComponent {
  posts: any[] = [];
  mobile: boolean = true;
  private GET_API_URL = environment.GET_API_URL;

  // Loading user data using get request

  constructor(private http: HttpClient) {
    this.loadPosts();
  }

  ngOnInit() {}

  loadPosts() {
    this.http.get(this.GET_API_URL).subscribe(
      (posts: any) => {
        this.posts = posts;
      },
      (error) => {
        alert('Content not loaded because of no internet');
      }
    );
  }
}
