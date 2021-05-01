import { AfterViewInit, Component, ElementRef, Input, OnInit, Renderer2, ViewChildren } from '@angular/core';
import * as trianglify from 'trianglify';
import * as colorbrewer from 'trianglify/src/utils/colorbrewer';

export interface TrianglifyOpts {
  width: number;
  height: number;
  cellSize: number;
  variance: number;
  seed: null | number;
  xColors: string[];
  yColors: 'match' | string[];
  fill: boolean;
  palette: colorbrewer;
  colorSpace: 'lab' | 'rgb' | 'hsv' | 'hsl' | 'hsi' | 'hcl';
  colorFunction: () => void;
  strokeWidth: number;
  points: null;
  interpolateLinear?: number;
}

const DEFAULT_OPTS: TrianglifyOpts = {
  width: 600,
  height: 400,
  cellSize: 35,
  variance: 0.75,
  seed: null,
  xColors: ['#000000', '#4CAFE8', '#FFFFFF'],
  yColors: 'match',
  fill: true,
  palette: colorbrewer,
  colorSpace: 'hcl',
  colorFunction: trianglify.colorFunctions.interpolateLinear(0.1),
  strokeWidth: 0,
  points: null,
};

@Component({
  selector: 'app-canvas',
  template: '',
})
export class CanvasComponent implements AfterViewInit {

  private trianglifyOpts = DEFAULT_OPTS;
  @ViewChildren('container') container;

  pattern;
  @Input() set options(data: Partial<TrianglifyOpts>) {
    this.trianglifyOpts = {
      ...DEFAULT_OPTS,
      ...data
    };
    if (data?.interpolateLinear !== undefined) {
      this.trianglifyOpts.colorFunction = trianglify.colorFunctions.interpolateLinear(data.interpolateLinear);
      delete this.trianglifyOpts.interpolateLinear;
    }
    this.rerender();
  }

  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef
  ) { }

  ngAfterViewInit(): void {
    this.rerender();
  }

  private rerender() {
    if (this.elementRef.nativeElement.firstChild) {
      this.renderer.removeChild(this.elementRef.nativeElement, this.elementRef.nativeElement?.firstChild);
    }
    this.pattern = trianglify(this.trianglifyOpts);
    this.renderer.appendChild(this.elementRef.nativeElement, this.pattern.toCanvas());
  }

  uploadSVG() {
    return this.pattern.toSVG();
  }
}
