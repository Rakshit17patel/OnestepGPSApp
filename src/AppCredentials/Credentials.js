
const prodCredentials = {
  environmentForSDK : "PRODUCTION",
  SERVER_URL : 'https://cus.nativenest.in', //production
}


const stageCredentials = {
  environmentForSDK : "SANDBOX",
  SERVER_URL : 'https://sb.nativenest.in', //staging
  // SERVER_URL : 'https://test01.rootsy.in', //staging
}

const devCredentials = {
  environmentForSDK : "SANDBOX",
  SERVER_URL : 'https://rootsy.in', //development
}

const credentials = devCredentials

export default credentials;
