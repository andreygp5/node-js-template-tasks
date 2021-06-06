interface IErrorHandler {
  msg: string;
  statusCode: number;
}

class ErrorHandler extends Error implements IErrorHandler {
  msg: string;

  statusCode: number;

  constructor(statusCode = 500, msg = 'Internal server error') {
    super();
    this.statusCode = statusCode;
    this.msg = msg;
  }
}

export { ErrorHandler, IErrorHandler };
