# Nebu

A stable, fast, and maintainable Discord bot written in Typescript.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Installation

You can use the Docker image hosted on the GitHub Container Registry to run the bot without needing to set up a development environment.

```bash
docker pull ghcr.io/TymonMarek/nebu:latest
docker run -d --name nebu -e DISCORD_TOKEN=your_token_here -e APPLICATION_ID=your_application_id_here ghcr.io/TymonMarek/nebu:latest
```

Alternatively, you can use a `docker-compose.yml` file to manage the bot more easily.

```yml
services:
  bot:
    image: ghcr.io/TymonMarek/nebu:latest
    environment:
      - DISCORD_TOKEN=your_token_here
      - APPLICATION_ID=your_application_id_here
    restart: unless-stopped
```

Then in the same directory as your `docker-compose.yml` file, compose up the configuration.

```bash
docker-compose up -d
```

## Usage

To use the bot, you will need to create a Discord application and obtain a bot token. You can do this by following the instructions in the [Discord Developer Portal](https://discord.com/developers/applications).

Once you have your bot token, you can run the bot using the Docker image as described in the installation section. Make sure to replace `your_token_here` and `your_application_id_here` with your actual bot token and application ID.

## Contributing

Contributions are welcome! If you would like to contribute to the project, please fork the repository and create a pull request with your changes. Make sure to follow the existing code style and include tests for any new features or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
