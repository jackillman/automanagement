import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { CreatorGuard } from 'src/app/guards/creator.guard';


const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        children: [
            // {
            //     path: 'calculators',
            //     canActivate: [],
            //     data: { page: `calculators` },
            //     loadChildren: () =>
            //         import('../calculators/calculators.module').then(
            //             (m) => m.CalculatorsModule
            //         ),
               
            // },
            {
                path: 'automobiles',
                canActivate: [],
                data: { page: `cars` },
                loadChildren: () => import('../automobiles/automobiles.module').then((m) => m.AutomobilesModule),
            },

            {
                path: 'users',
                canActivate: [CreatorGuard],
                data: { page: `users` },
                loadChildren: () => import('../users/users.module').then((m) => m.UsersModule),
            },
            
            // {
            //     path: ':project/roles',
            //     // canActivate: [AuthCheckGuard],
            //     data: { page: `roles` },
            //     loadChildren: () => import('../../pages/roles/roles.module').then((m) => m.RolesModule),
            // },
            // {
            //     path: ':project/contacts',
            //     // canActivate: [AuthCheckGuard],
            //     data: { page: `contacts` },
            //     loadChildren: () =>
            //         import('../../pages/contacts/contacts.module').then((m) => m.ContactsModule),
            // },
            // {
            //     path: ':project/categories',
            //     // canActivate: [AuthCheckGuard],
            //     data: { page: `categories` },
            //     loadChildren: () =>
            //         import('../../pages/categories-feature/categories-feature.module').then(
            //             (m) => m.CategoriesFeatureModule
            //         ),
            // },
            // {
            //     path: ':project/news',
            //     // canActivate: [AuthCheckGuard],
            //     data: { page: `news` },
            //     loadChildren: () => import('../../pages/news/news.module').then((m) => m.NewsModule),
            // },
            // {
            //     path: ':project/offers',
            //     canActivate: [AuthCheckGuard],
            //     data: { page: `offers` },
            //     loadChildren: () => import('../../pages/offers/offers.module').then((m) => m.OffersModule),
            // },
            // {
            //     path: ':project/services',
            //     canActivate: [AuthCheckGuard],
            //     data: { page: `services` },
            //     loadChildren: () =>
            //         import('../../pages/services-feature/services-feature.module').then((m) => m.ServicesFeatureModule),
            // },
            // {
            //     path: ':project/devices',
            //     canActivate: [AuthCheckGuard],
            //     data: { page: `devices` },
            //     loadChildren: () => import('../../pages/devices/devices.module').then((m) => m.DevicesModule),
            // },
            // {
            //     path: ':project/about',
            //     canActivate: [AuthCheckGuard],
            //     data: { page: `about` },
            //     loadChildren: () => import('../../pages/about/about.module').then((m) => m.AboutModule),
            // },
            // {
            //     path: ':project/internet',
            //     // canActivate: [AuthCheckGuard],
            //     data: { page: `internet` },
            //     loadChildren: () => import('../../pages/internet-tariffs/internet-tariffs.module').then((m) => m.InternetTariffsModule),
            // },
            // {
            //     path: ':project/channels',
            //     // canActivate: [AuthCheckGuard],
            //     data: { page: `channels` },
            //     loadChildren: () => import('../../pages/tv-channels/tv-channels.module').then((m) => m.TvChannelsModule),
            // },
            // {
            //     path: ':project/tv',
            //     // canActivate: [AuthCheckGuard],
            //     data: { page: `tv` },
            //     loadChildren: () => import('../../pages/tv-packages/tv-packages.module').then((m) => m.TvPackagesModule),
            // },
            // {
            //     path: ':project/modules',
            //     // canActivate: [AuthCheckGuard],
            //     data: { page: `modules` },
            //     loadChildren: () =>
            //         import('../../pages/main-modules-feature/main-modules-feature.module').then(
            //             (m) => m.MainModulesFeatureModule
            //         ),
            // },
            { path: '**', redirectTo: '/dashboard/automobiles' },
        ],
    },
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DashboardRoutingModule {}