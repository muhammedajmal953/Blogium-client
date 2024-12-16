import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../../core/services/auth.service';
import { IApiResponseUser } from '../../core/models/IApiResponse';

@Component({
  selector: 'app-home',
  imports: [RouterModule,CommonModule,],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  isLoggeIn=false
  constructor(private _router: Router,private _cookieService:CookieService,private _authService:AuthService) {
  }
  showmenu = false


  logout() {
    this._authService.logout().subscribe({
      next: (res:IApiResponseUser) => {
        this._router.navigate(['/auth/login'])
      }
    })

  }
}
