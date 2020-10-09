import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ChartsModule, ThemeService } from 'ng2-charts';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { WeatherComponent } from './weatherInfo/weatherInfo.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { LocationPageComponent } from './locationPage/locationPage.compoment';

// This is the service that uses HTTP protocol to communicate with the backend.
import { WeatherInfoService } from './weather-info.service';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    WeatherComponent,
    FetchDataComponent,
    LocationPageComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ChartsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'saatiedot', component: WeatherComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'location', component: LocationPageComponent }
    ])
  ],
  providers: [
    WeatherInfoService,
    ThemeService // This is needed for the charts to work properly.
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
