import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-download-modal',
  templateUrl: './download-modal.component.html',
  styleUrls: ['./download-modal.component.scss']
})
export class DownloadModalComponent implements OnInit {

  fileName = new FormControl();
  format: 'png' | 'svg' = 'png';

  constructor(public dialogRef: MatDialogRef<DownloadModalComponent>) {}

  ngOnInit(): void {
  }

  close() {
    this.dialogRef.close();
  }

  uploadSVG() {}

  uploadPNG() {}
}
