# 🌍 Travel With Vishhh

A full-stack travel enrollment and management application built using the MERN stack and deployed using Docker, Kubernetes and Helm.

The project was taken from application development to a complete DevOps workflow including containerization, Kubernetes deployment, Helm packaging, code analysis, vulnerability scanning and Jenkins CI/CD automation.

---

## 🚀 Project Overview

**Travel With Vishhh** is a travel enrollment and management application where users can select travel packages and submit traveler information such as:

- Name
- Email
- Phone
- Destination
- Travel Date
- Number of Travelers
- Package Price
- Message

The application uses a React frontend, Node.js/Express REST API and MongoDB database.

---

## 🏗️ Application Architecture

```text
                    React Frontend
                          │
                          ▼
                   Nginx Reverse Proxy
                          │
                        /api/
                          │
                          ▼
                  Node.js + Express API
                          │
                          ▼
                  MongoDB ReplicaSet
                   ┌──────┼──────┐
                   ▼      ▼      ▼
               mongodb-0 mongodb-1 mongodb-2
🛠️ Technology Stack
Application
React.js
Node.js
Express.js
MongoDB
DevOps & Cloud
Git
GitHub
Docker
Docker Hub
Kubernetes
Helm
Jenkins
SonarQube
Trivy
Nginx
🐳 Docker Implementation

The frontend and backend are containerized separately.

Backend
   ↓
Docker Image
   ↓
Docker Hub

Frontend
   ↓
Multi-stage Docker Build
   ↓
Nginx Production Container
   ↓
Docker Hub

The React frontend uses a multi-stage Docker build where the application is built using Node.js and the production build is served using Nginx.

Nginx also acts as a reverse proxy for /api/ requests to the Kubernetes backend Service.

☸️ Kubernetes Deployment

The application is deployed as a 3-tier Kubernetes architecture.

Frontend
React.js application
Nginx production server
2 replicas
LoadBalancer Service
API reverse proxy through Nginx
Backend
Node.js + Express REST API
2 replicas
ClusterIP Service
MongoDB connection configured using Kubernetes ConfigMap
Database
MongoDB 7
StatefulSet with 3 replicas
Persistent storage
MongoDB ReplicaSet: rs0
Headless Service
Stable MongoDB pod DNS
                  Kubernetes Cluster
                         │
        ┌────────────────┼────────────────┐
        │                │                │
        ▼                ▼                ▼
    Frontend          Backend          MongoDB
    2 Pods            2 Pods            3 Pods
        │                │                │
        └────────────────┼────────────────┘
                         │
                         ▼
                  Travel Application
⎈ Helm

The Kubernetes resources were also packaged using Helm.

Helm is used to manage configurable deployment values such as:

Container images
Replica counts
MongoDB storage
Application ports
MongoDB connection URI
values.yaml
     ↓
Helm Templates
     ↓
Kubernetes Resources
     ↓
Kubernetes Cluster
🔄 CI/CD Pipeline

Jenkins automates the application build, analysis, security scanning, image publishing and Kubernetes deployment process.

Developer Push
      ↓
GitHub
      ↓
Jenkins Checkout
      ↓
Backend Test
      ↓
Frontend Build
      ↓
SonarQube Analysis
      ↓
Quality Gate
      ↓
Docker Image Build
      ↓
Trivy Vulnerability Scan
      ↓
Docker Hub Push
      ↓
Update Kubernetes Image Tags
      ↓
kubectl Apply
      ↓
Rollout Verification
      ↓
Live Application
Pipeline Components

Jenkins

Automates the CI/CD workflow
Builds and deploys the application

SonarQube

Performs source-code analysis
Checks code quality and security-related issues
Uses a Quality Gate before continuing the pipeline

Trivy

Scans Docker images for vulnerabilities

Docker Hub

Stores the backend and frontend Docker images

Kubernetes

Runs and manages the application workloads
📸 Project Screenshots
🌍 Live Application

The live Travel With Vishhh application running from the Kubernetes deployment.

🔄 Jenkins CI/CD Pipeline

Jenkins pipeline showing the automated build, analysis, Docker, security scanning and Kubernetes deployment stages.

🔍 SonarQube Analysis

SonarQube analysis of the Travel With Vishhh project.

📁 Project Structure
travel-app/
│
├── backend/
│   ├── Dockerfile
│   ├── package.json
│   └── src/
│
├── frontend/
│   ├── Dockerfile
│   ├── nginx.conf
│   ├── package.json
│   └── src/
│
├── k8s/
│   ├── mongo-sts.yml
│   ├── mongo-svc.yml
│   ├── node-config.yml
│   ├── node-dep.yml
│   ├── node-svc.yml
│   ├── react-dep.yml
│   └── react-svc.yml
│
├── helm-travel-app/
│   ├── Chart.yaml
│   ├── values.yaml
│   └── templates/
│
├── screenshots/
│   ├── live-app.png
│   ├── jenkins-pipeline.png
│   └── sonarqube.png
│
├── Jenkinsfile
├── sonar-project.properties
└── README.md
▶️ Run Locally
Clone the Repository
git clone <YOUR_GITHUB_REPOSITORY>
cd travel-app
Backend
cd backend
npm install
npm start
Frontend
cd frontend
npm install
npm run dev
☸️ Kubernetes Deployment

Apply the Kubernetes resources:

kubectl apply -f k8s/

Check the resources:

kubectl get pods
kubectl get svc
kubectl get sts
⎈ Helm Deployment

Install the Helm chart:

helm install travel-app ./helm-travel-app

Check the deployment:

helm list
kubectl get pods
kubectl get svc
🎯 Key DevOps Work
Developed a full-stack MERN travel application
Containerized frontend and backend using Docker
Implemented a production-style Nginx frontend container
Designed a 3-tier Kubernetes architecture
Deployed MongoDB using StatefulSet and ReplicaSet
Configured persistent storage and Kubernetes service discovery
Used ConfigMaps for application configuration
Packaged Kubernetes resources using Helm
Implemented Jenkins CI/CD automation
Integrated SonarQube for code analysis
Integrated Trivy for container vulnerability scanning
Published application images to Docker Hub
Automated Kubernetes deployment and rollout verification
👨‍💻 Author

Vishal K Jadhav

DevOps / Cloud Engineering Learner

GitHub: vishalkjadhav45-ai


**That's the complete README.** Just create `README.md` → click **Copy** on the block → paste → save → push to GitHub.
