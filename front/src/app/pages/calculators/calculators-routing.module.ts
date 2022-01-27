import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CalculatorsComponent } from './calculators.component';

const routes: Routes = [
    {
        path: '',
       
        component: CalculatorsComponent,

    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CalculatorsRoutingModule {}