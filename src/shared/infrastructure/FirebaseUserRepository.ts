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
  async find(conditionals?: string[][]): Promise<UserDTO[]> {
    let users: UserDTO[] = [];
    let queryPayload: any = this._db.collection(this._collectionName);

    // If the query has conditionals, else it will get all
    if (conditionals && conditionals.length > 0) {
      for (let conditional of conditionals) {
        queryPayload = queryPayload.where(conditional[0], conditional[1], conditional[2]);
      }
    }

    const snapshot = await queryPayload.get();
    if (snapshot.empty) {
      return users
    }

    snapshot.forEach((doc: { data: () => UserDTO; }) => {
      users.push(doc.data());
    });

    return users;
  }
  /**
   * @param {string} user Whom to create
   * @return {Promise<void>} The call itself will reject if there is any issues, nothing is always good
   */
  public async save(user: UserDTO): Promise<void> {
    await this._db.collection(this._collectionName).doc().set(user);
  }

}
