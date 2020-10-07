import chalk from "chalk";
import clear from "clear";
import figlet from "figlet";
import { Spinner } from "clui";

// Clear current console
clear();

console.log(
  chalk.yellow(
    figlet.textSync("GitChat", { horizontalLayout: "full" })
  )
);





import { createBasicAuth } from "@octokit/auth";
import { request } from "@octokit/request";

// Predefine prompts
import { askGithubCredentials } from "./lib/inquirer";

type Credentials = {
  username: string;
  password: string;
}

const run = async () => {
  // Get username & password via CLI
  const credentials: Credentials = await askGithubCredentials();

  const status = new Spinner('Authenticating you with GitHub, please wait...');

  // Start authentication loader
  status.start();

  const auth = createBasicAuth({
    username: credentials.username,
    password: credentials.password,
    on2Fa() {
      return "Two-factor necessary";
      // return prompt("Two-factor authentication Code:");
    },
  });


  const authResponse = await auth({ type: "token" });

  if (authResponse) {
    console.log(
      chalk.yellow("\nSuccessfully logged in!")
    );
  }

  // Stop authentication loader
  status.stop();

  // const requestWithAuth = request.defaults({
  //   request: {
  //     hook: auth.hook,
  //   },
  // });

  // const { data: authorizations } = await requestWithAuth("GET /authorizations");
  // console.log("run -> authorizations", authorizations)

  status.stop();
};

run();