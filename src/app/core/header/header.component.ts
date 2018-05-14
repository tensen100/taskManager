import { Component, EventEmitter, Output } from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromRoot from '../../reducers';
import {Observable} from 'rxjs/Observable';
import {Auth} from '../../domain/auth.model';
import {getAuthState} from '../../reducers';
import {LogoutAction} from '../../actions/auth.action';
// import { MatIconRegistry } from '@angular/material';
// import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  auth$: Observable<Auth>;
  @Output() toggle = new EventEmitter<void>();
  @Output() toggleDarkThem = new EventEmitter<boolean>();
  constructor(private store: Store<fromRoot.State>) {
    this.auth$ = this.store.select(fromRoot.getAuthState);
  }
  openSidebar() {
    this.toggle.emit();
  }
  onChange(checked: boolean) {
    this.toggleDarkThem.emit(checked);
  }
  logout() {
    this.store.dispatch(new LogoutAction(null));
  }

}
