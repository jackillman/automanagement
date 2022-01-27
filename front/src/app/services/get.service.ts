import { isPlatformBrowser } from "@angular/common";
import { HttpClient, HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { tap, map, catchError } from 'rxjs/operators';
import { GlobalService } from "./global.service";

import { HandleErrorService } from "./handleError.service";


@Injectable({providedIn:'root'})
export class GetService {
    private isBrowser: boolean;

    constructor(@Inject(PLATFORM_ID) private platformId: Object,
                private http: HttpClient,
                private HES: HandleErrorService,
               private GS:GlobalService
                ) {
        this.isBrowser = isPlatformBrowser(platformId);
    }

    public getItem<I>(itemName: string): Observable<I|never> {

        // if (!this.isBrowser) {

    
            return this.http.get<I>(this.GS.SOURCE[`${itemName}`])
                .pipe(
                 //    tap((res: I) => { console.log(`${itemName} I: `, res); }),
                    tap((res: I) => {

                        return <I> res;
                    }),
                    // tap((res: I) => this.transferState.set(ITEM_KEY, res)),
                    catchError((error: HttpErrorResponse|HttpResponse<any>) => <never> this.HES.handleError(error, this.isBrowser))
                );

    }

    public getLocalJSON<I>(itemName: string): Observable<I|never> {
     
        return this.http.get<I>(`${this.GS.SOURCE[itemName]}`)
            .pipe(
              //  tap((res: I) => { console.log(`${itemName} I: `, res); }),
                catchError((error: HttpErrorResponse|HttpResponse<any>) => <never> this.HES.handleError(error, this.isBrowser))
            );
    };

}