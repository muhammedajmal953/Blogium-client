import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {


  if (req.url.includes('api.cloudinary.com')) {
    return next(req)
  }
let modifiedReq= req.clone({
    withCredentials:true
  })

  return next(modifiedReq);
};
