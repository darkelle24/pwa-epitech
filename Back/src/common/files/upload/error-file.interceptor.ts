import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import {unlink} from 'fs'
import { join } from 'path';

@Injectable()
export class ErrorFileInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(
        catchError((error) => {
          let args = context.getArgs()
          if (args[0] && args[0]['file'] && args[0]['file'].path) {
            unlink(join(process.cwd(), args[0]['file'].path), (err) => {
              if (err) {
                console.error(args[0]['file'].path + ' wasn t deleted')
              }
            })
          }
          return throwError(() => error)
        }),
      );
  }
}