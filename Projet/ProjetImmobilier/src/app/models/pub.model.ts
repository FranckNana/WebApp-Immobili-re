import { Users } from './users.model';

export class Pub {
    photo: string;
    email: string;
    constructor(public type: string, 
                public fonction: string,
                public superficie: number,
                public prix: number,
                public adresse: string) {}
}

export class RespPub{ 
    constructor( public id: number,
                 public type: string,
                 public fonction: string,
                 public superficie: number,
                 public prix: number,
                 public adresse: string,
                 public photo: string,
                 public email: string,
                 public user: Users) {}
}