import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreListComponent } from './components/store-list/store-list.component';
import { StoreViewComponent } from './components/store-view/store-view.component';

const routes: Routes = [
  { path: '', component: StoreListComponent },
  { path: 'store-view/:id', component: StoreViewComponent },
  { path: '**', component: StoreListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
