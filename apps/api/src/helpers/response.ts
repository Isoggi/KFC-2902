export const responseHandler = (
  message: string,
  data: any,
  success: boolean = true,
) => {
  return {
    message,
    data,
    success,
  };
};

export class ErrorHandler extends Error {
  statusCode: number;
  constructor(message: string, statusCode?: number) {
    super(message);
    this.statusCode = statusCode || 500;
  }
}
