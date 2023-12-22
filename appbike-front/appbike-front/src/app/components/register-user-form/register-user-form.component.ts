import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { TokenStorageService } from '../../services/token-storage.service';

@Component({
  selector: 'app-register-user-form',
  templateUrl: './register-user-form.component.html',
  styleUrl: './register-user-form.component.css'
})
export class RegisterUserFormComponent {

  form: any = {
    username: null,
    password: null,
    verifyPassword: null,
    nombre: null,
    apellidos: null,
    email: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';
  roles: string[] = [];
  isLoggedIn = false;

  constructor(private authService: AuthService, private router: Router, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      //this.roles = this.tokenStorage.getUser().roles;
      this.roles = ['ROLE_USER'];
    }
  }

  onSubmit() {
    const { password, verifyPassword } = this.form;

    // Validate that the passwords match
    if (password !== verifyPassword) {
      this.errorMessage = 'Passwords do not match';
      this.isSignUpFailed = true;
      return;
    }

    this.authService.registerUser(this.form).subscribe({
      next: data => {
        // Handle successful registration
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;

        this.tokenStorage.saveToken(data.token);
        this.tokenStorage.saveUser(data);

        this.roles = ['ROLE_USER'];
        this.reloadPage();
      },
      error: err => {
        // Handle registration failure
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
        console.log(err);
      },
    });
  }



  reloadPage(): void {
    window.location.reload();
  }

}
