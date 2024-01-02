import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Auth } from 'src/app/classes/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
message = "";

constructor(
  private http: HttpClient
) {
 
}

ngOnInit(): void {
  this.http.get('/api/user')
    .subscribe({
      next: (data: any) => {
        if (data.user) {
          console.log(`First Name: ${data.user.first_name}`);
          console.log(`Last Name: ${data.user.last_name}`);
          this.message = `Hello ${data.user.first_name} ${data.user.last_name}`;
          Auth.authEmitter.emit(true);
        } else {
          this.message = 'User data not available';
        }
      },
      error: () => {
        this.message = 'You are not logged in!';
        Auth.authEmitter.emit(false);
      }
    });
}

}


