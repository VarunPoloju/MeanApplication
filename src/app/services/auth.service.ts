import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthData } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpclient: HttpClient) { }

  createUser(email: string, password: string) {
    const authdata: AuthData = { email: email, password: password }
    this.httpclient.post('http://localhost:3000/api/user/signup', authdata).subscribe(response => {
      console.log(response);
    })
  }

  loginUser(email: string, password) {
    const authdata: AuthData = { email: email, password: password }
    this.httpclient.post('http://localhost:3000/api/user/login', authdata).subscribe(response => {
      console.log(response);
    })
  }
}
