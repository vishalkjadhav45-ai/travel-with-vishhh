# 🌍 Travel With Vishhh

A full-stack travel booking application built using the MERN stack and deployed through a DevOps workflow using Docker, Kubernetes, Helm and Jenkins CI/CD.

The project focuses on containerization, Kubernetes deployment, database persistence, code quality analysis and container vulnerability scanning.

---

## 🚀 Project Overview

**Travel With Vishhh** is a MERN-based travel booking application where users can explore travel options and submit their travel details.

### Application Stack

```text
React.js
    ↓
Node.js + Express
    ↓
MongoDB

The application was containerized and then deployed on Kubernetes as part of the DevOps workflow.

🏗️ DevOps Architecture
                GitHub
                   │
                   ▼
                Jenkins
                   │
        ┌──────────┼──────────┐
        ▼          ▼          ▼
   SonarQube      Docker     Trivy
   Analysis       Build      Scan
        │          │
        └──────┬───┘
               ▼
           Docker Hub
               │
               ▼
        Kubernetes Cluster
               │
       ┌───────┴────────┐
       ▼                ▼
   Frontend          Backend
   React + Nginx     Node + Express
       │                │
       └───────┬────────┘
               ▼
            MongoDB
          StatefulSet
          3 Replicas
          + PVC Storage
🛠️ Technology Stack
Application
React.js
Node.js
Express.js
MongoDB
DevOps
Git & GitHub
Docker
Docker Hub
Kubernetes
Helm
Jenkins
SonarQube
Trivy
Nginx
🐳 Docker

The application frontend and backend were containerized using separate Docker images.

Frontend

The React application uses a multi-stage Docker build:

Node.js Build Stage
        ↓
    npm install
        ↓
    npm run build
        ↓
   Production Build
        ↓
   Nginx Container

Nginx is used to serve the production React application and handle API requests through reverse proxy configuration.

Backend

The Node.js + Express application is packaged as a separate Docker image and used as the backend API service.

☸️ Kubernetes

The containerized application was deployed on Kubernetes using separate workloads for the frontend, backend and MongoDB.

Frontend
React application
Nginx
Kubernetes Deployment
Service
Backend
Node.js + Express API
Kubernetes Deployment
Service
MongoDB

MongoDB was deployed using a StatefulSet with:

3 replicas
Persistent Volume Claims (PVC)
Stable pod identities
MongoDB ReplicaSet configuration
MongoDB StatefulSet

mongodb-0
mongodb-1
mongodb-2
     │
     ▼
 MongoDB ReplicaSet

Kubernetes Services were used for communication between the application tiers.

⎈ Helm

The Kubernetes deployment was also packaged using Helm.

Helm was used to manage the Kubernetes deployment configuration and make values such as images and replica counts configurable.

Helm Chart
    ↓
Kubernetes Templates
    ↓
Kubernetes Deployment
🔄 Jenkins CI/CD

A Jenkins pipeline was created to automate the application delivery workflow.

Pipeline Flow
GitHub
   ↓
Jenkins Checkout
   ↓
SonarQube Analysis
   ↓
Quality Gate
   ↓
Docker Build
   ↓
Trivy Image Scan
   ↓
Docker Hub Push
   ↓
Kubernetes Deployment
   ↓
Application Running

The pipeline performs code analysis using SonarQube, scans the generated Docker images using Trivy, publishes the images to Docker Hub and deploys the updated application to Kubernetes.

🔍 SonarQube

SonarQube was integrated into the Jenkins pipeline to analyze the application source code for code quality and security-related issues.

The analysis covers the application source code before the Docker images are built.

🛡️ Trivy

Trivy was integrated into the CI/CD pipeline to scan the generated Docker images for container vulnerabilities before pushing them to Docker Hub.

📸 Project Evidence
🌍 Live Application

The deployed Travel With Vishhh application.

🔄 Jenkins CI/CD Pipeline

Jenkins pipeline showing the automated CI/CD workflow.

🔍 SonarQube Analysis

SonarQube analysis performed as part of the CI/CD pipeline.

📁 Project Structure
travel-app/
│
├── backend/
│   └── Node.js + Express application
│
├── frontend/
│   └── React application
│
├── sts/
│   └── Kubernetes deployment configuration
│
└── README.md
🎯 Key DevOps Implementation
Built a full-stack MERN travel booking application
Containerized frontend and backend using Docker
Used a multi-stage Dockerfile for the React frontend
Configured Nginx as a production reverse proxy
Deployed the application on Kubernetes
Configured a 3-node MongoDB StatefulSet with persistent storage
Configured MongoDB ReplicaSet
Packaged Kubernetes deployment using Helm
Created Jenkins CI/CD pipeline
Integrated SonarQube code analysis
Integrated Trivy container image scanning
Published Docker images to Docker Hub
Automated Kubernetes deployment through Jenkins
👨‍💻 Author

Vishal K Jadhav

DevOps / Cloud Engineering Learner
