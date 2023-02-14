import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UserlistComponent } from './userlist/userlist.component';
import { RouterModule, Routes } from '@angular/router';
import { NewUserComponent } from './new-user/new-user.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Routes for the app

const appRoute: Routes = [
  { path: '', component: HomeComponent },
  { path: 'NewUser', component: NewUserComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    UserlistComponent,
    NewUserComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    RouterModule.forRoot(appRoute),
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
