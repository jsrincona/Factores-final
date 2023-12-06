import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CheckLoginGuard,  } from './core/guards/check-login.guard';
import { CheckLogoutGuard } from './core/guards/check-logout.guard';
import { ROLES } from './core/models/users/roles.enum';
import { LayoutComponent } from './layout/layout.component';
import { AdminComponent } from './pages/admin/admin.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { OnBuildComponent } from './pages/on-build/on-build.component';
import { PaymentComponent } from './shared/payment/payment.component';
import { ProfileComponent } from './shared/profile/profile.component';
import { StockComponent } from './shared/stock/stock.component';
import { PurchaseComponent } from './pages/purchase/purchase.component';
import { ShowsComponent } from './pages/shows/shows.component';
import { UsersComponent } from './pages/users/users.component';
import { StatsComponent } from './pages/stats/stats.component';
import { SellsComponent } from './pages/sells/sells.component';
import { SeatDemo } from './pages/purchase/seat';
import { PaymentDemo } from './pages/purchase/payment';
import { ConfirmationDemo } from './pages/purchase/confirmation';
import { MoviesDemo } from './pages/purchase/movies';
import { ShowsDemo } from './pages/purchase/shows';
import { SnacksDemo } from './pages/purchase/snacks';
import { CinemaComponent } from '@pages/cinema/cinema.component';
import { HallDemo } from '@pages/purchase/hall';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    component: HomeComponent,
    canActivate: [CheckLogoutGuard]
  },
  {
    path: 'no-encontrado',
    component: NotFoundComponent,
    canActivate: [CheckLogoutGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [CheckLogoutGuard]
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [CheckLoginGuard],
    data: {
      allowedRoles: [ROLES.ADMINISTRATOR, ROLES.ADMIN_ADMIN],
    },
    children: [
      {
        path: 'mi-perfil',
        component: ProfileComponent
      },
      {
        path: 'usuarios',
        component: UsersComponent
      },
      {
        path: 'mi-inventario',
        component: StockComponent
      },
      {
        path: 'mis-ventas',
        component: SellsComponent
      },
      {
        path: 'mi-cine',
        component: CinemaComponent
      },
      {
        path: 'mis-compras',
        component: PurchaseComponent,
        children: [
          {
            path: 'movies',
            component: MoviesDemo
          },
          {
            path: 'shows',
            component: ShowsDemo
          },
          {
            path: 'halls',
            component: HallDemo
          },
          {
            path: 'seat',
            component: SeatDemo
          },
          {
            path: 'snacks',
            component: SnacksDemo
          },
          {
            path: 'payment',
            component: PaymentDemo
          },
          {
            path: 'confirmation',
            component: ConfirmationDemo
          }
        ]
      },
      {
        path: 'estadisticas',
        component: StatsComponent
      }
    ]
  },
  {
    path: 'app',
    component: LayoutComponent,
    canActivate: [CheckLoginGuard],
    data: {
      allowedRoles: [ROLES.CLIENTE, ROLES.EMPLEADO],
    },
    children: [
      {
        path: 'mi-perfil',
        component: ProfileComponent
      },
      {
        path: 'mi-inventario',
        component: StockComponent
      },
      {
        path: 'mis-ventas',
        component: SellsComponent
      },
      {
        path: 'mi-cine',
        component: CinemaComponent
      },
      {
        path: 'mis-compras',
        component: PurchaseComponent,
        children: [
          {
            path: 'movies',
            component: MoviesDemo
          },
          {
            path: 'shows',
            component: ShowsDemo
          },
          {
            path: 'seat',
            component: SeatDemo
          },
          {
            path: 'snacks',
            component: SnacksDemo
          },
          {
            path: 'payment',
            component: PaymentDemo
          },
          {
            path: 'confirmation',
            component: ConfirmationDemo
          }
        ]
      },
      {
        path: 'estadisticas',
        component: StatsComponent
      }
    ]
  },
  {
    path:'**',
    component: NotFoundComponent,
    pathMatch:'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
