import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'CVE - Tracker™';

  ngOnInit() {
    // window.addEventListener('beforeunload', () => {
    //   localStorage.removeItem('token');
    //   localStorage.removeItem('userId');
    //   localStorage.removeItem('userName');
    // });
  }
}
