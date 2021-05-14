import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';

export type SaveFormat =  'png' | 'svg' | 'jpg';

export interface DownloadDialogResult {
  name: string;
  format: SaveFormat;
}

@Component({
  selector: 'app-download-modal',
  templateUrl: './download-modal.component.html',
  styleUrls: ['./download-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DownloadModalComponent {

  fileName = new FormControl();
  format: SaveFormat = 'jpg';

  constructor(public dialogRef: MatDialogRef<DownloadModalComponent>) {}

  close() {
    this.dialogRef.close();
  }

  download() {
    this.dialogRef.close({
      name: this.fileName.value,
      format: this.format,
    });
  }
}
