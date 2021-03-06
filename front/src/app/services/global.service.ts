import { environment } from '../../environments/environment';
import { Injectable, isDevMode } from '@angular/core';

const API_BACKEND: string = environment.api;

/**
 * getEntitiesByStatus:
 *  types: categoriesPages|sliders|quizzes|netTariffs|tvPackages|services|devices|stocks|news|vacancies
 *  statuses: 1|0
 *
 * @export
 * @class GlobalService
 */
@Injectable()
export class GlobalService {
    
    public SOURCE: {[key: string]: string} = {
        // localization:       `/assets/locale/localization.json`,
        // articles:             `${this.API}/api/articles/`,
        cars:             `${this.API}/api/v1/cars/`,
        users:             `${this.API}/api/v1/users/`,
        auth:             `${this.API}/api/v1/auth/`,
        car:              `${this.API}/api/v1/car`, 
        car_remove_image: `${this.API}/api/v1/car_remove_image`, 
        user:             `${this.API}/api/v1/user`, 
        user_set_car:     `${this.API}/api/v1/user/set_car`,
        needed_cars:     `${this.API}/api/v1/needed_cars`,
        upload:            `${this.API}/api/v1/upload`,
        
    };

    get API(): string {
       // return `https://staff1.lanet.ua`
    //   console.log(`isDevMode()`,isDevMode())
      return isDevMode()  ? API_BACKEND : API_BACKEND;
    };
};