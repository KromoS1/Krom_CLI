# KROM-CLI

KROM-CLI is a Node.js command-line interface (CLI) tool that allows you to quickly create project templates for various frameworks, such as React with Vite and React Native/Expo. It leverages the package manager bun.js to perform all the necessary actions.

## Features
- Generate project templates for React with Vite and React Native/Expo.
- Utilize the Feature slice design pattern for application architecture.
- Integrate with GitHub to initialize a remote repository and upload the created project template.
- Simplify the process of committing and pushing code with a single command.
- Prompt the user to create a pull request when there are no pending requests.

## Installation
To use KROM-CLI, you need to have Node.js installed on your system. You can install KROM-CLI globally using npm. Run the following command in your terminal:

```shell
npm install -g krom-cli
```

## Usage

After installing KROM-CLI, you can use it by running the following commands:

- To create a new project template for React with Vite:
    ```shell
    krom template <file_name>
    ```

- To push your commits:
    ```shell
    krom push --message <commit_message>
    ```

- To initialize a repository in GitHub:
    ```shell
    krom init_repo
    ```

- To show the actual path to the directory with executable files:
    ```shell
    krom show --files
    ```

- For help and more information:
    ```shell
    krom help
    ```

## Configuration

KROM-CLI uses a configuration file (`krom.config.json`) to store your GitHub credentials and other settings. Make sure to update this file with your own information before using the GitHub integration feature.

## Examples

Here are some examples of using KROM-CLI:

- Create a new project template:
    ```shell
    krom template my-project
    ```

- Push commits with a custom message:
    ```shell
    krom push --message "Fix bug"
    ```

- Initialize a repository in GitHub:
    ```shell
    krom init_repo
    ```

- Show the list of executable files in a directory:
    ```shell
    krom show --files
    ```

## Contributing

If you encounter any issues or have suggestions for improvements, please feel free to open an issue on the KROM-CLI repository. Contributions are welcome!

## License

This project is licensed under the MIT License.

Kromos CLI - by Roman Shaulinski
Version: [1.0.0]