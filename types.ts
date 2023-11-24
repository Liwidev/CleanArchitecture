const TYPES = {
  useCases: {
    getAllUsers: Symbol.for("getAllUsers"),
    creatUser: Symbol.for("creatUser"),
  },
  repositories: {
    firebase: Symbol.for("firebase"),
    inMemory: Symbol.for("inMemory"),
  }
};

export { TYPES };