type Response = string | any;

export class HttpException {
  status: number;
  response: Response;

  constructor(status: number, message: Response) {
    this.status = status;
    this.response = message;
  }
}

export class UnprocessableEntityException extends HttpException {
  constructor(response?: Response) {
    super(422, response || "Unprocessable Entity");
  }
}

export class NotFoundException extends HttpException {
  constructor(response?: Response) {
    super(404, response || "Not Found");
  }
}
