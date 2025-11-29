# NASA Mission Control Dashboard

> A full-stack mission control application for scheduling and managing interstellar space missions to habitable exoplanets discovered by NASA's Kepler space telescope.

[![NASA Project CI](https://github.com/Robotic1804/NASA-Project/actions/workflows/node.yml/badge.svg)](https://github.com/Robotic1804/NASA-Project/actions/workflows/node.yml)

## Features

- **Habitable Exoplanet Discovery**: Browse through confirmed habitable planets from NASA's Kepler mission
- **Mission Scheduling**: Schedule new space missions to any habitable exoplanet
- **Launch History**: View historical SpaceX launch data
- **Mission Management**: Track upcoming missions and abort launches if needed
- **Real-time Data**: Integration with SpaceX API for actual launch history
- **Futuristic UI**: Sci-fi themed interface powered by Arwes framework

## Tech Stack

### Frontend
- **React 17** - UI library
- **Arwes** - Futuristic/sci-fi UI components
- **React Router** - Client-side routing

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM

### External Data Sources
- **NASA Kepler Dataset** - Exoplanet data (CSV)
- **SpaceX API v4** - Historical launch data

## Prerequisites

Before running this project, make sure you have:

- **Node.js** (>= 14.20.1) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **MongoDB Atlas Account** - [Sign up for free](https://www.mongodb.com/cloud/atlas/register)

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/Robotic1804/NASA-Project.git
cd NASA-Project
```

### 2. Install dependencies

Install all dependencies for both client and server:

```bash
npm install
```

This will automatically install dependencies for both frontend and backend.

### 3. Configure MongoDB

Create a `.env` file in the `server` directory:

```bash
cd server
```

Create `.env` file with the following content:

```env
# MongoDB Connection String
MONGO_URL=mongodb+srv://<username>:<password>@<cluster-url>/<database>?retryWrites=true&w=majority

# Server Port (optional, defaults to 8000)
PORT=8000
```

**How to get your MongoDB connection string:**
1. Log in to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Click "Connect" on your cluster
3. Select "Connect your application"
4. Copy the connection string
5. Replace `<username>`, `<password>`, and `<cluster-url>` with your credentials

## Usage

### Development Mode

Run both frontend and backend concurrently:

```bash
npm run watch
```

This will start:
- **Backend**: http://localhost:8000
- **Frontend**: http://localhost:3000

### Run Separately

**Backend only:**
```bash
npm run server
```

**Frontend only:**
```bash
npm run client
```

### Production Build

Build the client and start the production server:

```bash
npm run deploy
```

### Production with Clustering (PM2)

For production with load balancing:

```bash
npm run deploy-cluster
```

## Project Structure

```
NASA-Project/
├── client/                 # React frontend
│   ├── public/            # Static files
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── pages/         # Page components (Launch, History, Upcoming)
│   │   ├── App.js         # Main app component
│   │   └── index.js       # Entry point
│   └── package.json
│
├── server/                # Node.js backend
│   ├── src/
│   │   ├── models/        # Business logic & Mongoose models
│   │   ├── routes/        # API endpoints
│   │   ├── services/      # External services (MongoDB, queries)
│   │   ├── app.js         # Express configuration
│   │   └── server.js      # Server entry point
│   ├── data/
│   │   └── kepler_data.csv  # NASA Kepler exoplanet dataset
│   ├── public/            # Compiled React app (production)
│   └── package.json
│
└── package.json           # Root package (scripts orchestration)
```

## API Endpoints

### Planets

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/v1/planets` | Get all habitable exoplanets |

**Response Example:**
```json
[
  {
    "keplerName": "Kepler-442 b"
  },
  {
    "keplerName": "Kepler-1649 b"
  }
]
```

### Launches

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/v1/launches` | Get all launches (with pagination) |
| POST | `/v1/launches` | Schedule a new launch |
| DELETE | `/v1/launches/:id` | Abort a scheduled launch |

**GET /v1/launches Query Parameters:**
- `page` (optional) - Page number for pagination
- `limit` (optional) - Items per page

**POST /v1/launches Request Body:**
```json
{
  "mission": "Kepler Exploration X1",
  "rocket": "Explorer IS1",
  "launchDate": "2025-12-15",
  "target": "Kepler-442 b"
}
```

**Response:**
```json
{
  "flightNumber": 251,
  "mission": "Kepler Exploration X1",
  "rocket": "Explorer IS1",
  "launchDate": "2025-12-15T00:00:00.000Z",
  "target": "Kepler-442 b",
  "customers": ["Zero to Mastery", "NASA"],
  "upcoming": true,
  "success": true
}
```

## Available Scripts

### Root Directory

| Command | Description |
|---------|-------------|
| `npm install` | Install all dependencies (client + server) |
| `npm run watch` | Run both frontend and backend in dev mode |
| `npm run server` | Run backend only (with nodemon) |
| `npm run client` | Run frontend only |
| `npm run deploy` | Build client and start production server |
| `npm run deploy-cluster` | Production deployment with PM2 clustering |
| `npm test` | Run all tests (client + server) |

## Testing

Run all tests:

```bash
npm test
```

Run backend tests only:

```bash
cd server
npm test
```

Run frontend tests only:

```bash
cd client
npm test
```

## How It Works

### 1. Data Loading on Startup

When the server starts:
1. Connects to MongoDB Atlas
2. Loads NASA Kepler exoplanet data from CSV
3. Filters planets based on habitability criteria:
   - Confirmed by NASA (disposition = "CONFIRMED")
   - Solar radiation: 0.36 - 1.11 times Earth's value
   - Planetary radius: < 1.6 times Earth's radius
4. Downloads SpaceX historical launch data via API
5. Stores all data in MongoDB

### 2. Scheduling a Mission

User workflow:
1. User selects a destination planet from the dropdown
2. Enters mission name, rocket type, and launch date
3. Frontend sends POST request to `/v1/launches`
4. Backend validates the planet exists
5. Generates new flight number
6. Saves mission to MongoDB
7. Mission appears in "Upcoming" page

### 3. Viewing Launch History

- Displays historical SpaceX launches + user-scheduled missions
- Shows mission details: rocket, customers, success status, dates
- Allows filtering and pagination

## Habitability Criteria

Planets are considered habitable based on:

- **Stellar Flux**: 0.36 - 1.11 times Earth's (similar temperature)
- **Planetary Radius**: < 1.6 Earth radii (likely rocky, not gas giant)
- **Status**: Confirmed by NASA

These criteria increase the likelihood of finding Earth-like conditions.

## Deployment

### Option 1: Single Server Deployment

Recommended platforms:
- **Render** - [Guide](https://render.com/)
- **Railway** - [Guide](https://railway.app/)
- **Heroku** - [Guide](https://www.heroku.com/)

Steps:
1. Build the client: `npm run build --prefix client`
2. Deploy the `server/` directory
3. Set environment variable: `MONGO_URL`
4. Start command: `npm start --prefix server`

### Option 2: Separate Deployment

**Backend** (Render/Railway/Heroku):
- Deploy `server/` directory
- Set `MONGO_URL` environment variable

**Frontend** (Vercel/Netlify):
- Deploy `client/` directory
- Update `API_URL` in `client/src/hooks/requests.js` to point to backend URL

## CI/CD

The project uses GitHub Actions for continuous integration:

- **Automated Testing**: Runs tests on every push and pull request
- **Build Validation**: Ensures the client builds successfully
- **MongoDB Integration**: Tests database connectivity

See [`.github/workflows/node.yml`](.github/workflows/node.yml) for configuration.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Acknowledgments

- **NASA** - Kepler mission data
- **SpaceX** - Launch history API
- **Arwes** - Futuristic UI framework
- **Zero to Mastery** - Project inspiration

## Support

If you encounter any issues:
1. Check the [Issues](https://github.com/Robotic1804/NASA-Project/issues) page
2. Create a new issue with detailed information
3. Include error messages and environment details

---

**Made with ❤️ for space exploration enthusiasts**
