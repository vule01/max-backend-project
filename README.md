
# Max Backend Project

Below are the instructions on how to set up and run the project locally.

## Prerequisites

Make sure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (>= 16.0.0)
- [npm](https://www.npmjs.com/) (comes with Node.js)

## Setup

1. **Clone the repository**  
   Clone the repository to your local machine using the following command:

   ```bash
   git clone <repository-url>
   cd <project-directory>
   ```

2. **Install dependencies**  
   Run the following command to install the necessary dependencies:

   ```bash
   npm i
   ```

3. **Run Database Setup**  
   Generate migrations then execute them in the database.

   ```bash
   npm run sql-file ./migrations/0000_schema.sql
   ```

   This will apply the initial database schema.

4. **Start the application**  
   After the database is set up, you can start the application using:

   ```bash
   npm start
   ```

## Notes

- The migrations are stored in the `./migrations` folder which will be created after you first run the database setup script. The first migration file is `0000_schema.sql`. Subsequent ones will have the number incremented, ex. `0001_schema.sql`.
- If you need to update the database structure, you can modify the `./src/db/schema.ts` file then run the migration command with the incremented migration file number.
