import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { UserComponent } from './components/usuaris/user.component';
import { PropertyComponent } from './components/property/property.component';
import { ReviewsComponent } from './components/reviews/reviews.component'
import { HomeComponent } from './components/home/home.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { ConfirmationModalComponent } from './components/confirmation-modal/confirmation-modal.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, 
  { path: 'home', component: HomeComponent },
  { path: 'user', component: UserComponent },
  { path: 'property', component: PropertyComponent },
  { path: 'review', component: ReviewsComponent },
  { path: 'confirmation-modal', component: ConfirmationModalComponent },
  { path: '**', redirectTo: 'home' } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true }), NgxPaginationModule, FormsModule, BrowserModule], 
  exports: [RouterModule]
})
export class AppRoutingModule {}


