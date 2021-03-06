import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FormComponent } from './form/form.component';
import { NewsDetailsComponent } from './news-details/news-details.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'news/add', component: FormComponent},
  {path: 'news/:newsItemId', component: NewsDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
