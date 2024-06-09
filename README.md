![alt text](src/frontend/public/logo.webp)

# Daily Workout
It is a web application that displays a new AI-generated workout every day.

[Demo](https://daily-workout.g11s.cc/)

## Project Overview
Created with ChatGPT([Log](https://chatgpt.com/share/4b672034-b608-4c75-8802-30076b0da60a)).

This Nodes.js web application displays a daily Crossfit workout on a webpage. The page includes a logo at the top and the workout in a table in the center. The workouts are generated once daily and stored in a JSON file managed by a Kubernetes CronJob.

## Table of Contents

- [Project Overview](#project-overview)
- [Installation](#installation)
- [Usage](#usage)
- [Docker Support](#docker-support)
- [Kubernetes Deployment](#kubernetes-deployment)
- [GitHub Actions Workflow](#github-actions-workflow)
- [Styles](#styles)

## Installation

### Prerequisites

- Node.js
- Docker
- Kubernetes (e.g., Minikube)
- Git

### Steps

1. Clone the repository:
    ```sh
    git clone https://github.com/gerrited/daily-workout.git
    cd daily-workout
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

## Usage

### Running the Application Locally

1. Start the application:
    ```sh
    node app.js
    ```

2. Open a browser and navigate to `http://localhost:3000`.

## Docker Support

### Building and Running the Docker Container

1. Build the Docker image:
    ```sh
    docker build -t crossfit-workout:latest .
    ```

2. Run the Docker container:
    ```sh
    docker run -p 3000:3000 crossfit-workout:latest
    ```

## Kubernetes Deployment

### Creating Persistent Volumes and Deployments

1. Apply the Kubernetes resources:
    ```sh
    kubectl apply -f k8s/pv.yaml
    kubectl apply -f k8s/frontend.yaml
    kubectl apply -f k8s/workout-generator.yaml
    ```

### Checking the Deployment

1. Check the status of deployments and services:
    ```sh
    kubectl get deployments
    kubectl get services
    ```

## GitHub Actions Workflow

The GitHub Actions workflow builds and pushes the Docker image to the GitHub Container Registry (GHCR) automatically.

### Workflow File

**.github/workflows/frontend.yml**
**.github/workflows/workout-generator.yml**

## Styles

### Adjusting Table Width for Mobile Devices

**src/frontend/public/styles.css**


## Contributions

Contributions are welcome! Please create a pull request or file an issue in the issue tracker.