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
        localization:       `/assets/locale/localization.json`,
        // articles:             `${this.API}/api/articles/`,
        articles:             `${this.API}/api/articles/`,
        categories:             `${this.API}/api/categories/`,
    };

    get API(): string {
       // return `https://staff1.lanet.ua`
    //   console.log(`isDevMode()`,isDevMode())
      return isDevMode()  ? API_BACKEND : API_BACKEND;
    };
};