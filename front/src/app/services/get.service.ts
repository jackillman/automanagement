import { isPlatformBrowser } from "@angular/common";
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from "@angular/common/http";
import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { tap, map, catchError } from 'rxjs/operators';
import { Car } from "../models/car.model";
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

    public editItem<I>(itemName: string,data:any,additionals?:any): Observable<I|never> {
        let url = this.GS.SOURCE[itemName]
        if(additionals) {
            url = `${this.GS.SOURCE[itemName]}?folder=${additionals.folder}&image=${additionals.image}`
        }
        console.log(`url`,url)
        return this.http.put<I>(url,data)
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

    public upload(dir:string,formData:any,car:Car): Observable<any|never> {
     //   console.log(`dir:string,formData:a`,dir,file)
        // console.log(`data`,formData)
        // console.log('car',car)

        const timeStamp = new Date().getTime()
        const url = `${this.GS.SOURCE[`upload`]}/?type=${dir}&vin=${car.vin}&_id=${car._id}&timestamp=${timeStamp}`
        console.log(url,`url`)
        return this.http.post<any>(url,formData,{
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
 

    public removeCarImage(data:Car,folderForRemoveImage:string,imageForRemove:string): Observable<any|never> {
        const dataItem = {
            car: data,
            folder: folderForRemoveImage,
            image: imageForRemove
          } 
          console.log(`dataItem`,dataItem)
        return this.http.put(this.GS.SOURCE['car_remove_image'],dataItem)
            .pipe(
                tap((res) => { console.log(`edit I: `, res); }),
                // tap((res: I) => {

                //     return <I> res;
                // }),
                // tap((res: I) => this.transferState.set(ITEM_KEY, res)),
                catchError((error: HttpErrorResponse|HttpResponse<any>) => <never> this.HES.handleError(error))
            );
    }
}