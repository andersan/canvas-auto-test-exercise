require('dotenv').config({ path: __dirname+'/.env' });

class Environment {
  private USERNAME_CHRIS: string;
  private PASSWORD_CHRIS: string;
  private USERNAME_PUBLIC: string;
  private PASSWORD_PUBLIC: string;
  private PAGE_NAME: string;
  private APP_NAME: string;

  private getBranch() {
    const env = process.env.GIT_BRANCH;
    console.log("Environment = " + env);
    return env;
  }

  private ENV = this.getBranch();

  getVars(): [
    USERNAME_CHRIS: string,
    PASSWORD_CHRIS: string,
    USERNAME_PUBLIC: string,
    PASSWORD_PUBLIC: string,
    PAGE_NAME: string,
    APP_NAME: string
  ] {
    if (this.ENV == null) {
      console.log("Environment is " + this.ENV + " Please define environment");
    } else {
      if (this.ENV == "origin/qa-automation") {
        this.USERNAME_CHRIS = process.env.QA_USERNAME_CHRIS;
        this.PASSWORD_CHRIS = process.env.QA_PASSWORD_CHRIS;
        this.USERNAME_PUBLIC = process.env.QA_USERNAME_PUBLIC;
        this.PASSWORD_PUBLIC = process.env.QA_PASSWORD_PUBLIC;
        this.PAGE_NAME = process.env.PAGE_NAME;
        this.APP_NAME = process.env.APP_NAME;
      } else if (this.ENV == "origin/qa") {
        this.USERNAME_CHRIS = process.env.QA_USERNAME_CHRIS;
        this.PASSWORD_CHRIS = process.env.QA_PASSWORD_CHRIS;
        this.USERNAME_PUBLIC = process.env.QA_USERNAME_PUBLIC;
        this.PASSWORD_PUBLIC = process.env.QA_PASSWORD_PUBLIC;
        this.PAGE_NAME = process.env.PAGE_NAME;
        this.APP_NAME = process.env.APP_NAME;
      } else if (this.ENV == "origin/main") {
        this.USERNAME_CHRIS = process.env.PRD_USERNAME_CHRIS;
        this.PASSWORD_CHRIS = process.env.PRD_PASSWORD_CHRIS;
        this.USERNAME_PUBLIC = process.env.PRD_USERNAME_PUBLIC;
        this.PASSWORD_PUBLIC = process.env.PRD_PASSWORD_PUBLIC;
        this.PAGE_NAME = process.env.PAGE_NAME;
        this.APP_NAME = process.env.APP_NAME;
      } else {
        console.log(this.ENV + " doesn't match expected environment");
      }
    }
    if (this.USERNAME_CHRIS == null)
      console.log("USERNAME_CHRIS is: " + this.USERNAME_CHRIS);
    if (this.PASSWORD_CHRIS == null)
      console.log("PASSWORD_CHRIS is: " + this.PASSWORD_CHRIS);
    if (this.USERNAME_PUBLIC == null)
      console.log("USERNAME_PUBLIC is: " + this.USERNAME_PUBLIC);
    if (this.PASSWORD_PUBLIC == null)
      console.log("PASSWORD_PUBLIC is: " + this.PASSWORD_PUBLIC);
    if (this.PAGE_NAME == null) console.log("PAGE_NAME is: " + this.PAGE_NAME);
    if (this.APP_NAME == null) console.log("APP_NAME is: " + this.APP_NAME);

    return [
      this.USERNAME_CHRIS,
      this.PASSWORD_CHRIS,
      this.USERNAME_PUBLIC,
      this.PASSWORD_PUBLIC,
      this.PAGE_NAME,
      this.APP_NAME,
    ];
  }
}

export default new Environment();
