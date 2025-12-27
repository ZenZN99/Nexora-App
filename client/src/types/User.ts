
export interface IUser {
  _id: string;
  fullname: string;
  email:string;
  password: string;
  role: string;
  avatar: string;
  cover:string;
  status:string;
}

export interface UserStore {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  loadUser: () => void;
  logout: () => void;
}