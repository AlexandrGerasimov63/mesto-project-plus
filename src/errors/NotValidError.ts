class NotValidData extends Error {
  public statusCode:number
  constructor(message:string) {
    super(message);
    this.statusCode = 400;
  }
}

module.exports = NotValidData;