import { onRequest } from "firebase-functions/v2/https";
import { GetAllUserhandler, CreateUserhandler } from "./presentation/Handlers";

export const GetAllUser = onRequest(GetAllUserhandler);
export const CreateUser = onRequest(CreateUserhandler);