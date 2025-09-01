import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch() // El decorador @Catch() sin argumentos atrapa TODAS las excepciones.
export class AllExceptionsFilter implements ExceptionFilter {
  
  private readonly logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // Determina el código de estado. Si no es una HttpException, es un error 500.
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    // Determina el mensaje de respuesta.
    // Para errores 500 en producción, usamos un mensaje genérico.
    const responseMessage = (status === HttpStatus.INTERNAL_SERVER_ERROR && process.env.NODE_ENV === 'production') 
        ? 'Ocurrió un error inesperado en el servidor.'
        : (exception instanceof HttpException ? exception.getResponse() : (exception as Error).message);

    // *** AQUÍ ESTÁ LA PARTE DE LOGGING (ver Parte 2) ***
    this.logError(request, exception);
    
    // Construye la respuesta final para el cliente
    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      // Si el mensaje es un objeto (como en HttpException), lo expandimos.
      ...(typeof responseMessage === 'object' ? { ...responseMessage } : { message: responseMessage }),
    });
  }

  private logError(request: Request, exception: unknown) {
      const { method, url } = request;
      const errorMessage = exception instanceof Error ? exception.stack : JSON.stringify(exception);
      this.logger.error(`[${method} ${url}] - Error: ${errorMessage}`);
  }
}