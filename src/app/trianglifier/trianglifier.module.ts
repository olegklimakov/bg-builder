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
import { MatIconModule } from '@angular/material/icon';
import { DownloadModalComponent } from './form-wrapper/download-modal/download-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from '../shared/shared.module';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

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
    DownloadModalComponent
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSliderModule,
    MatButtonModule,
    RouterModule.forChild(ROUTES),
    ReactiveFormsModule,
    MatIconModule,
    MatDialogModule,
    SharedModule,
    MatButtonToggleModule,
  ],
  entryComponents: [
    DownloadModalComponent
  ]
})
export class TrianglifierModule { }
