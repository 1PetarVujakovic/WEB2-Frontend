import { UserType } from "./UserType";

export interface RegisterData{
    Username: string;
    Email: string;
    Password?: string;
    Fullname: string;
    DateOfBirth: string;
    Address: string;
    Type: UserType;
    ImagePath: string;
}
