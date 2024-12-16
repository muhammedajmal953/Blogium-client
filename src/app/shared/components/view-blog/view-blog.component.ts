import { Component } from '@angular/core';
import { IBlog } from '../../../core/models/IBlog';
import { BlogService } from '../../../core/services/blog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IApiResponseBlog } from '../../../core/models/IApiResponse';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-view-blog',
  imports: [DatePipe],
  templateUrl: './view-blog.component.html',
  styleUrl: './view-blog.component.css'
})
export class ViewBlogComponent {
  blogData!: any
  private blogId!:string|null
  constructor(private blogSevice: BlogService,private activatedRoute:ActivatedRoute,private router:Router) {
    this.blogId = activatedRoute.snapshot.paramMap.get('id')

    this.getData()
  }

  getData() {

    if (!this.blogId) {
      this.router.navigate(['/'])
    }
    const getBlogData$: Observable<IApiResponseBlog> = this.blogSevice.getBlog(this.blogId as string)

    getBlogData$.subscribe({
      next: (res:IApiResponseBlog) => {
        if (res.success) {
          this.blogData=res.data
        }
      }
    })
  }
}
