import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import { ItemAnimation } from '../../animation/item.animation';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.scss'],
  animations: [ItemAnimation]
})
export class TaskItemComponent implements OnInit {
  @Input() item;
  @Output() taskClick = new EventEmitter<void>();
  avatar;
  widerPriority = 'in';
  constructor() { }

  ngOnInit() {
    this.avatar = this.item.owner ? this.item.owner.avatar : 'account-box';
  }
  onItemClick() {
    this.taskClick.emit();
  }
  onCheckBoxClick( ev: Event) {
    ev.stopPropagation();
  }
  @HostListener('mouseenter')
  onMouseEnter() {
    this.widerPriority = 'out';
  }
  @HostListener('mouseleave')
  onMouseLeave() {
    this.widerPriority = 'in';
  }

}
