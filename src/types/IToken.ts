import RoleEnum from "./RoleEnum";

interface IToken {
  token: string;
  authUser: IAuthUser;
  expiresIn: number;
}

interface IAuthUser {
  id: number;
  name: string;
  lastname: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  role: IRole;
  enabled: boolean;
  username: string;
  authorities: IAuthority[];
  credentialsNonExpired: boolean;
  accountNonExpired: boolean;
  accountNonLocked: boolean;
}

interface IAuthority {
  authority: string;
}

interface IRole {
  id: number;
  name: RoleEnum;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export { IToken, IAuthUser, IAuthority, IRole };
export default IToken;