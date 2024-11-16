import { Component, Input, SimpleChanges } from '@angular/core';

// components
import { AppWelcomeCardComponent } from '../../../components/dashboard2/welcome-card/welcome-card.component';
import { AppTopCardsComponent } from '../../../components/dashboard2/top-cards/top-cards.component';
import { AppProfileExpanceCpmponent } from '../../../components/dashboard2/profile-expance/profile-expance.component';
import { AppProductSalesComponent } from '../../../components/dashboard2/product-sales/product-sales.component';
import { AppTrafficDistributionComponent } from '../../../components/dashboard2/traffic-distribution/traffic-distribution.component';
import { AppNewGoalsComponent } from '../../../components/dashboard2/new-goals/new-goals.component';
import { AppProfileCardComponent } from '../../../components/dashboard2/profile-card/profile-card.component';
import { AppBlogCardComponent } from '../../../components/dashboard2/blog-card/blog-card.component';
import { AppTopEmployeesComponent } from '../../../components/dashboard2/top-employees/top-employees.component';
import { AppUpcomingSchedulesComponent } from '../../../components/dashboard2/upcoming-schedules/upcoming-schedules.component';
import { TopBrandsComponent } from "../../../components/dashboard2/top-brands/top-brands.component";
import { VulnerabilityByTypeComponent } from "../../../components/dashboard2/vulnerability-by-type/vulnerability-by-type.component";
import { VulnerabilityByCvssScoreComponent } from "../../../components/dashboard2/vulnerability-by-cvss-score/vulnerability-by-cvss-score.component";
import { VulnerabilityLogsComponent } from "../../../components/dashboard2/vulnerability-logs/vulnerability-logs.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard2',
  standalone: true,
  imports: [
    AppWelcomeCardComponent,
    AppTopCardsComponent,
    AppProfileExpanceCpmponent,
    AppProductSalesComponent,
    AppTrafficDistributionComponent,
    AppNewGoalsComponent,
    AppProfileCardComponent,
    AppBlogCardComponent,
    AppTopEmployeesComponent,
    AppUpcomingSchedulesComponent,
    TopBrandsComponent,
    VulnerabilityByTypeComponent,
    VulnerabilityByCvssScoreComponent,
    VulnerabilityLogsComponent,
    CommonModule,
],
  templateUrl: './dashboard2.component.html',
})
export class AppDashboard2Component {
  constructor() {}
  @Input() isActive = false;


}
