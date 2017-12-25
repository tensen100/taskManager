import { trigger, state, transition, style, animate } from '@angular/animations';

export const  CardAnimation = trigger('card', [
  state('out', style({'transform': 'scale(1)'})),
  state('hover', style({'transform': 'scale(1.05)'})),
  transition('out => hover', animate('100ms ease-in')),
  transition('hover => out', animate('100ms ease-out'))
]);
