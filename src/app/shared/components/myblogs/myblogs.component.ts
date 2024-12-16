import { Component } from '@angular/core';
import { IBlog } from '../../../core/models/IBlog';
import { BlogService } from '../../../core/services/blog.service';
import { Router } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { IApiResponseBlog } from '../../../core/models/IApiResponse';

@Component({
  selector: 'app-myblogs',
  imports: [DatePipe, CommonModule],
  templateUrl: './myblogs.component.html',
  styleUrl: './myblogs.component.css'
})
export class MyblogsComponent {
  blogs!: IBlog[] | any
  isLoading: boolean = false


  constructor(private _blogService: BlogService, private _router: Router,) { }
  ngOnInit(): void {
    this.isLoading = true
    this._blogService.getOwnBlogs().subscribe({
      next: (res: any) => {
        if (res.success) {
          this.isLoading = false
          this.blogs = res.data
        }
        console.log(this.blogs);
      },
      error: (err: any) => {
        this.isLoading = false
        console.log(err.error.message);
      }
    })
  }

  editBlog(id: string) {
    this._router.navigate([`/profile/edit-blog/${id}`])
  }

  deleteBlog(id: string) {
    Swal.fire({
      showCancelButton: true,
      toast: true,
      title: 'Are You sure?',
      text: 'if you delete,it will delete for permenent',
      icon: 'warning'
    }).then((action) => {
      if (action.isConfirmed) {
        this._blogService.deleteBlog(id).subscribe({
          next: (res: any) => {
            if (res.success) {
              Swal.fire({
                showConfirmButton:false,
                toast: true,
                title: 'Deleted',
                timer:2000
              })
              this.blogs.filter((blog:any)=>blog._id!==id)
            }
          }
        })
      }
    })
  }

  addBlog() {
    this._router.navigate(['/profile/add-blog/'])
  }
}
