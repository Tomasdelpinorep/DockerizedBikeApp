
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrl: './admin-navbar.component.css'
})
export class AdminNavbarComponent {
  constructor(private router: Router) { }

  isStationsRoute(): any {
    if (this.router.url == "/admin/stations") return true;

    return false;
  }

  isIssuesRoute(): any {
    if (this.router.url == "/admin/issues") return true;

    return false;
  }

  isBikeRoute(): any {
    if (this.router.url == "/admin/bikes") return true;

    return false;
  }

  isTravelsRoute(): any {
    if (this.router.url == "/admin/travels") return true;

    return false;
  }

}
