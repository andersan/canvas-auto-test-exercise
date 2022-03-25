export class User {
  public username: string;

  constructor(username: string) {
    this.username = username;
  }

  get userName(): string {
    return this.username;
  }
}

