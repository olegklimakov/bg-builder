import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, Input, OnInit, QueryList, Renderer2, ViewChildren } from '@angular/core';
import * as trianglify from 'trianglify';
import * as colorbrewer from 'trianglify/src/utils/colorbrewer';
import { COLORS } from '../colors.data';

export interface TrianglifyOpts {
  width: number;
  height: number;
  cellSize: number;
  variance: number;
  seed: null | string;
  xColors: string[];
  yColors: 'match' | string[];
  fill?: boolean;
  palette?: colorbrewer;
  colorSpace?: 'lab' | 'rgb' | 'hsv' | 'hsl' | 'hsi' | 'hcl';
  colorFunction: () => void;
  strokeWidth: number;
  points: null;
  interpolateLinear?: number;
  cellSizeFractional?: number;
}

const DEFAULT_OPTS: Partial<TrianglifyOpts> = {
  width: 1440,
  height: 900,
  cellSize: 35,
  variance: 0.75,
  seed: 'test',
  xColors: Object.values(COLORS)[0],
  // yColors: 'match',
  // fill: true,
  // palette: colorbrewer,
  // colorSpace: 'hcl',
  colorFunction: trianglify.colorFunctions.interpolateLinear(0.1),
  // strokeWidth: 0,
  // points: null,
};

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.scss']
})
export class CanvasComponent implements AfterViewInit {

  trianglifyOpts = DEFAULT_OPTS;
  @ViewChildren('container') container;
  @ViewChildren('canvas') canvas: QueryList<ElementRef>;

  private cx: CanvasRenderingContext2D;

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
    if (data?.cellSizeFractional) {
      this.trianglifyOpts.cellSize = Math.max(data.width, data.height) * data?.cellSizeFractional;
      delete this.trianglifyOpts.cellSizeFractional;
    }
    console.log(this.trianglifyOpts);
    this.rerender();
  }

  constructor(
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef
  ) { }

  ngAfterViewInit(): void {
    this.rerender();
  }

  private rerender() {
    if (!this.canvas?.first?.nativeElement) { return; }
    const canvasEl: HTMLCanvasElement = this.canvas?.first?.nativeElement;

    this.cx = canvasEl.getContext('2d');
    canvasEl.width = this.trianglifyOpts.width;
    canvasEl.height = this.trianglifyOpts.height;

    this.pattern = trianglify(this.trianglifyOpts);
    const component = this.pattern.toCanvas(canvasEl, {
      applyCssScaling: false,
      scaling: false,
    });

    this.cx.drawImage(component, 0, 0);
    this.cdr.markForCheck();
  }

  uploadSVG() {
    return this.pattern.toSVG();
  }

  getCanvas(): HTMLCanvasElement {
    if (!this.canvas?.first?.nativeElement) { return; }
    return this.canvas?.first?.nativeElement;
  }
}
