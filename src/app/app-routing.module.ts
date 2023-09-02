import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//componentes
import { FirmasComponent } from './components/firmas/firmas.component';
import { DocumentosComponent } from './components/documentos/documentos.component';

const routes: Routes = [
  {path:'', redirectTo:'Firmas', pathMatch:'full'},
  {path:'Firmas',component: FirmasComponent},
  {path:'Documentos',component:DocumentosComponent} 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
