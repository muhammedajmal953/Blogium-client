import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2';
import { CloudineryService } from '../../../core/services/cloudinery.service';
import { BlogService } from '../../../core/services/blog.service';
import { IBlog } from '../../../core/models/IBlog';

@Component({
  selector: 'app-edit-blog',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  templateUrl: './edit-blog.component.html',
  styleUrl: './edit-blog.component.css'
})
export class EditBlogComponent {
  blog!:IBlog
  formData!: FormGroup;
  selectedFile?: File;
  blogId: string|null='';





  constructor(
    private fb: FormBuilder,
    private _cloudineryService: CloudineryService,
    private _blogService: BlogService,
    private _router: Router,
    private _activatedRoute:ActivatedRoute
  ) {
    this.formData = this.fb.group({
      heading: [
        '',
        [Validators.required, Validators.pattern('^[A-Za-z0-9.,!?\\s]{3,}$')],
      ],
      content: [
        '',
        [Validators.required, Validators.pattern('^[A-Za-z0-9.,!?\\s]{3,}$')],
      ],
      file: [File || '', [ this.fileValidator]],
    });
  }




  ngOnInit(): void {
    this.blogId=this._activatedRoute.snapshot.paramMap.get('id')
    this._blogService.getBlog(this.blogId as string).subscribe({
      next: (res:any) => {
        if (res.success) {
          this.blog = res.data

          this.formData.patchValue({
            heading: this.blog.heading,
            content:this.blog.content
          })
        }
      },
      error:(error)=>{
        Swal.fire({
          icon: error,
          toast: true,
          timer: 2000,
          showConfirmButton: false,
          title:error.error.message
        })
      }
    })
  }
  onSubmit(id: string|null) {
    if (this.formData.valid) {
      const blogData = {
        heading: this.formData.get('heading')?.value,
        content: this.formData.get('content')?.value,
        image: this.blog.image,
      };
      if (this.selectedFile) {
        this._cloudineryService
          .uploadToCloudinery(this.selectedFile)
          .subscribe((resp: any) => {
            if (resp) {
              blogData.image=resp.url
              this.updateBlog(this.blogId as string,blogData)

            }
          });
      } else {
        this.updateBlog(this.blogId as string,blogData)
      }
      console.log('Form Submitted', this.formData);
    } else {
      this.formData.markAllAsTouched()
      console.log('Form is invalid');
    }
  }

  onChange(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
      this.formData.get('file')?.setValue(input.files[0]);
      this.formData.get('file')?.updateValueAndValidity();
    } else {
      this.selectedFile = undefined;
      this.formData.get('file')?.setValue(null);
    }
  }

  fileValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const file = control.value as File;
    if (!file || !(file instanceof File)) {
      return null;
    }

    const allowedTypes = ['image/jpg', 'image/jpeg', 'image/png'];
    const maxSize = 2 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      return { fileType: true };
    }

    if (file.size > maxSize) {
      return { fileSize: true };
    }

    return null;
  }

  updateBlog(id: string, blogData:any) {
    this._blogService.editBlog(id, blogData).subscribe({
      next: (res: any) => {
        if (res.success) {
          Swal.fire({
            icon: 'success',
            timer: 2000,
            toast: true,
            showConfirmButton: false,
            title: res.message,
          });
          this._router.navigate(['/profile']);
        }
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          timer: 2000,
          toast: true,
          showConfirmButton: false,
          title: error.error.message,
        });
      },
    });
  }
}
