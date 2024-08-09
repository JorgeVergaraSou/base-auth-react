import Roles from "./roles.enum";

export interface UserInfo {
   id: number;
    name: string;
    email: string;
    rol: Roles;

}