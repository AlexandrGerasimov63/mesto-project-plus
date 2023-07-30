module.exports = class NotUnique extends Error {
  public statusCode: Number;

  constructor(message: string) {
    super(message);
    this.statusCode = 409;
  }
};
