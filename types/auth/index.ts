export interface IUser {
  _id: string;
  email: string;
  password: string;
  full_name: string;
  profile_picture: string | null;
  phone_number: string | null;
  token: string;
}

export interface ILogin {
  email: string;
  password: string;
}
