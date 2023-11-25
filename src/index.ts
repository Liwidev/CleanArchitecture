// export * from './shared/presentation/FirebaseHandlers';
import { ExpressServer } from './shared/presentation/expressHandlers';
import { initializeApp } from "firebase-admin/app";

initializeApp()
ExpressServer.run(5001);