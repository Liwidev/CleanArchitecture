import "reflect-metadata";
import { injectable, inject } from "inversify";
import { UserRepository } from "../domain/interface/UserRepository";
import { UserDTO } from "../domain/entities/User";
import { firestore } from "firebase-admin";
import { TYPES } from "../../config/ioc/types";

/**
 * Class implementation of the UserRepository interface
 */
@injectable()
export class FirebaseUserRepository implements UserRepository {

  private _db: firestore.Firestore;
  private _collectionName: string

  public constructor(
    @inject(TYPES.collectionName) collectionName: string
  ) {
    this._db = firestore();
    this._collectionName = collectionName;
  }

  /**
   * @param {string} user Whom to create
   * @return {Promise<void>} Conditional if user was created successfully
   */
  public async save(user: UserDTO): Promise<void> {
    await this._db.collection(this._collectionName).doc().set(user);
  }

  /** 
   * Method implementation to capture all users
   * @return {Promise<UserDTO[]>} List of Users
   */
  async getAll(): Promise<UserDTO[]> {
    const users: UserDTO[] = [];
    const querySnapshot = await this._db.collection(this._collectionName).get();
    querySnapshot.forEach(doc => {
      users.push(doc.data() as UserDTO);
    });

    return users;
  }
}
