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
        <a href="/" style="display: flex; align-items: center; text-decoration: none;">
        <img
          src="./assets/images/logos/st-engineering2.png"
          class="align-middle m-2" style="height: 30px; margin-right: 10px;"
          alt="logo"
        /> <span
        style="color: #000; font-weight: bolder; font-size: 25px; margin-left: 12px;"
      >
        ST Engineering
      </span>
  
      </a>
      <div style="font-weight: 700; padding-left: 70px; padding-top: 5px">CVE - Tracker™</div>
     
     
      } @if(options.theme === 'dark') {
      <a href="/" style="display: flex; align-items: center; text-decoration: none;">
        <img
          src="./assets/images/logos/st-engineering2.png"
          class="align-middle" style="height: 30px; margin-left: 10px;"
          alt="logo"
        /> <span
        style="color: #c6c0c0; font-weight: bolder; font-size: 25px; margin-left: 5px;"
      >
        ST Engineering
      </span>
  
      </a>
      <div style="font-weight: 700; color: white; padding-left: 70px; padding-top: 5px">CVE - Tracker™</div>
      }
     
    </div>
  `,
})
export class BrandingComponent {
  options = this.settings.getOptions();

  constructor(private settings: CoreService) { }
}
