import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { LandingComponent } from './shared/components/landing/landing.component';
import { UserProfileComponent } from './shared/components/user-profile/user-profile.component';
import { MyblogsComponent } from './shared/components/myblogs/myblogs.component';
import { AddBlogComponent } from './shared/components/add-blog/add-blog.component';
import { EditBlogComponent } from './shared/components/edit-blog/edit-blog.component';
import { EditProfileComponent } from './shared/components/edit-profile/edit-profile.component';
import { AuthComponent } from './features/auth/auth.component';
import { loginGuard } from './core/guards/login.guard';
import { authGuard } from './core/guards/auth.guard';
import { LoginComponent } from './shared/components/login/login.component';
import { RegisterComponent } from './shared/components/register/register.component';
import { PageNotFoundComponent } from './features/page-not-found/page-not-found.component';
import { ViewBlogComponent } from './shared/components/view-blog/view-blog.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        component: LandingComponent
      },
      {
        path: 'profile',
        component: UserProfileComponent,
        children: [{
          path: '',
          component: MyblogsComponent
        },
        {
          path: 'add-blog',
          component: AddBlogComponent
        },
        {
          path: 'edit-blog/:id',
          component: EditBlogComponent
        },
        {
          path: 'edit-profile',
          component: EditProfileComponent
        }
        ]
      },
      {
        path: ':id',
        component:ViewBlogComponent
      }
    ]
  }, {
    path: 'auth',
    component: AuthComponent,
    canActivate: [loginGuard],
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      }
    ]
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];
