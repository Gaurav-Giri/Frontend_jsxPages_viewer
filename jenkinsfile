pipeline {
    agent any

    environment {
        IMAGE_NAME = "myapp"
    }

    stages {
        stage('Clone') {
            steps {
                git branch: 'main', url: 'https://github.com/Gaurav-Giri/Frontend_jsxPages_viewer.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    docker.build("${IMAGE_NAME}:latest")
                }
            }
        }

        stage('Test Container') {
            steps {
                script {
                    docker.image("${IMAGE_NAME}:latest").inside {
                        sh 'echo Running tests...'
                    }
                }
            }
        }

        stage('Deploy') {
            steps {
                script {
                    sh "docker stop ${IMAGE_NAME} || true"
                    sh "docker rm ${IMAGE_NAME} || true"
                    sh "docker run -d --name ${IMAGE_NAME} -p 5000:5000 ${IMAGE_NAME}:latest"
                }
            }
        }
    }

    post {
        always {
            echo 'Cleaning up...'
        }
    }
}
