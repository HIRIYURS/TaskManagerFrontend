import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { MatToolbarModule, MatFormFieldModule, MatInputModule, MatOptionModule, MatSelectModule, MatIconModule, MatButtonModule, MatCardModule, MatTableModule, MatDividerModule, MatSnackBarModule } from '@angular/material';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ViewComponent } from './components/view/view.component';
import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';

import { TaskService } from './task.service';

const routes: Routes = [
  { path: 'add', component: AddComponent},
  { path: 'edit/:id', component: EditComponent},
  { path: 'view', component: ViewComponent},
  { path: '', redirectTo: 'view', pathMatch: 'full'}
];

@NgModule({
  declarations: [
    AppComponent,
    ViewComponent,
    AddComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    MatToolbarModule,
    MatFormFieldModule, 
    MatInputModule, 
    MatOptionModule, 
    MatSelectModule, 
    MatIconModule, 
    MatButtonModule, 
    MatCardModule, 
    MatTableModule, 
    MatDividerModule, 
    MatSnackBarModule
  ],
  providers: [TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
