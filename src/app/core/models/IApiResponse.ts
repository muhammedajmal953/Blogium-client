import { IBlog } from "./IBlog"
import { IUserProfile } from "./IUser"


export interface IApiResponseUser{
  success: boolean
  message: string
  data:IUserProfile | undefined
}

export interface IApiResponseBlog{
  success: boolean
  message: string
  data:IBlog|undefined
}

export interface IValidationError {
  message: string;
  errorCode: string;
  errorField: string;
}


