import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GeographicChartComponent } from './geographic-chart/geographic-chart.component';


const routes: Routes = [
 
  { path: 'geograohic-chart', component: GeographicChartComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
