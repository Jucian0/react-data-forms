/**
 * Represents a base exception class for custom exceptions.
 *
 * @extends {Error}
 */
export class Exception extends Error {
  /**
   * Creates a new instance of `Exception`.
   *
   * @param {string} message The error message.
   */
  constructor(message: string) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Represents an error that occurs when an invalid argument is passed to a function.
 *
 * @extends {Exception}
 */
export class InvalidArgumentException extends Exception {
  /**
   * Creates a new instance of `InvalidArgumentException`.
   *
   * @param {string} message The error message.
   */
  constructor(message: string) {
    super(message);
  }
}
