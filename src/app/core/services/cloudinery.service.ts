import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CloudineryService {

  constructor(private _http:HttpClient) { }
  cloud_name: string = 'difeozxjq'

  upload_present: string = 'mysunsigned'


  uploadToCloudinery(file:File) {
   const formData= new FormData

    formData.append('file', file)
    formData.append('upload_preset',this.upload_present)
    return this._http.post(`https://api.cloudinary.com/v1_1/${this.cloud_name}/image/upload`,formData)
  }
}
