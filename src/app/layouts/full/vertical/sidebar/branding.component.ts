import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CoreService } from 'src/app/services/core.service';

@Component({
  selector: 'app-branding',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="branding">
      @if(options.theme === 'light') {
      <a href="/">
        <img
          src="./assets/images/logos/st-engineering.svg"
          class="align-middle m-2"
          alt="logo"
        />
        <div class="logo-text">&nbsp;&nbsp;&nbsp; CVE - Tracker™</div>
      </a>
     
     
      } @if(options.theme === 'dark') {
      <a href="/">
        <img
          src="./assets/images/logos/st-engineering.svg"
          class="align-middle m-2"
          alt="logo"
        />
      </a>
      <div >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;CVE - Tracker™</div>
      }
     
    </div>
  `,
})
export class BrandingComponent {
  options = this.settings.getOptions();

  constructor(private settings: CoreService) { }
}
