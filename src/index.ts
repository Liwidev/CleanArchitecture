//Initialize
import * as admin from "firebase-admin";

// This initialize it online
// admin.initializeApp({
//   credential: admin.credential.cert('./src/config/miybara-firebase-adminsdk.json')
// });

// This initialize it locally
admin.initializeApp();

// Firebase Implementation
export * from './shared/presentation/FirebaseHandlers';

// Express Implementation
// import { ExpressServer } from './shared/presentation/expressHandlers';
// ExpressServer.run(8001);