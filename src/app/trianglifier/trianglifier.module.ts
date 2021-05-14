import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanvasComponent } from './form-wrapper/canvas/canvas.component';
import { FormWrapperComponent } from './form-wrapper/form-wrapper.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

const ROUTES: Routes = [
  {
    path: '',
    component: FormWrapperComponent
  }
];

@NgModule({
  declarations: [
    CanvasComponent,
    FormWrapperComponent,
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSliderModule,
    MatButtonModule,
    RouterModule.forChild(ROUTES),
    ReactiveFormsModule
  ]
})
export class TrianglifierModule { }
