import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Auth } from 'src/app/classes/auth';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  authenticated= false;

  constructor (private http:HttpClient) {
   
  }

  ngOnInit(): void {
    Auth.authEmitter.subscribe(
      (authenticated: boolean) => {
        this.authenticated = authenticated;
      }
    );
  }

  logout(): void {
this.http.post('/api/logout', {})
.subscribe(() => {});
  }
}
