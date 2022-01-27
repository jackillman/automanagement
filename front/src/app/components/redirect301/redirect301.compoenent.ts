/**
 * @author [Aleksandr Kinash]
 * @email [aleksandrkinash90@gmail.com]
 * @create date 2018-06-10 08:57:57
 * @modify date 2018-06-10 08:57:57
 * @desc [description]
*/
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
// Services
// import { SsrRedirectService } from '@app/services/universal/ssrRedirect.service';
// import { LocationService } from '@app/services/location.service';

@Component({
    selector: 'redirect-301',
    template: '',
    styles: [''],
})
export class Redirect301Component {

    constructor(@Inject(PLATFORM_ID) private platformId: Object,
                private router: Router,
                // private ssrRedirectService: SsrRedirectService,
                // private locationService: LocationService
                ) {
        // if (isPlatformBrowser(platformId)) {
        //     console.groupCollapsed(`Redirect301Component %c301 Moved Permanently:  >>> ${this.locationService.extractBasePATH() || `/`}`, 'color:#feb828;font-size:12px;');
        //   //  console.log(this.router);
        //     console.groupEnd();
        // } else {
        //     console.log(`Redirect301Component 301 Moved Permanently:  >>> ${this.locationService.extractBasePATH() || `/`}`);
        // }
        // const REDIRECT_URL: string = this.locationService.extractBasePATH();
        // this.ssrRedirectService.redirectWithStatus(301, 'Moved Permanently', REDIRECT_URL);
		// this.router.navigate([REDIRECT_URL]);
        this.router.navigate([`/`]);
	}
}
