import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BlogService } from '../../../core/services/blog.service';
import { CloudineryService } from '../../../core/services/cloudinery.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { IBlog } from '../../../core/models/IBlog';
import { IApiResponseBlog } from '../../../core/models/IApiResponse';

@Component({
  selector: 'app-add-blog',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './add-blog.component.html',
  styleUrl: './add-blog.component.css'
})
export class AddBlogComponent {
  formData!: FormGroup;
  selectedFile?: File;
  adding:boolean=false

  constructor(private fb: FormBuilder, private _cloudineryService: CloudineryService, private _blogService: BlogService,private _router:Router) {
    this.formData = this.fb.group({
      heading: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9.,!?\\s]{3,}$')]],
      content: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9.,!?\\s]{3,}$')]],
      file: [File || '', [Validators.required, this.fileValidator]],
    });
  }

  onSubmit() {
    if (this.formData.valid && this.selectedFile) {
      this.adding=true
      this._cloudineryService.uploadToCloudinery(this.selectedFile).subscribe((resp: any) => {
        if (resp) {
          const articleData:Partial<IBlog> = {
            heading: this.formData.get('heading')?.value,
            content: this.formData.get('content')?.value,
            image:resp.url
          }
          this._blogService.addBlog(articleData).subscribe({
            next: (res: any) => {
              if (res.success) {
                Swal.fire({
                  icon: 'success',
                  timer: 2000,
                  toast: true,
                  showConfirmButton: false,
                  title:res.message
                })
                this.adding=false

                this._router.navigate(['/profile'])
              }
            },
            error: (error) => {
              this.adding=false
              Swal.fire({
                icon: 'error',
                timer: 2000,
                toast: true,
                showConfirmButton: false,
                title:error.error.message
              })
            }
          })
        }


      })

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
      this.formData.get('file')?.setValue(input.files[0])
      this.formData.get('file')?.updateValueAndValidity();
    } else {
      this.selectedFile = undefined;
      this.formData.get('file')?.setValue(null);
    }
  }

  fileValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const file = control.value as File;
    if (!file) return null;

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
}


