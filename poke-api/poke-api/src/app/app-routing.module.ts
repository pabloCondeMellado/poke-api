import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { DetailComponent } from './components/detail/detail.component';
import { FeedbackComponent } from './feedback/feedback.component';

const routes: Routes = [
  {path:"", component: ListComponent},
  {path:"detail/:id", component: DetailComponent},
  {path:"feedback", component: FeedbackComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
