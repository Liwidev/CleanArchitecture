import "reflect-metadata";
import { injectable } from "inversify";
import { UserRepository } from "../domain/interface/UserRepository";
import { User, UserSchema } from "../domain/entities/User";
import { firestore } from "firebase-admin";

/**
 * Class implementation of the UserRepository interface
 */
@injectable()
export class FirebaseUserRepository implements UserRepository {

  private _db: firestore.Firestore;

  public constructor() {
    this._db = firestore();
  }

  /**
   * @param {string} user Whom to create
   * @return {Promise<boolean>} Conditional if user was created successfully
   */
  public save(user: User): Promise<boolean> {
    const entry = this._db.collection("entries").doc();
    entry.set(user);

    return Promise.resolve(true);
  }

  /** 
   * Method implementation to capture all users
   * @return {Promise<User[]>} List of Users
   */
  async getAll(): Promise<User[]> {
    const myArray: User[] = [];
    const querySnapshot = await this._db.collection("entries").get();
    querySnapshot.forEach(doc => {
      myArray.push(UserSchema.parse(doc.data()));
    });

    return myArray;
  }
}
