import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminComponent } from './pages/admin/admin.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService, FilterService } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { TopBarComponent } from './shared/top-bar/top-bar.component';
import { SideBarComponent } from './shared/side-bar/side-bar.component';
import { SlideMenuModule } from 'primeng/slidemenu';
import { MenuModule } from 'primeng/menu';
import { ProfileComponent } from './shared/profile/profile.component';
import { ChartModule } from 'primeng/chart';
import { OnBuildComponent } from './pages/on-build/on-build.component';
import { SidebarModule } from 'primeng/sidebar';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { DropdownModule } from 'primeng/dropdown';
import { RatingModule } from 'primeng/rating';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FileUploadModule } from 'primeng/fileupload';
import { PaymentComponent } from './shared/payment/payment.component';
import { StockComponent } from './shared/stock/stock.component';
import { TabViewModule } from 'primeng/tabview';
import { PurchaseComponent } from './pages/purchase/purchase.component';
import { DataViewModule, DataViewLayoutOptions } from 'primeng/dataview';
import { ShowsComponent } from './pages/shows/shows.component';
import { MoviesComponent } from './shared/movies/movies.component';
import { UsersComponent } from './pages/users/users.component';
import { ErrorInterceptorService } from './core/interceptors/error-interceptor.service';
import { TokenInterceptor } from './core/interceptors/token-interceptor.service';
import { ResponseInterceptorService } from './core/interceptors/response.interceptor.service';
import { TagModule } from 'primeng/tag';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SelectButtonModule } from 'primeng/selectbutton';
import { StepsModule } from 'primeng/steps';
import { CardModule } from 'primeng/card';
import { InputMaskModule } from 'primeng/inputmask';
import { StatsComponent } from './pages/stats/stats.component';
import { SellsComponent } from './pages/sells/sells.component';
import { DeadlineComponent } from './shared/deadline/deadline.component';
import { SeatDemo } from './pages/purchase/seat';
import { PaymentDemo } from './pages/purchase/payment';
import { MoviesDemo } from './pages/purchase/movies';
import { ShowsDemo } from './pages/purchase/shows';
import { ConfirmationDemo } from './pages/purchase/confirmation';
import { TicketService } from '@services/ticket/ticket.service';
import { CheckboxModule } from 'primeng/checkbox';
import { SplitterModule } from 'primeng/splitter';
import { DividerModule } from 'primeng/divider';
import { SkeletonModule } from 'primeng/skeleton';
import { SnacksDemo } from './pages/purchase/snacks';
import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';
import { InputSwitchModule } from 'primeng/inputswitch';
import { CinemaComponent } from './pages/cinema/cinema.component';
import { CinemaDetailsComponent } from '@shared/cinema-details/cinema-details.component';
import { HallDemo } from '@pages/purchase/hall';
@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    LoginComponent,
    AdminComponent,
    HomeComponent,
    NotFoundComponent,
    TopBarComponent,
    SideBarComponent,
    ProfileComponent,
    OnBuildComponent,
    PaymentComponent,
    StockComponent,
    PurchaseComponent,
    ShowsComponent,
    MoviesComponent,
    UsersComponent,
    StatsComponent,
    SellsComponent,
    DeadlineComponent,
    PaymentDemo,
    SeatDemo,
    MoviesDemo,
    ShowsDemo,
    SnacksDemo,
    HallDemo,
    ConfirmationDemo,
    CinemaComponent,
    CinemaDetailsComponent
  ],
  imports: [
    SkeletonModule,
    TagModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    ButtonModule,
    HttpClientModule,
    ToastModule,
    InputMaskModule,
    TabViewModule,
    FormsModule,
    MenubarModule,
    SlideMenuModule,
    MenuModule,
    ChartModule,
    CalendarModule,
    SidebarModule,
    TableModule,
    ToolbarModule,
    DialogModule,
    ConfirmDialogModule,
    FileUploadModule,
    DropdownModule,
    RatingModule,
    DataViewModule,
    RadioButtonModule,
    InputSwitchModule,
    SelectButtonModule,
    StepsModule,
    CheckboxModule,
    CardModule,
    SplitterModule,
    PasswordModule,
    DividerModule,
    InputNumberModule,
  ],
  providers: [
    MessageService,
    ConfirmationService,
    FilterService,
    TicketService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptorService,
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, 
      useClass: TokenInterceptor, 
      multi: true },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ResponseInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
