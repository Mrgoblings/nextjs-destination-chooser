# Website Page Builder

This project is a website page builder that uses markdown format. It allows users to create and customize web pages using a simple and intuitive markdown syntax. The generated pages can be previewed and published.

## Getting Started

To try out the project, follow these steps:

1. Make sure you have Docker and Docker Compose installed on your machine.

2. Clone the repository to your local machine:

    ```bash
    git clone https://github.com/Mrgoblings/nextjs-destination-chooser
    ```

3. Navigate into the project directory:

    ```bash
    cd nextjs-destination-chooser
    ```

4. Open the `docker-compose.yml` file and update the necessary credentials for the Google Console app and GitHub application (optional).

5. Build and start the application using Docker Compose:

    ```bash
    docker-compose up
    ```

6. The application will be available at [http://localhost:3000](http://localhost:3000).

## Features

- Markdown-based page builder: Create and customize web pages using a simple markdown syntax.
- Example page: The project includes an example page that demonstrates how the content would look like if it was fetched from a database.
- Authentication: Users can authenticate to create new pages. User credentials are securely stored in a MySQL database.
- Dockerized: The application is containerized using Docker, making it easy to deploy and run in any environment.

- Coming soon: An enhanced page builder with additional features will be available in future updates.

## Project Structure

The main application code is located in the `src/app` directory. This directory contains all the page components, reusable React components, utility functions, configurations, and other code related to the Next.js application.

The `src/app/` directory is where you can find the page components.

The `src/components` directory contains reusable React components.

The `src/lib` directory contains utility functions and configurations.

Additionally, there is a `/prisma` directory for the Prisma ORM related code and a `/lib` directory for the Swagger file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - An interactive Next.js tutorial.

You can also check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) for more information. Your feedback and contributions are welcome!
