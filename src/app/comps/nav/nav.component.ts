import { Component } from '@angular/core';

@Component({
  selector: 'app-nav',
  standalone: false,
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  selectedComponent: any = 'NavHistory';
  // navComponents = {
  //   navHistoryComponent: 'NavHistory',
  //   componentB: 'ComponentB',
  //   componentC: 'ComponentC'
  // };
}
