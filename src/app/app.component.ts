import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssignmentsService } from './shared/assignments.service';
import { AuthService } from './shared/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  titre = "Application de gestion d'Assignments";

  constructor(public authService: AuthService,
    private router: Router,
    private assignmentsService: AssignmentsService) { }

  ngOnInit() {
    let isloggedin: string;
    let loggedUser: string;
    isloggedin = localStorage.getItem('isloggedIn');
    loggedUser = localStorage.getItem('loggedUser');
    if (isloggedin != "true" || !loggedUser)
      this.router.navigate(['/login']);
    else
      this.authService.setLoggedUserFromLocalStorage(loggedUser);
  }

  login() {
    this.router.navigate(["/login"]);
  }
  logout() {
    this.authService.logOut();
  }

  peuplerBD() {
    //this.assignmentsService.peuplerBaseAvecDonneesDeTest();
    this.assignmentsService.peuplerBDJoin()
      .subscribe((reponse) => {
        console.log("### BD PEUPLEE ! ###");
        // on navigue vers la page d'accueil pour afficher la liste
        this.router.navigate(["/home"]);
      })
  }
}
