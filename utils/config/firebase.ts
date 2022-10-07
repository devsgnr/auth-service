import * as firebase from "firebase-admin";
import { App } from "firebase-admin/app";

import { Auth } from "firebase-admin/lib/auth/auth";
import env from "../env";

/**
 * Firebase Instance
 * With Config from `../env`
 */
const FirebaseInstance: App = firebase.initializeApp(env.firebase);

/**
 * Firebase Auth Instance
 * With `FirebaseInstance` - declare here `./`
 */
const FirebaseAuth: Auth = firebase.auth(FirebaseInstance);


export { FirebaseAuth };
