export interface User {
    name:string;
    image:string;
    userid:string;
    emailAddress:string;
    friendsId?:Array<string>;
    friendsName?:Array<string>;
    friends?:Array<string>;
}
