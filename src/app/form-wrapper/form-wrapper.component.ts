import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { CanvasComponent, TrianglifyOpts } from './canvas/canvas.component';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatSliderChange } from '@angular/material/slider';
import { COLORS } from './colors.data';

@Component({
  selector: 'app-form-wrapper',
  templateUrl: './form-wrapper.component.html',
  styleUrls: ['./form-wrapper.component.scss']
})
export class FormWrapperComponent implements OnInit {

  @ViewChild(CanvasComponent) canvas: CanvasComponent;

  form: FormGroup;
  fileName = new FormControl();
  options$: Observable<TrianglifyOpts>;
  colors = Object.values(COLORS);

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.makeForm();
    this.options$ = this.form.valueChanges.pipe(map(data => {
      return {...data};
    }));
  }

  makeForm(): FormGroup {
    return this.fb.group({
      cellSize: [35],
      variance: [0.75],
      interpolateLinear: [0.1],
      xColors: [this.colors[0]],
      width: [600],
      height: [400],
    });
  }

  onSliderChange(change: MatSliderChange, control: string): void {
    this.form.get(control).patchValue(change.value);
  }

  selectColorRow(row: string[]): void {
    this.form.get('xColors').patchValue(row);
  }

  isSelected(colorArray: string[]): boolean {
    return this.form.get('xColors').value === colorArray;
  }

  uploadSVG() {
    const data = this.canvas.uploadSVG().outerHTML;
    console.log(data);
    const blob = new Blob([data], { type: 'image/svg+xml;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    this.download(url, `${this.fileName.value}.svg`);
  }

  download(href, name) {
    const link = document.createElement('a');
    link.download = name;
    link.style.opacity = '0';
    document.body.append(link);
    link.href = href;
    link.click();
    link.remove();
  }
}
