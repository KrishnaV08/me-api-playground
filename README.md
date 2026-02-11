# Me-API Playground

A simple personal API that stores my profile info and exposes it through REST endpoints. Built this to learn backend development and practice full-stack deployment.

## Live Links

- **Frontend**: https://me-api-playground-delta.vercel.app
- **API**: https://me-api-playground-xhyl.onrender.com
- **Code**: https://github.com/KrishnaV08/me-api-playground

## What This Does

This project is basically a digital profile stored in MongoDB that you can query through an API. I built both the backend and a simple frontend to interact with it.

**Main features:**
- Store and retrieve profile data (education, skills, projects, etc.)
- Search through skills
- Filter projects by technology
- Basic frontend to visualize everything

## Tech Used

**Backend**
- Node.js + Express
- MongoDB Atlas
- Mongoose

**Frontend**
- Plain HTML/CSS/JS (kept it simple)

**Hosting**
- Backend on Render
- Frontend on Vercel

## API Endpoints

### Check if API is alive
GET /health

text

### Profile stuff
GET /profile # Get my profile
POST /profile # Create/update profile
PUT /profile # Update specific fields

text

### Query endpoints
GET /skills/search?q=node # Search skills
GET /projects # All projects
GET /projects?skill=flutter # Projects by skill

text

## Running Locally

### Backend

```bash
git clone https://github.com/KrishnaV08/me-api-playground.git
cd me-api-playground/backend
npm install
Create a .env file:

text
MONGODB_URI=your_mongodb_uri
PORT=5000
Start the server:

bash
npm run dev
Frontend
Just open frontend/index.html in your browser, or:

bash
cd frontend
python -m http.server 8000
Database Schema
Pretty straightforward:

javascript
{
  name: String,
  email: String,
  education: String,
  title: String,
  description: String,
  links: {
    github: String,
    linkedin: String,
    portfolio: String
  },
  skills: [String],
  projects: [{
    name: String,
    description: String,
    link: String
  }]
}
Testing the API
bash
# Health check
curl https://me-api-playground-xhyl.onrender.com/health

# Get profile
curl https://me-api-playground-xhyl.onrender.com/profile

# Search skills
curl "https://me-api-playground-xhyl.onrender.com/skills/search?q=node"

# Get projects
curl https://me-api-playground-xhyl.onrender.com/projects
Project Structure
text
me-api-playground/
├── backend/
│   ├── models/
│   │   └── Profile.js
│   ├── server.js
│   ├── .env
│   └── package.json
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── script.js
└── README.md
Things to Know
The free Render tier spins down after inactivity, so first request might be slow (~50 sec)

Only supports one profile at a time

No auth implemented (it's just a learning project)

What I Learned
Built this while learning Node.js and MongoDB. Got hands-on experience with:

REST API design

Database modeling with Mongoose

CORS configuration

Environment variables

Deploying to cloud platforms

Future Plans
Might add these later:

Authentication

Profile picture uploads

Better search functionality

Export data as JSON/PDF

About Me
I'm Krishna, a B.Tech student learning full-stack development. Currently interning as a Flutter Developer at App Knit.

Connect:

GitHub: @KrishnaV08

Email: iamkrishnaV@gmail.com

Built with ☕ and lots of Stack Overflow



