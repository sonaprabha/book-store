import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AddbooksComponent } from './addbooks/addbooks.component';

const routes: Routes = [{ path: '', component: DashboardComponent },
  {path:"addbooks",component:AddbooksComponent},
  {path:"addbooks/:id",component:AddbooksComponent}

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
