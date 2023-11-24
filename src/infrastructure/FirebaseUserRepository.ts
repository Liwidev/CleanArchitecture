import "reflect-metadata";
import { injectable } from "inversify";
import { IUserRepository } from "../shared/IUserRepository";
import { User } from "../domain/User";
import { firestore } from "firebase-admin";
/**
 * Class implementation of the IUserRepository interface
 */
@injectable()
export class FirebaseUserRepository implements IUserRepository {

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
    // TODO: Validate if implementation of types to validate response format
    querySnapshot.forEach(doc => {
      const check: User = doc.data() as User;
      myArray.push(check);
    });

    return myArray;
  }
}
