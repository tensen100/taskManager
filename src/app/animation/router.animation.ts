import {trigger, state, transition, style, animate, group} from '@angular/animations';

export const  SlideToRight = trigger('routeAnimation', [
  state('void', style({'position': 'fixed', 'width': '100%', 'height': '80%'})),
  state('*', style({'position': 'fixed', 'width': '100%', 'height': '80%'})),
  transition('void => *', [
    style({'transform': 'translateX(-100%)'}),
    group([
      animate('500ms ease-in-out', style({'transform': 'translateX(0)'})),
      animate('300ms ease-in', style({'opacity': 1}))
    ]),
  ]),
  transition('* => void', [
    style({'transform': 'translateX(0)'}),
    group([
      animate('500ms ease-in-out', style({'transform': 'translateX(100%)'})),
      animate('300ms ease-out', style({'opacity': 0}))
    ])

  ]),
]);
