import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../../core/services/blog.service';
import { IBlog } from '../../../core/models/IBlog';
import { IApiResponseBlog } from '../../../core/models/IApiResponse';
import { BlogCardComponent } from "../blog-card/blog-card.component";
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-landing',
  imports: [BlogCardComponent,CommonModule],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent implements OnInit {
  blogs!: IBlog[]
  isLoading: boolean = false

  constructor(private _blogService:BlogService){}
  ngOnInit(): void {
    this.isLoading=true
    this._blogService.getAllBlogs().subscribe({
      next: (res: any) => {

        if (res.success) {
          this.isLoading=false
          this.blogs = res.data

        }
      },
      error: (err: any) => {
        this.isLoading=false
        console.log(err.error.message);
      }
    })
  }
}
