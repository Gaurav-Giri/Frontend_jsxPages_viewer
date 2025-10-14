pipeline {
    agent any

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/Gaurav-Giri/Frontend_jsxPages_viewer.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build React App') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t myfrontend:latest .'
            }
        }

        stage('Run Docker Container') {
            steps {
                sh '''
                    docker stop myfrontend || true
                    docker rm myfrontend || true
                    docker run -d -p 3000:80 --name myfrontend myfrontend:latest
                '''
            }
        }
    }
}
