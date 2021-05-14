import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { HeaderComponent } from './header/header.component';

const ROUTES: Routes = [
  {
    path: '',
    // component: LandingComponent,
    pathMatch: 'full',
    redirectTo: 'triangle'
  },
  {
    path: 'triangle',
    loadChildren: () => import('src/app/trianglifier/trianglifier.module').then(m => m.TrianglifierModule),
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
