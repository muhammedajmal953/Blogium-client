
export interface IUserLogin{
  email: string,
  password:string
}

export interface IUserSignUp{
  email: string
  username: string
  password: string
  confirmPassword:string
}


export interface IUserProfile extends Omit<IUserSignUp, "password"> {}


