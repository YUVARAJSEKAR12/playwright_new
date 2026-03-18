pipeline {
    agent any

    tools {
        nodejs 'Node18'
    }

    stages {
        stage('Install') {
            steps {
                bat 'node -v'
                bat 'npm -v'
                bat 'npm ci'
                bat 'npx playwright install'
            }
        }

        stage('Test') {
            steps {
                bat 'npx cucumber-js --tags "@smoke"'
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'screenshots/**, videos/**, reports/**', allowEmptyArchive: true
            junit allowEmptyResults: true, testResults: 'reports/*.xml'
        }
    }
}
