import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IRegisterForm } from '../../../core/models/ILoginForm';
import { Router, RouterModule } from '@angular/router';
import { IUserSignUp } from '../../../core/models/IUser';
import { IApiResponseUser } from '../../../core/models/IApiResponse';
import Swal from 'sweetalert2';
import { AuthService } from '../../../core/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,RouterModule,CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerForm!: FormGroup<IRegisterForm>;

  isLogging:boolean=false

  constructor(private _authService:AuthService,private _router:Router) {
    this.registerForm = new FormGroup<IRegisterForm>({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.pattern('^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$')]),
      userName: new FormControl('', [Validators.required, Validators.pattern('^(?!.*[._]{2})[A-Za-z][A-Za-z0-9._]{1,}[A-Za-z0-9]$')]),
      confirmPassword: new FormControl('', [Validators.required])
    })
  }

  private bothConfirmPasswordAndPasswordCheck() {
    const { password, confirmPassword } = this.registerForm.value;

    if(password && (password as string).length < 8) {
      this.registerForm.get('password')?.setErrors({ message: `Should contain least 8 characters.` });

    }else if(password && confirmPassword && (password !== confirmPassword)) {
      this.registerForm.get('confirmPassword')?.setErrors({ message: `Both Password doesn't match.` });
    }
  }


    onSubmit() {
        console.log('clicked');

        if (this.registerForm.valid) {
          this.isLogging=true
          let userData: IUserSignUp = {
            email: this.registerForm.get('email')?.value as string,
            password: this.registerForm.get('password')?.value as string,
            username: this.registerForm.get('userName')?.value as string,
            confirmPassword:this.registerForm.get('confirmPassword')?.value as string
          }
          this._authService.register(userData).subscribe({
            next: (res: IApiResponseUser) => {
              this.isLogging = false
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
        this.registerForm.markAllAsTouched()
      }
}
