🧠 Portfolio_2025

A full-stack developer portfolio and project management system designed to showcase projects dynamically while providing an internal admin interface for content control.

🚀 Overview

Portfolio_2025 is a dual-interface application consisting of:

🌐 Public Portfolio Website – Displays projects dynamically
🔒 Admin Dashboard – Allows full CRUD control over projects, images, and ordering

Built to move beyond static portfolios by enabling real-time updates, structured data management, and scalable deployment.

🏗️ Architecture
Client (Portfolio UI) ─────┐
                          │
Admin Panel (project_repo) ───→ Express API → MongoDB
                          │
                          └────────→ AWS S3 (Image Storage)
🧩 Tech Stack
Frontend
React (Vite)
CSS (custom styling – faithb.dev style)
@hello-pangea/dnd (drag & drop ordering)
Backend
Node.js / Express
MongoDB (project storage)
AWS S3 (image hosting)
Multer (file uploads)
Deployment
Ubuntu Server
Apache2 (reverse proxy)
Cloudflare (DNS + security)
PM2 (process management)
GitHub Actions (CI/CD auto-deploy)
✨ Features
Public Portfolio
Dynamic project rendering from API
Image support via AWS S3
Clean responsive UI
Sorted project ordering (customizable)
Admin Dashboard
Create / Update / Delete projects
Drag-and-drop project ordering
Image upload and management
Token-based authentication
API-driven data control
📡 API Endpoints
GET    /api/projects
POST   /api/projects
PUT    /api/projects/:id
DELETE /api/projects/:id
PUT    /api/projects/reorder
POST   /api/contact
GET    /health
⚙️ Environment Variables
Client (.env)
VITE_API_URL=/api
Server (.env)
PORT=3500
MONGO_URI=your_mongodb_connection
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
AWS_REGION=us-east-2
AWS_BUCKET_NAME=your_bucket
🖥️ Local Development
1. Clone the repo
git clone https://github.com/faithbrnttt/Portfolio_2025.git
cd Portfolio_2025
2. Install dependencies
cd client && npm install
cd ../server && npm install
3. Run locally
# Server
npm run dev

# Client
npm run dev
🚀 Deployment Workflow
Push to GitHub triggers GitHub Actions
SSH into server using appleboy/ssh-action
Runs deployment script
Builds app in /opt/apps/Portfolio_2025
Deploys to /var/www/Portfolio2025
Served via Apache reverse proxy
🔐 Security
Admin routes protected via Bearer token
Optional admin “kill switch” for disabling write operations
API routed through /api for production isolation
🧠 Key Design Decisions
Separation of concerns
Portfolio UI and admin system are independent but connected via API
Dynamic over static
Eliminates need for redeploying to update projects
Scalable image handling
Uses AWS S3 instead of local storage
Order persistence
Custom order field enables drag-and-drop UI with backend sync
📊 Future Improvements
Authentication system upgrade (JWT refresh / roles)
Analytics dashboard for project views
Dark/light theme toggle
CI validation checks before deploy
Docker containerization
👩‍💻 Author

Faith Burnett

Portfolio: https://faithb.dev
GitHub: https://github.com/faithbrnttt
LinkedIn: https://www.linkedin.com/in/faithbdev
