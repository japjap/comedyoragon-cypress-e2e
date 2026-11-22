pipeline {
  agent any
  environment { CYPRESS_BASE_URL = 'http://host.docker.internal:3000' }
  stages {
    stage('Install') { steps { sh 'npm ci' } }
    stage('Test')    { steps { sh 'npx cypress run' } }
  }
  post {
    always { archiveArtifacts artifacts: 'cypress/screenshots/**', allowEmptyArchive: true }
  }
}