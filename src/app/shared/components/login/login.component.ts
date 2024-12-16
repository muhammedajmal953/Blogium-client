import { Component } from '@angular/core';
import { EmailValidator, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ILoginForm } from '../../../core/models/ILoginForm';
import { AuthService } from '../../../core/services/auth.service';
import { IUserLogin } from '../../../core/models/IUser';
import { IApiResponseUser, IValidationError } from '../../../core/models/IApiResponse';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,RouterModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm!: FormGroup
  isLogging:boolean=false
  constructor(private _authService:AuthService,private _router:Router) {
    this.loginForm = new FormGroup<ILoginForm>({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.email]),
    })
  }



  onSubmit() {
    console.log('clicked');

    if (this.loginForm.valid) {
      this.isLogging=true
      let userData: IUserLogin = {
        email: this.loginForm.get('email')?.value,
        password: this.loginForm.get('password')?.value

      }
      this._authService.login(userData).subscribe({
        next: (res: IApiResponseUser) => {
          this.isLogging = false
          console.log(res.message);

          this._router.navigate(['/'])
        },
        error: (err: any) => {
          this.isLogging = false
          Swal.fire({
            icon: 'error',
            toast: true,
            timer: 2000,
            showConfirmButton: false,
            title:err.error.message
          })
        }
      })
    }
    this.loginForm.markAllAsTouched()
  }


}
