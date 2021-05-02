import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { isUndefined } from 'util';
import { User } from '../login/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedIn = false;
  users: User[] = [{ "username": "mounir", "password": "azerty", "roles": ['ADMIN'] },
  { "username": "ilham", "password": "12345", "roles": ['USER'] }];

  public loggedUser: string;
  public isloggedIn: Boolean = false;
  public roles: string[];

  constructor(private router: Router) { }

  logIn(user:User):Boolean {
    this.loggedIn = true;let validUser: Boolean = false;
    this.users.forEach((curUser) => {
      if(user.username=== curUser.username && user.password==curUser.password) {
        validUser = true;
        this.loggedUser = curUser.username;
        this.isloggedIn = true;
        this.roles = curUser.roles;
        localStorage.setItem('loggedUser',this.loggedUser);
        localStorage.setItem('isloggedIn',String(this.isloggedIn));
      }
    });

     return validUser;
  }

  logOut() {
    this.isloggedIn= false;
  this.loggedUser = undefined;
  this.roles = undefined;
  localStorage.removeItem('loggedUser');
  localStorage.setItem('isloggedIn',String(this.isloggedIn));
  this.router.navigate(['/home']);
  }

  isAdmin() {
    if (!this.roles)
      return false;
    return (this.roles.indexOf('ADMIN') >-1);
  };

  setLoggedUserFromLocalStorage(username : string) {
    this.loggedUser = username;
    this.isloggedIn = true;
    this.getUserRoles(username);
  }

  getUserRoles(username :string){    
    this.users.forEach((curUser) => {
      if( curUser.username == username) {
          this.roles = curUser.roles;
      }
    });
  }
}
