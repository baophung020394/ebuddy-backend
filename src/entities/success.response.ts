const StatusCode = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};

const ReasonStatusCode = {
  OK: "Success",
  CREATED: "Created",
};

export type ResponseType = {
  message?: string;
  statusCode?: number;
  reasonStatusCode?: string;
  metadata?: any;
};

class SuccessResponse {
  public message: string;
  public status: number;
  public metadata: any;

  constructor({
    message,
    statusCode = StatusCode.OK,
    reasonStatusCode = ReasonStatusCode.OK,
    metadata = {},
  }: {
    message?: string;
    statusCode?: number;
    reasonStatusCode?: string;
    metadata?: any;
  }) {
    this.message = message || reasonStatusCode;
    this.status = statusCode;
    this.metadata = metadata;
  }

  send(res: any, header = {}) {
    return res.status(this.status).json(this);
  }
}

class OK extends SuccessResponse {
  constructor({ message, metadata }: { message?: string; metadata?: any }) {
    super({ message, metadata });
  }
}

class CREATED extends SuccessResponse {
  public options: any;

  constructor({
    options = {},
    message,
    statusCode = StatusCode.CREATED,
    reasonStatusCode = ReasonStatusCode.CREATED,
    metadata,
  }: {
    options?: any;
    message?: string;
    statusCode?: number;
    reasonStatusCode?: string;
    metadata?: any;
  }) {
    super({ message, metadata, statusCode, reasonStatusCode });
    this.options = options;
  }
}

export { OK, CREATED, SuccessResponse };
