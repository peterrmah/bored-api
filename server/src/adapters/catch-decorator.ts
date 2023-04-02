/**
 * Catch method decorator
 * - Wraps function in try/catch block runs errorHandler
 *   before throwing same error again
 *
 * @param errorHandler - A function that handles the error
 */
export const CatchError =
  <T>(errorHandler?: (error: T) => void) =>
  (_target: Object, _propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor => ({
    ...descriptor,
    async value(...args: any[]) {
      try {
        const result = await descriptor.value.apply(this, args);
        return result;
      } catch (error: unknown) {
        if (errorHandler) errorHandler(error as T);
        throw error;
      }
    },
  });
