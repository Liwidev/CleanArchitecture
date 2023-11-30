const TYPES = {
  UseCases: {
    getAllUsers: Symbol.for("getAllUsersUseCase"),
    creatUser: Symbol.for("creatUserUseCase"),
    findUser: Symbol.for("findUserUseCase"),
  },
  controller: {
    getAllUsers: Symbol.for("getAllUsersController"),
    creatUser: Symbol.for("creatUserController"),
    findUser: Symbol.for("findUserController"),
  },
  repository: 'Repository',
  collectionName: 'collectionName'
};

export { TYPES };