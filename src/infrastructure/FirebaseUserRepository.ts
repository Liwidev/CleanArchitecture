import { IUserRepository } from "../domain/IUserRepository";
import { User } from "../domain/User";
import { Firestore } from "firebase-admin/firestore";

/**
 * Class implementation of the IUserRepository interface
 */
export class FirebaseUserRepository implements IUserRepository {
  /**
   * @param {Firestore} _db Database used for queries
   */
  public constructor(private readonly _db: Firestore) { }

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
    // TODO: Fix this method, currently is returning an array of null
    querySnapshot.forEach(doc => {
      const check: User = doc.data() as User;
      myArray.push(check);
    });

    return myArray;
  }
}
