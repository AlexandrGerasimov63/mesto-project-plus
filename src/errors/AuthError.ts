module.exports = class AuthError extends Error {
  public statusCode: Number;

  constructor(message: string) {
    super(message);
    this.statusCode = 401;
  }
};