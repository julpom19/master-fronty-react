export class DBEntityNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "DBEntityNotFoundError";
  }
}