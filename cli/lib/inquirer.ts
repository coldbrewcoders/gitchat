import inquirer from "inquirer";

export const askGithubCredentials = () => {
  const questions = [
    {
      name: "username",
      type: "input",
      message: "Enter your GitHub username or e-mail address:",
      validate: (value) => {
        if (value.length) {
          return true;
        } else {
          return "Please enter your username or e-mail address.";
        }
      }
    },
    {
      name: "password",
      type: "password",
      message: "Enter your password:",

      // TODO: Implement better password validation
      validate: (value) => {
        if (value.length) {
          return true;
        } else {
          return "Please enter your password.";
        }
      }
    }
  ];

  return inquirer.prompt(questions);
};