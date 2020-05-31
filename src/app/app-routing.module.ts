import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GeographicChartComponent } from './geographic-chart/geographic-chart.component';
import { ColorChartComponent } from './color-chart/color-chart.component';


const routes: Routes = [
  { path: 'color-chart', component: ColorChartComponent },
  { path: 'geograohic-chart', component: GeographicChartComponent },
  { path: '', component: GeographicChartComponent },
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
