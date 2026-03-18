pipeline {
    agent any

    tools {
        nodejs 'NodeJS-20'
    }

    parameters {
        string(name: 'TAGS', defaultValue: '@smoke', description: 'Cucumber tag to run')
        choice(name: 'BROWSER', choices: ['chromium', 'firefox', 'webkit'], description: 'Browser name')
    }

    environment {
        CI = 'true'
        HEADLESS = 'true'
        BASE_URL = 'https://www.saucedemo.com/'
        BROWSER = "${params.BROWSER}"
    }

    options {
        timestamps()
        disableConcurrentBuilds()
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
                sh 'npx playwright install --with-deps'
            }
        }

        stage('Run Cucumber Tests') {
            steps {
                sh 'mkdir -p reports/junit screenshots videos || true'
                sh "npx cucumber-js --tags '${params.TAGS}' --format progress --format junit:reports/junit/results.xml"
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'reports/**/*, screenshots/**/*, videos/**/*', allowEmptyArchive: true, fingerprint: true
            junit testResults: 'reports/junit/*.xml', allowEmptyResults: true
        }

        success {
            echo 'Build passed'
        }

        failure {
            echo 'Build failed'
        }
    }
}