export class Users{
      photo: string;
      constructor(public email: string,
                  public name: string,
                  public accountType: string,
                  public surname: string,
                  public phoneNumber: string,
                  public address: string,
                  public city: string,
                  public codePostal: string) {}
}