import { IRole } from "./IToken";

interface Authority {
	authority: string;
}

interface IUser {
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
	authorities: Array<Authority>;
	credentialsNonExpired: boolean;
	accountNonExpired: boolean;
	accountNonLocked: boolean;
}

export { IUser, Authority };
export default IUser;