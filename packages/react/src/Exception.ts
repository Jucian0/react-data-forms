export class Exception extends Error {
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class InvalidArgumentException extends Exception {
  constructor(message: string) {
    super(message);
  }
}
