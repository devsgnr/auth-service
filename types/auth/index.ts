export interface WTUser {
  _id: string;
  email: string;
  password: string;
  full_name: string;
  profile_picture: string | null;
  phone_number: string | null;
  token: string;
}

export interface WTLogin {
  email: string;
  password: string;
}
