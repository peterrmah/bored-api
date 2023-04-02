class Logger {
  /**
   * Logs a simple message
   *
   * @param message - Message to log
   */
  log(message: string): void {
    console.log(message);
  }

  /**
   * Logs an error
   *
   * @param message - Error message
   * @param error - Additional details about the error
   * @param code - Error code
   */
  error(message: string, error?: Record<string, any>, code?: number | string): void {
    console.error({
      message,
      error,
      code,
    });
  }
}

export default new Logger();
