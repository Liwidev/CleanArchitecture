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
   * @param {string} id Whom to find by ID
   * @return {Promise<UserDTO>} Return user found by the ID if not, it will reject with an error that will be captured by the useCase
   */
  async find(id: string): Promise<UserDTO> {
    let users: UserDTO[] = [];
    // TODO: Condition should come from use case not harcoded here
    const snapshot = await this._db.collection(this._collectionName).where("id", "==", id).get();
    if (snapshot.empty) {
      throw new Error(`No matching users with ID: ${id}.`);
    }

    snapshot.forEach(doc => {
      users.push(doc.data() as UserDTO);
    });

    return users[0];
  }
  /**
   * @param {string} user Whom to create
   * @return {Promise<void>} The call itself will reject if there is any issues, nothing is always good
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
