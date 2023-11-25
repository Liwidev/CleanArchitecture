const TYPES = {
  useCases: {
    getAllUsers: Symbol.for("getAllUsersUseCase"),
    creatUser: Symbol.for("creatUserUseCase"),
  },
  controller: {
    getAllUsers: Symbol.for("getAllUsersController"),
    creatUser: Symbol.for("creatUserController"),
  },
  repository: 'Repository',
};

export { TYPES };