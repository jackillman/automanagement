import { isPlatformBrowser } from "@angular/common";
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from "@angular/common/http";
import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { tap, map, catchError } from 'rxjs/operators';
import { GlobalService } from "./global.service";

import { HandleErrorService } from "./handleError.service";


@Injectable({providedIn:'root'})
export class GetService {

    constructor(
                private http: HttpClient,
                private HES: HandleErrorService,
               private GS:GlobalService
                ) {
  
    }

    public getItem<I>(itemName: string): Observable<I|never> {

        // if (!this.isBrowser) {
       // console.log(`itemName`,this.GS.SOURCE[`${itemName}`])
    
            return this.http.get<I>(this.GS.SOURCE[`${itemName}`])
                .pipe(
                    //tap((res) => { console.log(`${itemName} I: `, res); }),
                    tap((res: I) => {
                        if(res) {
                            return <I> res;
                        } else {
                            return null
                        }
                        
                    }),
                    // tap((res: I) => this.transferState.set(ITEM_KEY, res)),
                    catchError((error: HttpErrorResponse|HttpResponse<any>) => <never> this.HES.handleError(error))
                );

    }
    public tryAuth<I>(data:string): Observable<I|never>{
        return this.http.post<I>(this.GS.SOURCE[`auth`],data)
            .pipe(
                tap((res) => { console.log(`auth I: `, res); }),
                // tap((res: I) => {

                //     return <I> res;
                // }),
                // tap((res: I) => this.transferState.set(ITEM_KEY, res)),
                catchError((error: HttpErrorResponse|HttpResponse<any>) => <never> this.HES.handleError(error))
            );
    }
    public getLocalJSON<I>(itemName: string): Observable<I|never> {
     
        return this.http.get<I>(`${this.GS.SOURCE[itemName]}`)
            .pipe(
              //  tap((res: I) => { console.log(`${itemName} I: `, res); }),
                catchError((error: HttpErrorResponse|HttpResponse<any>) => <never> this.HES.handleError(error))
            );
    };

    public editItem<I>(itemName: string,data:any): Observable<I|never> {
        return this.http.put<I>(this.GS.SOURCE[itemName],data)
            .pipe(
                tap((res) => { console.log(`edit I: `, res); }),
                // tap((res: I) => {

                //     return <I> res;
                // }),
                // tap((res: I) => this.transferState.set(ITEM_KEY, res)),
                catchError((error: HttpErrorResponse|HttpResponse<any>) => <never> this.HES.handleError(error))
            );
    }
    public createItem<I>(itemName: string,data:any): Observable<I|never> {
        console.log(`data`,data)
        return this.http.post<I>(this.GS.SOURCE[itemName],data)
            .pipe(
                tap((res) => { console.log(`create I: `, res); }),
                // tap((res: I) => {

                //     return <I> res;
                // }),
                // tap((res: I) => this.transferState.set(ITEM_KEY, res)),
                catchError((error: HttpErrorResponse|HttpResponse<any>) => <never> this.HES.handleError(error))
            );
    }
    public removeItem<I>(itemName: string,id:number): Observable<I|never> {
        // console.log(`data`,data)
        return this.http.delete<I>(`${this.GS.SOURCE[itemName]}/${id}`)
            .pipe(
                tap((res) => { console.log(`create I: `, res); }),
                // tap((res: I) => {

                //     return <I> res;
                // }),
                // tap((res: I) => this.transferState.set(ITEM_KEY, res)),
                catchError((error: HttpErrorResponse|HttpResponse<any>) => <never> this.HES.handleError(error))
            );
    }

    public setItem<I>(itemName: string,data:any): Observable<I|never> {
        return this.http.put<I>(this.GS.SOURCE[itemName],data)
            .pipe(
                tap((res) => { console.log(`edit I: `, res); }),
                // tap((res: I) => {

                //     return <I> res;
                // }),
                // tap((res: I) => this.transferState.set(ITEM_KEY, res)),
                catchError((error: HttpErrorResponse|HttpResponse<any>) => <never> this.HES.handleError(error))
            );
    }

    public getNeededCars<I>(itemName: string,data:any): Observable<I|never> {

        // if (!this.isBrowser) {
       // console.log(`itemName`,this.GS.SOURCE[`${itemName}`])
    
            return this.http.post<I>(this.GS.SOURCE[`${itemName}`],data)
                .pipe(
                    //tap((res) => { console.log(`${itemName} I: `, res); }),
                    tap((res: I) => {
                        if(res) {
                            return <I> res;
                        } else {
                            return null
                        }
                        
                    }),
                    // tap((res: I) => this.transferState.set(ITEM_KEY, res)),
                    catchError((error: HttpErrorResponse|HttpResponse<any>) => <never> this.HES.handleError(error))
                );

    }

    public upload(dir:string,data:any): Observable<any|never> {
     //   console.log(`dir:string,formData:a`,dir,file)
        console.log(`data`,data)
        const options = {
            headers: new HttpHeaders().append('Content-Type', 'file;multipart/form-data; charset=utf-8')
          
         
          }
       
     //   const formData = new FormData();
      //  formData.append("thumbnail", file);
        const url = `${this.GS.SOURCE[`upload`]}/${dir}`
        console.log(url,`url`)
        return this.http.post<any>(url,data,{
            headers: {
                'enctype': 'multipart/form-data; boundary=request-boundary',
                'Accept': 'application/json',
                'typeFolder':'auction'
              }
        })
        .pipe(
            tap((res) => { console.log( res); }),
            // tap((res: any) => {
            //     console.log(res)
            //     if(res) {
            //         return <any> res;
            //     } else {
            //         return null
            //     }
                
            // }),
            // tap((res: I) => this.transferState.set(ITEM_KEY, res)),
             catchError((error: HttpErrorResponse|HttpResponse<any>) => <never> this.HES.handleError(error))
        );
    }
}