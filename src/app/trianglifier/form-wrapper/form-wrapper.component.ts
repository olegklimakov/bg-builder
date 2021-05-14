import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CanvasComponent, TrianglifyOpts } from './canvas/canvas.component';
import { Observable } from 'rxjs';
import { debounceTime, filter, map, throttleTime } from 'rxjs/operators';
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
    this.options$ = this.form.valueChanges
      .pipe(
        throttleTime(100),
        filter(() => this.form.valid),
        map(data => ({...data})),
      );
  }

  makeForm(): FormGroup {
    return this.fb.group({
      cellSizeFractional: [0.1],
      variance: [0.75],
      interpolateLinear: [0.1],
      xColors: [this.colors[0]],
      width: [window?.screen?.width || 1440, [Validators.required, Validators.max(3840), Validators.min(50)]],
      height: [window?.screen?.height || 900, [Validators.required, Validators.max(3840), Validators.min(50)]],
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

  uploadSVG(): void {
    const data = this.canvas.uploadSVG().outerHTML;
    console.log(data);
    const blob = new Blob([data], { type: 'image/svg+xml;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    this.download(url, `${this.fileName.value}.svg`);
  }

  download(href, name): void {
    const link = document.createElement('a');
    link.download = name;
    link.style.opacity = '0';
    document.body.append(link);
    link.href = href;
    link.click();
    link.remove();
  }

  get widthControl() {
    return this.form.get('width');
  }

  get heightControl() {
    return this.form.get('height');
  }
}
