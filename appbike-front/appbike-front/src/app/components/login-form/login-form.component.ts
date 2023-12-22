import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { TokenStorageService } from '../../services/token-storage.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.css'
})
export class LoginFormComponent {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  role! :string;
  username! :string;

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
  }

  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe({
      next: data => {
        //this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data);
        localStorage.setItem("USER_ID",data.id)

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.role = data.role;
        this.username = data.username;
        this.reloadPage();
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        console.log(err);
      }
    });
  }

  reloadPage(): void {
    window.location.reload();
  }
}
