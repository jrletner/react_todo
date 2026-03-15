# React Todo Monorepo

This project is a full-stack Todo application built with a monorepo structure, featuring a React client and a Node.js/Express server backed by MongoDB. The client uses Vite, TypeScript, and Tailwind CSS for a modern, fast, and responsive UI. The server provides a RESTful API for managing todos, with MongoDB as the database.

## Features

- Add, edit, complete, and delete todos
- Modular React components with type-safe props
- REST API with CRUD operations
- Backend powered by MongoDB
- Type safety throughout the server (Node.js/Express with TypeScript)
- Helper functions for clean code separation
- Tailwind CSS for styling
- Environment variable support for easy configuration

## Folder Structure

```
react_todo/
├── client/   # React + Vite frontend
│   ├── src/
│   ├── public/
│   ├── .env.example
│   └── ...
├── server/   # Node.js + Express backend
│   └── ...
└── package.json
```

## Setup Instructions

### 1. Clone the Repository

```
git clone https://github.com/jrletner/react_todo.git
cd react_todo
```

### 2. Configure Environment Variables

- Copy `.env.example` to `.env` in the `client` folder and update as needed.
- In the `server` folder, create a `.env` file and set your MongoDB connection string:

```
MONGODB_URI=your_mongodb_connection_string
```

### 3. Install Dependencies

First, install dependencies in the parent directory to set up the workspaces:

```
npm install
```

Then install dependencies for each workspace:

#### Client

```
cd client
npm install
```

#### Server

```
cd ../server
npm install
```

### 4. Start the Application

You can start both the client and server from the parent folder using npm scripts:

#### Start Both (Recommended)

From the parent directory:

```
npm run start
```

This will run both the client and server using background processes. (See package.json: `start` script)

#### Start Individually

To run only the client or server:

**Client:**

```
npm run dev:client
```

**Server:**

```
npm run dev:server
```

### 5. Access the App

- Open your browser and go to `http://localhost:5173` (default Vite port).

## API Endpoints

- `GET /api/v1/todos` — List todos
- `POST /api/v1/todos` — Create todo
- `PUT /api/v1/todos/:id` — Edit/complete todo
- `DELETE /api/v1/todos/:id` — Delete todo

## Development Notes

- Client and server run independently; configure `VITE_SERVER_URI` in client `.env` to match server URL.
- Use Postman or similar tools to test API endpoints.
- Modularize logic in `src/helpers/helperFunctions.ts` for maintainability.

## License

MIT

---

For questions or issues, please open an issue on GitHub.
