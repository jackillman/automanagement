import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { ClientBaseComponent } from './client-base.component';

const routes: Routes = [
    {
        path: '',
       
        component: ClientBaseComponent,

    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class ClientBaseRoutingModule {}