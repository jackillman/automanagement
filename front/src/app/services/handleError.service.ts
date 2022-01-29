import { Injectable, Inject, PLATFORM_ID } from '@angular/core';

import { HttpResponse } from '@angular/common/http';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';

export interface IHandleError {
    success: boolean;
    status: number;
    statusText: string;
}

@Injectable()
export class HandleErrorService {

    constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    
    }

    public handleError(error: HttpErrorResponse|HttpResponse<any>|HttpErrorResponse): Observable<never> {
        let errorMessage: IHandleError;

 
        console.log(`HandleErrorService.handleError(error.status: ${error.status})`);
        console.log(error);
        // Connection error
        if (error.status === 0) {
            errorMessage = <IHandleError> {
                success: false,
                status: 0,
                statusText: 'Sorry, there was a connection error occurred. Please try again.',
            };
        // Internal Server Error
        } else if (error.status === 500) {
            errorMessage = <IHandleError> {
                success: false,
                status: 500,
                statusText: 'Internal Server Error'
            };
        } else {
            
            console.log(`body`,error,(error as HttpErrorResponse))
                if(error) {
                    errorMessage = {
                        success:error.ok,
                        status:error.status,
                        statusText: error.statusText
    
                    }
                } else {
                    errorMessage = {
                        success:false,
                        status: 0,
                        statusText: "Not auth"
    
                    } 
                }
            
         
        }
        return throwError(errorMessage);
    }

    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleErrorNew<T> (operation = 'operation', result?: T) {
        return (error: any): Observable<T> => {

            // TODO: send the error to remote logging infrastructure
            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption
            console.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }
}