import { Component, EventEmitter, Output } from '@angular/core';
// import { MatIconRegistry } from '@angular/material';
// import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Output() toggle = new EventEmitter<void>();
  @Output() toggleDarkThem = new EventEmitter<boolean>();
  constructor() {}
  openSidebar() {
    this.toggle.emit();
  }
  onChange(checked: boolean) {
    this.toggleDarkThem.emit(checked);
  }

}
