import { Directive, ElementRef, HostListener, Input, Renderer2 } from '@angular/core';
import { DragDropService } from '../drag-drop.service';

@Directive({
  selector: '[appDrag][dragTag][dragData][dragClass]'
})
export class DragDirective {
  private _isDrag = false;
  @Input('appDrag')
  set Drag(val: boolean) {
    this._isDrag = val;
    this.rd.setAttribute(this.el.nativeElement, 'draggable', `${val}`);
  }
  get Drag() {
    return this._isDrag;
  }
  @Input() dragClass: string;
  @Input() dragTag: string; // 唯一标识
  @Input() dragData: any;

  constructor(
    private el: ElementRef,
    private rd: Renderer2,
    private service: DragDropService
  ) { }
  @HostListener('dragstart', ['$event'])
  onDragStart(ev: Event) {
    if (this.el.nativeElement === ev.target) {
      this.rd.addClass(this.el.nativeElement, this.dragClass);
      this.service.setDragData({
        tag: this.dragTag,
        data: this.dragData
      });
    }

  }
  @HostListener('dragend', ['$event'])
  onDragEnd(ev: Event) {
    if (this.el.nativeElement === ev.target) {
      this.rd.removeClass(this.el.nativeElement, this.dragClass);
    }

  }

}
