import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const serviceAccount: object = require('./fb_creds.json')

export const fbApp = initializeApp(serviceAccount);

