pipeline {
    agent any

    triggers {
        pollSCM('*/5 * * * *') // Check every 5 minutes
    }

    stages {
        stage('Checkout') {
            steps {
                echo "Récupération du code source"
                checkout scm
            }
        }

        stage('Build') {
            steps {
                echo "Build du projet"
                // Add build commands here
            }
        }

        stage('Deploy') {
            steps {
                echo "Déploiement du projet"
                // Add deployment commands here
            }
        }
    }
}
