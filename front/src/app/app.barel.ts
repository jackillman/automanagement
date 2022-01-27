import { GetService } from './services/get.service';
import { GlobalService } from './services/global.service';
import { HandleErrorService } from './services/handleError.service';

// import { HomeModule } from './pages/home/home.module';
export const APP_SERVICES_PROVIDERS = [

  GlobalService,


  GetService,
  HandleErrorService,



  
];