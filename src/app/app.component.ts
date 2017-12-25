import { Component } from '@angular/core';

// import { OverlayContainer } from '@angular/cdk/overlay';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  squareState: string;
  darkTheme = false;
  constructor() {}
  switchTheme(checked) {
    this.darkTheme = checked;
    // this.oc.getContainerElement().classList.add('myapp-dark-theme');
  }

}
