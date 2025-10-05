pipeline {
    agent any

   environment {
    APP_DIR = "/var/lib/jenkins/workspace/mern/server"
    FRONTEND_DIR = "/var/lib/jenkins/workspace/mern/frontend"
    PM2_NAME = "backend"
}

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/bhanuprakash257/hrspeshway.git'
            }
        }

        stage('Install Backend') {
            steps {
                dir("${APP_DIR}") {
                    sh 'npm install'
                }
            }
        }

        stage('Seed Admin User') {
            steps {
                dir("${APP_DIR}") {
                    sh 'node userSeed.js || true'  // ignore if already exists
                }
            }
        }

        stage('Start/Restart Backend') {
            steps {
                dir("${APP_DIR}") {
                    sh 'pm2 start index.js --name ${PM2_NAME} || pm2 restart ${PM2_NAME}'
                    sh 'pm2 save'
                }
            }
        }

        stage('Build Frontend') {
            steps {
                dir("${FRONTEND_DIR}") {
                    sh 'npm install'
                    sh 'npm run build'
                    sh 'sudo cp -r dist/* /var/www/mern-frontend/'
                }
            }
        }

        stage('Reload Nginx') {
            steps {
                sh 'sudo nginx -t && sudo systemctl restart nginx'
            }
        }
    }
}
