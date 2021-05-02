import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { User } from './user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = new User();
  constructor(private authService: AuthService,
    public router: Router) { }

  ngOnInit(): void {
  }

  onLoggedin() {
    console.log(this.user);
    let isValidUser: Boolean = this.authService.logIn(this.user);
    console.log("valid user " + isValidUser);
    if (isValidUser) {
      console.log("isadmin " + this.authService.isAdmin());
      this.router.navigate(['/home']);
    }
    else
      alert('Login ou mot de passe incorrecte!');
  }
}


