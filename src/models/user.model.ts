import Roles from "./roles.enum";

export interface UserInfo {
   id: number;
    name: string;
    email: string;
    role: Roles;
    token?: string;

}