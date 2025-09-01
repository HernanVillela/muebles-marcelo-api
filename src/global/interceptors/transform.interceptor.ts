import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  code: number;
  message: string;
  data: T;
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    // 'next.handle()' es un Observable que contiene la respuesta que devuelve el controlador
    return next.handle().pipe(
      map(data => ({
        code: context.switchToHttp().getResponse().statusCode, // Obtiene el código de estado real (200, 201, etc.)
        message: 'Successful response',
        data: data, // 'data' es lo que tu servicio/controlador retornó
      })),
    );
  }
}