import { AfterViewChecked, AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CanvasComponent, TrianglifyOpts } from './canvas/canvas.component';
import { Observable, Subscription } from 'rxjs';
import { filter, map, pairwise, take, throttleTime } from 'rxjs/operators';
import { MatSliderChange } from '@angular/material/slider';
import { COLORS } from './colors.data';
import { MatDialog } from '@angular/material/dialog';
import { DownloadDialogResult, DownloadModalComponent } from './download-modal/download-modal.component';

@Component({
  selector: 'app-form-wrapper',
  templateUrl: './form-wrapper.component.html',
  styleUrls: ['./form-wrapper.component.scss']
})
export class FormWrapperComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(CanvasComponent) canvas: CanvasComponent;

  form: FormGroup;
  options$: Observable<TrianglifyOpts>;
  colors = Object.values(COLORS);
  ignoreScrolling = false;
  subs: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
  ) {}

  ignoreClickOnSlider(controlName: string) {
    const sub = this.form.get(controlName).valueChanges
      .pipe(
        pairwise()
      )
      .subscribe(([prev, current]) => {
        const diff = Math.abs(prev - current);
        if (diff > 0.02 && !this.ignoreScrolling) {
          this.ignoreScrolling = true;
          this.form.get(controlName).patchValue(prev);
        } else {
          this.ignoreScrolling = false;
        }
      });
    this.subs.push(sub);
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  ngOnInit(): void {
    this.form = this.makeForm();

    this.ignoreClickOnSlider('cellSizeFractional');
    this.ignoreClickOnSlider('interpolateLinear');
    this.ignoreClickOnSlider('variance');

    this.options$ = this.form.valueChanges
      .pipe(
        throttleTime(100),
        filter(() => this.form.valid),
        map(data => ({...data})),
      );
    // hack for update
    setTimeout(() => this.form.patchValue(this.form.value), 0);
  }

  ngAfterViewInit() {
    window.scrollTo( 0, 0 );
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

  uploadSVG(fileName: string): void {
    const data = this.canvas.uploadSVG().outerHTML;
    const blob = new Blob([data], { type: 'image/svg+xml;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    this.download(url, `${fileName}.svg`);
  }

  uploadPNG(fileName: string): void {
    const canvas = this.canvas.getCanvas();
    const url = canvas.toDataURL('image/png');
    this.download(url, `${fileName}.png`);
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

  openModal() {
    this.dialog.open(DownloadModalComponent).afterClosed()
      .pipe(take(1))
      .subscribe((data: DownloadDialogResult) => {
        if (!data) { return; }
        switch (data.format) {
          case 'png':
            this.uploadPNG(data.name);
            break;
          case 'svg':
            this.uploadSVG(data.name);
            break;
          default:
            break;
        }
      });
  }
}
