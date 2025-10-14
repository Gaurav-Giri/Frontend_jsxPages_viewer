pipeline {
    agent any

    environment {
        DOCKER_IMAGE = 'frontend-react-app'
    }

    stages {
        stage('Checkout Code') {
            steps {
                // You can safely use checkout scm (uses main automatically)
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Build React App') {
            steps {
                bat 'npm run build'
            }
        }

        stage('Build Docker Image') {
            steps {
                bat 'docker build -t %DOCKER_IMAGE% .'
            }
        }

        stage('Run Docker Container') {
            steps {
                // Stop old container if running
                bat '''
                docker stop frontend-container || true
                docker rm frontend-container || true
                docker run -d -p 3000:80 --name frontend-container %DOCKER_IMAGE%
                '''
            }
        }
    }

    post {
        success {
            echo '✅ Build and deployment successful!'
        }
        failure {
            echo '❌ Build failed. Check logs.'
        }
    }
}
