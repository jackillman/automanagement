import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AutomobilesComponent } from './automobiles.component';

const routes: Routes = [
    {
        path: '',
       
        component: AutomobilesComponent,

    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AutomobilesRoutingModule {}