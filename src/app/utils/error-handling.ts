import { ErrorHandlerCodes } from "../types/error-handling-types";

/**
 * Custom error class for API-related errors with additional HTTP context. Extends the standard Error class with
 * properties that provide more information about the HTTP error that occurred.
 * @class ApiError
 * @extends {Error}
 * @property {number} [status] - The HTTP status code associated with the error.
 * @property {string} [statusText] - The status text from the HTTP response (e.g., "Not Found", "Internal Server Error").
 * @property {Response} [response] - The original Response object from the fetch call, which may contain additional information about the error.
 *
 */
export class ApiError extends Error {
  status?: number;
  statusText?: string;
  response?: Response;

  constructor(message: string) {
    super(message);
    this.name = "ApiError";
  }
}

/**
 * Custom error class for handling application-specific errors with predefined error codes.
 * Extends the standard Error class to include an error code and optionally the original error.
 * @class ErrorHandler
 * @extends {Error}
 * @property {ErrorHandlerCodes} code - The standardized error code.
 * @property {unknown} [originalError] - The original error object, if any.
 */
export class ErrorHandler extends Error {
  constructor(
    public readonly code: ErrorHandlerCodes,
    message: string,
    public readonly originalError?: unknown
  ) {
    super(message);
    this.name = "ErrorHandler";
  }
}
