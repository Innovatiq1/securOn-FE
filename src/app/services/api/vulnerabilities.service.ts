import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environment/environment';

import {
  setVulnerabilities,
  loadAllVulnerabilities,
  setCurrentVulnerability,
  setLoading,
  setSelectedAssetId,
  uploadFile,
  loadAllAssets,
  deleteAssets,
  updateAsset,
  getCveDetails,
  setCurrentSeverity,
  loadAssetVulnerabilities,
  setSelectedDateRange,
} from '../../store/vulnerabilities.actions';
import {
  getAllVulnerabilities,
  getCriticalVulnerabilities,
  getHighVulnerabilities,
  getMediumVulnerabilities,
  getLowVulnerabilities,
  getCurrentVulnerabilty,
  getDataLoading,
  getSelectedAssetId,
  getAllAssets,
  getCurrentCveData,
  getCurrentSeverity,
  getAssetUploadMessage,
  getSelectedDateRange,
} from '../../store/vulnerabilities.selectors';
import { UserService } from '../auth/user.service';

@Injectable()
export class VulnerabilitiesService {
  private currentRouteName: string = '';
  
  private selectedVendorSubject: BehaviorSubject<string[]> =
    new BehaviorSubject<string[]>([]);
  public selectedVendor$: Observable<string[]> =
    this.selectedVendorSubject.asObservable();

  private selectedPartNoSubject: BehaviorSubject<string[]> =
    new BehaviorSubject<string[]>([]);
  public selectedPartNo$: Observable<string[]> =
    this.selectedPartNoSubject.asObservable();

    
  private selectedProjectSubject: BehaviorSubject<string[]> =
  new BehaviorSubject<string[]>([]);
public selectedProject$: Observable<string[]> =
  this.selectedProjectSubject.asObservable();

  private selectedOsTypeSubject: BehaviorSubject<string[]> =
  new BehaviorSubject<string[]>([]);
public selectedOsType$: Observable<string[]> =
  this.selectedOsTypeSubject.asObservable();

  private selectedVersionSubject: BehaviorSubject<string[]> =
  new BehaviorSubject<string[]>([]);
public selectedVersion$: Observable<string[]> =
  this.selectedVersionSubject.asObservable();
  currentPageIndex$: any;

  constructor(private store$: Store, private readonly httpClient: HttpClient,
    private readonly userService: UserService,) {}

  public loadAllVulnerabilities(request: any): void {
    this.store$.dispatch(loadAllVulnerabilities({ payload: request }));
  }

  setCurrentRouteName(routeName: string): void {
    this.currentRouteName = routeName;
  }

  getCurrentRouteName(): string {
    return this.currentRouteName;
  }

  setSelectedVendor(selectedVendor: string[]): void {
    this.selectedVendorSubject.next(selectedVendor);
  }

  getSelectedVendor(): Observable<string[]> {
    return this.selectedVendor$;
  }


  setSelectedOsType(selectedOsType: string[]): void {
    this.selectedOsTypeSubject.next(selectedOsType);
  }

  getSelectedOsType(): Observable<string[]> {
    return this.selectedOsType$;
  }


  setSelectedVersion(selectedVersion: string[]): void {
    this.selectedVersionSubject.next(selectedVersion);
  }

  getSelectedVersion(): Observable<string[]> {
    return this.selectedVersion$;
  }

  setSelectedPartNo(selectedPartNo: string[]): void {
    this.selectedPartNoSubject.next(selectedPartNo);
  }

  setSelectedProject(selectedProject: string[]): void {
    this.selectedProjectSubject.next(selectedProject);
  }
  getSelectedProject(): Observable<string[]> {
    return this.selectedProject$;
  }

  getSelectedPartNo(): Observable<string[]> {
    return this.selectedPartNo$;
  }

  public getAllVulnerabilities(): Observable<any[]> {
    return this.store$.select(getAllVulnerabilities);
  }

  public getCriticalVulnerabilities(): Observable<any[]> {
    return this.store$.select(getCriticalVulnerabilities);
  }

  public getHighVulnerabilities(): Observable<any[]> {
    return this.store$.select(getHighVulnerabilities);
  }

  public getMediumVulnerabilities(): Observable<any[]> {
    return this.store$.select(getMediumVulnerabilities);
  }

  public geLowVulnerabilities(): Observable<any[]> {
    return this.store$.select(getLowVulnerabilities);
  }

  public setAllVulnerabilities(vulnerabilities: any[]) {
    this.store$.dispatch(setVulnerabilities({ vulnerabilities }));
  }

  public getCurrentVulnerabilty(): Observable<any> {
    return this.store$.select(getCurrentVulnerabilty);
  }

  public isDataLoading(): Observable<boolean> {
    return this.store$.select(getDataLoading);
  }

  public setCurrentVulnerability(vulnerability: any) {
    this.store$.dispatch(setCurrentVulnerability({ vulnerability }));
  }

  public setDataLoading(loading: boolean) {
    this.store$.dispatch(setLoading({ isLoading: loading }));
  }

  public setSelectedAssetId(assetId: string) {
    this.store$.dispatch(setSelectedAssetId({ assetId }));
  }

  public getSelectedAssetId(): Observable<string> {
    return this.store$.select(getSelectedAssetId);
  }

  public uploadAssets(formData: FormData): void {
    this.store$.dispatch(uploadFile({ data: formData }));
  }

  public loadAllAssets(): void {
    this.store$.dispatch(loadAllAssets());
  }

  public getAllAssets(): Observable<any[]> {
    return this.store$.select(getAllAssets);
  }

  public deleteAssets(assets: any[]): void {
    this.store$.dispatch(deleteAssets({ assets }));
  }

  public updateAsset(asset: any): void {
    this.store$.dispatch(updateAsset({ asset }));
  }

  public getCveDetails(cveId: string): void {
    this.store$.dispatch(getCveDetails({ cveId }));
  }

  public getCurrentCveData(): Observable<any[]> {
    return this.store$.select(getCurrentCveData);
  }

  public setCurrentSeverity(severity: string): void {
    this.store$.dispatch(setCurrentSeverity({ severity }));
  }

  public getCurrentSeverity(): Observable<string> {
    return this.store$.select(getCurrentSeverity);
  }

  public loadAssetVulnerabilities(asset: any): void {
    this.store$.dispatch(loadAssetVulnerabilities({ asset: asset }));
  }

  public getAssetUploadMessage(): Observable<string> {
    return this.store$.select(getAssetUploadMessage);
  }

  public clearVulnerabilities(): void {
    this.store$.dispatch(setVulnerabilities({ vulnerabilities: [] }));
  }

  public setSelectedDateRange(dateRange: Date[]): void {
    this.store$.dispatch(
      setSelectedDateRange({ selectedDateRange: dateRange })
    );
  }

  public getSelectedDateRange(): Observable<Date[]> {
    return this.store$.select(getSelectedDateRange);
  }

  public getCveDataByBrand(body: any): Observable<any> {
    const url = `${environment.baseUrl}/getCveDataByBrand`;
    return this.httpClient.post(url, body);
  }
  public getCveDataByAsset(body: any): Observable<any> {
    const url = `${environment.baseUrl}/getCveDataByAsset`;
    return this.httpClient.post(url, body);
  }
  public getCveDataByProject(body: any): Observable<any> {
    const url = `${environment.baseUrl}/getCveDataByProject`;
    return this.httpClient.post(url, body);
  }
  
  public getCveDataByCriticality(body: any): Observable<any> {
    const url = `${environment.baseUrl}/getCveDataBySeviarity`;
    return this.httpClient.post(url, body);
  }

  public getCveDataFromAssets(body: any): Observable<any> {
    const url = `${environment.baseUrl}/fetchcves`;
    return this.httpClient.post(url, body);
  }

  public loadVulnerabilitiesByDateRange(req: any): Observable<any> {
    const body = {
      fromDate: req.fromDate,
      toDate: req.toDate,
      duration: req.duration,
      allData: req.allData,
    };

    const url = `${environment.baseUrl}/getCircularDashboardData`;
    return this.httpClient.post(url, body);
  }

  loadVulnerabilityTrendData(requestData: any): Observable<any> {
    const url = environment.baseUrl + '/getVulnarabilityTrendData';
    // const body = { year: requestData.year, allData: requestData.allData };
    const body = {
      startDate: requestData.startDate,
      endDate: requestData.endDate,
      allData: requestData.allData,
    };
    return this.httpClient.post<any>(url, body);
  }
  saveAsset(requestData: any): Observable<any> {
    const url = environment.baseUrl + '/createAsset';
    return this.httpClient
    .post<any>(url, requestData, this.userService.getRequestHeaders())
    .pipe(
      map((response) => response)
    );
  }

  loadVulnerbilityDateRange(requestData: any): Observable<any> {
    const body = {
      fromDate: requestData.fromDate,
      toDate: requestData.toDate,
      allData: requestData.allData,
    };
    const url = `${environment.baseUrl}/getAllCvesByDateRange`;
    return this.httpClient.post(url, body);
  }

  public getResponse(): Observable<any[]> {
    return of([
      {
        cve: {
          id: 'CVE-2023-4481',
          sourceIdentifier: 'sirt@juniper.net',
          published: '2023-09-01T00:15:08.703',
          lastModified: '2023-09-01T07:32:13.003',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'An Improper Input Validation vulnerability in the Routing Protocol Daemon (rpd) of Juniper Networks Junos OS and Junos OS Evolved allows an unauthenticated, network-based attacker to cause a Denial of Service (DoS).\n\nWhen certain specific crafted BGP UPDATE messages are received over an established BGP session, one BGP session may be torn down with an UPDATE message error, or the issue may propagate beyond the local system which will remain non-impacted, but may affect one or more remote systems. This issue is exploitable remotely as the crafted UPDATE message can propagate through unaffected systems and intermediate BGP speakers.\nContinuous receipt of the crafted BGP UPDATE messages will create a sustained Denial of Service (DoS) condition for impacted devices.\n\nThis issue affects eBGP and iBGP, in both IPv4 and IPv6 implementations.  This issue requires a remote attacker to have at least one established BGP session.\n',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'sirt@juniper.net',
                type: 'Primary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'NONE',
                  integrityImpact: 'NONE',
                  availabilityImpact: 'HIGH',
                  baseScore: 7.5,
                  baseSeverity: 'HIGH',
                },
                exploitabilityScore: 3.9,
                impactScore: 3.6,
              },
            ],
          },
          weaknesses: [
            {
              source: 'sirt@juniper.net',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-20',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://kb.juniper.net/JSA72510',
              source: 'sirt@juniper.net',
            },
            {
              url: 'https://www.juniper.net/documentation/us/en/software/junos/bgp/topics/topic-map/bgp-error-messages.html',
              source: 'sirt@juniper.net',
            },
            {
              url: 'https://www.rfc-editor.org/rfc/rfc4271',
              source: 'sirt@juniper.net',
            },
            {
              url: 'https://www.rfc-editor.org/rfc/rfc7606',
              source: 'sirt@juniper.net',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-4695',
          sourceIdentifier: 'security@huntr.dev',
          published: '2023-09-01T01:15:07.877',
          lastModified: '2023-09-01T07:32:13.003',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Use of Predictable Algorithm in Random Number Generator in GitHub repository pkp/pkp-lib prior to 3.3.0-16.',
            },
          ],
          metrics: {
            cvssMetricV30: [
              {
                source: 'security@huntr.dev',
                type: 'Secondary',
                cvssData: {
                  version: '3.0',
                  vectorString: 'CVSS:3.0/AV:N/AC:L/PR:L/UI:N/S:C/C:H/I:H/A:N',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'LOW',
                  userInteraction: 'NONE',
                  scope: 'CHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'HIGH',
                  availabilityImpact: 'NONE',
                  baseScore: 9.6,
                  baseSeverity: 'CRITICAL',
                },
                exploitabilityScore: 3.1,
                impactScore: 5.8,
              },
            ],
          },
          weaknesses: [
            {
              source: 'security@huntr.dev',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-1241',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://github.com/pkp/pkp-lib/commit/e5e7e543887fe77708aa31e07b18fe85f9b5a3b5',
              source: 'security@huntr.dev',
            },
            {
              url: 'https://huntr.dev/bounties/887c7fc7-70c8-482d-b570-350533af4702',
              source: 'security@huntr.dev',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-4696',
          sourceIdentifier: 'security@huntr.dev',
          published: '2023-09-01T01:15:08.400',
          lastModified: '2023-09-01T13:06:59.890',
          vulnStatus: 'Analyzed',
          descriptions: [
            {
              lang: 'en',
              value:
                'Improper Access Control in GitHub repository usememos/memos prior to 0.13.2.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'nvd@nist.gov',
                type: 'Primary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'HIGH',
                  availabilityImpact: 'HIGH',
                  baseScore: 9.8,
                  baseSeverity: 'CRITICAL',
                },
                exploitabilityScore: 3.9,
                impactScore: 5.9,
              },
            ],
            cvssMetricV30: [
              {
                source: 'security@huntr.dev',
                type: 'Secondary',
                cvssData: {
                  version: '3.0',
                  vectorString: 'CVSS:3.0/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'HIGH',
                  availabilityImpact: 'HIGH',
                  baseScore: 9.8,
                  baseSeverity: 'CRITICAL',
                },
                exploitabilityScore: 3.9,
                impactScore: 5.9,
              },
            ],
          },
          weaknesses: [
            {
              source: 'security@huntr.dev',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-284',
                },
              ],
            },
          ],
          configurations: [
            {
              nodes: [
                {
                  operator: 'OR',
                  negate: false,
                  cpeMatch: [
                    {
                      vulnerable: true,
                      criteria: 'cpe:2.3:a:usememos:memos:*:*:*:*:*:*:*:*',
                      versionEndExcluding: '0.13.2',
                      matchCriteriaId: 'F64C568E-3AC2-440A-894D-5946C0AD9C3D',
                    },
                  ],
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://github.com/usememos/memos/commit/c9aa2eeb9852047e4f41915eb30726bd25f07ecd',
              source: 'security@huntr.dev',
              tags: ['Patch'],
            },
            {
              url: 'https://huntr.dev/bounties/4747a485-77c3-4bb5-aab0-21253ef303ca',
              source: 'security@huntr.dev',
              tags: ['Permissions Required'],
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-4697',
          sourceIdentifier: 'security@huntr.dev',
          published: '2023-09-01T01:15:09.320',
          lastModified: '2023-09-01T13:07:07.767',
          vulnStatus: 'Analyzed',
          descriptions: [
            {
              lang: 'en',
              value:
                'Improper Privilege Management in GitHub repository usememos/memos prior to 0.13.2.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'nvd@nist.gov',
                type: 'Primary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:H',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'LOW',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'HIGH',
                  availabilityImpact: 'HIGH',
                  baseScore: 8.8,
                  baseSeverity: 'HIGH',
                },
                exploitabilityScore: 2.8,
                impactScore: 5.9,
              },
            ],
            cvssMetricV30: [
              {
                source: 'security@huntr.dev',
                type: 'Secondary',
                cvssData: {
                  version: '3.0',
                  vectorString: 'CVSS:3.0/AV:N/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:H',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'LOW',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'HIGH',
                  availabilityImpact: 'HIGH',
                  baseScore: 8.8,
                  baseSeverity: 'HIGH',
                },
                exploitabilityScore: 2.8,
                impactScore: 5.9,
              },
            ],
          },
          weaknesses: [
            {
              source: 'nvd@nist.gov',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-269',
                },
              ],
            },
            {
              source: 'security@huntr.dev',
              type: 'Secondary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-269',
                },
              ],
            },
          ],
          configurations: [
            {
              nodes: [
                {
                  operator: 'OR',
                  negate: false,
                  cpeMatch: [
                    {
                      vulnerable: true,
                      criteria: 'cpe:2.3:a:usememos:memos:*:*:*:*:*:*:*:*',
                      versionEndExcluding: '0.13.2',
                      matchCriteriaId: 'F64C568E-3AC2-440A-894D-5946C0AD9C3D',
                    },
                  ],
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://github.com/usememos/memos/commit/c9aa2eeb9852047e4f41915eb30726bd25f07ecd',
              source: 'security@huntr.dev',
              tags: ['Patch'],
            },
            {
              url: 'https://huntr.dev/bounties/3ff3325a-1dcb-4da7-894d-81a9cf726d81',
              source: 'security@huntr.dev',
              tags: ['Exploit', 'Patch', 'Third Party Advisory'],
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-4698',
          sourceIdentifier: 'security@huntr.dev',
          published: '2023-09-01T01:15:09.437',
          lastModified: '2023-09-01T13:07:30.360',
          vulnStatus: 'Analyzed',
          descriptions: [
            {
              lang: 'en',
              value:
                'Improper Input Validation in GitHub repository usememos/memos prior to 0.13.2.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'nvd@nist.gov',
                type: 'Primary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:N/A:N',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'NONE',
                  availabilityImpact: 'NONE',
                  baseScore: 7.5,
                  baseSeverity: 'HIGH',
                },
                exploitabilityScore: 3.9,
                impactScore: 3.6,
              },
            ],
            cvssMetricV30: [
              {
                source: 'security@huntr.dev',
                type: 'Secondary',
                cvssData: {
                  version: '3.0',
                  vectorString: 'CVSS:3.0/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:N/A:N',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'NONE',
                  availabilityImpact: 'NONE',
                  baseScore: 7.5,
                  baseSeverity: 'HIGH',
                },
                exploitabilityScore: 3.9,
                impactScore: 3.6,
              },
            ],
          },
          weaknesses: [
            {
              source: 'security@huntr.dev',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-20',
                },
              ],
            },
          ],
          configurations: [
            {
              nodes: [
                {
                  operator: 'OR',
                  negate: false,
                  cpeMatch: [
                    {
                      vulnerable: true,
                      criteria: 'cpe:2.3:a:usememos:memos:*:*:*:*:*:*:*:*',
                      versionEndExcluding: '0.13.2',
                      matchCriteriaId: 'F64C568E-3AC2-440A-894D-5946C0AD9C3D',
                    },
                  ],
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://github.com/usememos/memos/commit/c9aa2eeb9852047e4f41915eb30726bd25f07ecd',
              source: 'security@huntr.dev',
              tags: ['Patch'],
            },
            {
              url: 'https://huntr.dev/bounties/e1107d79-1d63-4238-90b7-5cc150512654',
              source: 'security@huntr.dev',
              tags: ['Exploit', 'Patch', 'Third Party Advisory'],
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2022-44349',
          sourceIdentifier: 'cve@mitre.org',
          published: '2023-09-01T10:15:07.677',
          lastModified: '2023-09-01T11:47:50.290',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'NAVBLUE S.A.S N-Ops & Crew 22.5-rc.50 is vulnerable to Cross Site Scripting (XSS).',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://github.com/MVRC-ITSEC/CVEs/blob/main/CVE-2022-44349',
              source: 'cve@mitre.org',
            },
            {
              url: 'https://www.navblue.aero/product/n-crew-planning/',
              source: 'cve@mitre.org',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-24674',
          sourceIdentifier: 'cve@mitre.org',
          published: '2023-09-01T10:15:07.950',
          lastModified: '2023-09-01T11:47:50.290',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Permissions vulnerability found in Bludit CMS v.4.0.0 allows local attackers to escalate privileges via the role:admin parameter.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://cupc4k3.medium.com/cve-2023-24674-uncovering-a-privilege-escalation-vulnerability-in-bludit-cms-dcf86c41107',
              source: 'cve@mitre.org',
            },
            {
              url: 'https://medium.com/@cupc4k3/privilege-scalation-in-bludit-cms-dcf86c41107',
              source: 'cve@mitre.org',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-24675',
          sourceIdentifier: 'cve@mitre.org',
          published: '2023-09-01T10:15:08.080',
          lastModified: '2023-09-01T20:28:00.447',
          vulnStatus: 'Analyzed',
          descriptions: [
            {
              lang: 'en',
              value:
                'Cross Site Scripting Vulnerability in BluditCMS v.3.14.1 allows attackers to execute arbitrary code via the Categories Friendly URL.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'nvd@nist.gov',
                type: 'Primary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:H/UI:R/S:C/C:L/I:L/A:N',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'HIGH',
                  userInteraction: 'REQUIRED',
                  scope: 'CHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'NONE',
                  baseScore: 4.8,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 1.7,
                impactScore: 2.7,
              },
            ],
          },
          weaknesses: [
            {
              source: 'nvd@nist.gov',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-79',
                },
              ],
            },
          ],
          configurations: [
            {
              nodes: [
                {
                  operator: 'OR',
                  negate: false,
                  cpeMatch: [
                    {
                      vulnerable: true,
                      criteria: 'cpe:2.3:a:bludit:bludit:3.14.1:*:*:*:*:*:*:*',
                      matchCriteriaId: 'E1884F54-CD39-43CC-B52B-8B2335A09CDB',
                    },
                  ],
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://cupc4k3.medium.com/cve-2023-24674-uncovering-a-privilege-escalation-vulnerability-in-bludit-cms-dcf86c41107',
              source: 'cve@mitre.org',
              tags: ['Exploit', 'Third Party Advisory'],
            },
            {
              url: 'https://medium.com/@cupc4k3/xss-stored-in-friendly-url-field-on-bludit-cms-641a9dd653f',
              source: 'cve@mitre.org',
              tags: ['Permissions Required', 'Third Party Advisory'],
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-39685',
          sourceIdentifier: 'cve@mitre.org',
          published: '2023-09-01T10:15:08.217',
          lastModified: '2023-09-01T11:47:50.290',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'An issue in hjson-java up to v3.0.0 allows attackers to cause a Denial of Service (DoS) via supplying a crafted JSON string.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://github.com/hjson/hjson-java/issues/27',
              source: 'cve@mitre.org',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-41364',
          sourceIdentifier: 'cve@mitre.org',
          published: '2023-09-01T10:15:08.343',
          lastModified: '2023-09-01T11:47:50.290',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'In tine through 2023.01.14.325, the sort parameter of the /index.php endpoint allows SQL Injection.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://herolab.usd.de/security-advisories/',
              source: 'cve@mitre.org',
            },
            {
              url: 'https://herolab.usd.de/security-advisories/usd-2023-0002/',
              source: 'cve@mitre.org',
            },
            {
              url: 'https://www.tine-groupware.de/',
              source: 'cve@mitre.org',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-4704',
          sourceIdentifier: 'security@huntr.dev',
          published: '2023-09-01T10:15:08.587',
          lastModified: '2023-09-01T11:47:50.290',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'External Control of System or Configuration Setting in GitHub repository instantsoft/icms2 prior to 2.16.1-git.',
            },
          ],
          metrics: {
            cvssMetricV30: [
              {
                source: 'security@huntr.dev',
                type: 'Secondary',
                cvssData: {
                  version: '3.0',
                  vectorString: 'CVSS:3.0/AV:N/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:H',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'LOW',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'HIGH',
                  availabilityImpact: 'HIGH',
                  baseScore: 8.8,
                  baseSeverity: 'HIGH',
                },
                exploitabilityScore: 2.8,
                impactScore: 5.9,
              },
            ],
          },
          weaknesses: [
            {
              source: 'security@huntr.dev',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-15',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://github.com/instantsoft/icms2/commit/bc22d89691fdaf38055eba13dda8d959b16fa731',
              source: 'security@huntr.dev',
            },
            {
              url: 'https://huntr.dev/bounties/4a54134d-df1f-43d4-9b14-45f023cd654a',
              source: 'security@huntr.dev',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2022-46527',
          sourceIdentifier: 'cve@mitre.org',
          published: '2023-09-01T11:15:39.693',
          lastModified: '2023-09-01T11:47:43.290',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'ELSYS ERS 1.5 Sound v2.3.8 was discovered to contain a buffer overflow via the NFC data parser.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://github.com/post-cyberlabs/CVE-Advisory/blob/main/CVE-2022-46527.pdf',
              source: 'cve@mitre.org',
            },
            {
              url: 'https://www.elsys.se/en/ers-sound/',
              source: 'cve@mitre.org',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2022-4343',
          sourceIdentifier: 'cve@gitlab.com',
          published: '2023-09-01T11:15:40.037',
          lastModified: '2023-09-01T11:47:43.290',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'An issue has been discovered in GitLab EE affecting all versions starting from 13.12 before 16.1.5, all versions starting from 16.2 before 16.2.5, all versions starting from 16.3 before 16.3.1 in which a project member can leak credentials stored in site profile.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'cve@gitlab.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:C/C:L/I:N/A:N',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'LOW',
                  userInteraction: 'NONE',
                  scope: 'CHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'NONE',
                  availabilityImpact: 'NONE',
                  baseScore: 5.0,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 3.1,
                impactScore: 1.4,
              },
            ],
          },
          weaknesses: [
            {
              source: 'cve@gitlab.com',
              type: 'Secondary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-200',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://gitlab.com/gitlab-org/gitlab/-/issues/385124',
              source: 'cve@gitlab.com',
            },
            {
              url: 'https://hackerone.com/reports/1767797',
              source: 'cve@gitlab.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-0120',
          sourceIdentifier: 'cve@gitlab.com',
          published: '2023-09-01T11:15:40.287',
          lastModified: '2023-09-01T11:47:43.290',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'An issue has been discovered in GitLab affecting all versions starting from 10.0 before 16.1.5, all versions starting from 16.2 before 16.2.5, all versions starting from 16.3 before 16.3.1. Due to improper permission validation it was possible to edit labels description by an unauthorised user.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'cve@gitlab.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:L/UI:R/S:U/C:N/I:L/A:N',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'LOW',
                  userInteraction: 'REQUIRED',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'NONE',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'NONE',
                  baseScore: 3.5,
                  baseSeverity: 'LOW',
                },
                exploitabilityScore: 2.1,
                impactScore: 1.4,
              },
            ],
          },
          weaknesses: [
            {
              source: 'cve@gitlab.com',
              type: 'Secondary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-284',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://gitlab.com/gitlab-org/gitlab/-/issues/387531',
              source: 'cve@gitlab.com',
            },
            {
              url: 'https://hackerone.com/reports/1818425',
              source: 'cve@gitlab.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-1279',
          sourceIdentifier: 'cve@gitlab.com',
          published: '2023-09-01T11:15:40.473',
          lastModified: '2023-09-01T11:47:43.290',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'An issue has been discovered in GitLab affecting all versions starting from 4.1 before 16.1.5, all versions starting from 16.2 before 16.2.5, all versions starting from 16.3 before 16.3.1 where it was possible to create a URL that would redirect to a different project.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'cve@gitlab.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:H/PR:L/UI:R/S:U/C:L/I:N/A:N',
                  attackVector: 'NETWORK',
                  attackComplexity: 'HIGH',
                  privilegesRequired: 'LOW',
                  userInteraction: 'REQUIRED',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'NONE',
                  availabilityImpact: 'NONE',
                  baseScore: 2.6,
                  baseSeverity: 'LOW',
                },
                exploitabilityScore: 1.2,
                impactScore: 1.4,
              },
            ],
          },
          weaknesses: [
            {
              source: 'cve@gitlab.com',
              type: 'Secondary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-138',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://gitlab.com/gitlab-org/gitlab/-/issues/395437',
              source: 'cve@gitlab.com',
            },
            {
              url: 'https://hackerone.com/reports/1889230',
              source: 'cve@gitlab.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-1555',
          sourceIdentifier: 'cve@gitlab.com',
          published: '2023-09-01T11:15:40.663',
          lastModified: '2023-09-01T11:47:43.290',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'An issue has been discovered in GitLab affecting all versions starting from 15.2 before 16.1.5, all versions starting from 16.2 before 16.2.5, all versions starting from 16.3 before 16.3.1. A namespace-level banned user can access the API.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'cve@gitlab.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:H/UI:N/S:U/C:N/I:L/A:N',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'HIGH',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'NONE',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'NONE',
                  baseScore: 2.7,
                  baseSeverity: 'LOW',
                },
                exploitabilityScore: 1.2,
                impactScore: 1.4,
              },
            ],
          },
          weaknesses: [
            {
              source: 'cve@gitlab.com',
              type: 'Secondary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-284',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://gitlab.com/gitlab-org/gitlab/-/issues/398587',
              source: 'cve@gitlab.com',
            },
            {
              url: 'https://hackerone.com/reports/1911908',
              source: 'cve@gitlab.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-24412',
          sourceIdentifier: 'audit@patchstack.com',
          published: '2023-09-01T11:15:40.863',
          lastModified: '2023-09-01T20:28:44.333',
          vulnStatus: 'Analyzed',
          descriptions: [
            {
              lang: 'en',
              value:
                'Auth. (admin+) Stored Cross-Site Scripting (XSS) vulnerability in Web-Settler Image Social Feed plugin <= 1.7.6 versions.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'nvd@nist.gov',
                type: 'Primary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:H/UI:R/S:C/C:L/I:L/A:N',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'HIGH',
                  userInteraction: 'REQUIRED',
                  scope: 'CHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'NONE',
                  baseScore: 4.8,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 1.7,
                impactScore: 2.7,
              },
              {
                source: 'audit@patchstack.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:H/UI:R/S:C/C:L/I:L/A:L',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'HIGH',
                  userInteraction: 'REQUIRED',
                  scope: 'CHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'LOW',
                  baseScore: 5.9,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 1.7,
                impactScore: 3.7,
              },
            ],
          },
          weaknesses: [
            {
              source: 'audit@patchstack.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-79',
                },
              ],
            },
          ],
          configurations: [
            {
              nodes: [
                {
                  operator: 'OR',
                  negate: false,
                  cpeMatch: [
                    {
                      vulnerable: true,
                      criteria:
                        'cpe:2.3:a:web-settler:image_social_feed:*:*:*:*:*:wordpress:*:*',
                      versionEndIncluding: '1.7.6',
                      matchCriteriaId: 'ED583508-9A16-4BAF-A846-BE5E07A9194F',
                    },
                  ],
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://patchstack.com/database/vulnerability/add-instagram/wordpress-image-social-feed-plugin-plugin-1-7-6-cross-site-scripting-xss-vulnerability?_s_id=cve',
              source: 'audit@patchstack.com',
              tags: ['Third Party Advisory'],
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-25042',
          sourceIdentifier: 'audit@patchstack.com',
          published: '2023-09-01T11:15:41.097',
          lastModified: '2023-09-01T20:47:28.010',
          vulnStatus: 'Analyzed',
          descriptions: [
            {
              lang: 'en',
              value:
                'Auth. (admin+) Stored Cross-Site Scripting (XSS) vulnerability in Liam Gladdy (Storm Consultancy) oAuth Twitter Feed for Developers plugin <= 2.3.0 versions.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'nvd@nist.gov',
                type: 'Primary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:H/UI:R/S:C/C:L/I:L/A:N',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'HIGH',
                  userInteraction: 'REQUIRED',
                  scope: 'CHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'NONE',
                  baseScore: 4.8,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 1.7,
                impactScore: 2.7,
              },
              {
                source: 'audit@patchstack.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:H/UI:R/S:C/C:L/I:L/A:L',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'HIGH',
                  userInteraction: 'REQUIRED',
                  scope: 'CHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'LOW',
                  baseScore: 5.9,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 1.7,
                impactScore: 3.7,
              },
            ],
          },
          weaknesses: [
            {
              source: 'audit@patchstack.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-79',
                },
              ],
            },
          ],
          configurations: [
            {
              nodes: [
                {
                  operator: 'OR',
                  negate: false,
                  cpeMatch: [
                    {
                      vulnerable: true,
                      criteria:
                        'cpe:2.3:a:stormconsultancy:oauth_twitter_feed_for_developers:*:*:*:*:*:wordpress:*:*',
                      versionEndIncluding: '2.3.0',
                      matchCriteriaId: '7D58AA74-1308-4C21-8673-74981AB141AE',
                    },
                  ],
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://patchstack.com/database/vulnerability/oauth-twitter-feed-for-developers/wordpress-oauth-twitter-feed-for-developers-plugin-2-3-0-cross-site-scripting-xss-vulnerability?_s_id=cve',
              source: 'audit@patchstack.com',
              tags: ['Third Party Advisory'],
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-25044',
          sourceIdentifier: 'audit@patchstack.com',
          published: '2023-09-01T11:15:41.313',
          lastModified: '2023-09-01T20:47:45.390',
          vulnStatus: 'Analyzed',
          descriptions: [
            {
              lang: 'en',
              value:
                'Auth. (admin+) Stored Cross-Site Scripting (XSS) vulnerability in Sumo Social Share Boost plugin <= 4.4 versions.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'nvd@nist.gov',
                type: 'Primary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:H/UI:R/S:C/C:L/I:L/A:N',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'HIGH',
                  userInteraction: 'REQUIRED',
                  scope: 'CHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'NONE',
                  baseScore: 4.8,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 1.7,
                impactScore: 2.7,
              },
              {
                source: 'audit@patchstack.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:H/UI:R/S:C/C:L/I:L/A:L',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'HIGH',
                  userInteraction: 'REQUIRED',
                  scope: 'CHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'LOW',
                  baseScore: 5.9,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 1.7,
                impactScore: 3.7,
              },
            ],
          },
          weaknesses: [
            {
              source: 'nvd@nist.gov',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-79',
                },
              ],
            },
            {
              source: 'audit@patchstack.com',
              type: 'Secondary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-79',
                },
              ],
            },
          ],
          configurations: [
            {
              nodes: [
                {
                  operator: 'OR',
                  negate: false,
                  cpeMatch: [
                    {
                      vulnerable: true,
                      criteria:
                        'cpe:2.3:a:sumo:social_share_boost:*:*:*:*:*:wordpress:*:*',
                      versionEndExcluding: '4.5',
                      matchCriteriaId: 'AB1892B9-68AC-4F6E-91F2-24CEAE155F04',
                    },
                  ],
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://patchstack.com/database/vulnerability/social-share-boost/wordpress-social-share-boost-plugin-4-4-cross-site-scripting-xss-vulnerability-2?_s_id=cve',
              source: 'audit@patchstack.com',
              tags: ['Third Party Advisory'],
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-25477',
          sourceIdentifier: 'audit@patchstack.com',
          published: '2023-09-01T11:15:41.503',
          lastModified: '2023-09-01T11:47:43.290',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Auth. (admin+) Stored Cross-Site Scripting (XSS) vulnerability in Yotuwp Video Gallery plugin <= 1.3.12 versions.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'audit@patchstack.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:H/UI:R/S:C/C:L/I:L/A:L',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'HIGH',
                  userInteraction: 'REQUIRED',
                  scope: 'CHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'LOW',
                  baseScore: 5.9,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 1.7,
                impactScore: 3.7,
              },
            ],
          },
          weaknesses: [
            {
              source: 'audit@patchstack.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-79',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://patchstack.com/database/vulnerability/yotuwp-easy-youtube-embed/wordpress-video-gallery-youtube-playlist-channel-gallery-by-yotuwp-plugin-1-3-12-cross-site-scripting-xss-vulnerability?_s_id=cve',
              source: 'audit@patchstack.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-25488',
          sourceIdentifier: 'audit@patchstack.com',
          published: '2023-09-01T11:15:41.677',
          lastModified: '2023-09-01T11:47:43.290',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Auth. (admin+) Stored Cross-Site Scripting (XSS) vulnerability in Duc Bui Quang WP Default Feature Image plugin <= 1.0.1.1 versions.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'audit@patchstack.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:H/UI:R/S:C/C:L/I:L/A:L',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'HIGH',
                  userInteraction: 'REQUIRED',
                  scope: 'CHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'LOW',
                  baseScore: 5.9,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 1.7,
                impactScore: 3.7,
              },
            ],
          },
          weaknesses: [
            {
              source: 'audit@patchstack.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-79',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://patchstack.com/database/vulnerability/wp-default-feature-image/wordpress-wp-default-feature-image-plugin-1-0-1-1-cross-site-scripting-xss-vulnerability?_s_id=cve',
              source: 'audit@patchstack.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-3205',
          sourceIdentifier: 'cve@gitlab.com',
          published: '2023-09-01T11:15:41.850',
          lastModified: '2023-09-01T21:13:41.500',
          vulnStatus: 'Analyzed',
          descriptions: [
            {
              lang: 'en',
              value:
                'An issue has been discovered in GitLab affecting all versions starting from 15.11 before 16.1.5, all versions starting from 16.2 before 16.2.5, all versions starting from 16.3 before 16.3.1. An authenticated user could trigger a denial of service when importing or cloning malicious content.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'nvd@nist.gov',
                type: 'Primary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:N/A:H',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'LOW',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'NONE',
                  integrityImpact: 'NONE',
                  availabilityImpact: 'HIGH',
                  baseScore: 6.5,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 2.8,
                impactScore: 3.6,
              },
              {
                source: 'cve@gitlab.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:N/A:H',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'LOW',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'NONE',
                  integrityImpact: 'NONE',
                  availabilityImpact: 'HIGH',
                  baseScore: 6.5,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 2.8,
                impactScore: 3.6,
              },
            ],
          },
          weaknesses: [
            {
              source: 'nvd@nist.gov',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-400',
                },
              ],
            },
            {
              source: 'cve@gitlab.com',
              type: 'Secondary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-400',
                },
              ],
            },
          ],
          configurations: [
            {
              nodes: [
                {
                  operator: 'OR',
                  negate: false,
                  cpeMatch: [
                    {
                      vulnerable: true,
                      criteria:
                        'cpe:2.3:a:gitlab:gitlab:*:*:*:*:community:*:*:*',
                      versionStartIncluding: '15.11',
                      versionEndExcluding: '16.1.5',
                      matchCriteriaId: '190E843E-6F15-4DD2-A5C4-C797BE750DA0',
                    },
                    {
                      vulnerable: true,
                      criteria:
                        'cpe:2.3:a:gitlab:gitlab:*:*:*:*:enterprise:*:*:*',
                      versionStartIncluding: '15.11',
                      versionEndExcluding: '16.1.5',
                      matchCriteriaId: '1933945E-1CCB-4611-ABA6-9CD834CA6E62',
                    },
                    {
                      vulnerable: true,
                      criteria:
                        'cpe:2.3:a:gitlab:gitlab:*:*:*:*:community:*:*:*',
                      versionStartIncluding: '16.2',
                      versionEndExcluding: '16.2.5',
                      matchCriteriaId: '18116007-7452-495F-80A1-39499882656E',
                    },
                    {
                      vulnerable: true,
                      criteria:
                        'cpe:2.3:a:gitlab:gitlab:*:*:*:*:enterprise:*:*:*',
                      versionStartIncluding: '16.2',
                      versionEndExcluding: '16.2.5',
                      matchCriteriaId: '4E03E8BA-63C8-47D5-B5A1-26DF199E1F65',
                    },
                    {
                      vulnerable: true,
                      criteria:
                        'cpe:2.3:a:gitlab:gitlab:16.3.0:*:*:*:community:*:*:*',
                      matchCriteriaId: 'EE9B8DE8-9990-494B-BDBE-F867DDBB9D57',
                    },
                    {
                      vulnerable: true,
                      criteria:
                        'cpe:2.3:a:gitlab:gitlab:16.3.0:*:*:*:enterprise:*:*:*',
                      matchCriteriaId: '08D6B555-39B6-493D-8460-3DC998BAF651',
                    },
                  ],
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://gitlab.com/gitlab-org/gitlab/-/issues/415067',
              source: 'cve@gitlab.com',
              tags: ['Broken Link'],
            },
            {
              url: 'https://hackerone.com/reports/2011464',
              source: 'cve@gitlab.com',
              tags: ['Permissions Required'],
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-3210',
          sourceIdentifier: 'cve@gitlab.com',
          published: '2023-09-01T11:15:42.053',
          lastModified: '2023-09-01T21:13:51.880',
          vulnStatus: 'Analyzed',
          descriptions: [
            {
              lang: 'en',
              value:
                'An issue has been discovered in GitLab affecting all versions starting from 15.11 before 16.1.5, all versions starting from 16.2 before 16.2.5, all versions starting from 16.3 before 16.3.1. An authenticated user could trigger a denial of service when importing or cloning malicious content.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'nvd@nist.gov',
                type: 'Primary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:N/A:H',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'LOW',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'NONE',
                  integrityImpact: 'NONE',
                  availabilityImpact: 'HIGH',
                  baseScore: 6.5,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 2.8,
                impactScore: 3.6,
              },
              {
                source: 'cve@gitlab.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:N/A:H',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'LOW',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'NONE',
                  integrityImpact: 'NONE',
                  availabilityImpact: 'HIGH',
                  baseScore: 6.5,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 2.8,
                impactScore: 3.6,
              },
            ],
          },
          weaknesses: [
            {
              source: 'nvd@nist.gov',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-400',
                },
              ],
            },
            {
              source: 'cve@gitlab.com',
              type: 'Secondary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-400',
                },
              ],
            },
          ],
          configurations: [
            {
              nodes: [
                {
                  operator: 'OR',
                  negate: false,
                  cpeMatch: [
                    {
                      vulnerable: true,
                      criteria:
                        'cpe:2.3:a:gitlab:gitlab:*:*:*:*:community:*:*:*',
                      versionStartIncluding: '15.11',
                      versionEndExcluding: '16.1.5',
                      matchCriteriaId: '190E843E-6F15-4DD2-A5C4-C797BE750DA0',
                    },
                    {
                      vulnerable: true,
                      criteria:
                        'cpe:2.3:a:gitlab:gitlab:*:*:*:*:enterprise:*:*:*',
                      versionStartIncluding: '15.11',
                      versionEndExcluding: '16.1.5',
                      matchCriteriaId: '1933945E-1CCB-4611-ABA6-9CD834CA6E62',
                    },
                    {
                      vulnerable: true,
                      criteria:
                        'cpe:2.3:a:gitlab:gitlab:*:*:*:*:community:*:*:*',
                      versionStartIncluding: '16.2',
                      versionEndExcluding: '16.2.5',
                      matchCriteriaId: '18116007-7452-495F-80A1-39499882656E',
                    },
                    {
                      vulnerable: true,
                      criteria:
                        'cpe:2.3:a:gitlab:gitlab:*:*:*:*:enterprise:*:*:*',
                      versionStartIncluding: '16.2',
                      versionEndExcluding: '16.2.5',
                      matchCriteriaId: '4E03E8BA-63C8-47D5-B5A1-26DF199E1F65',
                    },
                    {
                      vulnerable: true,
                      criteria:
                        'cpe:2.3:a:gitlab:gitlab:16.3.0:*:*:*:community:*:*:*',
                      matchCriteriaId: 'EE9B8DE8-9990-494B-BDBE-F867DDBB9D57',
                    },
                    {
                      vulnerable: true,
                      criteria:
                        'cpe:2.3:a:gitlab:gitlab:16.3.0:*:*:*:enterprise:*:*:*',
                      matchCriteriaId: '08D6B555-39B6-493D-8460-3DC998BAF651',
                    },
                  ],
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://gitlab.com/gitlab-org/gitlab/-/issues/415074',
              source: 'cve@gitlab.com',
              tags: ['Broken Link'],
            },
            {
              url: 'https://hackerone.com/reports/2011474',
              source: 'cve@gitlab.com',
              tags: ['Permissions Required'],
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-3915',
          sourceIdentifier: 'cve@gitlab.com',
          published: '2023-09-01T11:15:42.267',
          lastModified: '2023-09-01T21:14:01.513',
          vulnStatus: 'Analyzed',
          descriptions: [
            {
              lang: 'en',
              value:
                'An issue has been discovered in GitLab EE affecting all versions starting from 16.1 before 16.1.5, all versions starting from 16.2 before 16.2.5, all versions starting from 16.3 before 16.3.1. If an external user is given an owner role on any group, that external user may escalate their privileges on the instance by creating a service account in that group. This service account is not classified as external and may be used to access internal projects.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'nvd@nist.gov',
                type: 'Primary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:H/UI:N/S:U/C:H/I:H/A:H',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'HIGH',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'HIGH',
                  availabilityImpact: 'HIGH',
                  baseScore: 7.2,
                  baseSeverity: 'HIGH',
                },
                exploitabilityScore: 1.2,
                impactScore: 5.9,
              },
              {
                source: 'cve@gitlab.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:H/UI:N/S:U/C:H/I:H/A:N',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'HIGH',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'HIGH',
                  availabilityImpact: 'NONE',
                  baseScore: 6.5,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 1.2,
                impactScore: 5.2,
              },
            ],
          },
          weaknesses: [
            {
              source: 'nvd@nist.gov',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-732',
                },
              ],
            },
            {
              source: 'cve@gitlab.com',
              type: 'Secondary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-279',
                },
              ],
            },
          ],
          configurations: [
            {
              nodes: [
                {
                  operator: 'OR',
                  negate: false,
                  cpeMatch: [
                    {
                      vulnerable: true,
                      criteria:
                        'cpe:2.3:a:gitlab:gitlab:*:*:*:*:community:*:*:*',
                      versionStartIncluding: '16.1.0',
                      versionEndExcluding: '16.1.5',
                      matchCriteriaId: '9CE5E96F-15A1-43AB-ABF6-3B1490B5D12C',
                    },
                    {
                      vulnerable: true,
                      criteria:
                        'cpe:2.3:a:gitlab:gitlab:*:*:*:*:enterprise:*:*:*',
                      versionStartIncluding: '16.1.0',
                      versionEndExcluding: '16.1.5',
                      matchCriteriaId: 'D8DD59A9-B682-4B74-8E18-29210812CAFD',
                    },
                    {
                      vulnerable: true,
                      criteria:
                        'cpe:2.3:a:gitlab:gitlab:*:*:*:*:community:*:*:*',
                      versionStartIncluding: '16.2',
                      versionEndExcluding: '16.2.5',
                      matchCriteriaId: '18116007-7452-495F-80A1-39499882656E',
                    },
                    {
                      vulnerable: true,
                      criteria:
                        'cpe:2.3:a:gitlab:gitlab:*:*:*:*:enterprise:*:*:*',
                      versionStartIncluding: '16.2',
                      versionEndExcluding: '16.2.5',
                      matchCriteriaId: '4E03E8BA-63C8-47D5-B5A1-26DF199E1F65',
                    },
                    {
                      vulnerable: true,
                      criteria:
                        'cpe:2.3:a:gitlab:gitlab:16.3.0:*:*:*:community:*:*:*',
                      matchCriteriaId: 'EE9B8DE8-9990-494B-BDBE-F867DDBB9D57',
                    },
                    {
                      vulnerable: true,
                      criteria:
                        'cpe:2.3:a:gitlab:gitlab:16.3.0:*:*:*:enterprise:*:*:*',
                      matchCriteriaId: '08D6B555-39B6-493D-8460-3DC998BAF651',
                    },
                  ],
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://gitlab.com/gitlab-org/gitlab/-/issues/417664',
              source: 'cve@gitlab.com',
              tags: ['Broken Link'],
            },
            {
              url: 'https://hackerone.com/reports/2040834',
              source: 'cve@gitlab.com',
              tags: ['Permissions Required'],
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-3950',
          sourceIdentifier: 'cve@gitlab.com',
          published: '2023-09-01T11:15:42.457',
          lastModified: '2023-09-01T21:14:48.253',
          vulnStatus: 'Analyzed',
          descriptions: [
            {
              lang: 'en',
              value:
                'An information disclosure issue in GitLab EE affecting all versions from 16.2 prior to 16.2.5, and 16.3 prior to 16.3.1 allowed other Group Owners to see the Public Key for a Google Cloud Logging audit event streaming destination, if configured. Owners can now only write the key, not read it.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'nvd@nist.gov',
                type: 'Primary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:H/UI:N/S:U/C:L/I:L/A:N',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'HIGH',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'NONE',
                  baseScore: 3.8,
                  baseSeverity: 'LOW',
                },
                exploitabilityScore: 1.2,
                impactScore: 2.5,
              },
              {
                source: 'cve@gitlab.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:H/UI:N/S:C/C:L/I:L/A:N',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'HIGH',
                  userInteraction: 'NONE',
                  scope: 'CHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'NONE',
                  baseScore: 5.5,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 2.3,
                impactScore: 2.7,
              },
            ],
          },
          weaknesses: [
            {
              source: 'nvd@nist.gov',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-312',
                },
              ],
            },
            {
              source: 'cve@gitlab.com',
              type: 'Secondary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-312',
                },
              ],
            },
          ],
          configurations: [
            {
              nodes: [
                {
                  operator: 'OR',
                  negate: false,
                  cpeMatch: [
                    {
                      vulnerable: true,
                      criteria:
                        'cpe:2.3:a:gitlab:gitlab:*:*:*:*:community:*:*:*',
                      versionStartIncluding: '16.2',
                      versionEndExcluding: '16.2.5',
                      matchCriteriaId: '18116007-7452-495F-80A1-39499882656E',
                    },
                    {
                      vulnerable: true,
                      criteria:
                        'cpe:2.3:a:gitlab:gitlab:*:*:*:*:enterprise:*:*:*',
                      versionStartIncluding: '16.2',
                      versionEndExcluding: '16.2.5',
                      matchCriteriaId: '4E03E8BA-63C8-47D5-B5A1-26DF199E1F65',
                    },
                    {
                      vulnerable: true,
                      criteria:
                        'cpe:2.3:a:gitlab:gitlab:16.3.0:*:*:*:community:*:*:*',
                      matchCriteriaId: 'EE9B8DE8-9990-494B-BDBE-F867DDBB9D57',
                    },
                    {
                      vulnerable: true,
                      criteria:
                        'cpe:2.3:a:gitlab:gitlab:16.3.0:*:*:*:enterprise:*:*:*',
                      matchCriteriaId: '08D6B555-39B6-493D-8460-3DC998BAF651',
                    },
                  ],
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://gitlab.com/gitlab-org/gitlab/-/issues/419675',
              source: 'cve@gitlab.com',
              tags: ['Broken Link'],
            },
            {
              url: 'https://hackerone.com/reports/2079154',
              source: 'cve@gitlab.com',
              tags: ['Permissions Required'],
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-40239',
          sourceIdentifier: 'cve@mitre.org',
          published: '2023-09-01T11:15:42.657',
          lastModified: '2023-09-01T11:47:43.290',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                "Certain Lexmark devices (such as CS310) before 2023-08-25 allow XXE attacks, leading to information disclosure. The fixed firmware version is LW80.*.P246, i.e., '*' indicates that the full version specification varies across product model family, but firmware level P246 (or higher) is required to remediate the vulnerability.",
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://publications.lexmark.com/publications/security-alerts/CVE-2023-40239.pdf',
              source: 'cve@mitre.org',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-40969',
          sourceIdentifier: 'cve@mitre.org',
          published: '2023-09-01T11:15:42.800',
          lastModified: '2023-09-01T11:47:43.290',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Senayan Library Management Systems SLIMS 9 Bulian v9.6.1 is vulnerable to Server Side Request Forgery (SSRF) via admin/modules/bibliography/pop_p2p.php.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://github.com/komangsughosa/CVE-ID-not-yet/blob/main/slims/slims9_bulian-9.6.1-SSRF-pop_p2p.md',
              source: 'cve@mitre.org',
            },
            {
              url: 'https://github.com/slims/slims9_bulian/issues/204',
              source: 'cve@mitre.org',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-40970',
          sourceIdentifier: 'cve@mitre.org',
          published: '2023-09-01T11:15:42.923',
          lastModified: '2023-09-01T11:47:43.290',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Senayan Library Management Systems SLIMS 9 Bulian v 9.6.1 is vulnerable to SQL Injection via admin/modules/circulation/loan_rules.php.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://github.com/komangsughosa/CVE-ID-not-yet/blob/main/slims/slims9_bulian-9.6.1-SQLI-loan_rules.md',
              source: 'cve@mitre.org',
            },
            {
              url: 'https://github.com/slims/slims9_bulian/issues/205',
              source: 'cve@mitre.org',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-4018',
          sourceIdentifier: 'cve@gitlab.com',
          published: '2023-09-01T11:15:43.037',
          lastModified: '2023-09-01T11:47:43.290',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'An issue has been discovered in GitLab affecting all versions starting from 16.2 before 16.2.5, all versions starting from 16.3 before 16.3.1. Due to improper permission validation it was possible to create model experiments in public projects.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'cve@gitlab.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:L/A:N',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'LOW',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'NONE',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'NONE',
                  baseScore: 4.3,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 2.8,
                impactScore: 1.4,
              },
            ],
          },
          weaknesses: [
            {
              source: 'cve@gitlab.com',
              type: 'Secondary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-284',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://gitlab.com/gitlab-org/gitlab/-/issues/420301',
              source: 'cve@gitlab.com',
            },
            {
              url: 'https://hackerone.com/reports/2083440',
              source: 'cve@gitlab.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-4378',
          sourceIdentifier: 'cve@gitlab.com',
          published: '2023-09-01T11:15:43.113',
          lastModified: '2023-09-01T11:47:43.290',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'An issue has been discovered in GitLab CE/EE affecting all versions starting from 11.8 before 16.1.5, all versions starting from 16.2 before 16.2.5, all versions starting from 16.3 before 16.3.1. A malicious Maintainer can, under specific circumstances, leak the sentry token by changing the configured URL in the Sentry error tracking settings page. This was as a result of an incomplete fix for CVE-2022-4365.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'cve@gitlab.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:H/UI:N/S:C/C:L/I:L/A:N',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'HIGH',
                  userInteraction: 'NONE',
                  scope: 'CHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'NONE',
                  baseScore: 5.5,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 2.3,
                impactScore: 2.7,
              },
            ],
          },
          weaknesses: [
            {
              source: 'cve@gitlab.com',
              type: 'Secondary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-200',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://gitlab.com/gitlab-org/gitlab/-/issues/422134',
              source: 'cve@gitlab.com',
            },
            {
              url: 'https://hackerone.com/reports/2104591',
              source: 'cve@gitlab.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-4647',
          sourceIdentifier: 'cve@gitlab.com',
          published: '2023-09-01T11:15:43.363',
          lastModified: '2023-09-01T11:47:43.290',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'An issue has been discovered in GitLab affecting all versions starting from 15.2 before 16.1.5, all versions starting from 16.2 before 16.2.5, all versions starting from 16.3 before 16.3.1 in which the projects API pagination can be skipped, potentially leading to DoS on certain instances.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'cve@gitlab.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:H/PR:L/UI:N/S:U/C:N/I:N/A:H',
                  attackVector: 'NETWORK',
                  attackComplexity: 'HIGH',
                  privilegesRequired: 'LOW',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'NONE',
                  integrityImpact: 'NONE',
                  availabilityImpact: 'HIGH',
                  baseScore: 5.3,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 1.6,
                impactScore: 3.6,
              },
            ],
          },
          weaknesses: [
            {
              source: 'cve@gitlab.com',
              type: 'Secondary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-400',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://gitlab.com/gitlab-org/gitlab/-/issues/414502',
              source: 'cve@gitlab.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2022-22305',
          sourceIdentifier: 'psirt@fortinet.com',
          published: '2023-09-01T12:15:08.363',
          lastModified: '2023-09-01T13:39:55.533',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'An improper certificate validation vulnerability [CWE-295] in FortiManager 7.0.1 and below, 6.4.6 and below; FortiAnalyzer 7.0.2 and below, 6.4.7 and below; FortiOS 6.2.x and 6.0.x; FortiSandbox 4.0.x, 3.2.x and 3.1.x may allow a network adjacent and unauthenticated attacker to man-in-the-middle the communication between the listed products and some external peers.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'psirt@fortinet.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:A/AC:L/PR:N/UI:N/S:U/C:L/I:L/A:N',
                  attackVector: 'ADJACENT_NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'NONE',
                  baseScore: 5.4,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 2.8,
                impactScore: 2.5,
              },
            ],
          },
          references: [
            {
              url: 'https://fortiguard.com/psirt/FG-IR-18-292',
              source: 'psirt@fortinet.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-34011',
          sourceIdentifier: 'audit@patchstack.com',
          published: '2023-09-01T12:15:08.703',
          lastModified: '2023-09-01T13:39:55.533',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Auth. (admin+) Stored Cross-Site Scripting (XSS) vulnerability in ShopConstruct plugin <= 1.1.2 versions.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'audit@patchstack.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:C/C:L/I:L/A:L',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'REQUIRED',
                  scope: 'CHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'LOW',
                  baseScore: 7.1,
                  baseSeverity: 'HIGH',
                },
                exploitabilityScore: 2.8,
                impactScore: 3.7,
              },
            ],
          },
          weaknesses: [
            {
              source: 'audit@patchstack.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-79',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://patchstack.com/database/vulnerability/shopconstruct/wordpress-shopconstruct-plugin-1-1-2-reflected-cross-site-scripting-xss-vulnerability?_s_id=cve',
              source: 'audit@patchstack.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-37893',
          sourceIdentifier: 'audit@patchstack.com',
          published: '2023-09-01T12:15:08.943',
          lastModified: '2023-09-01T13:39:55.533',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Unauth. Reflected Cross-Site Scripting (XSS) vulnerability in Chop-Chop Coming Soon Chop Chop plugin <= 2.2.4 versions.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'audit@patchstack.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:C/C:L/I:L/A:L',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'REQUIRED',
                  scope: 'CHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'LOW',
                  baseScore: 7.1,
                  baseSeverity: 'HIGH',
                },
                exploitabilityScore: 2.8,
                impactScore: 3.7,
              },
            ],
          },
          weaknesses: [
            {
              source: 'audit@patchstack.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-79',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://patchstack.com/database/vulnerability/cc-coming-soon/wordpress-coming-soon-chop-chop-plugin-2-2-4-reflected-cross-site-scripting-xss-vulnerability?_s_id=cve',
              source: 'audit@patchstack.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-37986',
          sourceIdentifier: 'audit@patchstack.com',
          published: '2023-09-01T12:15:09.127',
          lastModified: '2023-09-01T13:39:55.533',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Auth. (admin+) Stored Cross-Site Scripting (XSS) vulnerability in miniOrange YourMembership Single Sign On – YM SSO Login plugin <= 1.1.3 versions.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'audit@patchstack.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:H/UI:R/S:C/C:L/I:L/A:L',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'HIGH',
                  userInteraction: 'REQUIRED',
                  scope: 'CHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'LOW',
                  baseScore: 5.9,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 1.7,
                impactScore: 3.7,
              },
            ],
          },
          weaknesses: [
            {
              source: 'audit@patchstack.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-79',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://patchstack.com/database/vulnerability/login-with-yourmembership/wordpress-yourmembership-single-sign-on-plugin-1-1-3-cross-site-scripting-xss-vulnerability?_s_id=cve',
              source: 'audit@patchstack.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-37994',
          sourceIdentifier: 'audit@patchstack.com',
          published: '2023-09-01T12:15:09.323',
          lastModified: '2023-09-01T13:39:55.533',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Auth. (contributor+) Stored Cross-Site Scripting (XSS) vulnerability in Artem Abramovich Art Decoration Shortcode plugin <= 1.5.6 versions.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'audit@patchstack.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:L/UI:R/S:C/C:L/I:L/A:L',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'LOW',
                  userInteraction: 'REQUIRED',
                  scope: 'CHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'LOW',
                  baseScore: 6.5,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 2.3,
                impactScore: 3.7,
              },
            ],
          },
          weaknesses: [
            {
              source: 'audit@patchstack.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-79',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://patchstack.com/database/vulnerability/art-decoration-shortcode/wordpress-art-decoration-shortcode-plugin-1-5-6-cross-site-scripting-xss?_s_id=cve',
              source: 'audit@patchstack.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-37997',
          sourceIdentifier: 'audit@patchstack.com',
          published: '2023-09-01T12:15:09.480',
          lastModified: '2023-09-01T13:39:55.533',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Unauth. Reflected Cross-Site Scripting (XSS) vulnerability in Dharmesh Patel Post List With Featured Image plugin <= 1.2 versions.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'audit@patchstack.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:C/C:L/I:L/A:L',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'REQUIRED',
                  scope: 'CHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'LOW',
                  baseScore: 7.1,
                  baseSeverity: 'HIGH',
                },
                exploitabilityScore: 2.8,
                impactScore: 3.7,
              },
            ],
          },
          weaknesses: [
            {
              source: 'audit@patchstack.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-79',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://patchstack.com/database/vulnerability/post-list-with-featured-image/wordpress-post-list-with-featured-image-plugin-1-2-cross-site-scripting-xss-vulnerability?_s_id=cve',
              source: 'audit@patchstack.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-37826',
          sourceIdentifier: 'cve@mitre.org',
          published: '2023-09-01T13:15:07.303',
          lastModified: '2023-09-01T13:39:55.533',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'A cross-site scripting (XSS) vulnerability in General Solutions Steiner GmbH CASE 3 Taskmanagement V 3.3 allows attackers to execute arbitrary web scripts or HTML via a crafted payload injected into the fieldname parameter.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://case.contwise.com/php/portal_case.php',
              source: 'cve@mitre.org',
            },
            {
              url: 'https://github.com/Popeye-ITSec/CVEs/blob/main/CVE-2023-37826',
              source: 'cve@mitre.org',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-37827',
          sourceIdentifier: 'cve@mitre.org',
          published: '2023-09-01T13:15:07.687',
          lastModified: '2023-09-01T13:39:55.533',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'A cross-site scripting (XSS) vulnerability in General Solutions Steiner GmbH CASE 3 Taskmanagement V 3.3 allows attackers to execute arbitrary web scripts or HTML via a crafted payload injected into the executionBlockName parameter.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://case.contwise.com/php/portal_case.php',
              source: 'cve@mitre.org',
            },
            {
              url: 'https://github.com/Popeye-ITSec/CVEs/blob/main/CVE-2023-37827',
              source: 'cve@mitre.org',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-37828',
          sourceIdentifier: 'cve@mitre.org',
          published: '2023-09-01T13:15:07.857',
          lastModified: '2023-09-01T13:39:55.533',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'A cross-site scripting (XSS) vulnerability in General Solutions Steiner GmbH CASE 3 Taskmanagement V 3.3 allows attackers to execute arbitrary web scripts or HTML via a crafted payload injected into the Tasktyp parameter.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://case.contwise.com/php/portal_case.php',
              source: 'cve@mitre.org',
            },
            {
              url: 'https://github.com/Popeye-ITSec/CVEs/blob/main/CVE-2023-37828',
              source: 'cve@mitre.org',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-37829',
          sourceIdentifier: 'cve@mitre.org',
          published: '2023-09-01T13:15:07.990',
          lastModified: '2023-09-01T13:39:55.533',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'A cross-site scripting (XSS) vulnerability in General Solutions Steiner GmbH CASE 3 Taskmanagement V 3.3 allows attackers to execute arbitrary web scripts or HTML via a crafted payload injected into the notification.message parameter.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://case.contwise.com/php/portal_case.php',
              source: 'cve@mitre.org',
            },
            {
              url: 'https://github.com/Popeye-ITSec/CVEs/blob/main/CVE-2023-37829',
              source: 'cve@mitre.org',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-37830',
          sourceIdentifier: 'cve@mitre.org',
          published: '2023-09-01T13:15:08.117',
          lastModified: '2023-09-01T13:39:55.533',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'A cross-site scripting (XSS) vulnerability in General Solutions Steiner GmbH CASE 3 Taskmanagement V 3.3 allows attackers to execute arbitrary web scripts or HTML via a crafted payload injected into the name parameter.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://case.contwise.com/php/portal_case.php',
              source: 'cve@mitre.org',
            },
            {
              url: 'https://github.com/Popeye-ITSec/CVEs/blob/main/CVE-2023-37830',
              source: 'cve@mitre.org',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-39703',
          sourceIdentifier: 'cve@mitre.org',
          published: '2023-09-01T13:15:08.243',
          lastModified: '2023-09-01T13:39:55.533',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'A cross site scripting (XSS) vulnerability in the Markdown Editor component of Typora v1.6.7 allows attackers to execute arbitrary code via uploading a crafted Markdown file.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://c0olw.github.io/2023/07/31/Typora-XSS-Vulnerability/',
              source: 'cve@mitre.org',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-39710',
          sourceIdentifier: 'cve@mitre.org',
          published: '2023-09-01T14:15:07.777',
          lastModified: '2023-09-01T21:15:30.513',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Multiple cross-site scripting (XSS) vulnerabilities in Free and Open Source Inventory Management System v1.0 allows attackers to execute arbitrary web scripts or HTML via injecting a crafted payload into the Name, Address, and Company parameters under the Add Customer section.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://gist.github.com/Arajawat007/dc6e4dd231accf777dae30d890a4e7df#file-cve-2023-39710',
              source: 'cve@mitre.org',
            },
            {
              url: 'https://www.sourcecodester.com/',
              source: 'cve@mitre.org',
            },
            {
              url: 'https://www.sourcecodester.com/php/16741/free-and-open-source-inventory-management-system-php-source-code.html',
              source: 'cve@mitre.org',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-23763',
          sourceIdentifier: 'product-cna@github.com',
          published: '2023-09-01T15:15:07.620',
          lastModified: '2023-09-01T21:15:30.513',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'An authorization/sensitive information disclosure vulnerability was identified in GitHub Enterprise Server that allowed a fork to retain read access to an upstream repository after its visibility was changed to private. This vulnerability affected all versions of GitHub Enterprise Server prior to 3.10.0 and was fixed in versions 3.9.4, 3.8.9, 3.7.16 and 3.6.18. This vulnerability was reported via the GitHub Bug Bounty program.\n',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'product-cna@github.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:L/I:N/A:N',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'NONE',
                  availabilityImpact: 'NONE',
                  baseScore: 5.3,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 3.9,
                impactScore: 1.4,
              },
            ],
          },
          weaknesses: [
            {
              source: 'product-cna@github.com',
              type: 'Secondary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-200',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://docs.github.com/en/enterprise-server@3.6/admin/release-notes#3.6.18-security-fixes',
              source: 'product-cna@github.com',
            },
            {
              url: 'https://docs.github.com/en/enterprise-server@3.7/admin/release-notes#3.7.16-security-fixes',
              source: 'product-cna@github.com',
            },
            {
              url: 'https://docs.github.com/en/enterprise-server@3.8/admin/release-notes#3.8.9-security-fixes',
              source: 'product-cna@github.com',
            },
            {
              url: 'https://docs.github.com/en/enterprise-server@3.9/admin/release-notes#3.9.4-security-fixes',
              source: 'product-cna@github.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2020-22612',
          sourceIdentifier: 'cve@mitre.org',
          published: '2023-09-01T16:15:07.533',
          lastModified: '2023-09-01T21:15:30.513',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Installer RCE on settings file write in MyBB before 1.8.22.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://mybb.com/versions/1.8.22/',
              source: 'cve@mitre.org',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-28366',
          sourceIdentifier: 'cve@mitre.org',
          published: '2023-09-01T16:15:07.790',
          lastModified: '2023-09-01T21:15:30.513',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'The broker in Eclipse Mosquitto 1.3.2 through 2.x before 2.0.16 has a memory leak that can be abused remotely when a client sends many QoS 2 messages with duplicate message IDs, and fails to respond to PUBREC commands. This occurs because of mishandling of EAGAIN from the libc send function.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://github.com/eclipse/mosquitto/commit/6113eac95a9df634fbc858be542c4a0456bfe7b9',
              source: 'cve@mitre.org',
            },
            {
              url: 'https://github.com/eclipse/mosquitto/compare/v2.0.15...v2.0.16',
              source: 'cve@mitre.org',
            },
            {
              url: 'https://mosquitto.org/blog/2023/08/version-2-0-16-released/',
              source: 'cve@mitre.org',
            },
            {
              url: 'https://www.compass-security.com/fileadmin/Research/Advisories/2023_02_CSNC-2023-001_Eclipse_Mosquitto_Memory_Leak.txt',
              source: 'cve@mitre.org',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-36076',
          sourceIdentifier: 'cve@mitre.org',
          published: '2023-09-01T16:15:07.857',
          lastModified: '2023-09-01T21:15:30.513',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'SQL Injection vulnerability in smanga version 3.1.9 and earlier, allows remote attackers to execute arbitrary code and gain sensitive information via mediaId, mangaId, and userId parameters in php/history/add.php.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://github.com/lkw199711/smanga/issues/100',
              source: 'cve@mitre.org',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-36088',
          sourceIdentifier: 'cve@mitre.org',
          published: '2023-09-01T16:15:07.910',
          lastModified: '2023-09-01T21:15:30.513',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Server Side Request Forgery (SSRF) vulnerability in NebulaGraph Studio version 3.7.0, allows remote attackers to gain sensitive information.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'http://nebulagraph.com',
              source: 'cve@mitre.org',
            },
            {
              url: 'https://github.com/vesoft-inc/nebula-studio',
              source: 'cve@mitre.org',
            },
            {
              url: 'https://github.com/vesoft-inc/nebula-studio/issues/571',
              source: 'cve@mitre.org',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-36100',
          sourceIdentifier: 'cve@mitre.org',
          published: '2023-09-01T16:15:07.967',
          lastModified: '2023-09-01T21:15:30.513',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'An issue was discovered in IceCMS version 2.0.1, allows attackers to escalate privileges and gain sensitive information via UserID parameter in api/User/ChangeUser.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://github.com/Thecosy/IceCMS/issues/15',
              source: 'cve@mitre.org',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-36187',
          sourceIdentifier: 'cve@mitre.org',
          published: '2023-09-01T16:15:08.020',
          lastModified: '2023-09-01T21:15:30.513',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Buffer Overflow vulnerability in NETGEAR R6400v2 before version 1.0.4.118, allows remote unauthenticated attackers to execute arbitrary code via crafted URL to httpd.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://kb.netgear.com/000065571/Security-Advisory-for-Pre-Authentication-Buffer-Overflow-on-Some-Routers-PSV-2020-0578',
              source: 'cve@mitre.org',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-36326',
          sourceIdentifier: 'cve@mitre.org',
          published: '2023-09-01T16:15:08.077',
          lastModified: '2023-09-06T00:04:24.377',
          vulnStatus: 'Analyzed',
          descriptions: [
            {
              lang: 'en',
              value:
                'Integer Overflow vulnerability in RELIC before commit 34580d840469361ba9b5f001361cad659687b9ab, allows attackers to execute arbitrary code, cause a denial of service, and escalate privileges when calling realloc function in bn_grow function.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'nvd@nist.gov',
                type: 'Primary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'HIGH',
                  availabilityImpact: 'HIGH',
                  baseScore: 9.8,
                  baseSeverity: 'CRITICAL',
                },
                exploitabilityScore: 3.9,
                impactScore: 5.9,
              },
            ],
          },
          weaknesses: [
            {
              source: 'nvd@nist.gov',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-190',
                },
              ],
            },
          ],
          configurations: [
            {
              nodes: [
                {
                  operator: 'OR',
                  negate: false,
                  cpeMatch: [
                    {
                      vulnerable: true,
                      criteria: 'cpe:2.3:a:relic_project:relic:*:*:*:*:*:*:*:*',
                      versionEndExcluding: '2022-11-14',
                      matchCriteriaId: 'D636CA1B-2334-4D2F-92E0-FADDA9CDF77B',
                    },
                  ],
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://github.com/relic-toolkit/relic/commit/34580d840469361ba9b5f001361cad659687b9ab',
              source: 'cve@mitre.org',
              tags: ['Patch'],
            },
            {
              url: 'https://groups.google.com/g/relic-discuss/c/A_J2-ArVIAo/m/qgFiXsUJBQAJ?utm_medium=email&utm_source=footer',
              source: 'cve@mitre.org',
              tags: ['Mailing List'],
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-36327',
          sourceIdentifier: 'cve@mitre.org',
          published: '2023-09-01T16:15:08.127',
          lastModified: '2023-09-06T00:05:15.863',
          vulnStatus: 'Analyzed',
          descriptions: [
            {
              lang: 'en',
              value:
                'Integer Overflow vulnerability in RELIC before commit 421f2e91cf2ba42473d4d54daf24e295679e290e, allows attackers to execute arbitrary code and cause a denial of service in pos argument in bn_get_prime function.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'nvd@nist.gov',
                type: 'Primary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'HIGH',
                  availabilityImpact: 'HIGH',
                  baseScore: 9.8,
                  baseSeverity: 'CRITICAL',
                },
                exploitabilityScore: 3.9,
                impactScore: 5.9,
              },
            ],
          },
          weaknesses: [
            {
              source: 'nvd@nist.gov',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-190',
                },
              ],
            },
          ],
          configurations: [
            {
              nodes: [
                {
                  operator: 'OR',
                  negate: false,
                  cpeMatch: [
                    {
                      vulnerable: true,
                      criteria: 'cpe:2.3:a:relic_project:relic:*:*:*:*:*:*:*:*',
                      versionEndExcluding: '2022-11-14',
                      matchCriteriaId: 'D636CA1B-2334-4D2F-92E0-FADDA9CDF77B',
                    },
                  ],
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://github.com/relic-toolkit/relic/commit/421f2e91cf2ba42473d4d54daf24e295679e290e',
              source: 'cve@mitre.org',
              tags: ['Patch'],
            },
            {
              url: 'https://groups.google.com/g/relic-discuss/c/A_J2-ArVIAo/m/qgFiXsUJBQAJ?utm_medium=email&utm_source=footer',
              source: 'cve@mitre.org',
              tags: ['Mailing List'],
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-36328',
          sourceIdentifier: 'cve@mitre.org',
          published: '2023-09-01T16:15:08.177',
          lastModified: '2023-09-06T00:05:29.907',
          vulnStatus: 'Analyzed',
          descriptions: [
            {
              lang: 'en',
              value:
                'Integer Overflow vulnerability in mp_grow in libtom libtommath before commit beba892bc0d4e4ded4d667ab1d2a94f4d75109a9, allows attackers to execute arbitrary code and cause a denial of service (DoS).',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'nvd@nist.gov',
                type: 'Primary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'HIGH',
                  availabilityImpact: 'HIGH',
                  baseScore: 9.8,
                  baseSeverity: 'CRITICAL',
                },
                exploitabilityScore: 3.9,
                impactScore: 5.9,
              },
            ],
          },
          weaknesses: [
            {
              source: 'nvd@nist.gov',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-190',
                },
              ],
            },
          ],
          configurations: [
            {
              nodes: [
                {
                  operator: 'OR',
                  negate: false,
                  cpeMatch: [
                    {
                      vulnerable: true,
                      criteria: 'cpe:2.3:a:libtom:libtommath:*:*:*:*:*:*:*:*',
                      versionEndExcluding: '2023-05-09',
                      matchCriteriaId: '0838AE42-FC51-47AA-8752-C22D933B108C',
                    },
                  ],
                },
              ],
            },
            {
              nodes: [
                {
                  operator: 'OR',
                  negate: false,
                  cpeMatch: [
                    {
                      vulnerable: true,
                      criteria:
                        'cpe:2.3:o:fedoraproject:fedora:38:*:*:*:*:*:*:*',
                      matchCriteriaId: 'CC559B26-5DFC-4B7A-A27C-B77DE755DFF9',
                    },
                  ],
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://github.com/libtom/libtommath/pull/546',
              source: 'cve@mitre.org',
              tags: ['Issue Tracking', 'Patch'],
            },
            {
              url: 'https://lists.fedoraproject.org/archives/list/package-announce@lists.fedoraproject.org/message/3H2PFUTBKQUDSOJXQQS7LUSZQWT3JTW2/',
              source: 'cve@mitre.org',
              tags: ['Mailing List'],
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-39582',
          sourceIdentifier: 'cve@mitre.org',
          published: '2023-09-01T16:15:08.230',
          lastModified: '2023-09-06T00:05:45.737',
          vulnStatus: 'Analyzed',
          descriptions: [
            {
              lang: 'en',
              value:
                'SQL Injection vulnerability in Chamilo LMS v.1.11 thru v.1.11.20 allows a remote privileged attacker to obtain sensitive information via the import sessions functions.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'nvd@nist.gov',
                type: 'Primary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:H/UI:N/S:U/C:H/I:N/A:N',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'HIGH',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'NONE',
                  availabilityImpact: 'NONE',
                  baseScore: 4.9,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 1.2,
                impactScore: 3.6,
              },
            ],
          },
          weaknesses: [
            {
              source: 'nvd@nist.gov',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-89',
                },
              ],
            },
          ],
          configurations: [
            {
              nodes: [
                {
                  operator: 'OR',
                  negate: false,
                  cpeMatch: [
                    {
                      vulnerable: true,
                      criteria: 'cpe:2.3:a:chamilo:chamilo_lms:*:*:*:*:*:*:*:*',
                      versionStartIncluding: '1.11',
                      versionEndIncluding: '1.11.20',
                      matchCriteriaId: '9B351FC0-38FB-4498-8454-EF90CC0C24BF',
                    },
                  ],
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://support.chamilo.org/projects/chamilo-18/wiki/Security_issues#Issue-126-2023-07-18-High-impact-Low-risk-SQL-injection-by-admin-users',
              source: 'cve@mitre.org',
              tags: ['Patch', 'Vendor Advisory'],
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-39631',
          sourceIdentifier: 'cve@mitre.org',
          published: '2023-09-01T16:15:08.370',
          lastModified: '2023-09-06T00:06:06.167',
          vulnStatus: 'Analyzed',
          descriptions: [
            {
              lang: 'en',
              value:
                'An issue in LanChain-ai Langchain v.0.0.245 allows a remote attacker to execute arbitrary code via the evaluate function in the numexpr library.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'nvd@nist.gov',
                type: 'Primary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'HIGH',
                  availabilityImpact: 'HIGH',
                  baseScore: 9.8,
                  baseSeverity: 'CRITICAL',
                },
                exploitabilityScore: 3.9,
                impactScore: 5.9,
              },
            ],
          },
          weaknesses: [
            {
              source: 'nvd@nist.gov',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-94',
                },
              ],
            },
          ],
          configurations: [
            {
              nodes: [
                {
                  operator: 'OR',
                  negate: false,
                  cpeMatch: [
                    {
                      vulnerable: true,
                      criteria:
                        'cpe:2.3:a:langchain:langchain:0.0.245:*:*:*:*:*:*:*',
                      matchCriteriaId: '6573CC2E-2720-44F4-B560-17D6A56BDD3F',
                    },
                  ],
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://github.com/langchain-ai/langchain/issues/8363',
              source: 'cve@mitre.org',
              tags: [
                'Exploit',
                'Issue Tracking',
                'Patch',
                'Third Party Advisory',
              ],
            },
            {
              url: 'https://github.com/pydata/numexpr/issues/442',
              source: 'cve@mitre.org',
              tags: [
                'Exploit',
                'Issue Tracking',
                'Patch',
                'Third Party Advisory',
              ],
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-40771',
          sourceIdentifier: 'cve@mitre.org',
          published: '2023-09-01T16:15:08.423',
          lastModified: '2023-09-06T00:14:02.790',
          vulnStatus: 'Analyzed',
          descriptions: [
            {
              lang: 'en',
              value:
                'SQL injection vulnerability in DataEase v.1.18.9 allows a remote attacker to obtain sensitive information via a crafted string outside of the blacklist function.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'nvd@nist.gov',
                type: 'Primary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:N/A:N',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'NONE',
                  availabilityImpact: 'NONE',
                  baseScore: 7.5,
                  baseSeverity: 'HIGH',
                },
                exploitabilityScore: 3.9,
                impactScore: 3.6,
              },
            ],
          },
          weaknesses: [
            {
              source: 'nvd@nist.gov',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-89',
                },
              ],
            },
          ],
          configurations: [
            {
              nodes: [
                {
                  operator: 'OR',
                  negate: false,
                  cpeMatch: [
                    {
                      vulnerable: true,
                      criteria:
                        'cpe:2.3:a:dataease:dataease:1.18.9:*:*:*:*:*:*:*',
                      matchCriteriaId: 'D1AE6464-BAA2-474D-AE65-EB1AA6CE2EDC',
                    },
                  ],
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://github.com/dataease/dataease/issues/5861',
              source: 'cve@mitre.org',
              tags: ['Exploit', 'Issue Tracking', 'Third Party Advisory'],
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-40968',
          sourceIdentifier: 'cve@mitre.org',
          published: '2023-09-01T16:15:08.473',
          lastModified: '2023-09-06T00:14:10.897',
          vulnStatus: 'Analyzed',
          descriptions: [
            {
              lang: 'en',
              value:
                'Buffer Overflow vulnerability in hzeller timg v.1.5.2 and before allows a remote attacker to cause a denial of service via the 0x61200000045c address.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'nvd@nist.gov',
                type: 'Primary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'NONE',
                  integrityImpact: 'NONE',
                  availabilityImpact: 'HIGH',
                  baseScore: 7.5,
                  baseSeverity: 'HIGH',
                },
                exploitabilityScore: 3.9,
                impactScore: 3.6,
              },
            ],
          },
          weaknesses: [
            {
              source: 'nvd@nist.gov',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-120',
                },
              ],
            },
          ],
          configurations: [
            {
              nodes: [
                {
                  operator: 'OR',
                  negate: false,
                  cpeMatch: [
                    {
                      vulnerable: true,
                      criteria: 'cpe:2.3:a:hzeller:timg:1.5.2:*:*:*:*:*:*:*',
                      matchCriteriaId: 'C6F3F7A0-FF28-4B32-B4BB-7E95A859A324',
                    },
                  ],
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://github.com/hzeller/timg/issues/115',
              source: 'cve@mitre.org',
              tags: ['Exploit', 'Issue Tracking', 'Patch'],
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-40980',
          sourceIdentifier: 'cve@mitre.org',
          published: '2023-09-01T16:15:08.523',
          lastModified: '2023-09-01T21:15:30.513',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'File Upload vulnerability in DWSurvey DWSurvey-OSS v.3.2.0 and before allows a remote attacker to execute arbitrary code via the saveimage method and savveFile in the action/UploadAction.java file.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://github.com/wkeyuan/DWSurvey/issues/107',
              source: 'cve@mitre.org',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-4720',
          sourceIdentifier: 'security@huntr.dev',
          published: '2023-09-01T16:15:08.577',
          lastModified: '2023-09-06T00:14:31.183',
          vulnStatus: 'Analyzed',
          descriptions: [
            {
              lang: 'en',
              value:
                'Floating Point Comparison with Incorrect Operator in GitHub repository gpac/gpac prior to 2.3-DEV.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'nvd@nist.gov',
                type: 'Primary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:L/AC:L/PR:N/UI:R/S:U/C:N/I:N/A:H',
                  attackVector: 'LOCAL',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'REQUIRED',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'NONE',
                  integrityImpact: 'NONE',
                  availabilityImpact: 'HIGH',
                  baseScore: 5.5,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 1.8,
                impactScore: 3.6,
              },
            ],
            cvssMetricV30: [
              {
                source: 'security@huntr.dev',
                type: 'Secondary',
                cvssData: {
                  version: '3.0',
                  vectorString: 'CVSS:3.0/AV:L/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:L',
                  attackVector: 'LOCAL',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'NONE',
                  integrityImpact: 'NONE',
                  availabilityImpact: 'LOW',
                  baseScore: 4.0,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 2.5,
                impactScore: 1.4,
              },
            ],
          },
          weaknesses: [
            {
              source: 'security@huntr.dev',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-1077',
                },
              ],
            },
          ],
          configurations: [
            {
              nodes: [
                {
                  operator: 'OR',
                  negate: false,
                  cpeMatch: [
                    {
                      vulnerable: true,
                      criteria: 'cpe:2.3:a:gpac:gpac:*:*:*:*:*:*:*:*',
                      versionEndExcluding: '2.3-dev',
                      matchCriteriaId: 'F76B0068-AE98-4B7C-885D-B083842F6521',
                    },
                  ],
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://github.com/gpac/gpac/commit/e396648e48c57e2d53988d3fd4465b068b96c89a',
              source: 'security@huntr.dev',
              tags: ['Patch'],
            },
            {
              url: 'https://huntr.dev/bounties/1dc2954c-8497-49fa-b2af-113e1e9381ad',
              source: 'security@huntr.dev',
              tags: ['Exploit', 'Patch', 'Third Party Advisory'],
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-4721',
          sourceIdentifier: 'security@huntr.dev',
          published: '2023-09-01T16:15:08.660',
          lastModified: '2023-09-06T00:15:28.960',
          vulnStatus: 'Analyzed',
          descriptions: [
            {
              lang: 'en',
              value:
                'Out-of-bounds Read in GitHub repository gpac/gpac prior to 2.3-DEV.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'nvd@nist.gov',
                type: 'Primary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:L/AC:L/PR:N/UI:R/S:U/C:N/I:N/A:H',
                  attackVector: 'LOCAL',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'REQUIRED',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'NONE',
                  integrityImpact: 'NONE',
                  availabilityImpact: 'HIGH',
                  baseScore: 5.5,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 1.8,
                impactScore: 3.6,
              },
            ],
            cvssMetricV30: [
              {
                source: 'security@huntr.dev',
                type: 'Secondary',
                cvssData: {
                  version: '3.0',
                  vectorString: 'CVSS:3.0/AV:L/AC:L/PR:N/UI:N/S:U/C:L/I:L/A:L',
                  attackVector: 'LOCAL',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'LOW',
                  baseScore: 5.9,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 2.5,
                impactScore: 3.4,
              },
            ],
          },
          weaknesses: [
            {
              source: 'security@huntr.dev',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-125',
                },
              ],
            },
          ],
          configurations: [
            {
              nodes: [
                {
                  operator: 'OR',
                  negate: false,
                  cpeMatch: [
                    {
                      vulnerable: true,
                      criteria: 'cpe:2.3:a:gpac:gpac:*:*:*:*:*:*:*:*',
                      versionEndExcluding: '2.3-dev',
                      matchCriteriaId: 'F76B0068-AE98-4B7C-885D-B083842F6521',
                    },
                  ],
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://github.com/gpac/gpac/commit/3ec93d73d048ed7b46fe6e9f307cc7a0cc13db63',
              source: 'security@huntr.dev',
              tags: ['Patch'],
            },
            {
              url: 'https://huntr.dev/bounties/f457dc62-3cff-47bd-8fd2-1cb2b4a832fc',
              source: 'security@huntr.dev',
              tags: ['Exploit', 'Patch', 'Third Party Advisory'],
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-4722',
          sourceIdentifier: 'security@huntr.dev',
          published: '2023-09-01T16:15:08.737',
          lastModified: '2023-09-06T00:15:42.687',
          vulnStatus: 'Analyzed',
          descriptions: [
            {
              lang: 'en',
              value:
                'Integer Overflow or Wraparound in GitHub repository gpac/gpac prior to 2.3-DEV.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'nvd@nist.gov',
                type: 'Primary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:L/AC:L/PR:N/UI:R/S:U/C:N/I:N/A:H',
                  attackVector: 'LOCAL',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'REQUIRED',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'NONE',
                  integrityImpact: 'NONE',
                  availabilityImpact: 'HIGH',
                  baseScore: 5.5,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 1.8,
                impactScore: 3.6,
              },
            ],
            cvssMetricV30: [
              {
                source: 'security@huntr.dev',
                type: 'Secondary',
                cvssData: {
                  version: '3.0',
                  vectorString: 'CVSS:3.0/AV:L/AC:L/PR:N/UI:N/S:U/C:L/I:L/A:L',
                  attackVector: 'LOCAL',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'LOW',
                  baseScore: 5.9,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 2.5,
                impactScore: 3.4,
              },
            ],
          },
          weaknesses: [
            {
              source: 'security@huntr.dev',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-190',
                },
              ],
            },
          ],
          configurations: [
            {
              nodes: [
                {
                  operator: 'OR',
                  negate: false,
                  cpeMatch: [
                    {
                      vulnerable: true,
                      criteria: 'cpe:2.3:a:gpac:gpac:*:*:*:*:*:*:*:*',
                      versionEndExcluding: '2.3-dev',
                      matchCriteriaId: 'F76B0068-AE98-4B7C-885D-B083842F6521',
                    },
                  ],
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://github.com/gpac/gpac/commit/de7f3a852bef72a52825fd307cf4e8f486401a76',
              source: 'security@huntr.dev',
              tags: ['Patch'],
            },
            {
              url: 'https://huntr.dev/bounties/ddfdb41d-e708-4fec-afe5-68ff1f88f830',
              source: 'security@huntr.dev',
              tags: ['Exploit', 'Patch', 'Third Party Advisory'],
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2022-3407',
          sourceIdentifier: 'psirt@lenovo.com',
          published: '2023-09-01T17:15:07.463',
          lastModified: '2023-09-01T21:15:30.513',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                "I some cases, when the device is USB-tethered to a host PC, and the device is sharing its mobile network connection with the host PC, if the user originates a call on the device, then the device's modem may reset and cause the phone call to not succeed.  This may block the user from dialing emergency services.  This patch resolves the device's modem reset issue.",
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'psirt@lenovo.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:P/AC:L/PR:L/UI:R/S:C/C:N/I:N/A:H',
                  attackVector: 'PHYSICAL',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'LOW',
                  userInteraction: 'REQUIRED',
                  scope: 'CHANGED',
                  confidentialityImpact: 'NONE',
                  integrityImpact: 'NONE',
                  availabilityImpact: 'HIGH',
                  baseScore: 4.9,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 0.5,
                impactScore: 4.0,
              },
            ],
          },
          weaknesses: [
            {
              source: 'psirt@lenovo.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-404',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://en-us.support.motorola.com/app/answers/detail/a_id/175354',
              source: 'psirt@lenovo.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-41627',
          sourceIdentifier: 'cve@mitre.org',
          published: '2023-09-01T17:15:07.633',
          lastModified: '2023-09-01T21:15:30.513',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'O-RAN Software Community ric-plt-lib-rmr v4.9.0 does not validate the source of the routing tables it receives, potentially allowing attackers to send forged routing tables to the device.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://jira.o-ran-sc.org/browse/RIC-1001',
              source: 'cve@mitre.org',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-41628',
          sourceIdentifier: 'cve@mitre.org',
          published: '2023-09-01T17:15:07.690',
          lastModified: '2023-09-01T21:15:30.513',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'An issue in O-RAN Software Community E2 G-Release allows attackers to cause a Denial of Service (DoS) by incorrectly initiating the messaging procedure between the E2Node and E2Term components.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://jira.o-ran-sc.org/browse/RIC-1002',
              source: 'cve@mitre.org',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-39714',
          sourceIdentifier: 'cve@mitre.org',
          published: '2023-09-01T18:15:07.710',
          lastModified: '2023-09-06T00:04:08.890',
          vulnStatus: 'Analyzed',
          descriptions: [
            {
              lang: 'en',
              value:
                'Multiple cross-site scripting (XSS) vulnerabilities in Free and Open Source Inventory Management System v1.0 allows attackers to execute arbitrary web scripts or HTML via injecting a crafted payload into the Name, Address, and Company parameters under the Add New Member section.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'nvd@nist.gov',
                type: 'Primary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:C/C:L/I:L/A:N',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'REQUIRED',
                  scope: 'CHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'NONE',
                  baseScore: 6.1,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 2.8,
                impactScore: 2.7,
              },
            ],
          },
          weaknesses: [
            {
              source: 'nvd@nist.gov',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-79',
                },
              ],
            },
          ],
          configurations: [
            {
              nodes: [
                {
                  operator: 'OR',
                  negate: false,
                  cpeMatch: [
                    {
                      vulnerable: true,
                      criteria:
                        'cpe:2.3:a:free_and_open_source_inventory_management_system_project:free_and_open_source_inventory_management_system:1.0:*:*:*:*:*:*:*',
                      matchCriteriaId: 'ED4E30A0-0847-427A-9B08-FB699FCC7958',
                    },
                  ],
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://gist.github.com/Arajawat007/141e68161014e832e30d39b1979a8a6c#file-cve-2023-39714',
              source: 'cve@mitre.org',
              tags: ['Exploit', 'Third Party Advisory'],
            },
            {
              url: 'https://www.sourcecodester.com/',
              source: 'cve@mitre.org',
              tags: ['Not Applicable'],
            },
            {
              url: 'https://www.sourcecodester.com/php/16741/free-and-open-source-inventory-management-system-php-source-code.html',
              source: 'cve@mitre.org',
              tags: ['Product'],
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-4707',
          sourceIdentifier: 'cna@vuldb.com',
          published: '2023-09-01T18:15:07.793',
          lastModified: '2023-09-06T00:03:54.440',
          vulnStatus: 'Analyzed',
          descriptions: [
            {
              lang: 'en',
              value:
                'A vulnerability was found in Infosoftbd Clcknshop 1.0.0. It has been declared as problematic. This vulnerability affects unknown code of the file /collection/all. The manipulation of the argument q leads to cross site scripting. The attack can be initiated remotely. VDB-238570 is the identifier assigned to this vulnerability. NOTE: The vendor was contacted early about this disclosure but did not respond in any way.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'nvd@nist.gov',
                type: 'Primary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:C/C:L/I:L/A:N',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'REQUIRED',
                  scope: 'CHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'NONE',
                  baseScore: 6.1,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 2.8,
                impactScore: 2.7,
              },
            ],
            cvssMetricV30: [
              {
                source: 'cna@vuldb.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.0',
                  vectorString: 'CVSS:3.0/AV:N/AC:L/PR:L/UI:R/S:U/C:N/I:L/A:N',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'LOW',
                  userInteraction: 'REQUIRED',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'NONE',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'NONE',
                  baseScore: 3.5,
                  baseSeverity: 'LOW',
                },
                exploitabilityScore: 2.1,
                impactScore: 1.4,
              },
            ],
            cvssMetricV2: [
              {
                source: 'cna@vuldb.com',
                type: 'Secondary',
                cvssData: {
                  version: '2.0',
                  vectorString: 'AV:N/AC:L/Au:S/C:N/I:P/A:N',
                  accessVector: 'NETWORK',
                  accessComplexity: 'LOW',
                  authentication: 'SINGLE',
                  confidentialityImpact: 'NONE',
                  integrityImpact: 'PARTIAL',
                  availabilityImpact: 'NONE',
                  baseScore: 4.0,
                },
                baseSeverity: 'MEDIUM',
                exploitabilityScore: 8.0,
                impactScore: 2.9,
                acInsufInfo: false,
                obtainAllPrivilege: false,
                obtainUserPrivilege: false,
                obtainOtherPrivilege: false,
                userInteractionRequired: false,
              },
            ],
          },
          weaknesses: [
            {
              source: 'nvd@nist.gov',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-79',
                },
              ],
            },
            {
              source: 'cna@vuldb.com',
              type: 'Secondary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-79',
                },
              ],
            },
          ],
          configurations: [
            {
              nodes: [
                {
                  operator: 'OR',
                  negate: false,
                  cpeMatch: [
                    {
                      vulnerable: true,
                      criteria:
                        'cpe:2.3:a:infosoftbd:clcknshop:1.0.0:*:*:*:*:*:*:*',
                      matchCriteriaId: '543FD9CD-F1BB-4CA7-B6AD-CB08A3782895',
                    },
                  ],
                },
              ],
            },
          ],
          references: [
            {
              url: 'http://packetstormsecurity.com/files/174444/Clcknshop-1.0.0-Cross-Site-Scripting.html',
              source: 'cna@vuldb.com',
              tags: ['Third Party Advisory'],
            },
            {
              url: 'https://vuldb.com/?ctiid.238570',
              source: 'cna@vuldb.com',
              tags: ['Third Party Advisory'],
            },
            {
              url: 'https://vuldb.com/?id.238570',
              source: 'cna@vuldb.com',
              tags: ['Third Party Advisory'],
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-4708',
          sourceIdentifier: 'cna@vuldb.com',
          published: '2023-09-01T18:15:07.893',
          lastModified: '2023-09-06T00:03:18.140',
          vulnStatus: 'Analyzed',
          descriptions: [
            {
              lang: 'en',
              value:
                'A vulnerability was found in Infosoftbd Clcknshop 1.0.0. It has been rated as critical. This issue affects some unknown processing of the file /collection/all of the component GET Parameter Handler. The manipulation of the argument tag leads to sql injection. The attack may be initiated remotely. The associated identifier of this vulnerability is VDB-238571. NOTE: The vendor was contacted early about this disclosure but did not respond in any way.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'nvd@nist.gov',
                type: 'Primary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'HIGH',
                  availabilityImpact: 'HIGH',
                  baseScore: 9.8,
                  baseSeverity: 'CRITICAL',
                },
                exploitabilityScore: 3.9,
                impactScore: 5.9,
              },
            ],
            cvssMetricV30: [
              {
                source: 'cna@vuldb.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.0',
                  vectorString: 'CVSS:3.0/AV:N/AC:L/PR:L/UI:N/S:U/C:L/I:L/A:L',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'LOW',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'LOW',
                  baseScore: 6.3,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 2.8,
                impactScore: 3.4,
              },
            ],
            cvssMetricV2: [
              {
                source: 'cna@vuldb.com',
                type: 'Secondary',
                cvssData: {
                  version: '2.0',
                  vectorString: 'AV:N/AC:L/Au:S/C:P/I:P/A:P',
                  accessVector: 'NETWORK',
                  accessComplexity: 'LOW',
                  authentication: 'SINGLE',
                  confidentialityImpact: 'PARTIAL',
                  integrityImpact: 'PARTIAL',
                  availabilityImpact: 'PARTIAL',
                  baseScore: 6.5,
                },
                baseSeverity: 'MEDIUM',
                exploitabilityScore: 8.0,
                impactScore: 6.4,
                acInsufInfo: false,
                obtainAllPrivilege: false,
                obtainUserPrivilege: false,
                obtainOtherPrivilege: false,
                userInteractionRequired: false,
              },
            ],
          },
          weaknesses: [
            {
              source: 'cna@vuldb.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-89',
                },
              ],
            },
          ],
          configurations: [
            {
              nodes: [
                {
                  operator: 'OR',
                  negate: false,
                  cpeMatch: [
                    {
                      vulnerable: true,
                      criteria:
                        'cpe:2.3:a:infosoftbd:clcknshop:1.0.0:*:*:*:*:*:*:*',
                      matchCriteriaId: '543FD9CD-F1BB-4CA7-B6AD-CB08A3782895',
                    },
                  ],
                },
              ],
            },
          ],
          references: [
            {
              url: 'http://packetstormsecurity.com/files/174445/Clcknshop-1.0.0-SQL-Injection.html',
              source: 'cna@vuldb.com',
              tags: ['Third Party Advisory'],
            },
            {
              url: 'https://vuldb.com/?ctiid.238571',
              source: 'cna@vuldb.com',
              tags: ['Third Party Advisory'],
            },
            {
              url: 'https://vuldb.com/?id.238571',
              source: 'cna@vuldb.com',
              tags: ['Third Party Advisory'],
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-1523',
          sourceIdentifier: 'security@ubuntu.com',
          published: '2023-09-01T19:15:42.707',
          lastModified: '2023-09-01T21:15:30.513',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Using the TIOCLINUX ioctl request, a malicious snap could inject contents into the input of the controlling terminal which could allow it to cause arbitrary commands to be executed outside of the snap sandbox after the snap exits. Graphical terminal emulators like xterm, gnome-terminal and others are not affected - this can only be exploited when snaps are run on a virtual console.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'security@ubuntu.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:H/A:H',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'NONE',
                  scope: 'CHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'HIGH',
                  availabilityImpact: 'HIGH',
                  baseScore: 10.0,
                  baseSeverity: 'CRITICAL',
                },
                exploitabilityScore: 3.9,
                impactScore: 6.0,
              },
            ],
          },
          references: [
            {
              url: 'https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2023-1523',
              source: 'security@ubuntu.com',
            },
            {
              url: 'https://github.com/snapcore/snapd/pull/12849',
              source: 'security@ubuntu.com',
            },
            {
              url: 'https://marc.info/?l=oss-security&m=167879021709955&w=2',
              source: 'security@ubuntu.com',
            },
            {
              url: 'https://ubuntu.com/security/notices/USN-6125-1',
              source: 'security@ubuntu.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-41051',
          sourceIdentifier: 'security-advisories@github.com',
          published: '2023-09-01T19:15:42.883',
          lastModified: '2023-09-01T21:15:30.513',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                "In a typical Virtual Machine Monitor (VMM) there are several components, such as boot loader, virtual device drivers, virtio backend drivers and vhost drivers, that need to access the VM physical memory. The vm-memory rust crate provides a set of traits to decouple VM memory consumers from VM memory providers. An issue was discovered in the default implementations of the `VolatileMemory::{get_atomic_ref, aligned_as_ref, aligned_as_mut, get_ref, get_array_ref}` trait functions, which allows out-of-bounds memory access if the `VolatileMemory::get_slice` function returns a `VolatileSlice` whose length is less than the function’s `count` argument. No implementations of `get_slice` provided in `vm_memory` are affected. Users of custom `VolatileMemory` implementations may be impacted if the custom implementation does not adhere to `get_slice`'s documentation. The issue started in version 0.1.0 but was fixed in version 0.12.2 by inserting a check that verifies that the `VolatileSlice` returned by `get_slice` is of the correct length. Users are advised to upgrade. There are no known workarounds for this issue.\n",
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'security-advisories@github.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:L/AC:H/PR:N/UI:R/S:U/C:N/I:N/A:L',
                  attackVector: 'LOCAL',
                  attackComplexity: 'HIGH',
                  privilegesRequired: 'NONE',
                  userInteraction: 'REQUIRED',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'NONE',
                  integrityImpact: 'NONE',
                  availabilityImpact: 'LOW',
                  baseScore: 2.5,
                  baseSeverity: 'LOW',
                },
                exploitabilityScore: 1.0,
                impactScore: 1.4,
              },
            ],
          },
          weaknesses: [
            {
              source: 'security-advisories@github.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-125',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://crates.io/crates/vm-memory/0.12.2',
              source: 'security-advisories@github.com',
            },
            {
              url: 'https://github.com/rust-vmm/vm-memory/commit/aff1dd4a5259f7deba56692840f7a2d9ca34c9c8',
              source: 'security-advisories@github.com',
            },
            {
              url: 'https://github.com/rust-vmm/vm-memory/security/advisories/GHSA-49hh-fprx-m68g',
              source: 'security-advisories@github.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-41633',
          sourceIdentifier: 'cve@mitre.org',
          published: '2023-09-01T19:15:43.003',
          lastModified: '2023-09-06T00:02:58.710',
          vulnStatus: 'Analyzed',
          descriptions: [
            {
              lang: 'en',
              value:
                'Catdoc v0.95 was discovered to contain a NULL pointer dereference via the component xls2csv at src/fileutil.c.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'nvd@nist.gov',
                type: 'Primary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:L/AC:L/PR:N/UI:R/S:U/C:N/I:N/A:H',
                  attackVector: 'LOCAL',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'REQUIRED',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'NONE',
                  integrityImpact: 'NONE',
                  availabilityImpact: 'HIGH',
                  baseScore: 5.5,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 1.8,
                impactScore: 3.6,
              },
            ],
          },
          weaknesses: [
            {
              source: 'nvd@nist.gov',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-476',
                },
              ],
            },
          ],
          configurations: [
            {
              nodes: [
                {
                  operator: 'OR',
                  negate: false,
                  cpeMatch: [
                    {
                      vulnerable: true,
                      criteria:
                        'cpe:2.3:a:catdoc_project:catdoc:0.95:*:*:*:*:*:*:*',
                      matchCriteriaId: '6CE9FF5B-A288-4C98-B162-231FDEDCE4AC',
                    },
                  ],
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://gist.github.com/rycbar77/3da455382f88cfb6d6798572f34378bd',
              source: 'cve@mitre.org',
              tags: ['Third Party Advisory'],
            },
            {
              url: 'https://rycbar77.github.io/2023/08/29/catdoc-0-95-nullptr-dereference/',
              source: 'cve@mitre.org',
              tags: ['Broken Link'],
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-4709',
          sourceIdentifier: 'cna@vuldb.com',
          published: '2023-09-01T19:15:43.063',
          lastModified: '2023-09-01T21:15:30.513',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'A vulnerability classified as problematic has been found in TOTVS RM 12.1. Affected is an unknown function of the file Login.aspx of the component Portal. The manipulation of the argument VIEWSTATE leads to cross site scripting. It is possible to launch the attack remotely. The identifier of this vulnerability is VDB-238572. NOTE: The vendor was contacted early about this disclosure but did not respond in any way.',
            },
          ],
          metrics: {
            cvssMetricV30: [
              {
                source: 'cna@vuldb.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.0',
                  vectorString: 'CVSS:3.0/AV:N/AC:L/PR:N/UI:R/S:U/C:N/I:L/A:N',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'REQUIRED',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'NONE',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'NONE',
                  baseScore: 4.3,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 2.8,
                impactScore: 1.4,
              },
            ],
            cvssMetricV2: [
              {
                source: 'cna@vuldb.com',
                type: 'Secondary',
                cvssData: {
                  version: '2.0',
                  vectorString: 'AV:N/AC:L/Au:N/C:N/I:P/A:N',
                  accessVector: 'NETWORK',
                  accessComplexity: 'LOW',
                  authentication: 'NONE',
                  confidentialityImpact: 'NONE',
                  integrityImpact: 'PARTIAL',
                  availabilityImpact: 'NONE',
                  baseScore: 5.0,
                },
                baseSeverity: 'MEDIUM',
                exploitabilityScore: 10.0,
                impactScore: 2.9,
                acInsufInfo: false,
                obtainAllPrivilege: false,
                obtainUserPrivilege: false,
                obtainOtherPrivilege: false,
                userInteractionRequired: false,
              },
            ],
          },
          weaknesses: [
            {
              source: 'cna@vuldb.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-79',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://vuldb.com/?ctiid.238572',
              source: 'cna@vuldb.com',
            },
            {
              url: 'https://vuldb.com/?id.238572',
              source: 'cna@vuldb.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-41046',
          sourceIdentifier: 'security-advisories@github.com',
          published: '2023-09-01T20:15:07.540',
          lastModified: '2023-09-01T21:15:30.513',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'XWiki Platform is a generic wiki platform offering runtime services for applications built on top of it. It is possible in XWiki to execute Velocity code without having script right by creating an XClass with a property of type "TextArea" and content type "VelocityCode" or "VelocityWiki". For the former, the syntax of the document needs to be set the `xwiki/1.0` (this syntax doesn\'t need to be installed). In both cases, when adding the property to an object, the Velocity code is executed regardless of the rights of the author of the property (edit right is still required, though). In both cases, the code is executed with the correct context author so no privileged APIs can be accessed. However, Velocity still grants access to otherwise inaccessible data and APIs that could allow further privilege escalation. At least for "VelocityCode", this behavior is most likely very old but only since XWiki 7.2, script right is a separate right, before that version all users were allowed to execute Velocity and thus this was expected and not a security issue. This has been patched in XWiki 14.10.10 and 15.4 RC1. Users are advised to upgrade. There are no known workarounds.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'security-advisories@github.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:L/I:L/A:L',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'LOW',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'LOW',
                  baseScore: 6.3,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 2.8,
                impactScore: 3.4,
              },
            ],
          },
          weaknesses: [
            {
              source: 'security-advisories@github.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-862',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://github.com/xwiki/xwiki-platform/commit/edc52579eeaab1b4514785c134044671a1ecd839',
              source: 'security-advisories@github.com',
            },
            {
              url: 'https://github.com/xwiki/xwiki-platform/security/advisories/GHSA-m5m2-h6h9-p2c8',
              source: 'security-advisories@github.com',
            },
            {
              url: 'https://jira.xwiki.org/browse/XWIKI-20847',
              source: 'security-advisories@github.com',
            },
            {
              url: 'https://jira.xwiki.org/browse/XWIKI-20848',
              source: 'security-advisories@github.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-41049',
          sourceIdentifier: 'security-advisories@github.com',
          published: '2023-09-01T20:15:07.873',
          lastModified: '2023-09-06T00:02:42.857',
          vulnStatus: 'Analyzed',
          descriptions: [
            {
              lang: 'en',
              value:
                '@dcl/single-sign-on-client is an open source npm library which deals with single sign on authentication flows. Improper input validation in the `init` function allows arbitrary javascript to be executed using  the `javascript:` prefix. This vulnerability has been patched on version `0.1.0`. Users are advised to upgrade. Users unable to upgrade should limit untrusted user input to the `init` function.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'nvd@nist.gov',
                type: 'Primary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:C/C:L/I:L/A:N',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'REQUIRED',
                  scope: 'CHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'NONE',
                  baseScore: 6.1,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 2.8,
                impactScore: 2.7,
              },
              {
                source: 'security-advisories@github.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:N/A:N',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'NONE',
                  availabilityImpact: 'NONE',
                  baseScore: 7.5,
                  baseSeverity: 'HIGH',
                },
                exploitabilityScore: 3.9,
                impactScore: 3.6,
              },
            ],
          },
          weaknesses: [
            {
              source: 'nvd@nist.gov',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-79',
                },
              ],
            },
            {
              source: 'security-advisories@github.com',
              type: 'Secondary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-79',
                },
              ],
            },
          ],
          configurations: [
            {
              nodes: [
                {
                  operator: 'OR',
                  negate: false,
                  cpeMatch: [
                    {
                      vulnerable: true,
                      criteria:
                        'cpe:2.3:a:decentraland:single_sign_on_client:*:*:*:*:*:node.js:*:*',
                      versionEndExcluding: '0.1.0',
                      matchCriteriaId: '73FD9007-FDA7-4B16-AF46-F8D119264125',
                    },
                  ],
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://github.com/decentraland/single-sign-on-client/commit/bd20ea9533d0cda30809d929db85b1b76cef855a',
              source: 'security-advisories@github.com',
              tags: ['Patch'],
            },
            {
              url: 'https://github.com/decentraland/single-sign-on-client/security/advisories/GHSA-vp4f-wxgw-7x8x',
              source: 'security-advisories@github.com',
              tags: ['Vendor Advisory'],
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-4710',
          sourceIdentifier: 'cna@vuldb.com',
          published: '2023-09-01T20:15:08.103',
          lastModified: '2023-09-01T21:15:30.513',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'A vulnerability classified as problematic was found in TOTVS RM 12.1. Affected by this vulnerability is an unknown functionality of the component Portal. The manipulation of the argument d leads to cross site scripting. The attack can be launched remotely. The identifier VDB-238573 was assigned to this vulnerability. NOTE: The vendor was contacted early about this disclosure but did not respond in any way.',
            },
          ],
          metrics: {
            cvssMetricV30: [
              {
                source: 'cna@vuldb.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.0',
                  vectorString: 'CVSS:3.0/AV:N/AC:L/PR:N/UI:R/S:U/C:N/I:L/A:N',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'REQUIRED',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'NONE',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'NONE',
                  baseScore: 4.3,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 2.8,
                impactScore: 1.4,
              },
            ],
            cvssMetricV2: [
              {
                source: 'cna@vuldb.com',
                type: 'Secondary',
                cvssData: {
                  version: '2.0',
                  vectorString: 'AV:N/AC:L/Au:N/C:N/I:P/A:N',
                  accessVector: 'NETWORK',
                  accessComplexity: 'LOW',
                  authentication: 'NONE',
                  confidentialityImpact: 'NONE',
                  integrityImpact: 'PARTIAL',
                  availabilityImpact: 'NONE',
                  baseScore: 5.0,
                },
                baseSeverity: 'MEDIUM',
                exploitabilityScore: 10.0,
                impactScore: 2.9,
                acInsufInfo: false,
                obtainAllPrivilege: false,
                obtainUserPrivilege: false,
                obtainOtherPrivilege: false,
                userInteractionRequired: false,
              },
            ],
          },
          weaknesses: [
            {
              source: 'cna@vuldb.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-79',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://vuldb.com/?ctiid.238573',
              source: 'cna@vuldb.com',
            },
            {
              url: 'https://vuldb.com/?id.238573',
              source: 'cna@vuldb.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-4711',
          sourceIdentifier: 'cna@vuldb.com',
          published: '2023-09-01T20:15:08.310',
          lastModified: '2023-09-01T21:15:30.513',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'A vulnerability, which was classified as critical, has been found in D-Link DAR-8000-10 up to 20230819. Affected by this issue is some unknown functionality of the file /log/decodmail.php. The manipulation of the argument file leads to os command injection. The attack may be launched remotely. The complexity of an attack is rather high. The exploitation is known to be difficult. The exploit has been disclosed to the public and may be used. VDB-238574 is the identifier assigned to this vulnerability. NOTE: The vendor was contacted early about this disclosure but did not respond in any way.',
            },
          ],
          metrics: {
            cvssMetricV30: [
              {
                source: 'cna@vuldb.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.0',
                  vectorString: 'CVSS:3.0/AV:N/AC:H/PR:L/UI:N/S:U/C:L/I:L/A:L',
                  attackVector: 'NETWORK',
                  attackComplexity: 'HIGH',
                  privilegesRequired: 'LOW',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'LOW',
                  baseScore: 5.0,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 1.6,
                impactScore: 3.4,
              },
            ],
            cvssMetricV2: [
              {
                source: 'cna@vuldb.com',
                type: 'Secondary',
                cvssData: {
                  version: '2.0',
                  vectorString: 'AV:N/AC:H/Au:S/C:P/I:P/A:P',
                  accessVector: 'NETWORK',
                  accessComplexity: 'HIGH',
                  authentication: 'SINGLE',
                  confidentialityImpact: 'PARTIAL',
                  integrityImpact: 'PARTIAL',
                  availabilityImpact: 'PARTIAL',
                  baseScore: 4.6,
                },
                baseSeverity: 'MEDIUM',
                exploitabilityScore: 3.9,
                impactScore: 6.4,
                acInsufInfo: false,
                obtainAllPrivilege: false,
                obtainUserPrivilege: false,
                obtainOtherPrivilege: false,
                userInteractionRequired: false,
              },
            ],
          },
          weaknesses: [
            {
              source: 'cna@vuldb.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-78',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://github.com/TinkAnet/cve/blob/main/rce.md',
              source: 'cna@vuldb.com',
            },
            {
              url: 'https://vuldb.com/?ctiid.238574',
              source: 'cna@vuldb.com',
            },
            {
              url: 'https://vuldb.com/?id.238574',
              source: 'cna@vuldb.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-4712',
          sourceIdentifier: 'cna@vuldb.com',
          published: '2023-09-01T20:15:08.473',
          lastModified: '2023-09-01T21:15:30.513',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'A vulnerability, which was classified as critical, was found in Xintian Smart Table Integrated Management System 5.6.9. This affects an unknown part of the file /SysManage/AddUpdateRole.aspx. The manipulation of the argument txtRoleName leads to sql injection. The exploit has been disclosed to the public and may be used. The associated identifier of this vulnerability is VDB-238575. NOTE: The vendor was contacted early about this disclosure but did not respond in any way.',
            },
          ],
          metrics: {
            cvssMetricV30: [
              {
                source: 'cna@vuldb.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.0',
                  vectorString: 'CVSS:3.0/AV:A/AC:L/PR:L/UI:N/S:U/C:L/I:L/A:L',
                  attackVector: 'ADJACENT_NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'LOW',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'LOW',
                  baseScore: 5.5,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 2.1,
                impactScore: 3.4,
              },
            ],
            cvssMetricV2: [
              {
                source: 'cna@vuldb.com',
                type: 'Secondary',
                cvssData: {
                  version: '2.0',
                  vectorString: 'AV:A/AC:L/Au:S/C:P/I:P/A:P',
                  accessVector: 'ADJACENT_NETWORK',
                  accessComplexity: 'LOW',
                  authentication: 'SINGLE',
                  confidentialityImpact: 'PARTIAL',
                  integrityImpact: 'PARTIAL',
                  availabilityImpact: 'PARTIAL',
                  baseScore: 5.2,
                },
                baseSeverity: 'MEDIUM',
                exploitabilityScore: 5.1,
                impactScore: 6.4,
                acInsufInfo: false,
                obtainAllPrivilege: false,
                obtainUserPrivilege: false,
                obtainOtherPrivilege: false,
                userInteractionRequired: false,
              },
            ],
          },
          weaknesses: [
            {
              source: 'cna@vuldb.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-89',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://github.com/wpay65249519/cve/blob/main/SQL_injection.md',
              source: 'cna@vuldb.com',
            },
            {
              url: 'https://vuldb.com/?ctiid.238575',
              source: 'cna@vuldb.com',
            },
            {
              url: 'https://vuldb.com/?id.238575',
              source: 'cna@vuldb.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-4713',
          sourceIdentifier: 'cna@vuldb.com',
          published: '2023-09-01T20:15:08.680',
          lastModified: '2023-09-01T21:15:30.513',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'A vulnerability has been found in IBOS OA 4.5.5 and classified as critical. This vulnerability affects the function addComment of the file ?r=weibo/comment/addcomment. The manipulation of the argument touid leads to sql injection. The exploit has been disclosed to the public and may be used. The identifier of this vulnerability is VDB-238576. NOTE: The vendor was contacted early about this disclosure but did not respond in any way.',
            },
          ],
          metrics: {
            cvssMetricV30: [
              {
                source: 'cna@vuldb.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.0',
                  vectorString: 'CVSS:3.0/AV:A/AC:L/PR:L/UI:N/S:U/C:L/I:L/A:L',
                  attackVector: 'ADJACENT_NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'LOW',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'LOW',
                  baseScore: 5.5,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 2.1,
                impactScore: 3.4,
              },
            ],
            cvssMetricV2: [
              {
                source: 'cna@vuldb.com',
                type: 'Secondary',
                cvssData: {
                  version: '2.0',
                  vectorString: 'AV:A/AC:L/Au:S/C:P/I:P/A:P',
                  accessVector: 'ADJACENT_NETWORK',
                  accessComplexity: 'LOW',
                  authentication: 'SINGLE',
                  confidentialityImpact: 'PARTIAL',
                  integrityImpact: 'PARTIAL',
                  availabilityImpact: 'PARTIAL',
                  baseScore: 5.2,
                },
                baseSeverity: 'MEDIUM',
                exploitabilityScore: 5.1,
                impactScore: 6.4,
                acInsufInfo: false,
                obtainAllPrivilege: false,
                obtainUserPrivilege: false,
                obtainOtherPrivilege: false,
                userInteractionRequired: false,
              },
            ],
          },
          weaknesses: [
            {
              source: 'cna@vuldb.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-89',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://github.com/13aiZe1/cve/blob/main/sql.md',
              source: 'cna@vuldb.com',
            },
            {
              url: 'https://vuldb.com/?ctiid.238576',
              source: 'cna@vuldb.com',
            },
            {
              url: 'https://vuldb.com/?id.238576',
              source: 'cna@vuldb.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-4714',
          sourceIdentifier: 'cna@vuldb.com',
          published: '2023-09-01T20:15:08.890',
          lastModified: '2023-09-02T15:15:27.907',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'A vulnerability was found in PlayTube 3.0.1 and classified as problematic. This issue affects some unknown processing of the component Redirect Handler. The manipulation leads to information disclosure. The attack may be initiated remotely. The identifier VDB-238577 was assigned to this vulnerability. NOTE: The vendor was contacted early about this disclosure but did not respond in any way.',
            },
          ],
          metrics: {
            cvssMetricV30: [
              {
                source: 'cna@vuldb.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.0',
                  vectorString: 'CVSS:3.0/AV:N/AC:L/PR:L/UI:N/S:U/C:L/I:N/A:N',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'LOW',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'NONE',
                  availabilityImpact: 'NONE',
                  baseScore: 4.3,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 2.8,
                impactScore: 1.4,
              },
            ],
            cvssMetricV2: [
              {
                source: 'cna@vuldb.com',
                type: 'Secondary',
                cvssData: {
                  version: '2.0',
                  vectorString: 'AV:N/AC:L/Au:S/C:P/I:N/A:N',
                  accessVector: 'NETWORK',
                  accessComplexity: 'LOW',
                  authentication: 'SINGLE',
                  confidentialityImpact: 'PARTIAL',
                  integrityImpact: 'NONE',
                  availabilityImpact: 'NONE',
                  baseScore: 4.0,
                },
                baseSeverity: 'MEDIUM',
                exploitabilityScore: 8.0,
                impactScore: 2.9,
                acInsufInfo: false,
                obtainAllPrivilege: false,
                obtainUserPrivilege: false,
                obtainOtherPrivilege: false,
                userInteractionRequired: false,
              },
            ],
          },
          weaknesses: [
            {
              source: 'cna@vuldb.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-200',
                },
              ],
            },
          ],
          references: [
            {
              url: 'http://packetstormsecurity.com/files/174446/PlayTube-3.0.1-Information-Disclosure.html',
              source: 'cna@vuldb.com',
            },
            {
              url: 'https://vuldb.com/?ctiid.238577',
              source: 'cna@vuldb.com',
            },
            {
              url: 'https://vuldb.com/?id.238577',
              source: 'cna@vuldb.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-3297',
          sourceIdentifier: 'security@ubuntu.com',
          published: '2023-09-01T21:15:07.977',
          lastModified: '2023-09-01T21:15:30.513',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                "In Ubuntu's accountsservice an unprivileged local attacker can trigger a use-after-free vulnerability in accountsservice by sending a D-Bus message to the accounts-daemon process.",
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'security@ubuntu.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:L/AC:H/PR:N/UI:N/S:C/C:H/I:H/A:H',
                  attackVector: 'LOCAL',
                  attackComplexity: 'HIGH',
                  privilegesRequired: 'NONE',
                  userInteraction: 'NONE',
                  scope: 'CHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'HIGH',
                  availabilityImpact: 'HIGH',
                  baseScore: 8.1,
                  baseSeverity: 'HIGH',
                },
                exploitabilityScore: 1.4,
                impactScore: 6.0,
              },
            ],
          },
          weaknesses: [
            {
              source: 'security@ubuntu.com',
              type: 'Secondary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-416',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://bugs.launchpad.net/ubuntu/+source/accountsservice/+bug/2024182',
              source: 'security@ubuntu.com',
            },
            {
              url: 'https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2023-3297',
              source: 'security@ubuntu.com',
            },
            {
              url: 'https://securitylab.github.com/advisories/GHSL-2023-139_accountsservice/',
              source: 'security@ubuntu.com',
            },
            {
              url: 'https://ubuntu.com/security/notices/USN-6190-1',
              source: 'security@ubuntu.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-4718',
          sourceIdentifier: 'security@wordfence.com',
          published: '2023-09-02T04:15:09.933',
          lastModified: '2023-09-04T00:06:16.703',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                "The Font Awesome 4 Menus plugin for WordPress is vulnerable to Stored Cross-Site Scripting via the 'fa' and 'fa-stack' shortcodes in versions up to, and including, 4.7.0 due to insufficient input sanitization and output escaping on user supplied attributes. This makes it possible for authenticated attackers with contributor-level and above permissions to inject arbitrary web scripts in pages that will execute whenever a user accesses an injected page.",
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'security@wordfence.com',
                type: 'Primary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:C/C:L/I:L/A:N',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'LOW',
                  userInteraction: 'NONE',
                  scope: 'CHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'NONE',
                  baseScore: 6.4,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 3.1,
                impactScore: 2.7,
              },
            ],
          },
          weaknesses: [
            {
              source: 'security@wordfence.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-79',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://plugins.trac.wordpress.org/browser/font-awesome-4-menus/trunk/n9m-font-awesome-4.php?rev=1526295#L197',
              source: 'security@wordfence.com',
            },
            {
              url: 'https://plugins.trac.wordpress.org/browser/font-awesome-4-menus/trunk/n9m-font-awesome-4.php?rev=1526295#L214',
              source: 'security@wordfence.com',
            },
            {
              url: 'https://www.wordfence.com/threat-intel/vulnerabilities/id/dc59510c-6eaf-4526-8acb-c07e39923ad9?source=cve',
              source: 'security@wordfence.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-39979',
          sourceIdentifier: 'psirt@moxa.com',
          published: '2023-09-02T13:15:44.733',
          lastModified: '2023-09-04T00:06:16.703',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'There is a vulnerability in MXsecurity versions prior to 1.0.1 that can be exploited to bypass authentication. A remote attacker might access the system if the web service authenticator has insufficient random values.  \n\n',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'psirt@moxa.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'HIGH',
                  availabilityImpact: 'HIGH',
                  baseScore: 9.8,
                  baseSeverity: 'CRITICAL',
                },
                exploitabilityScore: 3.9,
                impactScore: 5.9,
              },
            ],
          },
          weaknesses: [
            {
              source: 'psirt@moxa.com',
              type: 'Secondary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-334',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://www.moxa.com/en/support/product-support/security-advisory/mpsa-230403-mxsecurity-series-multiple-vulnerabilities',
              source: 'psirt@moxa.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-39980',
          sourceIdentifier: 'psirt@moxa.com',
          published: '2023-09-02T13:15:45.173',
          lastModified: '2023-09-04T00:06:16.703',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'A vulnerability that allows the unauthorized disclosure of authenticated information has been identified in MXsecurity versions prior to v1.0.1. This vulnerability arises when special elements are not neutralized correctly, allowing remote attackers to alter SQL commands.\n\n',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'psirt@moxa.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:L/I:H/A:N',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'LOW',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'HIGH',
                  availabilityImpact: 'NONE',
                  baseScore: 7.1,
                  baseSeverity: 'HIGH',
                },
                exploitabilityScore: 2.8,
                impactScore: 4.2,
              },
            ],
          },
          weaknesses: [
            {
              source: 'psirt@moxa.com',
              type: 'Secondary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-89',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://www.moxa.com/en/support/product-support/security-advisory/mpsa-230403-mxsecurity-series-multiple-vulnerabilities',
              source: 'psirt@moxa.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-39981',
          sourceIdentifier: 'psirt@moxa.com',
          published: '2023-09-02T13:15:45.257',
          lastModified: '2023-09-04T00:06:16.703',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'A vulnerability that allows for unauthorized access has been discovered in MXsecurity versions prior to v1.0.1. This vulnerability arises from inadequate authentication measures, potentially leading to the disclosure of device information by a remote attacker.\n\n',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'psirt@moxa.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:N/A:N',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'NONE',
                  availabilityImpact: 'NONE',
                  baseScore: 7.5,
                  baseSeverity: 'HIGH',
                },
                exploitabilityScore: 3.9,
                impactScore: 3.6,
              },
            ],
          },
          weaknesses: [
            {
              source: 'psirt@moxa.com',
              type: 'Secondary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-287',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://www.moxa.com/en/support/product-support/security-advisory/mpsa-230403-mxsecurity-series-multiple-vulnerabilities',
              source: 'psirt@moxa.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-39982',
          sourceIdentifier: 'psirt@moxa.com',
          published: '2023-09-02T13:15:45.347',
          lastModified: '2023-09-04T00:06:16.703',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'A vulnerability has been identified in MXsecurity versions prior to v1.0.1. The vulnerability may put the confidentiality and integrity of SSH communications at risk on the affected device. This vulnerability is attributed to a hard-coded SSH host key, which might facilitate man-in-the-middle attacks and enable the decryption of SSH traffic.\n\n',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'psirt@moxa.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:N/A:N',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'NONE',
                  availabilityImpact: 'NONE',
                  baseScore: 7.5,
                  baseSeverity: 'HIGH',
                },
                exploitabilityScore: 3.9,
                impactScore: 3.6,
              },
            ],
          },
          weaknesses: [
            {
              source: 'psirt@moxa.com',
              type: 'Secondary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-798',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://www.moxa.com/en/support/product-support/security-advisory/mpsa-230403-mxsecurity-series-multiple-vulnerabilities',
              source: 'psirt@moxa.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-39983',
          sourceIdentifier: 'psirt@moxa.com',
          published: '2023-09-02T13:15:45.427',
          lastModified: '2023-09-04T00:06:16.703',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'A vulnerability that poses a potential risk of polluting the MXsecurity sqlite database and the nsm-web UI has been identified in MXsecurity versions prior to v1.0.1. This vulnerability might allow an unauthenticated remote attacker to register or add devices via the nsm-web application.\n\n',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'psirt@moxa.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:L/A:N',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'NONE',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'NONE',
                  baseScore: 5.3,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 3.9,
                impactScore: 1.4,
              },
            ],
          },
          weaknesses: [
            {
              source: 'psirt@moxa.com',
              type: 'Secondary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-915',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://www.moxa.com/en/support/product-support/security-advisory/mpsa-230403-mxsecurity-series-multiple-vulnerabilities',
              source: 'psirt@moxa.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-4734',
          sourceIdentifier: 'security@huntr.dev',
          published: '2023-09-02T18:15:17.127',
          lastModified: '2023-09-04T00:06:16.703',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Integer Overflow or Wraparound in GitHub repository vim/vim prior to 9.0.1846.',
            },
          ],
          metrics: {
            cvssMetricV30: [
              {
                source: 'security@huntr.dev',
                type: 'Secondary',
                cvssData: {
                  version: '3.0',
                  vectorString: 'CVSS:3.0/AV:L/AC:L/PR:N/UI:R/S:U/C:H/I:H/A:H',
                  attackVector: 'LOCAL',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'REQUIRED',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'HIGH',
                  availabilityImpact: 'HIGH',
                  baseScore: 7.8,
                  baseSeverity: 'HIGH',
                },
                exploitabilityScore: 1.8,
                impactScore: 5.9,
              },
            ],
          },
          weaknesses: [
            {
              source: 'security@huntr.dev',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-190',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://github.com/vim/vim/commit/4c6fe2e2ea62469642ed1d80b16d39e616b25cf5',
              source: 'security@huntr.dev',
            },
            {
              url: 'https://huntr.dev/bounties/688e4382-d2b6-439a-a54e-484780f82217',
              source: 'security@huntr.dev',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-4735',
          sourceIdentifier: 'security@huntr.dev',
          published: '2023-09-02T18:15:20.637',
          lastModified: '2023-09-04T00:06:16.703',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Out-of-bounds Write in GitHub repository vim/vim prior to 9.0.1847.',
            },
          ],
          metrics: {
            cvssMetricV30: [
              {
                source: 'security@huntr.dev',
                type: 'Secondary',
                cvssData: {
                  version: '3.0',
                  vectorString: 'CVSS:3.0/AV:L/AC:L/PR:L/UI:R/S:U/C:L/I:L/A:L',
                  attackVector: 'LOCAL',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'LOW',
                  userInteraction: 'REQUIRED',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'LOW',
                  baseScore: 4.8,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 1.3,
                impactScore: 3.4,
              },
            ],
          },
          weaknesses: [
            {
              source: 'security@huntr.dev',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-787',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://github.com/vim/vim/commit/889f6af37164775192e33b233a90e86fd3df0f57',
              source: 'security@huntr.dev',
            },
            {
              url: 'https://huntr.dev/bounties/fc83bde3-f621-42bd-aecb-8c1ae44cba51',
              source: 'security@huntr.dev',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-4736',
          sourceIdentifier: 'security@huntr.dev',
          published: '2023-09-02T19:15:44.863',
          lastModified: '2023-09-04T00:06:16.703',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Untrusted Search Path in GitHub repository vim/vim prior to 9.0.1833.',
            },
          ],
          metrics: {
            cvssMetricV30: [
              {
                source: 'security@huntr.dev',
                type: 'Secondary',
                cvssData: {
                  version: '3.0',
                  vectorString: 'CVSS:3.0/AV:L/AC:L/PR:N/UI:R/S:U/C:H/I:H/A:H',
                  attackVector: 'LOCAL',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'REQUIRED',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'HIGH',
                  availabilityImpact: 'HIGH',
                  baseScore: 7.8,
                  baseSeverity: 'HIGH',
                },
                exploitabilityScore: 1.8,
                impactScore: 5.9,
              },
            ],
          },
          weaknesses: [
            {
              source: 'security@huntr.dev',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-426',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://github.com/vim/vim/commit/816fbcc262687b81fc46f82f7bbeb1453addfe0c',
              source: 'security@huntr.dev',
            },
            {
              url: 'https://huntr.dev/bounties/e1ce0995-4df4-4dec-9cd7-3136ac3e8e71',
              source: 'security@huntr.dev',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-4738',
          sourceIdentifier: 'security@huntr.dev',
          published: '2023-09-02T20:15:07.413',
          lastModified: '2023-09-04T00:06:16.703',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Heap-based Buffer Overflow in GitHub repository vim/vim prior to 9.0.1848.',
            },
          ],
          metrics: {
            cvssMetricV30: [
              {
                source: 'security@huntr.dev',
                type: 'Secondary',
                cvssData: {
                  version: '3.0',
                  vectorString: 'CVSS:3.0/AV:L/AC:L/PR:N/UI:R/S:U/C:H/I:H/A:H',
                  attackVector: 'LOCAL',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'REQUIRED',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'HIGH',
                  availabilityImpact: 'HIGH',
                  baseScore: 7.8,
                  baseSeverity: 'HIGH',
                },
                exploitabilityScore: 1.8,
                impactScore: 5.9,
              },
            ],
          },
          weaknesses: [
            {
              source: 'security@huntr.dev',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-122',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://github.com/vim/vim/commit/ced2c7394aafdc90fb7845e09b3a3fee23d48cb1',
              source: 'security@huntr.dev',
            },
            {
              url: 'https://huntr.dev/bounties/9fc7dced-a7bb-4479-9718-f956df20f612',
              source: 'security@huntr.dev',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-38387',
          sourceIdentifier: 'audit@patchstack.com',
          published: '2023-09-03T12:15:41.077',
          lastModified: '2023-09-04T00:06:16.703',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Auth. (admin+) Stored Cross-Site Scripting (XSS) vulnerability in Elastic Email Sender plugin <= 1.2.6 versions.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'audit@patchstack.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:H/UI:R/S:C/C:L/I:L/A:L',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'HIGH',
                  userInteraction: 'REQUIRED',
                  scope: 'CHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'LOW',
                  baseScore: 5.9,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 1.7,
                impactScore: 3.7,
              },
            ],
          },
          weaknesses: [
            {
              source: 'audit@patchstack.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-79',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://patchstack.com/database/vulnerability/elastic-email-sender/wordpress-elastic-email-sender-plugin-1-2-6-cross-site-scripting-xss?_s_id=cve',
              source: 'audit@patchstack.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-38476',
          sourceIdentifier: 'audit@patchstack.com',
          published: '2023-09-03T12:15:42.053',
          lastModified: '2023-09-04T00:06:16.703',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Auth. (admin+) Stored Cross-Site Scripting (XSS) vulnerability in SuiteDash :: ONE Dashboard® Client Portal : SuiteDash Direct Login plugin <= 1.7.6 versions.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'audit@patchstack.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:H/UI:R/S:C/C:L/I:L/A:L',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'HIGH',
                  userInteraction: 'REQUIRED',
                  scope: 'CHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'LOW',
                  baseScore: 5.9,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 1.7,
                impactScore: 3.7,
              },
            ],
          },
          weaknesses: [
            {
              source: 'audit@patchstack.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-79',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://patchstack.com/database/vulnerability/client-portal-suitedash-login/wordpress-client-portal-suitedash-direct-login-plugin-1-7-3-cross-site-scripting-xss?_s_id=cve',
              source: 'audit@patchstack.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-38482',
          sourceIdentifier: 'audit@patchstack.com',
          published: '2023-09-03T12:15:42.140',
          lastModified: '2023-09-04T00:06:16.703',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Auth. (admin+) Stored Cross-Site Scripting (XSS) vulnerability in QualityUnit Post Affiliate Pro plugin <= 1.25.0 versions.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'audit@patchstack.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:H/UI:R/S:C/C:L/I:L/A:L',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'HIGH',
                  userInteraction: 'REQUIRED',
                  scope: 'CHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'LOW',
                  baseScore: 5.9,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 1.7,
                impactScore: 3.7,
              },
            ],
          },
          weaknesses: [
            {
              source: 'audit@patchstack.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-79',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://patchstack.com/database/vulnerability/postaffiliatepro/wordpress-post-affiliate-pro-plugin-1-24-9-cross-site-scripting-xss?_s_id=cve',
              source: 'audit@patchstack.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-38516',
          sourceIdentifier: 'audit@patchstack.com',
          published: '2023-09-03T12:15:42.227',
          lastModified: '2023-09-04T00:06:16.703',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Auth. (contributor+) Stored Cross-Site Scripting (XSS) vulnerability in WP OnlineSupport, Essential Plugin Audio Player with Playlist Ultimate plugin <= 1.2.2 versions.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'audit@patchstack.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:L/UI:R/S:C/C:L/I:L/A:L',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'LOW',
                  userInteraction: 'REQUIRED',
                  scope: 'CHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'LOW',
                  baseScore: 6.5,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 2.3,
                impactScore: 3.7,
              },
            ],
          },
          weaknesses: [
            {
              source: 'audit@patchstack.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-79',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://patchstack.com/database/vulnerability/audio-player-with-playlist-ultimate/wordpress-audio-player-with-playlist-ultimate-plugin-1-2-2-cross-site-scripting-xss?_s_id=cve',
              source: 'audit@patchstack.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-38517',
          sourceIdentifier: 'audit@patchstack.com',
          published: '2023-09-03T12:15:42.317',
          lastModified: '2023-09-04T00:06:16.703',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Auth. (admin+) Stored Cross-Site Scripting (XSS) vulnerability in Realwebcare WRC Pricing Tables plugin <= 2.3.7 versions.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'audit@patchstack.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:H/UI:R/S:C/C:L/I:L/A:L',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'HIGH',
                  userInteraction: 'REQUIRED',
                  scope: 'CHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'LOW',
                  baseScore: 5.9,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 1.7,
                impactScore: 3.7,
              },
            ],
          },
          weaknesses: [
            {
              source: 'audit@patchstack.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-79',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://patchstack.com/database/vulnerability/wrc-pricing-tables/wordpress-wrc-pricing-tables-plugin-2-3-4-cross-site-scripting-xss?_s_id=cve',
              source: 'audit@patchstack.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-38518',
          sourceIdentifier: 'audit@patchstack.com',
          published: '2023-09-03T12:15:42.403',
          lastModified: '2023-09-04T00:06:16.703',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Auth. (admin+) Stored Cross-Site Scripting (XSS) vulnerability in Visualmodo Borderless plugin <= 1.4.8 versions.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'audit@patchstack.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:H/UI:R/S:C/C:L/I:L/A:L',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'HIGH',
                  userInteraction: 'REQUIRED',
                  scope: 'CHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'LOW',
                  baseScore: 5.9,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 1.7,
                impactScore: 3.7,
              },
            ],
          },
          weaknesses: [
            {
              source: 'audit@patchstack.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-79',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://patchstack.com/database/vulnerability/borderless/wordpress-borderless-plugin-1-4-7-cross-site-scripting-xss?_s_id=cve',
              source: 'audit@patchstack.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-38521',
          sourceIdentifier: 'audit@patchstack.com',
          published: '2023-09-03T12:15:42.483',
          lastModified: '2023-09-04T00:06:16.703',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Auth. (admin+) Stored Cross-Site Scripting (XSS) vulnerability in Exifography plugin <= 1.3.1 versions.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'audit@patchstack.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:H/UI:R/S:C/C:L/I:L/A:L',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'HIGH',
                  userInteraction: 'REQUIRED',
                  scope: 'CHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'LOW',
                  baseScore: 5.9,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 1.7,
                impactScore: 3.7,
              },
            ],
          },
          weaknesses: [
            {
              source: 'audit@patchstack.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-79',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://patchstack.com/database/vulnerability/thesography/wordpress-exifography-plugin-1-3-1-cross-site-scripting-xss?_s_id=cve',
              source: 'audit@patchstack.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-37220',
          sourceIdentifier: 'cna@cyber.gov.il',
          published: '2023-09-03T14:15:41.587',
          lastModified: '2023-09-04T00:06:16.703',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                '\nSynel Terminals - CWE-494: Download of Code Without Integrity Check\n\n',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'cna@cyber.gov.il',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:H/UI:N/S:U/C:H/I:H/A:H',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'HIGH',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'HIGH',
                  availabilityImpact: 'HIGH',
                  baseScore: 7.2,
                  baseSeverity: 'HIGH',
                },
                exploitabilityScore: 1.2,
                impactScore: 5.9,
              },
            ],
          },
          weaknesses: [
            {
              source: 'cna@cyber.gov.il',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-494',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://www.gov.il/en/Departments/faq/cve_advisories',
              source: 'cna@cyber.gov.il',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-37221',
          sourceIdentifier: 'cna@cyber.gov.il',
          published: '2023-09-03T14:15:42.550',
          lastModified: '2023-09-04T00:06:16.703',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                "\n7Twenty BOT - CWE-79: Improper Neutralization of Input During Web Page Generation ('Cross-site Scripting').\n\n",
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'cna@cyber.gov.il',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:C/C:L/I:L/A:H',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'REQUIRED',
                  scope: 'CHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'HIGH',
                  baseScore: 8.8,
                  baseSeverity: 'HIGH',
                },
                exploitabilityScore: 2.8,
                impactScore: 5.3,
              },
            ],
          },
          weaknesses: [
            {
              source: 'cna@cyber.gov.il',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-79',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://www.gov.il/en/Departments/faq/cve_advisories',
              source: 'cna@cyber.gov.il',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-37222',
          sourceIdentifier: 'cna@cyber.gov.il',
          published: '2023-09-03T15:15:12.520',
          lastModified: '2023-09-04T00:06:16.703',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                '\n\n\n\n\nFarsight Tech Nordic AB ProVide version 14.5 - Multiple XSS vulnerabilities (CWE-79) can be exploited by a user with administrator privilege.\n\n\n\n',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'cna@cyber.gov.il',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:H/UI:R/S:C/C:L/I:L/A:N',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'HIGH',
                  userInteraction: 'REQUIRED',
                  scope: 'CHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'NONE',
                  baseScore: 4.8,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 1.7,
                impactScore: 2.7,
              },
            ],
          },
          weaknesses: [
            {
              source: 'cna@cyber.gov.il',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-79',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://www.gov.il/en/Departments/faq/cve_advisories',
              source: 'cna@cyber.gov.il',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-39369',
          sourceIdentifier: 'cna@cyber.gov.il',
          published: '2023-09-03T15:15:13.537',
          lastModified: '2023-09-04T00:06:16.703',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                '\nStarTrinity Softswitch version 2023-02-16 - Multiple Reflected XSS (CWE-79)\n\n\n',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'cna@cyber.gov.il',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:C/C:L/I:L/A:H',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'REQUIRED',
                  scope: 'CHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'HIGH',
                  baseScore: 8.8,
                  baseSeverity: 'HIGH',
                },
                exploitabilityScore: 2.8,
                impactScore: 5.3,
              },
            ],
          },
          weaknesses: [
            {
              source: 'cna@cyber.gov.il',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-79',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://www.gov.il/en/Departments/faq/cve_advisories',
              source: 'cna@cyber.gov.il',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-39370',
          sourceIdentifier: 'cna@cyber.gov.il',
          published: '2023-09-03T15:15:13.857',
          lastModified: '2023-09-04T00:06:16.703',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                '\n\n\nStarTrinity Softswitch version 2023-02-16 - Persistent XSS (CWE-79)\n\n\n\n\n',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'cna@cyber.gov.il',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:C/C:L/I:L/A:H',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'REQUIRED',
                  scope: 'CHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'HIGH',
                  baseScore: 8.8,
                  baseSeverity: 'HIGH',
                },
                exploitabilityScore: 2.8,
                impactScore: 5.3,
              },
            ],
          },
          weaknesses: [
            {
              source: 'cna@cyber.gov.il',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-79',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://www.gov.il/en/Departments/faq/cve_advisories',
              source: 'cna@cyber.gov.il',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-39371',
          sourceIdentifier: 'cna@cyber.gov.il',
          published: '2023-09-03T15:15:13.990',
          lastModified: '2023-09-04T00:06:16.703',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                '\n\n\nStarTrinity Softswitch version 2023-02-16 - Open Redirect (CWE-601)\n\n\n\n',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'cna@cyber.gov.il',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:C/C:L/I:L/A:H',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'REQUIRED',
                  scope: 'CHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'HIGH',
                  baseScore: 8.8,
                  baseSeverity: 'HIGH',
                },
                exploitabilityScore: 2.8,
                impactScore: 5.3,
              },
            ],
          },
          weaknesses: [
            {
              source: 'cna@cyber.gov.il',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-601',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://www.gov.il/en/Departments/faq/cve_advisories',
              source: 'cna@cyber.gov.il',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-39372',
          sourceIdentifier: 'cna@cyber.gov.il',
          published: '2023-09-03T15:15:14.127',
          lastModified: '2023-09-04T00:06:16.703',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                '\n\n\nStarTrinity Softswitch version 2023-02-16 - Multiple CSRF (CWE-352)\n\n\n\n\n\n',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'cna@cyber.gov.il',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:U/C:N/I:H/A:H',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'REQUIRED',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'NONE',
                  integrityImpact: 'HIGH',
                  availabilityImpact: 'HIGH',
                  baseScore: 8.1,
                  baseSeverity: 'HIGH',
                },
                exploitabilityScore: 2.8,
                impactScore: 5.2,
              },
            ],
          },
          weaknesses: [
            {
              source: 'cna@cyber.gov.il',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-352',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://www.gov.il/en/Departments/faq/cve_advisories',
              source: 'cna@cyber.gov.il',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-39373',
          sourceIdentifier: 'cna@cyber.gov.il',
          published: '2023-09-03T15:15:14.283',
          lastModified: '2023-09-04T00:06:16.703',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                '\n A Hyundai model (2017) - CWE-294: Authentication Bypass by Capture-replay.\n\n\n',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'cna@cyber.gov.il',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:A/AC:L/PR:N/UI:N/S:C/C:N/I:N/A:H',
                  attackVector: 'ADJACENT_NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'NONE',
                  scope: 'CHANGED',
                  confidentialityImpact: 'NONE',
                  integrityImpact: 'NONE',
                  availabilityImpact: 'HIGH',
                  baseScore: 7.4,
                  baseSeverity: 'HIGH',
                },
                exploitabilityScore: 2.8,
                impactScore: 4.0,
              },
            ],
          },
          weaknesses: [
            {
              source: 'cna@cyber.gov.il',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-294',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://www.gov.il/en/Departments/faq/cve_advisories',
              source: 'cna@cyber.gov.il',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-39374',
          sourceIdentifier: 'cna@cyber.gov.il',
          published: '2023-09-03T15:15:14.453',
          lastModified: '2023-09-04T00:06:16.703',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                '\nForeScout NAC SecureConnector version 11.2 - CWE-427: Uncontrolled Search Path Element\n\n\n',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'cna@cyber.gov.il',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:L/AC:L/PR:N/UI:R/S:U/C:H/I:H/A:H',
                  attackVector: 'LOCAL',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'REQUIRED',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'HIGH',
                  availabilityImpact: 'HIGH',
                  baseScore: 7.8,
                  baseSeverity: 'HIGH',
                },
                exploitabilityScore: 1.8,
                impactScore: 5.9,
              },
            ],
          },
          weaknesses: [
            {
              source: 'cna@cyber.gov.il',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-427',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://www.gov.il/en/Departments/faq/cve_advisories',
              source: 'cna@cyber.gov.il',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-3703',
          sourceIdentifier: 'cna@cyber.gov.il',
          published: '2023-09-03T15:15:14.647',
          lastModified: '2023-09-04T00:06:16.703',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                '\n\n\n\n\n\n\n\n\nProscend Advice ICR Series routers FW version 1.76 - CWE-1392: Use of Default Credentials',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'cna@cyber.gov.il',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:H/A:H',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'NONE',
                  scope: 'CHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'HIGH',
                  availabilityImpact: 'HIGH',
                  baseScore: 10.0,
                  baseSeverity: 'CRITICAL',
                },
                exploitabilityScore: 3.9,
                impactScore: 6.0,
              },
            ],
          },
          weaknesses: [
            {
              source: 'cna@cyber.gov.il',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-1392',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://www.gov.il/en/Departments/faq/cve_advisories',
              source: 'cna@cyber.gov.il',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-41180',
          sourceIdentifier: 'security@apache.org',
          published: '2023-09-03T16:15:10.823',
          lastModified: '2023-09-04T00:06:16.703',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Incorrect certificate validation in InvokeHTTP on Apache NiFi MiNiFi C++ versions 0.13 to 0.14 allows an intermediary to present a forged certificate during TLS handshake negotation. The Disable Peer Verification property of InvokeHTTP was effectively flipped,  disabling verification by default, when using HTTPS.\n\nMitigation: Set the Disable Peer Verification property of InvokeHTTP to true when using MiNiFi C++ versions 0.13.0 or 0.14.0. Upgrading to MiNiFi C++ 0.15.0 corrects the default behavior.\n\n',
            },
          ],
          metrics: {},
          weaknesses: [
            {
              source: 'security@apache.org',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-295',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://lists.apache.org/thread/b51f8csysg1pvgs6xjjrq5hrjrvfot1y',
              source: 'security@apache.org',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-4751',
          sourceIdentifier: 'security@huntr.dev',
          published: '2023-09-03T19:15:43.677',
          lastModified: '2023-09-04T00:06:16.703',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Heap-based Buffer Overflow in GitHub repository vim/vim prior to 9.0.1331.',
            },
          ],
          metrics: {
            cvssMetricV30: [
              {
                source: 'security@huntr.dev',
                type: 'Secondary',
                cvssData: {
                  version: '3.0',
                  vectorString: 'CVSS:3.0/AV:L/AC:L/PR:N/UI:R/S:U/C:H/I:H/A:H',
                  attackVector: 'LOCAL',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'REQUIRED',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'HIGH',
                  availabilityImpact: 'HIGH',
                  baseScore: 7.8,
                  baseSeverity: 'HIGH',
                },
                exploitabilityScore: 1.8,
                impactScore: 5.9,
              },
            ],
          },
          weaknesses: [
            {
              source: 'security@huntr.dev',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-122',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://github.com/vim/vim/commit/e1121b139480f53d1b06f84f3e4574048108fa0b',
              source: 'security@huntr.dev',
            },
            {
              url: 'https://huntr.dev/bounties/db7be8d6-6cb7-4ae5-9c4e-805423afa378',
              source: 'security@huntr.dev',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-4739',
          sourceIdentifier: 'cna@vuldb.com',
          published: '2023-09-03T20:15:13.890',
          lastModified: '2023-09-04T00:06:16.703',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'A vulnerability, which was classified as critical, has been found in Beijing Baichuo Smart S85F Management Platform up to 20230820 on Smart. Affected by this issue is some unknown functionality of the file /sysmanage/updateos.php. The manipulation of the argument 1_file_upload leads to unrestricted upload. The attack may be launched remotely. The exploit has been disclosed to the public and may be used. The identifier of this vulnerability is VDB-238628. NOTE: The vendor was contacted early about this disclosure but did not respond in any way.',
            },
          ],
          metrics: {
            cvssMetricV30: [
              {
                source: 'cna@vuldb.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.0',
                  vectorString: 'CVSS:3.0/AV:N/AC:L/PR:L/UI:N/S:U/C:L/I:L/A:L',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'LOW',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'LOW',
                  baseScore: 6.3,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 2.8,
                impactScore: 3.4,
              },
            ],
            cvssMetricV2: [
              {
                source: 'cna@vuldb.com',
                type: 'Secondary',
                cvssData: {
                  version: '2.0',
                  vectorString: 'AV:N/AC:L/Au:S/C:P/I:P/A:P',
                  accessVector: 'NETWORK',
                  accessComplexity: 'LOW',
                  authentication: 'SINGLE',
                  confidentialityImpact: 'PARTIAL',
                  integrityImpact: 'PARTIAL',
                  availabilityImpact: 'PARTIAL',
                  baseScore: 6.5,
                },
                baseSeverity: 'MEDIUM',
                exploitabilityScore: 8.0,
                impactScore: 6.4,
                acInsufInfo: false,
                obtainAllPrivilege: false,
                obtainUserPrivilege: false,
                obtainOtherPrivilege: false,
                userInteractionRequired: false,
              },
            ],
          },
          weaknesses: [
            {
              source: 'cna@vuldb.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-434',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://github.com/Meizhi-hua/cve/blob/main/upload_file.md',
              source: 'cna@vuldb.com',
            },
            {
              url: 'https://vuldb.com/?ctiid.238628',
              source: 'cna@vuldb.com',
            },
            {
              url: 'https://vuldb.com/?id.238628',
              source: 'cna@vuldb.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-4740',
          sourceIdentifier: 'cna@vuldb.com',
          published: '2023-09-03T20:15:14.813',
          lastModified: '2023-09-04T00:06:16.703',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'A vulnerability, which was classified as critical, was found in IBOS OA 4.5.5. This affects an unknown part of the file ?r=email/api/delDraft&archiveId=0 of the component Delete Draft Handler. The manipulation leads to sql injection. It is possible to initiate the attack remotely. The exploit has been disclosed to the public and may be used. The identifier VDB-238629 was assigned to this vulnerability. NOTE: The vendor was contacted early about this disclosure but did not respond in any way.',
            },
          ],
          metrics: {
            cvssMetricV30: [
              {
                source: 'cna@vuldb.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.0',
                  vectorString: 'CVSS:3.0/AV:N/AC:L/PR:L/UI:N/S:U/C:L/I:L/A:L',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'LOW',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'LOW',
                  baseScore: 6.3,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 2.8,
                impactScore: 3.4,
              },
            ],
            cvssMetricV2: [
              {
                source: 'cna@vuldb.com',
                type: 'Secondary',
                cvssData: {
                  version: '2.0',
                  vectorString: 'AV:N/AC:L/Au:S/C:P/I:P/A:P',
                  accessVector: 'NETWORK',
                  accessComplexity: 'LOW',
                  authentication: 'SINGLE',
                  confidentialityImpact: 'PARTIAL',
                  integrityImpact: 'PARTIAL',
                  availabilityImpact: 'PARTIAL',
                  baseScore: 6.5,
                },
                baseSeverity: 'MEDIUM',
                exploitabilityScore: 8.0,
                impactScore: 6.4,
                acInsufInfo: false,
                obtainAllPrivilege: false,
                obtainUserPrivilege: false,
                obtainOtherPrivilege: false,
                userInteractionRequired: false,
              },
            ],
          },
          weaknesses: [
            {
              source: 'cna@vuldb.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-89',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://github.com/RCEraser/cve/blob/main/sql_inject.md',
              source: 'cna@vuldb.com',
            },
            {
              url: 'https://vuldb.com/?ctiid.238629',
              source: 'cna@vuldb.com',
            },
            {
              url: 'https://vuldb.com/?id.238629',
              source: 'cna@vuldb.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-4741',
          sourceIdentifier: 'cna@vuldb.com',
          published: '2023-09-03T23:15:39.057',
          lastModified: '2023-09-04T00:06:16.703',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'A vulnerability has been found in IBOS OA 4.5.5 and classified as critical. This vulnerability affects unknown code of the file ?r=diary/default/del of the component Delete Logs Handler. The manipulation leads to sql injection. The attack can be initiated remotely. The exploit has been disclosed to the public and may be used. VDB-238630 is the identifier assigned to this vulnerability. NOTE: The vendor was contacted early about this disclosure but did not respond in any way.',
            },
          ],
          metrics: {
            cvssMetricV30: [
              {
                source: 'cna@vuldb.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.0',
                  vectorString: 'CVSS:3.0/AV:N/AC:L/PR:L/UI:N/S:U/C:L/I:L/A:L',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'LOW',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'LOW',
                  baseScore: 6.3,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 2.8,
                impactScore: 3.4,
              },
            ],
            cvssMetricV2: [
              {
                source: 'cna@vuldb.com',
                type: 'Secondary',
                cvssData: {
                  version: '2.0',
                  vectorString: 'AV:N/AC:L/Au:S/C:P/I:P/A:P',
                  accessVector: 'NETWORK',
                  accessComplexity: 'LOW',
                  authentication: 'SINGLE',
                  confidentialityImpact: 'PARTIAL',
                  integrityImpact: 'PARTIAL',
                  availabilityImpact: 'PARTIAL',
                  baseScore: 6.5,
                },
                baseSeverity: 'MEDIUM',
                exploitabilityScore: 8.0,
                impactScore: 6.4,
                acInsufInfo: false,
                obtainAllPrivilege: false,
                obtainUserPrivilege: false,
                obtainOtherPrivilege: false,
                userInteractionRequired: false,
              },
            ],
          },
          weaknesses: [
            {
              source: 'cna@vuldb.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-89',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://github.com/wudidike/cve/blob/main/sql.md',
              source: 'cna@vuldb.com',
            },
            {
              url: 'https://vuldb.com/?ctiid.238630',
              source: 'cna@vuldb.com',
            },
            {
              url: 'https://vuldb.com/?id.238630',
              source: 'cna@vuldb.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-4742',
          sourceIdentifier: 'cna@vuldb.com',
          published: '2023-09-03T23:15:39.937',
          lastModified: '2023-09-04T00:06:16.703',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'A vulnerability was found in IBOS OA 4.5.5 and classified as critical. This issue affects some unknown processing of the file ?r=dashboard/user/export&uid=X. The manipulation leads to sql injection. The attack may be initiated remotely. The exploit has been disclosed to the public and may be used. The associated identifier of this vulnerability is VDB-238631. NOTE: The vendor was contacted early about this disclosure but did not respond in any way.',
            },
          ],
          metrics: {
            cvssMetricV30: [
              {
                source: 'cna@vuldb.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.0',
                  vectorString: 'CVSS:3.0/AV:N/AC:L/PR:L/UI:N/S:U/C:L/I:L/A:L',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'LOW',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'LOW',
                  baseScore: 6.3,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 2.8,
                impactScore: 3.4,
              },
            ],
            cvssMetricV2: [
              {
                source: 'cna@vuldb.com',
                type: 'Secondary',
                cvssData: {
                  version: '2.0',
                  vectorString: 'AV:N/AC:L/Au:S/C:P/I:P/A:P',
                  accessVector: 'NETWORK',
                  accessComplexity: 'LOW',
                  authentication: 'SINGLE',
                  confidentialityImpact: 'PARTIAL',
                  integrityImpact: 'PARTIAL',
                  availabilityImpact: 'PARTIAL',
                  baseScore: 6.5,
                },
                baseSeverity: 'MEDIUM',
                exploitabilityScore: 8.0,
                impactScore: 6.4,
                acInsufInfo: false,
                obtainAllPrivilege: false,
                obtainUserPrivilege: false,
                obtainOtherPrivilege: false,
                userInteractionRequired: false,
              },
            ],
          },
          weaknesses: [
            {
              source: 'cna@vuldb.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-89',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://github.com/gatsby2003/cve/blob/main/sql.md',
              source: 'cna@vuldb.com',
            },
            {
              url: 'https://vuldb.com/?ctiid.238631',
              source: 'cna@vuldb.com',
            },
            {
              url: 'https://vuldb.com/?id.238631',
              source: 'cna@vuldb.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-4743',
          sourceIdentifier: 'cna@vuldb.com',
          published: '2023-09-03T23:15:40.147',
          lastModified: '2023-09-04T00:06:16.703',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'A vulnerability was found in Dreamer CMS up to 4.1.3. It has been classified as problematic. Affected is an unknown function of the file /upload/ueditorConfig?action=config. The manipulation leads to files or directories accessible. It is possible to launch the attack remotely. The complexity of an attack is rather high. The exploitability is told to be difficult. The exploit has been disclosed to the public and may be used. The identifier of this vulnerability is VDB-238632. NOTE: The vendor was contacted early about this disclosure but did not respond in any way.',
            },
          ],
          metrics: {
            cvssMetricV30: [
              {
                source: 'cna@vuldb.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.0',
                  vectorString: 'CVSS:3.0/AV:N/AC:H/PR:L/UI:N/S:U/C:L/I:N/A:N',
                  attackVector: 'NETWORK',
                  attackComplexity: 'HIGH',
                  privilegesRequired: 'LOW',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'NONE',
                  availabilityImpact: 'NONE',
                  baseScore: 3.1,
                  baseSeverity: 'LOW',
                },
                exploitabilityScore: 1.6,
                impactScore: 1.4,
              },
            ],
            cvssMetricV2: [
              {
                source: 'cna@vuldb.com',
                type: 'Secondary',
                cvssData: {
                  version: '2.0',
                  vectorString: 'AV:N/AC:H/Au:S/C:P/I:N/A:N',
                  accessVector: 'NETWORK',
                  accessComplexity: 'HIGH',
                  authentication: 'SINGLE',
                  confidentialityImpact: 'PARTIAL',
                  integrityImpact: 'NONE',
                  availabilityImpact: 'NONE',
                  baseScore: 2.1,
                },
                baseSeverity: 'LOW',
                exploitabilityScore: 3.9,
                impactScore: 2.9,
                acInsufInfo: false,
                obtainAllPrivilege: false,
                obtainUserPrivilege: false,
                obtainOtherPrivilege: false,
                userInteractionRequired: false,
              },
            ],
          },
          weaknesses: [
            {
              source: 'cna@vuldb.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-552',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://github.com/FFR66/Dreamer-CMS_Unauthorized-access-vulnerability',
              source: 'cna@vuldb.com',
            },
            {
              url: 'https://vuldb.com/?ctiid.238632',
              source: 'cna@vuldb.com',
            },
            {
              url: 'https://vuldb.com/?id.238632',
              source: 'cna@vuldb.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-4744',
          sourceIdentifier: 'cna@vuldb.com',
          published: '2023-09-04T00:15:07.463',
          lastModified: '2023-09-04T03:51:45.317',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'A vulnerability was found in Tenda AC8 16.03.34.06_cn_TDC01. It has been declared as critical. Affected by this vulnerability is the function formSetDeviceName. The manipulation leads to stack-based buffer overflow. The attack can be launched remotely. The exploit has been disclosed to the public and may be used. The identifier VDB-238633 was assigned to this vulnerability.',
            },
          ],
          metrics: {
            cvssMetricV30: [
              {
                source: 'cna@vuldb.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.0',
                  vectorString: 'CVSS:3.0/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'HIGH',
                  availabilityImpact: 'HIGH',
                  baseScore: 9.8,
                  baseSeverity: 'CRITICAL',
                },
                exploitabilityScore: 3.9,
                impactScore: 5.9,
              },
            ],
            cvssMetricV2: [
              {
                source: 'cna@vuldb.com',
                type: 'Secondary',
                cvssData: {
                  version: '2.0',
                  vectorString: 'AV:N/AC:L/Au:N/C:C/I:C/A:C',
                  accessVector: 'NETWORK',
                  accessComplexity: 'LOW',
                  authentication: 'NONE',
                  confidentialityImpact: 'COMPLETE',
                  integrityImpact: 'COMPLETE',
                  availabilityImpact: 'COMPLETE',
                  baseScore: 10.0,
                },
                baseSeverity: 'HIGH',
                exploitabilityScore: 10.0,
                impactScore: 10.0,
                acInsufInfo: false,
                obtainAllPrivilege: false,
                obtainUserPrivilege: false,
                obtainOtherPrivilege: false,
                userInteractionRequired: false,
              },
            ],
          },
          weaknesses: [
            {
              source: 'cna@vuldb.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-121',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://github.com/GleamingEyes/vul/blob/main/tenda_ac8/ac8_1.md',
              source: 'cna@vuldb.com',
            },
            {
              url: 'https://vuldb.com/?ctiid.238633',
              source: 'cna@vuldb.com',
            },
            {
              url: 'https://vuldb.com/?id.238633',
              source: 'cna@vuldb.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-4745',
          sourceIdentifier: 'cna@vuldb.com',
          published: '2023-09-04T00:15:07.820',
          lastModified: '2023-09-04T03:51:45.317',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'A vulnerability was found in Beijing Baichuo Smart S45F Multi-Service Secure Gateway Intelligent Management Platform up to 20230822. It has been rated as critical. Affected by this issue is some unknown functionality of the file /importexport.php. The manipulation leads to sql injection. The attack may be launched remotely. The exploit has been disclosed to the public and may be used. VDB-238634 is the identifier assigned to this vulnerability.',
            },
          ],
          metrics: {
            cvssMetricV30: [
              {
                source: 'cna@vuldb.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.0',
                  vectorString: 'CVSS:3.0/AV:N/AC:L/PR:L/UI:N/S:U/C:L/I:L/A:L',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'LOW',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'LOW',
                  baseScore: 6.3,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 2.8,
                impactScore: 3.4,
              },
            ],
            cvssMetricV2: [
              {
                source: 'cna@vuldb.com',
                type: 'Secondary',
                cvssData: {
                  version: '2.0',
                  vectorString: 'AV:N/AC:L/Au:S/C:P/I:P/A:P',
                  accessVector: 'NETWORK',
                  accessComplexity: 'LOW',
                  authentication: 'SINGLE',
                  confidentialityImpact: 'PARTIAL',
                  integrityImpact: 'PARTIAL',
                  availabilityImpact: 'PARTIAL',
                  baseScore: 6.5,
                },
                baseSeverity: 'MEDIUM',
                exploitabilityScore: 8.0,
                impactScore: 6.4,
                acInsufInfo: false,
                obtainAllPrivilege: false,
                obtainUserPrivilege: false,
                obtainOtherPrivilege: false,
                userInteractionRequired: false,
              },
            ],
          },
          weaknesses: [
            {
              source: 'cna@vuldb.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-89',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://github.com/Jacky-Y/vuls/blob/main/vul6.md',
              source: 'cna@vuldb.com',
            },
            {
              url: 'https://vuldb.com/?ctiid.238634',
              source: 'cna@vuldb.com',
            },
            {
              url: 'https://vuldb.com/?id.238634',
              source: 'cna@vuldb.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-4746',
          sourceIdentifier: 'cna@vuldb.com',
          published: '2023-09-04T01:15:07.437',
          lastModified: '2023-09-04T03:51:45.317',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'A vulnerability classified as critical has been found in TOTOLINK N200RE V5 9.3.5u.6437_B20230519. This affects the function Validity_check. The manipulation leads to format string. It is possible to initiate the attack remotely. The exploit has been disclosed to the public and may be used. The associated identifier of this vulnerability is VDB-238635.',
            },
          ],
          metrics: {
            cvssMetricV30: [
              {
                source: 'cna@vuldb.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.0',
                  vectorString: 'CVSS:3.0/AV:N/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:H',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'LOW',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'HIGH',
                  availabilityImpact: 'HIGH',
                  baseScore: 8.8,
                  baseSeverity: 'HIGH',
                },
                exploitabilityScore: 2.8,
                impactScore: 5.9,
              },
            ],
            cvssMetricV2: [
              {
                source: 'cna@vuldb.com',
                type: 'Secondary',
                cvssData: {
                  version: '2.0',
                  vectorString: 'AV:N/AC:L/Au:S/C:C/I:C/A:C',
                  accessVector: 'NETWORK',
                  accessComplexity: 'LOW',
                  authentication: 'SINGLE',
                  confidentialityImpact: 'COMPLETE',
                  integrityImpact: 'COMPLETE',
                  availabilityImpact: 'COMPLETE',
                  baseScore: 9.0,
                },
                baseSeverity: 'HIGH',
                exploitabilityScore: 8.0,
                impactScore: 10.0,
                acInsufInfo: false,
                obtainAllPrivilege: false,
                obtainUserPrivilege: false,
                obtainOtherPrivilege: false,
                userInteractionRequired: false,
              },
            ],
          },
          weaknesses: [
            {
              source: 'cna@vuldb.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-134',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://gist.github.com/dmknght/8f3b6aa65e9d08f45b5236c6e9ab8d80',
              source: 'cna@vuldb.com',
            },
            {
              url: 'https://vuldb.com/?ctiid.238635',
              source: 'cna@vuldb.com',
            },
            {
              url: 'https://vuldb.com/?id.238635',
              source: 'cna@vuldb.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-4747',
          sourceIdentifier: 'cna@vuldb.com',
          published: '2023-09-04T01:15:07.790',
          lastModified: '2023-09-04T03:51:45.317',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'A vulnerability classified as critical was found in DedeCMS 5.7.110. This vulnerability affects unknown code of the file /uploads/tags.php. The manipulation of the argument tag_alias leads to sql injection. The attack can be initiated remotely. The exploit has been disclosed to the public and may be used. The identifier of this vulnerability is VDB-238636.',
            },
          ],
          metrics: {
            cvssMetricV30: [
              {
                source: 'cna@vuldb.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.0',
                  vectorString: 'CVSS:3.0/AV:N/AC:L/PR:L/UI:N/S:U/C:L/I:L/A:L',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'LOW',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'LOW',
                  baseScore: 6.3,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 2.8,
                impactScore: 3.4,
              },
            ],
            cvssMetricV2: [
              {
                source: 'cna@vuldb.com',
                type: 'Secondary',
                cvssData: {
                  version: '2.0',
                  vectorString: 'AV:N/AC:L/Au:S/C:P/I:P/A:P',
                  accessVector: 'NETWORK',
                  accessComplexity: 'LOW',
                  authentication: 'SINGLE',
                  confidentialityImpact: 'PARTIAL',
                  integrityImpact: 'PARTIAL',
                  availabilityImpact: 'PARTIAL',
                  baseScore: 6.5,
                },
                baseSeverity: 'MEDIUM',
                exploitabilityScore: 8.0,
                impactScore: 6.4,
                acInsufInfo: false,
                obtainAllPrivilege: false,
                obtainUserPrivilege: false,
                obtainOtherPrivilege: false,
                userInteractionRequired: false,
              },
            ],
          },
          weaknesses: [
            {
              source: 'cna@vuldb.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-89',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://github.com/laoquanshi/cve',
              source: 'cna@vuldb.com',
            },
            {
              url: 'https://github.com/laoquanshi/cve/blob/main/dedecms%20%20sql%20%20injection',
              source: 'cna@vuldb.com',
            },
            {
              url: 'https://vuldb.com/?ctiid.238636',
              source: 'cna@vuldb.com',
            },
            {
              url: 'https://vuldb.com/?id.238636',
              source: 'cna@vuldb.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-4749',
          sourceIdentifier: 'cna@vuldb.com',
          published: '2023-09-04T01:15:07.890',
          lastModified: '2023-09-04T03:51:45.317',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'A vulnerability, which was classified as critical, was found in SourceCodester Inventory Management System 1.0. Affected is an unknown function of the file index.php. The manipulation of the argument page leads to file inclusion. It is possible to launch the attack remotely. The exploit has been disclosed to the public and may be used. VDB-238638 is the identifier assigned to this vulnerability.',
            },
            {
              lang: 'es',
              value:
                'Se ha encontrado una vulnerabilidad, clasificada como crítica, en SourceCodester Inventory Management System v1.0. Es afectada una función desconocida del archivo "index.php". La manipulación de la página de argumentos conduce a la inclusión de archivos. Es posible lanzar el ataque de forma remota. El exploit ha sido revelado al público y puede ser utilizado. VDB-238638 es el identificador asignado a esta vulnerabilidad. ',
            },
          ],
          metrics: {
            cvssMetricV30: [
              {
                source: 'cna@vuldb.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.0',
                  vectorString: 'CVSS:3.0/AV:N/AC:L/PR:L/UI:N/S:U/C:L/I:L/A:L',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'LOW',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'LOW',
                  baseScore: 6.3,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 2.8,
                impactScore: 3.4,
              },
            ],
            cvssMetricV2: [
              {
                source: 'cna@vuldb.com',
                type: 'Secondary',
                cvssData: {
                  version: '2.0',
                  vectorString: 'AV:N/AC:L/Au:S/C:P/I:P/A:P',
                  accessVector: 'NETWORK',
                  accessComplexity: 'LOW',
                  authentication: 'SINGLE',
                  confidentialityImpact: 'PARTIAL',
                  integrityImpact: 'PARTIAL',
                  availabilityImpact: 'PARTIAL',
                  baseScore: 6.5,
                },
                baseSeverity: 'MEDIUM',
                exploitabilityScore: 8.0,
                impactScore: 6.4,
                acInsufInfo: false,
                obtainAllPrivilege: false,
                obtainUserPrivilege: false,
                obtainOtherPrivilege: false,
                userInteractionRequired: false,
              },
            ],
          },
          weaknesses: [
            {
              source: 'cna@vuldb.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-73',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://skypoc.wordpress.com/2023/09/03/%e3%80%90code-audit%e3%80%91open-source-ample-inventory-management-system-v1-0-by-mayuri_k-has-a-file-inclusion-vulnerability/',
              source: 'cna@vuldb.com',
            },
            {
              url: 'https://vuldb.com/?ctiid.238638',
              source: 'cna@vuldb.com',
            },
            {
              url: 'https://vuldb.com/?id.238638',
              source: 'cna@vuldb.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2022-47352',
          sourceIdentifier: 'security@unisoc.com',
          published: '2023-09-04T02:15:07.697',
          lastModified: '2023-09-04T03:51:45.317',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'In camera driver, there is a possible out of bounds read due to a missing bounds check. This could lead to local denial of service with System execution privileges needed',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://www.unisoc.com/en_us/secy/announcementDetail/https://www.unisoc.com/en_us/secy/announcementDetail/1698296481653522434',
              source: 'security@unisoc.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2022-47353',
          sourceIdentifier: 'security@unisoc.com',
          published: '2023-09-04T02:15:08.037',
          lastModified: '2023-09-04T03:51:45.317',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'In vdsp device, there is a possible system crash due to improper input validation.This could lead to local denial of service with System execution privileges needed',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://www.unisoc.com/en_us/secy/announcementDetail/https://www.unisoc.com/en_us/secy/announcementDetail/1698296481653522434',
              source: 'security@unisoc.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2022-48452',
          sourceIdentifier: 'security@unisoc.com',
          published: '2023-09-04T02:15:08.097',
          lastModified: '2023-09-04T03:51:45.317',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'In Ifaa service, there is a possible missing permission check. This could lead to local denial of service with System execution privileges needed',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://www.unisoc.com/en_us/secy/announcementDetail/https://www.unisoc.com/en_us/secy/announcementDetail/1698296481653522434',
              source: 'security@unisoc.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2022-48453',
          sourceIdentifier: 'security@unisoc.com',
          published: '2023-09-04T02:15:08.150',
          lastModified: '2023-09-04T03:51:45.317',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'In camera driver, there is a possible out of bounds write due to a missing bounds check. This could lead to local denial of service with System execution privileges needed',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://www.unisoc.com/en_us/secy/announcementDetail/https://www.unisoc.com/en_us/secy/announcementDetail/1698296481653522434',
              source: 'security@unisoc.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-33914',
          sourceIdentifier: 'security@unisoc.com',
          published: '2023-09-04T02:15:08.217',
          lastModified: '2023-09-04T03:51:45.317',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'In NIA0 algorithm in Security Mode Command, there is a possible missing verification incorrect input. This could lead to remote information disclosure no additional execution privileges needed',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://www.unisoc.com/en_us/secy/announcementDetail/https://www.unisoc.com/en_us/secy/announcementDetail/1698296481653522434',
              source: 'security@unisoc.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-33915',
          sourceIdentifier: 'security@unisoc.com',
          published: '2023-09-04T02:15:08.270',
          lastModified: '2023-09-04T03:51:45.317',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'In LTE protocol stack, there is a possible missing permission check. This could lead to remote information disclosure no additional execution privileges needed',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://www.unisoc.com/en_us/secy/announcementDetail/https://www.unisoc.com/en_us/secy/announcementDetail/1698296481653522434',
              source: 'security@unisoc.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-33916',
          sourceIdentifier: 'security@unisoc.com',
          published: '2023-09-04T02:15:08.317',
          lastModified: '2023-09-04T03:51:45.317',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'In vowifiservice, there is a possible missing permission check.This could lead to local information disclosure with no additional execution privileges',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://www.unisoc.com/en_us/secy/announcementDetail/https://www.unisoc.com/en_us/secy/announcementDetail/1698296481653522434',
              source: 'security@unisoc.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-33917',
          sourceIdentifier: 'security@unisoc.com',
          published: '2023-09-04T02:15:08.363',
          lastModified: '2023-09-04T03:51:45.317',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'In vowifiservice, there is a possible missing permission check.This could lead to local information disclosure with no additional execution privileges',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://www.unisoc.com/en_us/secy/announcementDetail/https://www.unisoc.com/en_us/secy/announcementDetail/1698296481653522434',
              source: 'security@unisoc.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-33918',
          sourceIdentifier: 'security@unisoc.com',
          published: '2023-09-04T02:15:08.417',
          lastModified: '2023-09-04T03:51:45.317',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'In vowifiservice, there is a possible missing permission check.This could lead to local information disclosure with no additional execution privileges',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://www.unisoc.com/en_us/secy/announcementDetail/https://www.unisoc.com/en_us/secy/announcementDetail/1698296481653522434',
              source: 'security@unisoc.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-38436',
          sourceIdentifier: 'security@unisoc.com',
          published: '2023-09-04T02:15:08.470',
          lastModified: '2023-09-04T03:51:45.317',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'In vowifiservice, there is a possible missing permission check.This could lead to local information disclosure with no additional execution privileges',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://www.unisoc.com/en_us/secy/announcementDetail/https://www.unisoc.com/en_us/secy/announcementDetail/1698296481653522434',
              source: 'security@unisoc.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-38437',
          sourceIdentifier: 'security@unisoc.com',
          published: '2023-09-04T02:15:08.520',
          lastModified: '2023-09-04T03:51:45.317',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'In vowifiservice, there is a possible missing permission check.This could lead to local information disclosure with no additional execution privileges',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://www.unisoc.com/en_us/secy/announcementDetail/https://www.unisoc.com/en_us/secy/announcementDetail/1698296481653522434',
              source: 'security@unisoc.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-38438',
          sourceIdentifier: 'security@unisoc.com',
          published: '2023-09-04T02:15:08.577',
          lastModified: '2023-09-04T03:51:45.317',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'In vowifiservice, there is a possible missing permission check.This could lead to local information disclosure with no additional execution privileges',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://www.unisoc.com/en_us/secy/announcementDetail/https://www.unisoc.com/en_us/secy/announcementDetail/1698296481653522434',
              source: 'security@unisoc.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-38439',
          sourceIdentifier: 'security@unisoc.com',
          published: '2023-09-04T02:15:08.623',
          lastModified: '2023-09-04T03:51:45.317',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'In vowifiservice, there is a possible missing permission check.This could lead to local information disclosure with no additional execution privileges',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://www.unisoc.com/en_us/secy/announcementDetail/https://www.unisoc.com/en_us/secy/announcementDetail/1698296481653522434',
              source: 'security@unisoc.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-38440',
          sourceIdentifier: 'security@unisoc.com',
          published: '2023-09-04T02:15:08.677',
          lastModified: '2023-09-04T03:51:45.317',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'In vowifiservice, there is a possible missing permission check.This could lead to local information disclosure with no additional execution privileges',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://www.unisoc.com/en_us/secy/announcementDetail/https://www.unisoc.com/en_us/secy/announcementDetail/1698296481653522434',
              source: 'security@unisoc.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-38441',
          sourceIdentifier: 'security@unisoc.com',
          published: '2023-09-04T02:15:08.723',
          lastModified: '2023-09-04T03:51:45.317',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'In vowifiservice, there is a possible missing permission check.This could lead to local information disclosure with no additional execution privileges',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://www.unisoc.com/en_us/secy/announcementDetail/https://www.unisoc.com/en_us/secy/announcementDetail/1698296481653522434',
              source: 'security@unisoc.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-38442',
          sourceIdentifier: 'security@unisoc.com',
          published: '2023-09-04T02:15:08.773',
          lastModified: '2023-09-04T03:51:45.317',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'In vowifiservice, there is a possible missing permission check.This could lead to local information disclosure with no additional execution privileges',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://www.unisoc.com/en_us/secy/announcementDetail/https://www.unisoc.com/en_us/secy/announcementDetail/1698296481653522434',
              source: 'security@unisoc.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-38443',
          sourceIdentifier: 'security@unisoc.com',
          published: '2023-09-04T02:15:08.827',
          lastModified: '2023-09-04T03:51:45.317',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'In vowifiservice, there is a possible missing permission check.This could lead to local escalation of privilege with no additional execution privileges',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://www.unisoc.com/en_us/secy/announcementDetail/https://www.unisoc.com/en_us/secy/announcementDetail/1698296481653522434',
              source: 'security@unisoc.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-38444',
          sourceIdentifier: 'security@unisoc.com',
          published: '2023-09-04T02:15:08.880',
          lastModified: '2023-09-04T03:51:45.317',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'In vowifiservice, there is a possible missing permission check.This could lead to local escalation of privilege with no additional execution privileges',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://www.unisoc.com/en_us/secy/announcementDetail/https://www.unisoc.com/en_us/secy/announcementDetail/1698296481653522434',
              source: 'security@unisoc.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-38445',
          sourceIdentifier: 'security@unisoc.com',
          published: '2023-09-04T02:15:08.930',
          lastModified: '2023-09-04T03:51:45.317',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'In vowifiservice, there is a possible missing permission check.This could lead to local denial of service with no additional execution privileges',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://www.unisoc.com/en_us/secy/announcementDetail/https://www.unisoc.com/en_us/secy/announcementDetail/1698296481653522434',
              source: 'security@unisoc.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-38446',
          sourceIdentifier: 'security@unisoc.com',
          published: '2023-09-04T02:15:08.977',
          lastModified: '2023-09-04T03:51:45.317',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'In vowifiservice, there is a possible missing permission check.This could lead to local denial of service with no additional execution privileges',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://www.unisoc.com/en_us/secy/announcementDetail/https://www.unisoc.com/en_us/secy/announcementDetail/1698296481653522434',
              source: 'security@unisoc.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-38447',
          sourceIdentifier: 'security@unisoc.com',
          published: '2023-09-04T02:15:09.030',
          lastModified: '2023-09-04T03:51:45.317',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'In vowifiservice, there is a possible missing permission check.This could lead to local denial of service with no additional execution privileges',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://www.unisoc.com/en_us/secy/announcementDetail/https://www.unisoc.com/en_us/secy/announcementDetail/1698296481653522434',
              source: 'security@unisoc.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-38448',
          sourceIdentifier: 'security@unisoc.com',
          published: '2023-09-04T02:15:09.080',
          lastModified: '2023-09-04T03:51:45.317',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'In vowifiservice, there is a possible missing permission check.This could lead to local denial of service with no additional execution privileges',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://www.unisoc.com/en_us/secy/announcementDetail/https://www.unisoc.com/en_us/secy/announcementDetail/1698296481653522434',
              source: 'security@unisoc.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-38449',
          sourceIdentifier: 'security@unisoc.com',
          published: '2023-09-04T02:15:09.133',
          lastModified: '2023-09-04T03:51:45.317',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'In vowifiservice, there is a possible missing permission check.This could lead to local escalation of privilege with no additional execution privileges',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://www.unisoc.com/en_us/secy/announcementDetail/https://www.unisoc.com/en_us/secy/announcementDetail/1698296481653522434',
              source: 'security@unisoc.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-38450',
          sourceIdentifier: 'security@unisoc.com',
          published: '2023-09-04T02:15:09.190',
          lastModified: '2023-09-04T03:51:45.317',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'In vowifiservice, there is a possible missing permission check.This could lead to local escalation of privilege with no additional execution privileges',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://www.unisoc.com/en_us/secy/announcementDetail/https://www.unisoc.com/en_us/secy/announcementDetail/1698296481653522434',
              source: 'security@unisoc.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-38451',
          sourceIdentifier: 'security@unisoc.com',
          published: '2023-09-04T02:15:09.243',
          lastModified: '2023-09-04T03:51:45.317',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'In vowifiservice, there is a possible missing permission check.This could lead to local escalation of privilege with no additional execution privileges',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://www.unisoc.com/en_us/secy/announcementDetail/https://www.unisoc.com/en_us/secy/announcementDetail/1698296481653522434',
              source: 'security@unisoc.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-38452',
          sourceIdentifier: 'security@unisoc.com',
          published: '2023-09-04T02:15:09.293',
          lastModified: '2023-09-04T03:51:45.317',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'In vowifiservice, there is a possible missing permission check.This could lead to local escalation of privilege with no additional execution privileges',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://www.unisoc.com/en_us/secy/announcementDetail/https://www.unisoc.com/en_us/secy/announcementDetail/1698296481653522434',
              source: 'security@unisoc.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-38453',
          sourceIdentifier: 'security@unisoc.com',
          published: '2023-09-04T02:15:09.347',
          lastModified: '2023-09-04T03:51:45.317',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'In vowifiservice, there is a possible missing permission check.This could lead to local escalation of privilege with no additional execution privileges',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://www.unisoc.com/en_us/secy/announcementDetail/https://www.unisoc.com/en_us/secy/announcementDetail/1698296481653522434',
              source: 'security@unisoc.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-38454',
          sourceIdentifier: 'security@unisoc.com',
          published: '2023-09-04T02:15:09.403',
          lastModified: '2023-09-04T03:51:45.317',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'In vowifi service, there is a possible missing permission check.This could lead to local information disclosure with no additional execution privileges',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://www.unisoc.com/en_us/secy/announcementDetail/https://www.unisoc.com/en_us/secy/announcementDetail/1698296481653522434',
              source: 'security@unisoc.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-38455',
          sourceIdentifier: 'security@unisoc.com',
          published: '2023-09-04T02:15:09.460',
          lastModified: '2023-09-04T03:51:45.317',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'In vowifiservice, there is a possible missing permission check.This could lead to local escalation of privilege with no additional execution privileges',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://www.unisoc.com/en_us/secy/announcementDetail/https://www.unisoc.com/en_us/secy/announcementDetail/1698296481653522434',
              source: 'security@unisoc.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-38456',
          sourceIdentifier: 'security@unisoc.com',
          published: '2023-09-04T02:15:09.517',
          lastModified: '2023-09-04T03:51:45.317',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'In vowifiservice, there is a possible missing permission check.This could lead to local escalation of privilege with no additional execution privileges',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://www.unisoc.com/en_us/secy/announcementDetail/https://www.unisoc.com/en_us/secy/announcementDetail/1698296481653522434',
              source: 'security@unisoc.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-38457',
          sourceIdentifier: 'security@unisoc.com',
          published: '2023-09-04T02:15:09.563',
          lastModified: '2023-09-04T03:51:45.317',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'In vowifiservice, there is a possible missing permission check.This could lead to local denial of service with no additional execution privileges',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://www.unisoc.com/en_us/secy/announcementDetail/https://www.unisoc.com/en_us/secy/announcementDetail/1698296481653522434',
              source: 'security@unisoc.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-38458',
          sourceIdentifier: 'security@unisoc.com',
          published: '2023-09-04T02:15:09.617',
          lastModified: '2023-09-04T03:51:45.317',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'In vowifiservice, there is a possible missing permission check.This could lead to local escalation of privilege with no additional execution privileges',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://www.unisoc.com/en_us/secy/announcementDetail/https://www.unisoc.com/en_us/secy/announcementDetail/1698296481653522434',
              source: 'security@unisoc.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-38459',
          sourceIdentifier: 'security@unisoc.com',
          published: '2023-09-04T02:15:09.667',
          lastModified: '2023-09-04T03:51:45.317',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'In vowifiservice, there is a possible missing permission check.This could lead to local escalation of privilege with no additional execution privileges',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://www.unisoc.com/en_us/secy/announcementDetail/https://www.unisoc.com/en_us/secy/announcementDetail/1698296481653522434',
              source: 'security@unisoc.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-38460',
          sourceIdentifier: 'security@unisoc.com',
          published: '2023-09-04T02:15:09.713',
          lastModified: '2023-09-04T03:51:45.317',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'In vowifiservice, there is a possible missing permission check.This could lead to local escalation of privilege with no additional execution privileges',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://www.unisoc.com/en_us/secy/announcementDetail/https://www.unisoc.com/en_us/secy/announcementDetail/1698296481653522434',
              source: 'security@unisoc.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-38461',
          sourceIdentifier: 'security@unisoc.com',
          published: '2023-09-04T02:15:09.767',
          lastModified: '2023-09-04T03:51:45.317',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'In vowifiservice, there is a possible missing permission check.This could lead to local denial of service with no additional execution privileges',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://www.unisoc.com/en_us/secy/announcementDetail/https://www.unisoc.com/en_us/secy/announcementDetail/1698296481653522434',
              source: 'security@unisoc.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-38462',
          sourceIdentifier: 'security@unisoc.com',
          published: '2023-09-04T02:15:09.820',
          lastModified: '2023-09-04T03:51:45.317',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'In vowifiservice, there is a possible missing permission check.This could lead to local denial of service with no additional execution privileges',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://www.unisoc.com/en_us/secy/announcementDetail/https://www.unisoc.com/en_us/secy/announcementDetail/1698296481653522434',
              source: 'security@unisoc.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-38463',
          sourceIdentifier: 'security@unisoc.com',
          published: '2023-09-04T02:15:09.877',
          lastModified: '2023-09-04T03:51:45.317',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'In vowifiservice, there is a possible missing permission check.This could lead to local denial of service with no additional execution privileges',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://www.unisoc.com/en_us/secy/announcementDetail/https://www.unisoc.com/en_us/secy/announcementDetail/1698296481653522434',
              source: 'security@unisoc.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-38464',
          sourceIdentifier: 'security@unisoc.com',
          published: '2023-09-04T02:15:09.930',
          lastModified: '2023-09-04T03:51:45.317',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'In vowifiservice, there is a possible missing permission check.This could lead to local escalation of privilege with no additional execution privileges',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://www.unisoc.com/en_us/secy/announcementDetail/https://www.unisoc.com/en_us/secy/announcementDetail/1698296481653522434',
              source: 'security@unisoc.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-38465',
          sourceIdentifier: 'security@unisoc.com',
          published: '2023-09-04T02:15:09.983',
          lastModified: '2023-09-04T03:51:45.317',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'In ims service, there is a possible missing permission check. This could lead to local information disclosure with no additional execution privileges',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://www.unisoc.com/en_us/secy/announcementDetail/https://www.unisoc.com/en_us/secy/announcementDetail/1698296481653522434',
              source: 'security@unisoc.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-38466',
          sourceIdentifier: 'security@unisoc.com',
          published: '2023-09-04T02:15:10.030',
          lastModified: '2023-09-04T03:51:45.317',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'In ims service, there is a possible missing permission check. This could lead to local information disclosure with no additional execution privileges',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://www.unisoc.com/en_us/secy/announcementDetail/https://www.unisoc.com/en_us/secy/announcementDetail/1698296481653522434',
              source: 'security@unisoc.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-38467',
          sourceIdentifier: 'security@unisoc.com',
          published: '2023-09-04T02:15:10.083',
          lastModified: '2023-09-04T03:51:45.317',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'In urild service, there is a possible out of bounds write due to a missing bounds check. This could lead to local denial of service with System execution privileges needed',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://www.unisoc.com/en_us/secy/announcementDetail/https://www.unisoc.com/en_us/secy/announcementDetail/1698296481653522434',
              source: 'security@unisoc.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-38468',
          sourceIdentifier: 'security@unisoc.com',
          published: '2023-09-04T02:15:10.133',
          lastModified: '2023-09-04T03:51:45.317',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'In urild service, there is a possible out of bounds write due to a missing bounds check. This could lead to local denial of service with System execution privileges needed',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://www.unisoc.com/en_us/secy/announcementDetail/https://www.unisoc.com/en_us/secy/announcementDetail/1698296481653522434',
              source: 'security@unisoc.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-38553',
          sourceIdentifier: 'security@unisoc.com',
          published: '2023-09-04T02:15:10.187',
          lastModified: '2023-09-04T03:51:45.317',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'In gnss service, there is a possible out of bounds write due to a missing bounds check. This could lead to local escalation of privilege with System execution privileges needed',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://www.unisoc.com/en_us/secy/announcementDetail/https://www.unisoc.com/en_us/secy/announcementDetail/1698296481653522434',
              source: 'security@unisoc.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-38554',
          sourceIdentifier: 'security@unisoc.com',
          published: '2023-09-04T02:15:10.247',
          lastModified: '2023-09-04T03:51:45.317',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'In wcn bsp driver, there is a possible out of bounds write due to a missing bounds check.This could lead to local denial of service with no additional execution privileges',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://www.unisoc.com/en_us/secy/announcementDetail/https://www.unisoc.com/en_us/secy/announcementDetail/1698296481653522434',
              source: 'security@unisoc.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-20820',
          sourceIdentifier: 'security@mediatek.com',
          published: '2023-09-04T03:15:07.840',
          lastModified: '2023-09-04T03:51:45.317',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'In wlan service, there is a possible command injection due to improper input validation. This could lead to remote code execution with System execution privileges needed. User interaction is not needed for exploitation. Patch ID: WCNCR00244189; Issue ID: WCNCR00244189.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://corp.mediatek.com/product-security-bulletin/September-2023',
              source: 'security@mediatek.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-20821',
          sourceIdentifier: 'security@mediatek.com',
          published: '2023-09-04T03:15:08.480',
          lastModified: '2023-09-04T03:51:45.317',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'In nvram, there is a possible out of bounds write due to a missing bounds check. This could lead to local escalation of privilege with System execution privileges needed. User interaction is not needed for exploitation. Patch ID: ALPS07937113; Issue ID: ALPS07937113.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://corp.mediatek.com/product-security-bulletin/September-2023',
              source: 'security@mediatek.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-20822',
          sourceIdentifier: 'security@mediatek.com',
          published: '2023-09-04T03:15:08.647',
          lastModified: '2023-09-04T03:51:45.317',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'In netdagent, there is a possible out of bounds write due to a missing bounds check. This could lead to local escalation of privilege with System execution privileges needed. User interaction is not needed for exploitation. Patch ID: ALPS07944012; Issue ID: ALPS07944012.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://corp.mediatek.com/product-security-bulletin/September-2023',
              source: 'security@mediatek.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-20823',
          sourceIdentifier: 'security@mediatek.com',
          published: '2023-09-04T03:15:08.773',
          lastModified: '2023-09-04T03:51:45.317',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'In cmdq, there is a possible out of bounds read due to an incorrect status check. This could lead to local denial of service with System execution privileges needed. User interaction is not needed for exploitation. Patch ID: ALPS08021592; Issue ID: ALPS08021592.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://corp.mediatek.com/product-security-bulletin/September-2023',
              source: 'security@mediatek.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-20824',
          sourceIdentifier: 'security@mediatek.com',
          published: '2023-09-04T03:15:08.893',
          lastModified: '2023-09-04T03:51:45.317',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'In duraspeed, there is a possible information disclosure due to a missing permission check. This could lead to local information disclosure with no additional execution privilege needed. User interaction is not needed for exploitation. Patch ID: ALPS07951402; Issue ID: ALPS07951402.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://corp.mediatek.com/product-security-bulletin/September-2023',
              source: 'security@mediatek.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-20825',
          sourceIdentifier: 'security@mediatek.com',
          published: '2023-09-04T03:15:09.023',
          lastModified: '2023-09-04T03:51:45.317',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'In duraspeed, there is a possible information disclosure due to a missing permission check. This could lead to local information disclosure with no additional execution privilege needed. User interaction is not needed for exploitation. Patch ID: ALPS07951402; Issue ID: ALPS07951413.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://corp.mediatek.com/product-security-bulletin/September-2023',
              source: 'security@mediatek.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-20826',
          sourceIdentifier: 'security@mediatek.com',
          published: '2023-09-04T03:15:09.137',
          lastModified: '2023-09-04T03:51:45.317',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'In cta, there is a possible information disclosure due to a missing permission check. This could lead to local information disclosure with no additional execution privilege needed. User interaction is not needed for exploitation. Patch ID: ALPS07978550; Issue ID: ALPS07978550.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://corp.mediatek.com/product-security-bulletin/September-2023',
              source: 'security@mediatek.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-20827',
          sourceIdentifier: 'security@mediatek.com',
          published: '2023-09-04T03:15:09.270',
          lastModified: '2023-09-04T03:51:45.317',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'In ims service, there is a possible memory corruption due to a race condition. This could lead to local escalation of privilege with System execution privileges needed. User interaction is not needed for exploitation. Patch ID: ALPS07937105; Issue ID: ALPS07937105.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://corp.mediatek.com/product-security-bulletin/September-2023',
              source: 'security@mediatek.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-20828',
          sourceIdentifier: 'security@mediatek.com',
          published: '2023-09-04T03:15:09.413',
          lastModified: '2023-09-04T03:51:45.317',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'In gps, there is a possible out of bounds write due to a missing bounds check. This could lead to local escalation of privilege with System execution privileges needed. User interaction is not needed for exploitation. Patch ID: ALPS08014144; Issue ID: ALPS08014144.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://corp.mediatek.com/product-security-bulletin/September-2023',
              source: 'security@mediatek.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-20829',
          sourceIdentifier: 'security@mediatek.com',
          published: '2023-09-04T03:15:09.527',
          lastModified: '2023-09-04T03:51:45.317',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'In gps, there is a possible out of bounds write due to a missing bounds check. This could lead to local escalation of privilege with System execution privileges needed. User interaction is not needed for exploitation. Patch ID: ALPS08014144; Issue ID: ALPS08014148.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://corp.mediatek.com/product-security-bulletin/September-2023',
              source: 'security@mediatek.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-20830',
          sourceIdentifier: 'security@mediatek.com',
          published: '2023-09-04T03:15:09.650',
          lastModified: '2023-09-04T03:51:45.317',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'In gps, there is a possible out of bounds write due to a missing bounds check. This could lead to local escalation of privilege with System execution privileges needed. User interaction is not needed for exploitation. Patch ID: ALPS08014144; Issue ID: ALPS08014156.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://corp.mediatek.com/product-security-bulletin/September-2023',
              source: 'security@mediatek.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-20831',
          sourceIdentifier: 'security@mediatek.com',
          published: '2023-09-04T03:15:09.770',
          lastModified: '2023-09-04T03:51:45.317',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'In gps, there is a possible out of bounds write due to a missing bounds check. This could lead to local escalation of privilege with System execution privileges needed. User interaction is not needed for exploitation. Patch ID: ALPS08014144; Issue ID: ALPS08014162.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://corp.mediatek.com/product-security-bulletin/September-2023',
              source: 'security@mediatek.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-20832',
          sourceIdentifier: 'security@mediatek.com',
          published: '2023-09-04T03:15:09.873',
          lastModified: '2023-09-04T03:51:45.317',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'In gps, there is a possible out of bounds write due to a missing bounds check. This could lead to local escalation of privilege with System execution privileges needed. User interaction is not needed for exploitation. Patch ID: ALPS08014144; Issue ID: ALPS08013530.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://corp.mediatek.com/product-security-bulletin/September-2023',
              source: 'security@mediatek.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-20833',
          sourceIdentifier: 'security@mediatek.com',
          published: '2023-09-04T03:15:10.010',
          lastModified: '2023-09-04T03:51:45.317',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'In keyinstall, there is a possible information disclosure due to a missing bounds check. This could lead to local information disclosure with System execution privileges needed. User interaction is not needed for exploitation. Patch ID: ALPS08017756; Issue ID: ALPS08017764.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://corp.mediatek.com/product-security-bulletin/September-2023',
              source: 'security@mediatek.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-20834',
          sourceIdentifier: 'security@mediatek.com',
          published: '2023-09-04T03:15:10.063',
          lastModified: '2023-09-04T03:51:45.317',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'In pda, there is a possible use after free due to a race condition. This could lead to local escalation of privilege with System execution privileges needed. User interaction is not needed for exploitation. Patch ID: ALPS07608514; Issue ID: ALPS07608514.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://corp.mediatek.com/product-security-bulletin/September-2023',
              source: 'security@mediatek.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-20835',
          sourceIdentifier: 'security@mediatek.com',
          published: '2023-09-04T03:15:10.183',
          lastModified: '2023-09-04T03:51:45.317',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'In camsys, there is a possible use after free due to a race condition. This could lead to local escalation of privilege with System execution privileges needed. User interaction is not needed for exploitation. Patch ID: ALPS07341261; Issue ID: ALPS07326570.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://corp.mediatek.com/product-security-bulletin/September-2023',
              source: 'security@mediatek.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-20836',
          sourceIdentifier: 'security@mediatek.com',
          published: '2023-09-04T03:15:10.257',
          lastModified: '2023-09-04T03:51:45.317',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'In camsys, there is a possible out of bounds read due to a missing bounds check. This could lead to local information disclosure with System execution privileges needed. User interaction is not needed for exploitation. Patch ID: ALPS07505629; Issue ID: ALPS07505629.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://corp.mediatek.com/product-security-bulletin/September-2023',
              source: 'security@mediatek.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-20837',
          sourceIdentifier: 'security@mediatek.com',
          published: '2023-09-04T03:15:10.430',
          lastModified: '2023-09-04T03:51:45.317',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'In seninf, there is a possible out of bounds write due to a missing bounds check. This could lead to local escalation of privilege with System execution privileges needed. User interaction is not needed for exploitation. Patch ID: ALPS07992786; Issue ID: ALPS07992786.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://corp.mediatek.com/product-security-bulletin/September-2023',
              source: 'security@mediatek.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-20838',
          sourceIdentifier: 'security@mediatek.com',
          published: '2023-09-04T03:15:10.560',
          lastModified: '2023-09-04T03:51:45.317',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'In imgsys, there is a possible out of bounds read due to a race condition. This could lead to local information disclosure with System execution privileges needed. User interaction is needed for exploitation. Patch ID: ALPS07326455; Issue ID: ALPS07326418.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://corp.mediatek.com/product-security-bulletin/September-2023',
              source: 'security@mediatek.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-20839',
          sourceIdentifier: 'security@mediatek.com',
          published: '2023-09-04T03:15:10.677',
          lastModified: '2023-09-04T03:51:45.317',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'In imgsys, there is a possible out of bounds read due to a missing valid range checking. This could lead to local information disclosure with System execution privileges needed. User interaction is needed for exploitation. Patch ID: ALPS07326455; Issue ID: ALPS07326409.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://corp.mediatek.com/product-security-bulletin/September-2023',
              source: 'security@mediatek.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-20840',
          sourceIdentifier: 'security@mediatek.com',
          published: '2023-09-04T03:15:10.827',
          lastModified: '2023-09-04T03:51:45.317',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'In imgsys, there is a possible out of bounds read and write due to a missing valid range checking. This could lead to local escalation of privilege with System execution privileges needed. User interaction is needed for exploitation. Patch ID: ALPS07326430; Issue ID: ALPS07326430.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://corp.mediatek.com/product-security-bulletin/September-2023',
              source: 'security@mediatek.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-20841',
          sourceIdentifier: 'security@mediatek.com',
          published: '2023-09-04T03:15:11.003',
          lastModified: '2023-09-04T03:51:45.317',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'In imgsys, there is a possible out of bounds write due to a missing valid range checking. This could lead to local escalation of privilege with System execution privileges needed. User interaction is needed for exploitation. Patch ID: ALPS07326455; Issue ID: ALPS07326441.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://corp.mediatek.com/product-security-bulletin/September-2023',
              source: 'security@mediatek.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-20842',
          sourceIdentifier: 'security@mediatek.com',
          published: '2023-09-04T03:15:11.163',
          lastModified: '2023-09-04T03:51:45.317',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'In imgsys_cmdq, there is a possible out of bounds write due to a missing valid range checking. This could lead to local escalation of privilege with System execution privileges needed. User interaction is needed for exploitation. Patch ID: ALPS07354259; Issue ID: ALPS07340477.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://corp.mediatek.com/product-security-bulletin/September-2023',
              source: 'security@mediatek.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-20843',
          sourceIdentifier: 'security@mediatek.com',
          published: '2023-09-04T03:15:11.343',
          lastModified: '2023-09-04T03:51:45.317',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'In imgsys_cmdq, there is a possible out of bounds read due to a missing valid range checking. This could lead to local information disclosure with System execution privileges needed. User interaction is needed for exploitation. Patch ID: ALPS07340119; Issue ID: ALPS07340119.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://corp.mediatek.com/product-security-bulletin/September-2023',
              source: 'security@mediatek.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-20844',
          sourceIdentifier: 'security@mediatek.com',
          published: '2023-09-04T03:15:11.443',
          lastModified: '2023-09-04T03:51:45.317',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'In imgsys_cmdq, there is a possible out of bounds read due to a missing valid range checking. This could lead to local information disclosure with System execution privileges needed. User interaction is needed for exploitation. Patch ID: ALPS07354058; Issue ID: ALPS07340121.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://corp.mediatek.com/product-security-bulletin/September-2023',
              source: 'security@mediatek.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-20845',
          sourceIdentifier: 'security@mediatek.com',
          published: '2023-09-04T03:15:11.523',
          lastModified: '2023-09-04T03:51:45.317',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'In imgsys, there is a possible out of bounds read due to a missing valid range checking. This could lead to local information disclosure with System execution privileges needed. User interaction is needed for exploitation. Patch ID: ALPS07197795; Issue ID: ALPS07340357.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://corp.mediatek.com/product-security-bulletin/September-2023',
              source: 'security@mediatek.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-20846',
          sourceIdentifier: 'security@mediatek.com',
          published: '2023-09-04T03:15:11.637',
          lastModified: '2023-09-04T03:51:45.317',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'In imgsys_cmdq, there is a possible out of bounds read due to a missing valid range checking. This could lead to local information disclosure with System execution privileges needed. User interaction is needed for exploitation. Patch ID: ALPS07354023; Issue ID: ALPS07340098.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://corp.mediatek.com/product-security-bulletin/September-2023',
              source: 'security@mediatek.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-20847',
          sourceIdentifier: 'security@mediatek.com',
          published: '2023-09-04T03:15:11.717',
          lastModified: '2023-09-04T03:51:45.317',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'In imgsys_cmdq, there is a possible out of bounds read due to a missing valid range checking. This could lead to local denial of service with System execution privileges needed. User interaction is needed for exploitation. Patch ID: ALPS07354025; Issue ID: ALPS07340108.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://corp.mediatek.com/product-security-bulletin/September-2023',
              source: 'security@mediatek.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-20848',
          sourceIdentifier: 'security@mediatek.com',
          published: '2023-09-04T03:15:11.830',
          lastModified: '2023-09-04T03:51:45.317',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'In imgsys_cmdq, there is a possible out of bounds read due to a missing valid range checking. This could lead to local escalation of privilege with System execution privileges needed. User interaction is needed for exploitation. Patch ID: ALPS07340433; Issue ID: ALPS07340433.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://corp.mediatek.com/product-security-bulletin/September-2023',
              source: 'security@mediatek.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-20849',
          sourceIdentifier: 'security@mediatek.com',
          published: '2023-09-04T03:15:11.983',
          lastModified: '2023-09-04T03:51:45.317',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'In imgsys_cmdq, there is a possible use after free due to a missing valid range checking. This could lead to local escalation of privilege with System execution privileges needed. User interaction is needed for exploitation. Patch ID: ALPS07340433; Issue ID: ALPS07340350.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://corp.mediatek.com/product-security-bulletin/September-2023',
              source: 'security@mediatek.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-20850',
          sourceIdentifier: 'security@mediatek.com',
          published: '2023-09-04T03:15:12.033',
          lastModified: '2023-09-04T03:51:45.317',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'In imgsys_cmdq, there is a possible out of bounds write due to a missing valid range checking. This could lead to local escalation of privilege with System execution privileges needed. User interaction is needed for exploitation. Patch ID: ALPS07340433; Issue ID: ALPS07340381.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://corp.mediatek.com/product-security-bulletin/September-2023',
              source: 'security@mediatek.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-20851',
          sourceIdentifier: 'security@mediatek.com',
          published: '2023-09-04T03:15:12.083',
          lastModified: '2023-09-04T03:51:45.317',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'In stc, there is a possible out of bounds read due to a race condition. This could lead to local escalation of privilege with System execution privileges needed. User interaction is needed for exploitation. Patch ID: ALPS08048635; Issue ID: ALPS08048635.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://corp.mediatek.com/product-security-bulletin/September-2023',
              source: 'security@mediatek.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-32805',
          sourceIdentifier: 'security@mediatek.com',
          published: '2023-09-04T03:15:12.140',
          lastModified: '2023-09-04T03:51:45.317',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'In power, there is a possible out of bounds write due to an insecure default value. This could lead to local escalation of privilege with System execution privileges needed. User interaction is needed for exploitation. Patch ID: ALPS08102892; Issue ID: ALPS08102892.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://corp.mediatek.com/product-security-bulletin/September-2023',
              source: 'security@mediatek.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-32806',
          sourceIdentifier: 'security@mediatek.com',
          published: '2023-09-04T03:15:12.393',
          lastModified: '2023-09-04T03:51:45.317',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'In wlan driver, there is a possible out of bounds write due to improper input validation. This could lead to local escalation of privilege with System execution privileges needed. User interaction is not needed for exploitation. Patch ID: ALPS07441589; Issue ID: ALPS07441589.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://corp.mediatek.com/product-security-bulletin/September-2023',
              source: 'security@mediatek.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-32807',
          sourceIdentifier: 'security@mediatek.com',
          published: '2023-09-04T03:15:12.657',
          lastModified: '2023-09-04T03:51:45.317',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'In wlan service, there is a possible out of bounds read due to improper input validation. This could lead to local information disclosure with System execution privileges needed. User interaction is not needed for exploitation. Patch ID: ALPS07588360; Issue ID: ALPS07588360.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://corp.mediatek.com/product-security-bulletin/September-2023',
              source: 'security@mediatek.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-32808',
          sourceIdentifier: 'security@mediatek.com',
          published: '2023-09-04T03:15:12.840',
          lastModified: '2023-09-04T03:51:45.317',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'In bluetooth driver, there is a possible read and write access to registers due to improper access control of register interface. This could lead to local leak of sensitive information with System execution privileges needed. User interaction is not needed for exploitation. Patch ID: ALPS07849751; Issue ID: ALPS07849751.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://corp.mediatek.com/product-security-bulletin/September-2023',
              source: 'security@mediatek.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-32809',
          sourceIdentifier: 'security@mediatek.com',
          published: '2023-09-04T03:15:13.023',
          lastModified: '2023-09-04T03:51:45.317',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'In bluetooth driver, there is a possible read and write access to registers due to improper access control of register interface. This could lead to local leak of sensitive information with System execution privileges needed. User interaction is not needed for exploitation. Patch ID: ALPS07849753; Issue ID: ALPS07849753.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://corp.mediatek.com/product-security-bulletin/September-2023',
              source: 'security@mediatek.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-32810',
          sourceIdentifier: 'security@mediatek.com',
          published: '2023-09-04T03:15:13.223',
          lastModified: '2023-09-04T03:51:45.317',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'In bluetooth driver, there is a possible out of bounds read due to improper input validation. This could lead to local information leak with System execution privileges needed. User interaction is not needed for exploitation. Patch ID: ALPS07867212; Issue ID: ALPS07867212.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://corp.mediatek.com/product-security-bulletin/September-2023',
              source: 'security@mediatek.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-32811',
          sourceIdentifier: 'security@mediatek.com',
          published: '2023-09-04T03:15:13.387',
          lastModified: '2023-09-04T03:51:45.317',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'In connectivity system driver, there is a possible out of bounds write due to improper input validation. This could lead to local escalation of privilege with System execution privileges needed. User interaction is not needed for exploitation. Patch ID: ALPS07929848; Issue ID: ALPS07929848.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://corp.mediatek.com/product-security-bulletin/September-2023',
              source: 'security@mediatek.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-32812',
          sourceIdentifier: 'security@mediatek.com',
          published: '2023-09-04T03:15:13.440',
          lastModified: '2023-09-04T03:51:45.317',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'In gnss service, there is a possible out of bounds write due to improper input validation. This could lead to local esclation of privileges with System execution privileges needed. User interaction is not needed for exploitation. Patch ID: ALPS08017365; Issue ID: ALPS08017365.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://corp.mediatek.com/product-security-bulletin/September-2023',
              source: 'security@mediatek.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-32813',
          sourceIdentifier: 'security@mediatek.com',
          published: '2023-09-04T03:15:13.527',
          lastModified: '2023-09-04T03:51:45.317',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'In gnss service, there is a possible out of bounds write due to improper input validation. This could lead to local information disclosure with System execution privileges needed. User interaction is not needed for exploitation. Patch ID: ALPS08017370; Issue ID: ALPS08017370.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://corp.mediatek.com/product-security-bulletin/September-2023',
              source: 'security@mediatek.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-32814',
          sourceIdentifier: 'security@mediatek.com',
          published: '2023-09-04T03:15:13.783',
          lastModified: '2023-09-04T03:51:45.317',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'In gnss service, there is a possible out of bounds read due to improper input validation. This could lead to local information disclosure with System execution privileges needed. User interaction is not needed for exploitation. Patch ID: ALPS08031947; Issue ID: ALPS08031947.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://corp.mediatek.com/product-security-bulletin/September-2023',
              source: 'security@mediatek.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-32815',
          sourceIdentifier: 'security@mediatek.com',
          published: '2023-09-04T03:15:13.990',
          lastModified: '2023-09-04T03:51:45.317',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'In gnss service, there is a possible out of bounds read due to improper input validation. This could lead to local information disclosure with System execution privileges needed. User interaction is not needed for exploitation. Patch ID: ALPS08037801; Issue ID: ALPS08037801.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://corp.mediatek.com/product-security-bulletin/September-2023',
              source: 'security@mediatek.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-32816',
          sourceIdentifier: 'security@mediatek.com',
          published: '2023-09-04T03:15:14.220',
          lastModified: '2023-09-04T03:51:45.317',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'In gnss service, there is a possible out of bounds read due to improper input validation. This could lead to local information disclosure with System execution privileges needed. User interaction is not needed for exploitation. Patch ID: ALPS08044040; Issue ID: ALPS08044032.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://corp.mediatek.com/product-security-bulletin/September-2023',
              source: 'security@mediatek.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-32817',
          sourceIdentifier: 'security@mediatek.com',
          published: '2023-09-04T03:15:14.277',
          lastModified: '2023-09-04T03:51:45.317',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'In gnss service, there is a possible out of bounds read due to improper input validation. This could lead to local information disclosure with System execution privileges needed. User interaction is not needed for exploitation. Patch ID: ALPS08044040; Issue ID: ALPS08044035.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://corp.mediatek.com/product-security-bulletin/September-2023',
              source: 'security@mediatek.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-4613',
          sourceIdentifier: 'product.security@lge.com',
          published: '2023-09-04T09:15:07.510',
          lastModified: '2023-09-05T06:50:39.603',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'This vulnerability allows remote attackers to execute arbitrary code on affected installations of LG LED Assistant. Authentication is not required to exploit this vulnerability. The specific flaw exists within the /api/settings/upload endpoint. The issue results from the lack of proper validation of a user-supplied path prior to using it in file operations. An attacker can leverage this vulnerability to execute code in the context of the current user.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'product.security@lge.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'HIGH',
                  availabilityImpact: 'HIGH',
                  baseScore: 9.8,
                  baseSeverity: 'CRITICAL',
                },
                exploitabilityScore: 3.9,
                impactScore: 5.9,
              },
            ],
          },
          weaknesses: [
            {
              source: 'product.security@lge.com',
              type: 'Secondary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-22',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://lgsecurity.lge.com/bulletins/idproducts#updateDetails',
              source: 'product.security@lge.com',
            },
            {
              url: 'https://www.zerodayinitiative.com/advisories/ZDI-23-1221/',
              source: 'product.security@lge.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-4754',
          sourceIdentifier: 'security@huntr.dev',
          published: '2023-09-04T09:15:07.897',
          lastModified: '2023-09-05T06:50:39.603',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Out-of-bounds Write in GitHub repository gpac/gpac prior to 2.3-DEV.',
            },
          ],
          metrics: {
            cvssMetricV30: [
              {
                source: 'security@huntr.dev',
                type: 'Secondary',
                cvssData: {
                  version: '3.0',
                  vectorString: 'CVSS:3.0/AV:L/AC:L/PR:L/UI:N/S:U/C:L/I:L/A:L',
                  attackVector: 'LOCAL',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'LOW',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'LOW',
                  baseScore: 5.3,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 1.8,
                impactScore: 3.4,
              },
            ],
          },
          weaknesses: [
            {
              source: 'security@huntr.dev',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-787',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://github.com/gpac/gpac/commit/7e2e92feb1b30fac1d659f6620d743b5a188ffe0',
              source: 'security@huntr.dev',
            },
            {
              url: 'https://huntr.dev/bounties/b7ed24ad-7d0b-40b7-8f4d-3c18a906620c',
              source: 'security@huntr.dev',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-4756',
          sourceIdentifier: 'security@huntr.dev',
          published: '2023-09-04T09:15:07.990',
          lastModified: '2023-09-05T06:50:39.603',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Stack-based Buffer Overflow in GitHub repository gpac/gpac prior to 2.3-DEV.',
            },
          ],
          metrics: {
            cvssMetricV30: [
              {
                source: 'security@huntr.dev',
                type: 'Secondary',
                cvssData: {
                  version: '3.0',
                  vectorString: 'CVSS:3.0/AV:L/AC:L/PR:N/UI:N/S:U/C:L/I:L/A:L',
                  attackVector: 'LOCAL',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'LOW',
                  baseScore: 5.9,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 2.5,
                impactScore: 3.4,
              },
            ],
          },
          weaknesses: [
            {
              source: 'security@huntr.dev',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-121',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://github.com/gpac/gpac/commit/6914d016e2b540bac2c471c4aea156ddef8e8e01',
              source: 'security@huntr.dev',
            },
            {
              url: 'https://huntr.dev/bounties/2342da0e-f097-4ce7-bfdc-3ec0ba446e05',
              source: 'security@huntr.dev',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-25465',
          sourceIdentifier: 'audit@patchstack.com',
          published: '2023-09-04T10:15:07.940',
          lastModified: '2023-09-05T06:50:39.603',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Auth. (admin+) Stored Cross-Site Scripting (XSS) vulnerability in Gopi Ramasamy wp tell a friend popup form plugin <= 7.1 versions.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'audit@patchstack.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:H/UI:R/S:C/C:L/I:L/A:L',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'HIGH',
                  userInteraction: 'REQUIRED',
                  scope: 'CHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'LOW',
                  baseScore: 5.9,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 1.7,
                impactScore: 3.7,
              },
            ],
          },
          weaknesses: [
            {
              source: 'audit@patchstack.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-79',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://patchstack.com/database/vulnerability/wp-tell-a-friend-popup-form/wordpress-wp-tell-a-friend-popup-form-plugin-7-1-cross-site-scripting-xss-vulnerability?_s_id=cve',
              source: 'audit@patchstack.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-36382',
          sourceIdentifier: 'audit@patchstack.com',
          published: '2023-09-04T10:15:08.730',
          lastModified: '2023-09-05T06:50:39.603',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Auth. (admin+) Stored Cross-Site Scripting (XSS) vulnerability in Jeffrey-WP Media Library Categories plugin <= 2.0.0 versions.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'audit@patchstack.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:H/UI:R/S:C/C:L/I:L/A:L',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'HIGH',
                  userInteraction: 'REQUIRED',
                  scope: 'CHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'LOW',
                  baseScore: 5.9,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 1.7,
                impactScore: 3.7,
              },
            ],
          },
          weaknesses: [
            {
              source: 'audit@patchstack.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-79',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://patchstack.com/database/vulnerability/wp-media-library-categories/wordpress-media-library-categories-plugin-2-0-0-cross-site-scripting-xss-vulnerability?_s_id=cve',
              source: 'audit@patchstack.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-39162',
          sourceIdentifier: 'audit@patchstack.com',
          published: '2023-09-04T10:15:08.913',
          lastModified: '2023-09-05T06:50:39.603',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Unauth. Reflected Cross-Site Scripting (XSS) vulnerability in XLPlugins User Email Verification for WooCommerce plugin <= 3.5.0 versions.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'audit@patchstack.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:C/C:L/I:L/A:L',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'REQUIRED',
                  scope: 'CHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'LOW',
                  baseScore: 7.1,
                  baseSeverity: 'HIGH',
                },
                exploitabilityScore: 2.8,
                impactScore: 3.7,
              },
            ],
          },
          weaknesses: [
            {
              source: 'audit@patchstack.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-79',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://patchstack.com/database/vulnerability/woo-confirmation-email/wordpress-user-email-verification-for-woocommerce-plugin-3-5-0-reflected-cross-site-scripting-xss-vulnerability?_s_id=cve',
              source: 'audit@patchstack.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-39164',
          sourceIdentifier: 'audit@patchstack.com',
          published: '2023-09-04T10:15:09.097',
          lastModified: '2023-09-05T06:50:39.603',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Unauth. Reflected Cross-Site Scripting (XSS) vulnerability in Molongui Author Box for Authors, Co-Authors, Multiple Authors and Guest Authors – Molongui plugin <= 4.6.19 versions.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'audit@patchstack.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:C/C:L/I:L/A:L',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'REQUIRED',
                  scope: 'CHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'LOW',
                  baseScore: 7.1,
                  baseSeverity: 'HIGH',
                },
                exploitabilityScore: 2.8,
                impactScore: 3.7,
              },
            ],
          },
          weaknesses: [
            {
              source: 'audit@patchstack.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-79',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://patchstack.com/database/vulnerability/molongui-authorship/wordpress-molongui-plugin-4-6-18-cross-site-scripting-xss-vulnerability?_s_id=cve',
              source: 'audit@patchstack.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-30494',
          sourceIdentifier: 'audit@patchstack.com',
          published: '2023-09-04T11:15:39.627',
          lastModified: '2023-09-05T06:50:39.603',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Unauth. Reflected Cross-Site Scripting (XSS) vulnerability in ImageRecycle ImageRecycle pdf & image compression plugin <= 3.1.10 versions.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'audit@patchstack.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:C/C:L/I:L/A:L',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'REQUIRED',
                  scope: 'CHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'LOW',
                  baseScore: 7.1,
                  baseSeverity: 'HIGH',
                },
                exploitabilityScore: 2.8,
                impactScore: 3.7,
              },
            ],
          },
          weaknesses: [
            {
              source: 'audit@patchstack.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-79',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://patchstack.com/database/vulnerability/imagerecycle-pdf-image-compression/wordpress-imagerecycle-pdf-image-compression-plugin-3-1-10-cross-site-scripting-xss-vulnerability?_s_id=cve',
              source: 'audit@patchstack.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-31220',
          sourceIdentifier: 'audit@patchstack.com',
          published: '2023-09-04T11:15:40.123',
          lastModified: '2023-09-05T06:50:39.603',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Unauth. Reflected Cross-Site Scripting (XSS) vulnerability in WP-EXPERTS.IN TEAM WP Categories Widget plugin <= 2.2 versions.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'audit@patchstack.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:C/C:L/I:L/A:L',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'REQUIRED',
                  scope: 'CHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'LOW',
                  baseScore: 7.1,
                  baseSeverity: 'HIGH',
                },
                exploitabilityScore: 2.8,
                impactScore: 3.7,
              },
            ],
          },
          weaknesses: [
            {
              source: 'audit@patchstack.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-79',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://patchstack.com/database/vulnerability/wp-categories-widget/wordpress-wp-categories-widget-plugin-2-2-cross-site-scripting-xss-vulnerability?_s_id=cve',
              source: 'audit@patchstack.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-37393',
          sourceIdentifier: 'audit@patchstack.com',
          published: '2023-09-04T11:15:40.383',
          lastModified: '2023-09-05T06:50:39.603',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Auth. (admin+) Stored Cross-Site Scripting (XSS) vulnerability in Atarim Visual Website Collaboration, Feedback & Project Management – Atarim plugin <= 3.9.3 versions.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'audit@patchstack.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:C/C:L/I:L/A:L',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'REQUIRED',
                  scope: 'CHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'LOW',
                  baseScore: 7.1,
                  baseSeverity: 'HIGH',
                },
                exploitabilityScore: 2.8,
                impactScore: 3.7,
              },
            ],
          },
          weaknesses: [
            {
              source: 'audit@patchstack.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-79',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://patchstack.com/database/vulnerability/atarim-visual-collaboration/wordpress-atarim-plugin-3-9-3-reflected-cross-site-scripting-xss-vulnerability?_s_id=cve',
              source: 'audit@patchstack.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-39918',
          sourceIdentifier: 'audit@patchstack.com',
          published: '2023-09-04T11:15:40.483',
          lastModified: '2023-09-05T06:50:39.603',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Unauth. Reflected Cross-Site Scripting (XSS) vulnerability in SAASPROJECT Booking Package Booking Package plugin <= 1.6.01 versions.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'audit@patchstack.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:C/C:L/I:L/A:L',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'REQUIRED',
                  scope: 'CHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'LOW',
                  baseScore: 7.1,
                  baseSeverity: 'HIGH',
                },
                exploitabilityScore: 2.8,
                impactScore: 3.7,
              },
            ],
          },
          weaknesses: [
            {
              source: 'audit@patchstack.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-79',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://patchstack.com/database/vulnerability/booking-package/wordpress-booking-package-plugin-1-6-01-reflected-cross-site-scripting-xss-vulnerability?_s_id=cve',
              source: 'audit@patchstack.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-39919',
          sourceIdentifier: 'audit@patchstack.com',
          published: '2023-09-04T11:15:40.627',
          lastModified: '2023-09-05T06:50:39.603',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Auth. (admin+) Stored Cross-Site Scripting (XSS) vulnerability in maennchen1.De wpShopGermany – Protected Shops plugin <= 2.0 versions.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'audit@patchstack.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:H/UI:R/S:C/C:L/I:L/A:L',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'HIGH',
                  userInteraction: 'REQUIRED',
                  scope: 'CHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'LOW',
                  baseScore: 5.9,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 1.7,
                impactScore: 3.7,
              },
            ],
          },
          weaknesses: [
            {
              source: 'audit@patchstack.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-79',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://patchstack.com/database/vulnerability/wpshopgermany-protectedshops/wordpress-wpshopgermany-protected-shops-plugin-2-0-cross-site-scripting-xss-vulnerability?_s_id=cve',
              source: 'audit@patchstack.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-39987',
          sourceIdentifier: 'audit@patchstack.com',
          published: '2023-09-04T11:15:40.737',
          lastModified: '2023-09-05T06:50:39.603',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Auth. (admin+) Stored Cross-Site Scripting (XSS) vulnerability in Ajay Lulia wSecure Lite plugin <= 2.5 versions.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'audit@patchstack.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:H/UI:R/S:C/C:L/I:L/A:L',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'HIGH',
                  userInteraction: 'REQUIRED',
                  scope: 'CHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'LOW',
                  baseScore: 5.9,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 1.7,
                impactScore: 3.7,
              },
            ],
          },
          weaknesses: [
            {
              source: 'audit@patchstack.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-79',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://patchstack.com/database/vulnerability/wsecure/wordpress-wsecure-lite-plugin-2-5-cross-site-scripting-xss?_s_id=cve',
              source: 'audit@patchstack.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-39988',
          sourceIdentifier: 'audit@patchstack.com',
          published: '2023-09-04T11:15:40.840',
          lastModified: '2023-09-05T06:50:39.603',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Auth. (contributor+) Stored Cross-Site Scripting (XSS) vulnerability in ???(std.Cloud) WxSync plugin <= 2.7.23 versions.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'audit@patchstack.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:L/UI:R/S:C/C:L/I:L/A:L',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'LOW',
                  userInteraction: 'REQUIRED',
                  scope: 'CHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'LOW',
                  baseScore: 6.5,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 2.3,
                impactScore: 3.7,
              },
            ],
          },
          weaknesses: [
            {
              source: 'audit@patchstack.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-79',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://patchstack.com/database/vulnerability/wxsync/wordpress-wxsync-plugin-2-7-23-cross-site-scripting-xss?_s_id=cve',
              source: 'audit@patchstack.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-39991',
          sourceIdentifier: 'audit@patchstack.com',
          published: '2023-09-04T11:15:40.933',
          lastModified: '2023-09-05T06:50:39.603',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Unauth. Reflected Cross-Site Scripting (XSS) vulnerability in Blindside Networks BigBlueButton plugin <= 3.0.0-beta.4 versions.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'audit@patchstack.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:C/C:L/I:L/A:L',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'REQUIRED',
                  scope: 'CHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'LOW',
                  baseScore: 7.1,
                  baseSeverity: 'HIGH',
                },
                exploitabilityScore: 2.8,
                impactScore: 3.7,
              },
            ],
          },
          weaknesses: [
            {
              source: 'audit@patchstack.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-79',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://patchstack.com/database/vulnerability/bigbluebutton/wordpress-bigbluebutton-plugin-3-0-0-beta-4-reflected-cross-site-scripting-xss-vulnerability?_s_id=cve',
              source: 'audit@patchstack.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-39992',
          sourceIdentifier: 'audit@patchstack.com',
          published: '2023-09-04T11:15:41.030',
          lastModified: '2023-09-05T06:50:39.603',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Unauth. Reflected Cross-Site Scripting (XSS) vulnerability in vCita.Com Online Booking & Scheduling Calendar for WordPress by vcita plugin <= 4.3.2 versions.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'audit@patchstack.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:C/C:L/I:L/A:L',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'REQUIRED',
                  scope: 'CHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'LOW',
                  baseScore: 7.1,
                  baseSeverity: 'HIGH',
                },
                exploitabilityScore: 2.8,
                impactScore: 3.7,
              },
            ],
          },
          weaknesses: [
            {
              source: 'audit@patchstack.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-79',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://patchstack.com/database/vulnerability/meeting-scheduler-by-vcita/wordpress-online-booking-scheduling-calendar-for-wordpress-by-vcita-plugin-4-3-2-reflected-cross-site-scripting-xss-vulnerability?_s_id=cve',
              source: 'audit@patchstack.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-40206',
          sourceIdentifier: 'audit@patchstack.com',
          published: '2023-09-04T11:15:41.133',
          lastModified: '2023-09-05T06:50:39.603',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Auth. (admin+) Stored Cross-Site Scripting (XSS) vulnerability in hwk-fr WP 404 Auto Redirect to Similar Post plugin <= 1.0.3 versions.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'audit@patchstack.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:H/UI:R/S:C/C:L/I:L/A:L',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'HIGH',
                  userInteraction: 'REQUIRED',
                  scope: 'CHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'LOW',
                  baseScore: 5.9,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 1.7,
                impactScore: 3.7,
              },
            ],
          },
          weaknesses: [
            {
              source: 'audit@patchstack.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-79',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://patchstack.com/database/vulnerability/wp-404-auto-redirect-to-similar-post/wordpress-wp-404-auto-redirect-to-similar-post-plugin-1-0-3-cross-site-scripting-xss-vulnerability?_s_id=cve',
              source: 'audit@patchstack.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-40208',
          sourceIdentifier: 'audit@patchstack.com',
          published: '2023-09-04T11:15:41.227',
          lastModified: '2023-09-05T06:50:39.603',
          vulnStatus: 'Undergoing Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Unauth. Reflected Cross-Site Scripting (XSS) vulnerability in Aleksandar Uroševi? Stock Ticker plugin <= 3.23.3 versions.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'audit@patchstack.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:C/C:L/I:L/A:L',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'REQUIRED',
                  scope: 'CHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'LOW',
                  baseScore: 7.1,
                  baseSeverity: 'HIGH',
                },
                exploitabilityScore: 2.8,
                impactScore: 3.7,
              },
            ],
          },
          weaknesses: [
            {
              source: 'audit@patchstack.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-79',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://patchstack.com/database/vulnerability/stock-ticker/wordpress-stock-ticker-plugin-3-23-3-unauth-reflected-cross-site-scripting-xss-vulnerability?_s_id=cve',
              source: 'audit@patchstack.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-4614',
          sourceIdentifier: 'product.security@lge.com',
          published: '2023-09-04T11:15:41.560',
          lastModified: '2023-09-05T06:50:39.603',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'This vulnerability allows remote attackers to execute arbitrary code on affected installations of LG LED Assistant. Authentication is not required to exploit this vulnerability. The specific flaw exists within the /api/installation/setThumbnailRc endpoint. The issue results from the lack of proper validation of a user-supplied path prior to using it in file operations. An attacker can leverage this vulnerability to execute code in the context of the current user.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'product.security@lge.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'HIGH',
                  availabilityImpact: 'HIGH',
                  baseScore: 9.8,
                  baseSeverity: 'CRITICAL',
                },
                exploitabilityScore: 3.9,
                impactScore: 5.9,
              },
            ],
          },
          weaknesses: [
            {
              source: 'product.security@lge.com',
              type: 'Secondary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-22',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://lgsecurity.lge.com/bulletins/idproducts#updateDetails',
              source: 'product.security@lge.com',
            },
            {
              url: 'https://www.zerodayinitiative.com/advisories/ZDI-23-1222/',
              source: 'product.security@lge.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-4615',
          sourceIdentifier: 'product.security@lge.com',
          published: '2023-09-04T11:15:41.657',
          lastModified: '2023-09-05T06:50:39.603',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'This vulnerability allows remote attackers to disclose sensitive information on affected installations of LG LED Assistant. Authentication is not required to exploit this vulnerability. The specific flaw exists within the /api/download/updateFile endpoint. The issue results from the lack of proper validation of a user-supplied path prior to using it in file operations. An attacker can leverage this vulnerability to disclose information in the context of the current user.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'product.security@lge.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:N/A:N',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'NONE',
                  availabilityImpact: 'NONE',
                  baseScore: 7.5,
                  baseSeverity: 'HIGH',
                },
                exploitabilityScore: 3.9,
                impactScore: 3.6,
              },
            ],
          },
          weaknesses: [
            {
              source: 'product.security@lge.com',
              type: 'Secondary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-22',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://lgsecurity.lge.com/bulletins/idproducts#updateDetails',
              source: 'product.security@lge.com',
            },
            {
              url: 'https://www.zerodayinitiative.com/advisories/ZDI-23-1224/',
              source: 'product.security@lge.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-4616',
          sourceIdentifier: 'product.security@lge.com',
          published: '2023-09-04T11:15:41.747',
          lastModified: '2023-09-05T06:50:39.603',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'This vulnerability allows remote attackers to disclose sensitive information on affected installations of LG LED Assistant. Authentication is not required to exploit this vulnerability. The specific flaw exists within the /api/thumbnail endpoint. The issue results from the lack of proper validation of a user-supplied path prior to using it in file operations. An attacker can leverage this vulnerability to disclose information in the context of the current user.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'product.security@lge.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:N/A:N',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'NONE',
                  availabilityImpact: 'NONE',
                  baseScore: 7.5,
                  baseSeverity: 'HIGH',
                },
                exploitabilityScore: 3.9,
                impactScore: 3.6,
              },
            ],
          },
          weaknesses: [
            {
              source: 'product.security@lge.com',
              type: 'Secondary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-22',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://lgsecurity.lge.com/bulletins/idproducts#updateDetails',
              source: 'product.security@lge.com',
            },
            {
              url: 'https://www.zerodayinitiative.com/advisories/ZDI-23-1223/',
              source: 'product.security@lge.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-2813',
          sourceIdentifier: 'contact@wpscan.com',
          published: '2023-09-04T12:15:08.997',
          lastModified: '2023-09-05T06:50:39.603',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'All of the above Aapna WordPress theme through 1.3, Anand WordPress theme through 1.2, Anfaust WordPress theme through 1.1, Arendelle WordPress theme before 1.1.13, Atlast Business WordPress theme through 1.5.8.5, Bazaar Lite WordPress theme before 1.8.6, Brain Power WordPress theme through 1.2, BunnyPressLite WordPress theme before 2.1, Cafe Bistro WordPress theme before 1.1.4, College WordPress theme before 1.5.1, Connections Reloaded WordPress theme through 3.1, Counterpoint WordPress theme through 1.8.1, Digitally WordPress theme through 1.0.8, Directory WordPress theme before 3.0.2, Drop WordPress theme before 1.22, Everse WordPress theme before 1.2.4, Fashionable Store WordPress theme through 1.3.4, Fullbase WordPress theme before 1.2.1, Ilex WordPress theme before 1.4.2, Js O3 Lite WordPress theme through 1.5.8.2, Js Paper WordPress theme through 2.5.7, Kata WordPress theme before 1.2.9, Kata App WordPress theme through 1.0.5, Kata Business WordPress theme through 1.0.2, Looki Lite WordPress theme before 1.3.0, moseter WordPress theme through 1.3.1, Nokke WordPress theme before 1.2.4, Nothing Personal WordPress theme through 1.0.7, Offset Writing WordPress theme through 1.2, Opor Ayam WordPress theme through 18, Pinzolo WordPress theme before 1.2.10, Plato WordPress theme before 1.1.9, Polka Dots WordPress theme through 1.2, Purity Of Soul WordPress theme through 1.9, Restaurant PT WordPress theme before 1.1.3, Saul WordPress theme before 1.1.0, Sean Lite WordPress theme before 1.4.6, Tantyyellow WordPress theme through 1.0.0.5, TIJAJI WordPress theme through 1.43, Tiki Time WordPress theme through 1.3, Tuaug4 WordPress theme through 1.4, Tydskrif WordPress theme through 1.1.3, UltraLight WordPress theme through 1.2, Venice Lite WordPress theme before 1.5.5, Viala WordPress theme through 1.3.1, viburno WordPress theme before 1.3.2, Wedding Bride WordPress theme before 1.0.2, Wlow WordPress theme before 1.2.7 suffer from the same issue about the search box reflecting the results causing XSS which allows an unauthenticated attacker to exploit against users if they click a malicious link.',
            },
          ],
          metrics: {},
          weaknesses: [
            {
              source: 'contact@wpscan.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-79',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://wpscan.com/vulnerability/f434afd3-7de4-4bf4-a9bb-9f9aeaae1dc5',
              source: 'contact@wpscan.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-30485',
          sourceIdentifier: 'audit@patchstack.com',
          published: '2023-09-04T12:15:09.140',
          lastModified: '2023-09-05T06:50:39.603',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Unauth. Reflected Cross-Site Scripting (XSS) vulnerability in Solwin Infotech Responsive WordPress Slider – Avartan Slider Lite plugin <= 1.5.3 versions.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'audit@patchstack.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:C/C:L/I:L/A:L',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'REQUIRED',
                  scope: 'CHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'LOW',
                  baseScore: 7.1,
                  baseSeverity: 'HIGH',
                },
                exploitabilityScore: 2.8,
                impactScore: 3.7,
              },
            ],
          },
          weaknesses: [
            {
              source: 'audit@patchstack.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-79',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://patchstack.com/database/vulnerability/avartan-slider-lite/wordpress-avartan-slider-lite-plugin-1-5-3-reflected-cross-site-scripting-xss-vulnerability?_s_id=cve',
              source: 'audit@patchstack.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-32102',
          sourceIdentifier: 'audit@patchstack.com',
          published: '2023-09-04T12:15:09.220',
          lastModified: '2023-09-05T06:50:39.603',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Auth. (contributor+) Stored Cross-Site Scripting (XSS) vulnerability in Pexle Chris Library Viewer plugin <= 2.0.6 versions.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'audit@patchstack.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:L/UI:R/S:C/C:L/I:L/A:L',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'LOW',
                  userInteraction: 'REQUIRED',
                  scope: 'CHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'LOW',
                  baseScore: 6.5,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 2.3,
                impactScore: 3.7,
              },
            ],
          },
          weaknesses: [
            {
              source: 'audit@patchstack.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-79',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://patchstack.com/database/vulnerability/library-viewer/wordpress-library-viewer-plugin-2-0-6-cross-site-scripting-xss-vulnerability?_s_id=cve',
              source: 'audit@patchstack.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-32296',
          sourceIdentifier: 'audit@patchstack.com',
          published: '2023-09-04T12:15:09.313',
          lastModified: '2023-09-05T06:50:39.603',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Unauth. Reflected Cross-Site Scripting (XSS) vulnerability in Kangu para WooCommerce plugin <= 2.2.9 versions.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'audit@patchstack.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:C/C:L/I:L/A:L',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'REQUIRED',
                  scope: 'CHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'LOW',
                  baseScore: 7.1,
                  baseSeverity: 'HIGH',
                },
                exploitabilityScore: 2.8,
                impactScore: 3.7,
              },
            ],
          },
          weaknesses: [
            {
              source: 'audit@patchstack.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-79',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://patchstack.com/database/vulnerability/kangu/wordpress-kangu-para-woocommerce-plugin-2-2-9-reflected-cross-site-scripting-xss-vulnerability?_s_id=cve',
              source: 'audit@patchstack.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-32578',
          sourceIdentifier: 'audit@patchstack.com',
          published: '2023-09-04T12:15:09.400',
          lastModified: '2023-09-05T06:50:39.603',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Auth. (contributor+) Stored Cross-Site Scripting (XSS) vulnerability in Twinpictures Column-Matic plugin <= 1.3.3 versions.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'audit@patchstack.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:L/UI:R/S:C/C:L/I:L/A:L',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'LOW',
                  userInteraction: 'REQUIRED',
                  scope: 'CHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'LOW',
                  baseScore: 6.5,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 2.3,
                impactScore: 3.7,
              },
            ],
          },
          weaknesses: [
            {
              source: 'audit@patchstack.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-79',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://patchstack.com/database/vulnerability/column-matic/wordpress-column-matic-plugin-1-3-3-cross-site-scripting-xss-vulnerability?_s_id=cve',
              source: 'audit@patchstack.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-3499',
          sourceIdentifier: 'contact@wpscan.com',
          published: '2023-09-04T12:15:09.493',
          lastModified: '2023-09-05T06:50:39.603',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'The Photo Gallery, Images, Slider in Rbs Image Gallery WordPress plugin before 3.2.16 does not sanitise and escape some of its settings, which could allow high privilege users such as admin to perform Stored Cross-Site Scripting attacks even when the unfiltered_html capability is disallowed (for example in multisite setup)',
            },
          ],
          metrics: {},
          weaknesses: [
            {
              source: 'contact@wpscan.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-79',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://wpscan.com/vulnerability/ea29413b-494e-410e-ae42-42f96284899c',
              source: 'contact@wpscan.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-3814',
          sourceIdentifier: 'contact@wpscan.com',
          published: '2023-09-04T12:15:09.570',
          lastModified: '2023-09-05T06:50:39.603',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'The Advanced File Manager WordPress plugin before 5.1.1 does not adequately authorize its usage on multisite installations, allowing site admin users to list and read arbitrary files and folders on the server.',
            },
          ],
          metrics: {},
          weaknesses: [
            {
              source: 'contact@wpscan.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-284',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://wpscan.com/vulnerability/ca954ec6-6ebd-4d72-a323-570474e2e339',
              source: 'contact@wpscan.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-40196',
          sourceIdentifier: 'audit@patchstack.com',
          published: '2023-09-04T12:15:09.647',
          lastModified: '2023-09-05T06:50:39.603',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Unauth. Reflected Cross-Site Scripting (XSS) vulnerability in ImageRecycle ImageRecycle pdf & image compression plugin <= 3.1.11 versions.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'audit@patchstack.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:C/C:L/I:L/A:L',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'REQUIRED',
                  scope: 'CHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'LOW',
                  baseScore: 7.1,
                  baseSeverity: 'HIGH',
                },
                exploitabilityScore: 2.8,
                impactScore: 3.7,
              },
            ],
          },
          weaknesses: [
            {
              source: 'audit@patchstack.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-79',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://patchstack.com/database/vulnerability/imagerecycle-pdf-image-compression/wordpress-imagerecycle-pdf-image-compression-plugin-3-1-11-reflected-cross-site-scripting-xss-vulnerability?_s_id=cve',
              source: 'audit@patchstack.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-40197',
          sourceIdentifier: 'audit@patchstack.com',
          published: '2023-09-04T12:15:09.737',
          lastModified: '2023-09-05T06:50:39.603',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Auth. (contributor+) Stored Cross-Site Scripting (XSS) vulnerability in Devaldi Ltd flowpaper plugin <= 1.9.9 versions.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'audit@patchstack.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:L/UI:R/S:C/C:L/I:L/A:L',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'LOW',
                  userInteraction: 'REQUIRED',
                  scope: 'CHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'LOW',
                  baseScore: 6.5,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 2.3,
                impactScore: 3.7,
              },
            ],
          },
          weaknesses: [
            {
              source: 'audit@patchstack.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-79',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://patchstack.com/database/vulnerability/flowpaper-lite-pdf-flipbook/wordpress-flowpaper-plugin-1-9-9-cross-site-scripting-xss-vulnerability?_s_id=cve',
              source: 'audit@patchstack.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-40205',
          sourceIdentifier: 'audit@patchstack.com',
          published: '2023-09-04T12:15:09.823',
          lastModified: '2023-09-05T06:50:39.603',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Unauth. Reflected Cross-Site Scripting (XSS) vulnerability in Pixelgrade PixTypes plugin <= 1.4.15 versions.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'audit@patchstack.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:C/C:L/I:L/A:L',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'REQUIRED',
                  scope: 'CHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'LOW',
                  baseScore: 7.1,
                  baseSeverity: 'HIGH',
                },
                exploitabilityScore: 2.8,
                impactScore: 3.7,
              },
            ],
          },
          weaknesses: [
            {
              source: 'audit@patchstack.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-79',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://patchstack.com/database/vulnerability/pixtypes/wordpress-pixtypes-plugin-1-4-15-cross-site-scripting-xss-vulnerability?_s_id=cve',
              source: 'audit@patchstack.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-40214',
          sourceIdentifier: 'audit@patchstack.com',
          published: '2023-09-04T12:15:09.917',
          lastModified: '2023-09-05T06:50:39.603',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Unauth. Reflected Cross-Site Scripting (XSS) vulnerability in Vathemes Business Pro theme <= 1.10.4 versions.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'audit@patchstack.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:C/C:L/I:L/A:L',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'REQUIRED',
                  scope: 'CHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'LOW',
                  baseScore: 7.1,
                  baseSeverity: 'HIGH',
                },
                exploitabilityScore: 2.8,
                impactScore: 3.7,
              },
            ],
          },
          weaknesses: [
            {
              source: 'audit@patchstack.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-79',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://patchstack.com/database/vulnerability/business-pro/wordpress-business-pro-theme-1-10-4-reflected-cross-site-scripting-xss-vulnerability?_s_id=cve',
              source: 'audit@patchstack.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-4019',
          sourceIdentifier: 'contact@wpscan.com',
          published: '2023-09-04T12:15:10.037',
          lastModified: '2023-09-05T06:50:39.603',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'The Media from FTP WordPress plugin before 11.17 does not properly limit who can use the plugin, which may allow users with author+ privileges to move files around, like wp-config.php, which may lead to RCE in some cases.',
            },
          ],
          metrics: {},
          weaknesses: [
            {
              source: 'contact@wpscan.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-863',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://wpscan.com/vulnerability/0d323b07-c6e7-4aba-85bc-64659ad0c85d',
              source: 'contact@wpscan.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-4059',
          sourceIdentifier: 'contact@wpscan.com',
          published: '2023-09-04T12:15:10.110',
          lastModified: '2023-09-05T06:50:39.603',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'The Profile Builder WordPress plugin before 3.9.8 lacks authorisation and CSRF in its page creation function which allows unauthenticated users to create the register, log-in and edit-profile pages from the plugin on the blog',
            },
          ],
          metrics: {},
          weaknesses: [
            {
              source: 'contact@wpscan.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-352',
                },
                {
                  lang: 'en',
                  value: 'CWE-862',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://wpscan.com/vulnerability/fc719d12-2f58-4d1f-b696-0f937e706842',
              source: 'contact@wpscan.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-4151',
          sourceIdentifier: 'contact@wpscan.com',
          published: '2023-09-04T12:15:10.187',
          lastModified: '2023-09-05T06:50:39.603',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'The Store Locator WordPress plugin before 1.4.13 does not sanitise and escape an invalid nonce before outputting it back in an AJAX response, leading to a Reflected Cross-Site Scripting which could be used against high privilege users such as admin',
            },
          ],
          metrics: {},
          weaknesses: [
            {
              source: 'contact@wpscan.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-79',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://wpscan.com/vulnerability/c9d80aa4-a26d-4b3f-b7bf-9d2fb0560d7b',
              source: 'contact@wpscan.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-4216',
          sourceIdentifier: 'contact@wpscan.com',
          published: '2023-09-04T12:15:10.257',
          lastModified: '2023-09-05T06:50:39.603',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                "The Orders Tracking for WooCommerce WordPress plugin before 1.2.6 doesn't validate the file_url parameter when importing a CSV file, allowing high privilege users with the manage_woocommerce capability to access any file on the web server via a Traversal attack. The content retrieved is however limited to the first line of the file.",
            },
          ],
          metrics: {},
          weaknesses: [
            {
              source: 'contact@wpscan.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-22',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://wpscan.com/vulnerability/8189afc4-17b3-4696-89e1-731011cb9e2b',
              source: 'contact@wpscan.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-4253',
          sourceIdentifier: 'contact@wpscan.com',
          published: '2023-09-04T12:15:10.333',
          lastModified: '2023-09-05T06:50:39.603',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'The AI ChatBot WordPress plugin before 4.7.8 does not sanitise and escape some of its settings, which could allow high privilege users such as admin to perform Stored Cross-Site Scripting attacks even when the unfiltered_html capability is disallowed (for example in multisite setup)',
            },
          ],
          metrics: {},
          weaknesses: [
            {
              source: 'contact@wpscan.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-79',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://wpscan.com/vulnerability/1cbbab9e-be3d-4081-bc0e-c52d500d9871',
              source: 'contact@wpscan.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-4254',
          sourceIdentifier: 'contact@wpscan.com',
          published: '2023-09-04T12:15:10.403',
          lastModified: '2023-09-05T06:50:39.603',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'The AI ChatBot WordPress plugin before 4.7.8 does not sanitise and escape some of its settings, which could allow high privilege users such as admin to perform Stored Cross-Site Scripting attacks even when the unfiltered_html capability is disallowed (for example in multisite setup)',
            },
          ],
          metrics: {},
          weaknesses: [
            {
              source: 'contact@wpscan.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-79',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://wpscan.com/vulnerability/0dfffe48-e60d-4bab-b194-8a63554246c3',
              source: 'contact@wpscan.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-4269',
          sourceIdentifier: 'contact@wpscan.com',
          published: '2023-09-04T12:15:10.470',
          lastModified: '2023-09-05T06:50:39.603',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'The User Activity Log WordPress plugin before 1.6.6 lacks proper authorisation when exporting its activity logs, allowing any authenticated users, such as subscriber to perform such action and retrieve PII such as email addresses.',
            },
          ],
          metrics: {},
          weaknesses: [
            {
              source: 'contact@wpscan.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-862',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://wpscan.com/vulnerability/db3e4336-117c-47f2-9b43-2ca115525297',
              source: 'contact@wpscan.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-4279',
          sourceIdentifier: 'contact@wpscan.com',
          published: '2023-09-04T12:15:10.547',
          lastModified: '2023-09-05T06:50:39.603',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'This User Activity Log WordPress plugin before 1.6.7 retrieves client IP addresses from potentially untrusted headers, allowing an attacker to manipulate its value. This may be used to hide the source of malicious traffic.',
            },
            {
              lang: 'es',
              value:
                'El plugin de WordPress User Activity Log anterior a la versión 1.6.7 recupera direcciones IP de clientes a partir de cabeceras potencialmente no fiables, lo que permite a un atacante manipular su valor. Esto puede utilizarse para ocultar el origen del tráfico malicioso. ',
            },
          ],
          metrics: {},
          weaknesses: [
            {
              source: 'contact@wpscan.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-290',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://wpscan.com/vulnerability/2bd2579e-b383-4d12-b207-6fc32cfb82bc',
              source: 'contact@wpscan.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-4284',
          sourceIdentifier: 'contact@wpscan.com',
          published: '2023-09-04T12:15:10.627',
          lastModified: '2023-09-05T06:50:39.603',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'The Post Timeline WordPress plugin before 2.2.6 does not sanitise and escape an invalid nonce before outputting it back in an AJAX response, leading to a Reflected Cross-Site Scripting which could be used against high privilege users such as admin',
            },
          ],
          metrics: {},
          weaknesses: [
            {
              source: 'contact@wpscan.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-79',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://wpscan.com/vulnerability/1c126869-0afa-456f-94cc-10334964e5f9',
              source: 'contact@wpscan.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-4298',
          sourceIdentifier: 'contact@wpscan.com',
          published: '2023-09-04T12:15:10.693',
          lastModified: '2023-09-05T06:50:39.603',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'The 123.chat WordPress plugin before 1.3.1 does not sanitise and escape some of its settings, which could allow high privilege users such as admin to perform Stored Cross-Site Scripting attacks even when the unfiltered_html capability is disallowed (for example in multisite setup)',
            },
          ],
          metrics: {},
          weaknesses: [
            {
              source: 'contact@wpscan.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-79',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://wpscan.com/vulnerability/36285052-8464-4fd6-b4b1-c175e730edad',
              source: 'contact@wpscan.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-4587',
          sourceIdentifier: 'cve-coordination@incibe.es',
          published: '2023-09-04T12:15:10.760',
          lastModified: '2023-09-05T06:50:39.603',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                '** UNSUPPPORTED WHEN ASSIGNED ** An IDOR vulnerability has been found in ZKTeco ZEM800 product affecting version 6.60. This vulnerability allows a local attacker to obtain registered user backup files or device configuration files over a local network or through a VPN server.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'cve-coordination@incibe.es',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:A/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:L',
                  attackVector: 'ADJACENT_NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'HIGH',
                  availabilityImpact: 'LOW',
                  baseScore: 8.3,
                  baseSeverity: 'HIGH',
                },
                exploitabilityScore: 2.8,
                impactScore: 5.5,
              },
            ],
          },
          weaknesses: [
            {
              source: 'cve-coordination@incibe.es',
              type: 'Secondary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-639',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://www.incibe.es/en/incibe-cert/notices/aviso/insecure-direct-object-reference-zkteco-zem800',
              source: 'cve-coordination@incibe.es',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-3221',
          sourceIdentifier: 'cve-coordination@incibe.es',
          published: '2023-09-04T13:15:32.853',
          lastModified: '2023-09-05T06:50:39.603',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'User enumeration vulnerability in Password Recovery plugin 1.2 version for Roundcube, which could allow a remote attacker to create a test script against the password recovery function to enumerate all users in the database.',
            },
            {
              lang: 'es',
              value:
                'Se ha descubierto una vulnerabilidad de enumeración de usuarios en el plugin Password Recovery versión 1.2 para Roundcube, que podría permitir a un atacante remoto crear un script de prueba contra la función de recuperación de contraseñas para enumerar todos los usuarios de la base de datos. ',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'cve-coordination@incibe.es',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:L/I:N/A:N',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'NONE',
                  availabilityImpact: 'NONE',
                  baseScore: 5.3,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 3.9,
                impactScore: 1.4,
              },
            ],
          },
          weaknesses: [
            {
              source: 'cve-coordination@incibe.es',
              type: 'Secondary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-204',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://www.incibe.es/en/incibe-cert/notices/aviso/multiple-vulnerabilities-roundcube-password-recovery-plugin',
              source: 'cve-coordination@incibe.es',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-3222',
          sourceIdentifier: 'cve-coordination@incibe.es',
          published: '2023-09-04T13:15:33.987',
          lastModified: '2023-09-05T06:50:39.603',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Vulnerability in the password recovery mechanism of Password Recovery plugin for Roundcube, in its 1.2 version, which could allow a remote attacker to change an existing user´s password by adding a 6-digit numeric token. An attacker could create an automatic script to test all possible values because the platform has no limit on the number of requests.',
            },
            {
              lang: 'es',
              value:
                'Se ha descubierto una vulnerabilidad en el mecanismo de recuperación de contraseñas del plugin Password Recovery para Roundcube, en su versión 1.2, que podría permitir a un atacante remoto cambiar la contraseña de un usuario existente añadiendo un token numérico de 6 dígitos. Un atacante podría crear un script automático para probar todos los valores posibles, ya que la plataforma no tiene límite en el número de peticiones. ',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'cve-coordination@incibe.es',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:N/A:N',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'NONE',
                  availabilityImpact: 'NONE',
                  baseScore: 7.5,
                  baseSeverity: 'HIGH',
                },
                exploitabilityScore: 3.9,
                impactScore: 3.6,
              },
            ],
          },
          weaknesses: [
            {
              source: 'cve-coordination@incibe.es',
              type: 'Secondary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-640',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://www.incibe.es/en/incibe-cert/notices/aviso/multiple-vulnerabilities-roundcube-password-recovery-plugin',
              source: 'cve-coordination@incibe.es',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-4733',
          sourceIdentifier: 'security@huntr.dev',
          published: '2023-09-04T14:15:07.563',
          lastModified: '2023-09-05T06:50:39.603',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Use After Free in GitHub repository vim/vim prior to 9.0.1840.',
            },
          ],
          metrics: {
            cvssMetricV30: [
              {
                source: 'security@huntr.dev',
                type: 'Secondary',
                cvssData: {
                  version: '3.0',
                  vectorString: 'CVSS:3.0/AV:L/AC:L/PR:L/UI:R/S:U/C:H/I:H/A:H',
                  attackVector: 'LOCAL',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'LOW',
                  userInteraction: 'REQUIRED',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'HIGH',
                  availabilityImpact: 'HIGH',
                  baseScore: 7.3,
                  baseSeverity: 'HIGH',
                },
                exploitabilityScore: 1.3,
                impactScore: 5.9,
              },
            ],
          },
          weaknesses: [
            {
              source: 'security@huntr.dev',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-416',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://github.com/vim/vim/commit/e1dc9a627536304bc4f738c21e909ad9fcf3974c',
              source: 'security@huntr.dev',
            },
            {
              url: 'https://huntr.dev/bounties/1ce1fd8c-050a-4373-8004-b35b61590217',
              source: 'security@huntr.dev',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-4750',
          sourceIdentifier: 'security@huntr.dev',
          published: '2023-09-04T14:15:08.263',
          lastModified: '2023-09-05T06:50:39.603',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Use After Free in GitHub repository vim/vim prior to 9.0.1857.',
            },
          ],
          metrics: {
            cvssMetricV30: [
              {
                source: 'security@huntr.dev',
                type: 'Secondary',
                cvssData: {
                  version: '3.0',
                  vectorString: 'CVSS:3.0/AV:L/AC:L/PR:N/UI:R/S:U/C:H/I:H/A:H',
                  attackVector: 'LOCAL',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'REQUIRED',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'HIGH',
                  availabilityImpact: 'HIGH',
                  baseScore: 7.8,
                  baseSeverity: 'HIGH',
                },
                exploitabilityScore: 1.8,
                impactScore: 5.9,
              },
            ],
          },
          weaknesses: [
            {
              source: 'security@huntr.dev',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-416',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://github.com/vim/vim/commit/fc68299d436cf87453e432daa77b6d545df4d7ed',
              source: 'security@huntr.dev',
            },
            {
              url: 'https://huntr.dev/bounties/1ab3ebdf-fe7d-4436-b483-9a586e03b0ea',
              source: 'security@huntr.dev',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-4752',
          sourceIdentifier: 'security@huntr.dev',
          published: '2023-09-04T14:15:08.450',
          lastModified: '2023-09-05T06:50:39.603',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Use After Free in GitHub repository vim/vim prior to 9.0.1858.',
            },
          ],
          metrics: {
            cvssMetricV30: [
              {
                source: 'security@huntr.dev',
                type: 'Secondary',
                cvssData: {
                  version: '3.0',
                  vectorString: 'CVSS:3.0/AV:L/AC:L/PR:N/UI:R/S:U/C:H/I:H/A:H',
                  attackVector: 'LOCAL',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'REQUIRED',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'HIGH',
                  availabilityImpact: 'HIGH',
                  baseScore: 7.8,
                  baseSeverity: 'HIGH',
                },
                exploitabilityScore: 1.8,
                impactScore: 5.9,
              },
            ],
          },
          weaknesses: [
            {
              source: 'security@huntr.dev',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-416',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://github.com/vim/vim/commit/ee9166eb3b41846661a39b662dc7ebe8b5e15139',
              source: 'security@huntr.dev',
            },
            {
              url: 'https://huntr.dev/bounties/85f62dd7-ed84-4fa2-b265-8a369a318757',
              source: 'security@huntr.dev',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-4755',
          sourceIdentifier: 'security@huntr.dev',
          published: '2023-09-04T14:15:08.593',
          lastModified: '2023-09-05T06:50:39.603',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Use After Free in GitHub repository gpac/gpac prior to 2.3-DEV.',
            },
          ],
          metrics: {
            cvssMetricV30: [
              {
                source: 'security@huntr.dev',
                type: 'Secondary',
                cvssData: {
                  version: '3.0',
                  vectorString: 'CVSS:3.0/AV:L/AC:L/PR:L/UI:N/S:U/C:L/I:L/A:L',
                  attackVector: 'LOCAL',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'LOW',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'LOW',
                  baseScore: 5.3,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 1.8,
                impactScore: 3.4,
              },
            ],
          },
          weaknesses: [
            {
              source: 'security@huntr.dev',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-416',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://github.com/gpac/gpac/commit/895ac12da168435eb8db3f96978ffa4c69d66c3a',
              source: 'security@huntr.dev',
            },
            {
              url: 'https://huntr.dev/bounties/463474b7-a4e8-42b6-8b30-e648a77ee6b3',
              source: 'security@huntr.dev',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-28072',
          sourceIdentifier: 'security_alert@emc.com',
          published: '2023-09-04T16:15:07.767',
          lastModified: '2023-09-05T06:50:39.603',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                '\nDell Alienware Command Center, versions prior to 5.5.51.0, contain a deserialization of untrusted data vulnerability. A local malicious user could potentially send specially crafted requests to the .NET Remoting server to run arbitrary code on the system.\n\n',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'security_alert@emc.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:L/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:H',
                  attackVector: 'LOCAL',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'LOW',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'HIGH',
                  availabilityImpact: 'HIGH',
                  baseScore: 7.8,
                  baseSeverity: 'HIGH',
                },
                exploitabilityScore: 1.8,
                impactScore: 5.9,
              },
            ],
          },
          weaknesses: [
            {
              source: 'security_alert@emc.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-502',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://www.dell.com/support/kbdoc/en-in/000212982/dsa-2023-158',
              source: 'security_alert@emc.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-4758',
          sourceIdentifier: 'security@huntr.dev',
          published: '2023-09-04T16:15:08.143',
          lastModified: '2023-09-05T06:50:39.603',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Buffer Over-read in GitHub repository gpac/gpac prior to 2.3-DEV.',
            },
          ],
          metrics: {
            cvssMetricV30: [
              {
                source: 'security@huntr.dev',
                type: 'Secondary',
                cvssData: {
                  version: '3.0',
                  vectorString: 'CVSS:3.0/AV:L/AC:L/PR:N/UI:N/S:U/C:L/I:L/A:L',
                  attackVector: 'LOCAL',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'LOW',
                  baseScore: 5.9,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 2.5,
                impactScore: 3.4,
              },
            ],
          },
          weaknesses: [
            {
              source: 'security@huntr.dev',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-126',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://github.com/gpac/gpac/commit/193633b1648582444fc99776cd741d7ba0125e86',
              source: 'security@huntr.dev',
            },
            {
              url: 'https://huntr.dev/bounties/2f496261-1090-45ac-bc89-cc93c82090d6',
              source: 'security@huntr.dev',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-40015',
          sourceIdentifier: 'security-advisories@github.com',
          published: '2023-09-04T18:15:07.880',
          lastModified: '2023-09-05T06:50:39.603',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Vyper is a Pythonic Smart Contract Language. For the following (probably non-exhaustive) list of expressions, the compiler evaluates the arguments from right to left instead of left to right. `unsafe_add, unsafe_sub, unsafe_mul, unsafe_div, pow_mod256, |, &, ^ (bitwise operators), bitwise_or (deprecated), bitwise_and (deprecated), bitwise_xor (deprecated), raw_call, <, >, <=, >=, ==, !=, in, not in (when lhs and rhs are enums)`. This behaviour becomes a problem when the evaluation of one of the arguments produces side effects that other arguments depend on. The following expressions can produce side-effect: state modifying external call , state modifying internal call, `raw_call`, `pop()` when used on a Dynamic Array stored in the storage, `create_minimal_proxy_to`, `create_copy_of`, `create_from_blueprint`. This issue has not yet been patched. Users are advised to make sure that the arguments of the expression do not produce side effects or, if one does, that no other argument is dependent on those side effects.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'security-advisories@github.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:L/A:N',
                  attackVector: 'NETWORK',
                  attackComplexity: 'HIGH',
                  privilegesRequired: 'NONE',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'NONE',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'NONE',
                  baseScore: 3.7,
                  baseSeverity: 'LOW',
                },
                exploitabilityScore: 2.2,
                impactScore: 1.4,
              },
            ],
          },
          weaknesses: [
            {
              source: 'security-advisories@github.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-670',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://github.com/vyperlang/vyper/security/advisories/GHSA-g2xh-c426-v8mf',
              source: 'security-advisories@github.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-41052',
          sourceIdentifier: 'security-advisories@github.com',
          published: '2023-09-04T18:15:08.657',
          lastModified: '2023-09-05T06:50:39.603',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Vyper is a Pythonic Smart Contract Language. In affected versions the order of evaluation of the arguments of the builtin functions `uint256_addmod`, `uint256_mulmod`, `ecadd` and `ecmul` does not follow source order. This behaviour is problematic when the evaluation of one of the arguments produces side effects that other arguments depend on. A patch is currently being developed on pull request #3583. When using builtins from the list above, users should make sure that the arguments of the expression do not produce side effects or, if one does, that no other argument is dependent on those side effects.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'security-advisories@github.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:N/I:L/A:N',
                  attackVector: 'NETWORK',
                  attackComplexity: 'HIGH',
                  privilegesRequired: 'NONE',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'NONE',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'NONE',
                  baseScore: 3.7,
                  baseSeverity: 'LOW',
                },
                exploitabilityScore: 2.2,
                impactScore: 1.4,
              },
            ],
          },
          weaknesses: [
            {
              source: 'security-advisories@github.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-670',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://github.com/vyperlang/vyper/pull/3583',
              source: 'security-advisories@github.com',
            },
            {
              url: 'https://github.com/vyperlang/vyper/security/advisories/GHSA-4hg4-9mf5-wxxq',
              source: 'security-advisories@github.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-41054',
          sourceIdentifier: 'security-advisories@github.com',
          published: '2023-09-04T18:15:08.977',
          lastModified: '2023-09-05T06:50:39.603',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'LibreY is a fork of LibreX, a framework-less and javascript-free privacy respecting meta search engine. LibreY is subject to a Server-Side Request Forgery (SSRF) vulnerability in the `image_proxy.php` file of LibreY before commit 8f9b9803f231e2954e5b49987a532d28fe50a627. This vulnerability allows remote attackers to use the server as a proxy to send HTTP GET requests to arbitrary targets and retrieve information in the internal network or conduct Denial-of-Service (DoS) attacks via the `url` parameter. Remote attackers can use the server as a proxy to send HTTP GET requests and retrieve information in the internal network. Remote attackers can also request the server to download large files or chain requests among multiple instances to reduce the performance of the server or even deny access from legitimate users. This issue has been addressed in https://github.com/Ahwxorg/LibreY/pull/31. LibreY hosters are advised to use the latest commit. There are no known workarounds for this vulnerability.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'security-advisories@github.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:L/I:N/A:H',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'NONE',
                  availabilityImpact: 'HIGH',
                  baseScore: 8.2,
                  baseSeverity: 'HIGH',
                },
                exploitabilityScore: 3.9,
                impactScore: 4.2,
              },
            ],
          },
          weaknesses: [
            {
              source: 'security-advisories@github.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-918',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://github.com/Ahwxorg/LibreY/pull/31',
              source: 'security-advisories@github.com',
            },
            {
              url: 'https://github.com/Ahwxorg/LibreY/security/advisories/GHSA-p4f9-h8x8-mpwf',
              source: 'security-advisories@github.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-41055',
          sourceIdentifier: 'security-advisories@github.com',
          published: '2023-09-04T18:15:09.203',
          lastModified: '2023-09-05T06:50:39.603',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'LibreY is a fork of LibreX, a framework-less and javascript-free privacy respecting meta search engine. LibreY is subject to a Server-Side Request Forgery (SSRF) vulnerability in the `engines/google/text.php` and `engines/duckduckgo/text.php` files in versions before commit be59098abd119cda70b15bf3faac596dfd39a744. This vulnerability allows remote attackers to request the server to send HTTP GET requests to arbitrary targets and conduct Denial-of-Service (DoS) attacks via the `wikipedia_language` cookie. Remote attackers can request the server to download large files to reduce the performance of the server or even deny access from legitimate users. This issue has been patched in https://github.com/Ahwxorg/LibreY/pull/9. LibreY hosters are advised to use the latest commit. There are no known workarounds for this vulnerability.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'security-advisories@github.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'NONE',
                  integrityImpact: 'NONE',
                  availabilityImpact: 'HIGH',
                  baseScore: 7.5,
                  baseSeverity: 'HIGH',
                },
                exploitabilityScore: 3.9,
                impactScore: 3.6,
              },
            ],
          },
          weaknesses: [
            {
              source: 'security-advisories@github.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-918',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://github.com/Ahwxorg/LibreY/pull/9',
              source: 'security-advisories@github.com',
            },
            {
              url: 'https://github.com/Ahwxorg/LibreY/security/advisories/GHSA-xfj6-4vp9-8rgc',
              source: 'security-advisories@github.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-41057',
          sourceIdentifier: 'security-advisories@github.com',
          published: '2023-09-04T18:15:09.397',
          lastModified: '2023-09-05T06:50:39.603',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'hyper-bump-it is a command line tool for updating the version in project files.`hyper-bump-it` reads a file glob pattern from the configuration file. That is combined with the project root directory to construct a full glob pattern that is used to find files that should be edited. These matched files should be contained within the project root directory, but that is not checked. This could result in changes being written to files outside of the project. The default behaviour of `hyper-bump-it` is to display the planned changes and prompt the user for confirmation before editing any files. However, the configuration file provides a field that can be used cause files to be edited without displaying the prompt. This issue has been fixed in release version 0.5.1. Users are advised to upgrade. Users that are unable to update from vulnerable versions, executing `hyper-bump-it` with the `--interactive` command line argument will ensure that all planned changes are displayed and prompt the user for confirmation before editing any files, even if the configuration file contains `show_confirm_prompt=true`.\n',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'security-advisories@github.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:L/AC:L/PR:N/UI:R/S:U/C:N/I:H/A:N',
                  attackVector: 'LOCAL',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'REQUIRED',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'NONE',
                  integrityImpact: 'HIGH',
                  availabilityImpact: 'NONE',
                  baseScore: 5.5,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 1.8,
                impactScore: 3.6,
              },
            ],
          },
          weaknesses: [
            {
              source: 'security-advisories@github.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-22',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://github.com/plannigan/hyper-bump-it/pull/307',
              source: 'security-advisories@github.com',
            },
            {
              url: 'https://github.com/plannigan/hyper-bump-it/security/advisories/GHSA-xc27-f9q3-4448',
              source: 'security-advisories@github.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-3995',
          sourceIdentifier: 'cve-coordination@google.com',
          published: '2023-09-04T20:15:07.387',
          lastModified: '2023-09-04T20:15:07.387',
          vulnStatus: 'Rejected',
          descriptions: [
            {
              lang: 'en',
              value:
                '** REJECT ** This CVE ID has been rejected or withdrawn by its CVE Numbering Authority because it is a duplicate of CVE-2023-4147.',
            },
          ],
          metrics: {},
          references: [],
        },
      },
      {
        cve: {
          id: 'CVE-2023-41058',
          sourceIdentifier: 'security-advisories@github.com',
          published: '2023-09-04T23:15:47.513',
          lastModified: '2023-09-05T06:50:39.603',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                "Parse Server is an open source backend server. In affected versions the Parse Cloud trigger `beforeFind` is not invoked in certain conditions of `Parse.Query`. This can pose a vulnerability for deployments where the `beforeFind` trigger is used as a security layer to modify the incoming query. The vulnerability has been fixed by refactoring the internal query pipeline for a more concise code structure and implementing a patch to ensure the `beforeFind` trigger is invoked. This fix was introduced in commit `be4c7e23c6` and has been included in releases 6.2.2 and 5.5.5. Users are advised to upgrade. Users unable to upgrade should make use of parse server's security layers to manage access levels with Class-Level Permissions and Object-Level Access Control that should be used instead of custom security layers in Cloud Code triggers.",
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'security-advisories@github.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:N/A:N',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'NONE',
                  availabilityImpact: 'NONE',
                  baseScore: 7.5,
                  baseSeverity: 'HIGH',
                },
                exploitabilityScore: 3.9,
                impactScore: 3.6,
              },
            ],
          },
          weaknesses: [
            {
              source: 'security-advisories@github.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-670',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://docs.parseplatform.org/parse-server/guide/#security',
              source: 'security-advisories@github.com',
            },
            {
              url: 'https://github.com/parse-community/parse-server/commit/be4c7e23c63a2fb690685665cebed0de26be05c5',
              source: 'security-advisories@github.com',
            },
            {
              url: 'https://github.com/parse-community/parse-server/releases/tag/5.5.5',
              source: 'security-advisories@github.com',
            },
            {
              url: 'https://github.com/parse-community/parse-server/releases/tag/6.2.2',
              source: 'security-advisories@github.com',
            },
            {
              url: 'https://github.com/parse-community/parse-server/security/advisories/GHSA-fcv6-fg5r-jm9q',
              source: 'security-advisories@github.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2022-43903',
          sourceIdentifier: 'psirt@us.ibm.com',
          published: '2023-09-05T00:15:07.347',
          lastModified: '2023-09-05T06:50:39.603',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'IBM Security Guardium 10.6, 11.3, and 11.4 could allow an authenticated user to cause a denial of service due to due to improper input validation.  IBM X-Force ID:  240894.',
            },
            {
              lang: 'es',
              value:
                'IBM Security Guardium v10.6, v11.3 y v11.4 podría permitir a un usuario autenticado provocar una denegación de servicio debido a una validación de entrada incorrecta.  IBM X-Force ID: 240894.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'psirt@us.ibm.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:N/A:L',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'LOW',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'NONE',
                  integrityImpact: 'NONE',
                  availabilityImpact: 'LOW',
                  baseScore: 4.3,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 2.8,
                impactScore: 1.4,
              },
            ],
          },
          weaknesses: [
            {
              source: 'psirt@us.ibm.com',
              type: 'Secondary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-20',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://exchange.xforce.ibmcloud.com/vulnerabilities/240894',
              source: 'psirt@us.ibm.com',
            },
            {
              url: 'https://www.ibm.com/support/pages/node/7030110',
              source: 'psirt@us.ibm.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-32338',
          sourceIdentifier: 'psirt@us.ibm.com',
          published: '2023-09-05T00:15:07.750',
          lastModified: '2023-09-05T06:50:39.603',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'IBM Sterling Secure Proxy and IBM Sterling External Authentication Server 6.0.3 and 6.1.0 stores user credentials in plain clear text which can be read by a local user with container access.  IBM X-Force ID:  255585.',
            },
            {
              lang: 'es',
              value:
                'IBM Sterling Secure Proxy e IBM Sterling External Authentication Server v6.0.3 y v6.1.0 almacenan credenciales de usuario en texto claro que puede leer un usuario local con acceso al contenedor. IBM X-Force ID: 255585. ',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'psirt@us.ibm.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:L/AC:H/PR:N/UI:N/S:U/C:H/I:N/A:N',
                  attackVector: 'LOCAL',
                  attackComplexity: 'HIGH',
                  privilegesRequired: 'NONE',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'NONE',
                  availabilityImpact: 'NONE',
                  baseScore: 5.1,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 1.4,
                impactScore: 3.6,
              },
            ],
          },
          references: [
            {
              url: 'https://exchange.xforce.ibmcloud.com/vulnerabilities/255585',
              source: 'psirt@us.ibm.com',
            },
            {
              url: 'https://https://www.ibm.com/support/pages/node/7029765',
              source: 'psirt@us.ibm.com',
            },
            {
              url: 'https://www.ibm.com/support/pages/node/7029766',
              source: 'psirt@us.ibm.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-35892',
          sourceIdentifier: 'psirt@us.ibm.com',
          published: '2023-09-05T00:15:07.833',
          lastModified: '2023-09-05T06:50:39.603',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'IBM Financial Transaction Manager for SWIFT Services 3.2.4 is vulnerable to an XML External Entity Injection (XXE) attack when processing XML data. A remote attacker could exploit this vulnerability to expose sensitive information or consume memory resources.  IBM X-Force ID:  258786.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'psirt@us.ibm.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:H/I:N/A:L',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'LOW',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'NONE',
                  availabilityImpact: 'LOW',
                  baseScore: 7.1,
                  baseSeverity: 'HIGH',
                },
                exploitabilityScore: 2.8,
                impactScore: 4.2,
              },
            ],
          },
          weaknesses: [
            {
              source: 'psirt@us.ibm.com',
              type: 'Secondary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-611',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://exchange.xforce.ibmcloud.com/vulnerabilities/258786',
              source: 'psirt@us.ibm.com',
            },
            {
              url: 'https://www.ibm.com/support/pages/node/7030359',
              source: 'psirt@us.ibm.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-22870',
          sourceIdentifier: 'psirt@us.ibm.com',
          published: '2023-09-05T01:15:07.360',
          lastModified: '2023-09-05T06:50:39.603',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'IBM Aspera Faspex 5.0.5 transmits sensitive information in cleartext which could be obtained by an attacker using man in the middle techniques.  IBM X-Force ID:  244121.',
            },
            {
              lang: 'es',
              value:
                'IBM Aspera Faspex v5.0.5 transmite información sensible en texto claro que podría ser obtenida por un atacante utilizando técnicas de "man in the middle". IBM X-Force ID: 244121.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'psirt@us.ibm.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:H/I:N/A:N',
                  attackVector: 'NETWORK',
                  attackComplexity: 'HIGH',
                  privilegesRequired: 'NONE',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'NONE',
                  availabilityImpact: 'NONE',
                  baseScore: 5.9,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 2.2,
                impactScore: 3.6,
              },
            ],
          },
          weaknesses: [
            {
              source: 'psirt@us.ibm.com',
              type: 'Secondary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-319',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://exchange.xforce.ibmcloud.com/vulnerabilities/244121',
              source: 'psirt@us.ibm.com',
            },
            {
              url: 'https://www.ibm.com/support/pages/node/7029681',
              source: 'psirt@us.ibm.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-29261',
          sourceIdentifier: 'psirt@us.ibm.com',
          published: '2023-09-05T01:15:07.783',
          lastModified: '2023-09-05T06:50:39.603',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'IBM Sterling Secure Proxy 6.0.3 and 6.1.0 could allow a local user with specific information about the system to obtain privileged information due to inadequate memory clearing during operations.  IBM X-Force ID:  252139.',
            },
            {
              lang: 'es',
              value:
                'IBM Sterling Secure Proxy v6.0.3 y v6.1.0 podrían permitir a un usuario local con información específica sobre el sistema obtener información privilegiada debido a una limpieza inadecuada de la memoria durante las operaciones. ID de IBM X-Force: 252139. ',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'psirt@us.ibm.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:L/AC:H/PR:N/UI:N/S:U/C:H/I:N/A:N',
                  attackVector: 'LOCAL',
                  attackComplexity: 'HIGH',
                  privilegesRequired: 'NONE',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'NONE',
                  availabilityImpact: 'NONE',
                  baseScore: 5.1,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 1.4,
                impactScore: 3.6,
              },
            ],
          },
          weaknesses: [
            {
              source: 'psirt@us.ibm.com',
              type: 'Secondary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-922',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://exchange.xforce.ibmcloud.com/vulnerabilities/252139',
              source: 'psirt@us.ibm.com',
            },
            {
              url: 'https://https://www.ibm.com/support/pages/node/7029765',
              source: 'psirt@us.ibm.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-35906',
          sourceIdentifier: 'psirt@us.ibm.com',
          published: '2023-09-05T01:15:07.920',
          lastModified: '2023-09-05T06:50:39.603',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'IBM Aspera Faspex 5.0.5 could allow a remote attacked to bypass IP restrictions due to improper access controls.  IBM X-Force ID:  259649.',
            },
            {
              lang: 'es',
              value:
                'IBM Aspera Faspex v5.0.5 podría permitir a un atacante remoto saltarse las restricciones de IP debido a controles de acceso inadecuados. ID de IBM X-Force: 259649. ',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'psirt@us.ibm.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:L/A:N',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'NONE',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'NONE',
                  baseScore: 5.3,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 3.9,
                impactScore: 1.4,
              },
            ],
          },
          weaknesses: [
            {
              source: 'psirt@us.ibm.com',
              type: 'Secondary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-348',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://exchange.xforce.ibmcloud.com/vulnerabilities/259649',
              source: 'psirt@us.ibm.com',
            },
            {
              url: 'https://www.ibm.com/support/pages/node/7029681',
              source: 'psirt@us.ibm.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-4636',
          sourceIdentifier: 'security@wordfence.com',
          published: '2023-09-05T03:15:12.293',
          lastModified: '2023-09-05T06:50:39.603',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'The WordPress File Sharing Plugin plugin for WordPress is vulnerable to Stored Cross-Site Scripting via admin settings in versions up to, and including, 2.0.3 due to insufficient input sanitization and output escaping. This makes it possible for authenticated attackers, with administrator-level permissions and above, to inject arbitrary web scripts in pages that will execute whenever a user accesses an injected page. This only affects multi-site installations and installations where unfiltered_html has been disabled.',
            },
            {
              lang: 'es',
              value:
                'El plugin WordPress File Sharing para WordPress es vulnerable a Cross-Site Scripting (XSS) almacenado a través de la configuración de administración en versiones hasta, e incluyendo, la 2.0.3 debido a la insuficiente sanitización de entrada y escape de salida. Esto hace posible que atacantes autenticados, con permisos de nivel de administrador y superiores, inyecten scripts web arbitrarios en páginas que se ejecutarán cada vez que un usuario acceda a una página inyectada. Esto solo afecta a las instalaciones multisitio y las instalaciones en las que se ha deshabilitado "unfiltered_html".',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'security@wordfence.com',
                type: 'Primary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:H/PR:H/UI:N/S:C/C:L/I:L/A:N',
                  attackVector: 'NETWORK',
                  attackComplexity: 'HIGH',
                  privilegesRequired: 'HIGH',
                  userInteraction: 'NONE',
                  scope: 'CHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'NONE',
                  baseScore: 4.4,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 1.3,
                impactScore: 2.7,
              },
            ],
          },
          weaknesses: [
            {
              source: 'security@wordfence.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-79',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://github.com/xsn1210/vul2/blob/main/xss%5BWordPressFile%5D%20.md',
              source: 'security@wordfence.com',
            },
            {
              url: 'https://plugins.trac.wordpress.org/changeset/2961909/user-private-files',
              source: 'security@wordfence.com',
            },
            {
              url: 'https://www.wordfence.com/threat-intel/vulnerabilities/id/1df04293-87e9-4ab4-975d-54d36a993ab0?source=cve',
              source: 'security@wordfence.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-36308',
          sourceIdentifier: 'cve@mitre.org',
          published: '2023-09-05T04:15:08.703',
          lastModified: '2023-09-05T06:50:39.603',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                '** DISPUTED ** disintegration Imaging 1.6.2 allows attackers to cause a panic (because of an integer index out of range during a Grayscale call) via a crafted TIFF file to the scan function of scanner.go. NOTE: it is unclear whether there are common use cases in which this panic could have any security consequence',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://github.com/disintegration/imaging/issues/165',
              source: 'cve@mitre.org',
            },
            {
              url: 'https://github.com/disintegration/imaging/releases/tag/v1.6.2',
              source: 'cve@mitre.org',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-40936',
          sourceIdentifier: 'cve@mitre.org',
          published: '2023-09-05T04:15:09.200',
          lastModified: '2023-09-05T04:15:09.200',
          vulnStatus: 'Rejected',
          descriptions: [
            {
              lang: 'en',
              value:
                '** REJECT ** DO NOT USE THIS CANDIDATE NUMBER. ConsultIDs: none. Reason: This candidate was withdrawn by its CNA. Further investigation showed that it was not a security issue. Notes: none.',
            },
          ],
          metrics: {},
          references: [],
        },
      },
      {
        cve: {
          id: 'CVE-2023-40937',
          sourceIdentifier: 'cve@mitre.org',
          published: '2023-09-05T04:15:09.260',
          lastModified: '2023-09-05T04:15:09.260',
          vulnStatus: 'Rejected',
          descriptions: [
            {
              lang: 'en',
              value:
                '** REJECT ** DO NOT USE THIS CANDIDATE NUMBER. ConsultIDs: none. Reason: This candidate was withdrawn by its CNA. Further investigation showed that it was not a security issue. Notes: none.',
            },
          ],
          metrics: {},
          references: [],
        },
      },
      {
        cve: {
          id: 'CVE-2023-36307',
          sourceIdentifier: 'cve@mitre.org',
          published: '2023-09-05T05:15:07.983',
          lastModified: '2023-09-05T06:50:39.603',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                '** DISPUTED ** ZPLGFA 1.1.1 allows attackers to cause a panic (because of an integer index out of range during a ConvertToGraphicField call) via an image of zero width. NOTE: it is unclear whether there are common use cases in which this panic could have any security consequence',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://github.com/SimonWaldherr/zplgfa/pull/6',
              source: 'cve@mitre.org',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-4748',
          sourceIdentifier: 'cna@vuldb.com',
          published: '2023-09-05T06:15:07.760',
          lastModified: '2023-09-05T06:50:39.603',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'A vulnerability, which was classified as critical, has been found in Yongyou UFIDA-NC up to 20230807. This issue affects some unknown processing of the file PrintTemplateFileServlet.java. The manipulation of the argument filePath leads to path traversal. The attack may be initiated remotely. The exploit has been disclosed to the public and may be used. The identifier VDB-238637 was assigned to this vulnerability.',
            },
          ],
          metrics: {
            cvssMetricV30: [
              {
                source: 'cna@vuldb.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.0',
                  vectorString: 'CVSS:3.0/AV:N/AC:L/PR:L/UI:N/S:U/C:L/I:L/A:L',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'LOW',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'LOW',
                  baseScore: 6.3,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 2.8,
                impactScore: 3.4,
              },
            ],
            cvssMetricV2: [
              {
                source: 'cna@vuldb.com',
                type: 'Secondary',
                cvssData: {
                  version: '2.0',
                  vectorString: 'AV:N/AC:L/Au:S/C:P/I:P/A:P',
                  accessVector: 'NETWORK',
                  accessComplexity: 'LOW',
                  authentication: 'SINGLE',
                  confidentialityImpact: 'PARTIAL',
                  integrityImpact: 'PARTIAL',
                  availabilityImpact: 'PARTIAL',
                  baseScore: 6.5,
                },
                baseSeverity: 'MEDIUM',
                exploitabilityScore: 8.0,
                impactScore: 6.4,
                acInsufInfo: false,
                obtainAllPrivilege: false,
                obtainUserPrivilege: false,
                obtainOtherPrivilege: false,
                userInteractionRequired: false,
              },
            ],
          },
          weaknesses: [
            {
              source: 'cna@vuldb.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-22',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://github.com/houseoforange/mybugs/blob/main/Yongyou-UFIDA-NC-Arbitrary-File-Read.pdf',
              source: 'cna@vuldb.com',
            },
            {
              url: 'https://vuldb.com/?ctiid.238637',
              source: 'cna@vuldb.com',
            },
            {
              url: 'https://vuldb.com/?id.238637',
              source: 'cna@vuldb.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2022-33220',
          sourceIdentifier: 'product-security@qualcomm.com',
          published: '2023-09-05T07:15:11.847',
          lastModified: '2023-09-05T12:54:56.227',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Information disclosure in Automotive multimedia due to buffer over-read.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'product-security@qualcomm.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:L/AC:L/PR:H/UI:N/S:U/C:H/I:N/A:L',
                  attackVector: 'LOCAL',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'HIGH',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'NONE',
                  availabilityImpact: 'LOW',
                  baseScore: 5.1,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 0.8,
                impactScore: 4.2,
              },
            ],
          },
          references: [
            {
              url: 'https://www.qualcomm.com/company/product-security/bulletins/september-2023-bulletin',
              source: 'product-security@qualcomm.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2022-33275',
          sourceIdentifier: 'product-security@qualcomm.com',
          published: '2023-09-05T07:15:11.983',
          lastModified: '2023-09-05T12:54:56.227',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Memory corruption due to improper validation of array index in WLAN HAL when received lm_itemNum is out of range.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'product-security@qualcomm.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:L/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H',
                  attackVector: 'LOCAL',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'HIGH',
                  availabilityImpact: 'HIGH',
                  baseScore: 8.4,
                  baseSeverity: 'HIGH',
                },
                exploitabilityScore: 2.5,
                impactScore: 5.9,
              },
            ],
          },
          references: [
            {
              url: 'https://www.qualcomm.com/company/product-security/bulletins/september-2023-bulletin',
              source: 'product-security@qualcomm.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2022-40524',
          sourceIdentifier: 'product-security@qualcomm.com',
          published: '2023-09-05T07:15:12.073',
          lastModified: '2023-09-05T12:54:56.227',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Memory corruption due to buffer over-read in Modem while processing SetNativeHandle RTP service.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'product-security@qualcomm.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:L/AC:L/PR:H/UI:N/S:U/C:H/I:H/A:H',
                  attackVector: 'LOCAL',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'HIGH',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'HIGH',
                  availabilityImpact: 'HIGH',
                  baseScore: 6.7,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 0.8,
                impactScore: 5.9,
              },
            ],
          },
          references: [
            {
              url: 'https://www.qualcomm.com/company/product-security/bulletins/september-2023-bulletin',
              source: 'product-security@qualcomm.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2022-40534',
          sourceIdentifier: 'product-security@qualcomm.com',
          published: '2023-09-05T07:15:12.157',
          lastModified: '2023-09-05T12:54:56.227',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Memory corruption due to improper validation of array index in Audio.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'product-security@qualcomm.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:L/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H',
                  attackVector: 'LOCAL',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'HIGH',
                  availabilityImpact: 'HIGH',
                  baseScore: 8.4,
                  baseSeverity: 'HIGH',
                },
                exploitabilityScore: 2.5,
                impactScore: 5.9,
              },
            ],
          },
          references: [
            {
              url: 'https://www.qualcomm.com/company/product-security/bulletins/september-2023-bulletin',
              source: 'product-security@qualcomm.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-21636',
          sourceIdentifier: 'product-security@qualcomm.com',
          published: '2023-09-05T07:15:12.247',
          lastModified: '2023-09-05T12:54:56.227',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Memory Corruption due to improper validation of array index in Linux while updating adn record.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'product-security@qualcomm.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:L/AC:L/PR:H/UI:N/S:U/C:H/I:H/A:H',
                  attackVector: 'LOCAL',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'HIGH',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'HIGH',
                  availabilityImpact: 'HIGH',
                  baseScore: 6.7,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 0.8,
                impactScore: 5.9,
              },
            ],
          },
          references: [
            {
              url: 'https://www.qualcomm.com/company/product-security/bulletins/september-2023-bulletin',
              source: 'product-security@qualcomm.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-21644',
          sourceIdentifier: 'product-security@qualcomm.com',
          published: '2023-09-05T07:15:12.327',
          lastModified: '2023-09-05T12:54:56.227',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Memory corruption in RIL due to Integer Overflow while triggering qcril_uim_request_apdu request.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'product-security@qualcomm.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:L/AC:L/PR:H/UI:N/S:U/C:H/I:H/A:H',
                  attackVector: 'LOCAL',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'HIGH',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'HIGH',
                  availabilityImpact: 'HIGH',
                  baseScore: 6.7,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 0.8,
                impactScore: 5.9,
              },
            ],
          },
          references: [
            {
              url: 'https://www.qualcomm.com/company/product-security/bulletins/september-2023-bulletin',
              source: 'product-security@qualcomm.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-21646',
          sourceIdentifier: 'product-security@qualcomm.com',
          published: '2023-09-05T07:15:12.410',
          lastModified: '2023-09-05T12:54:56.227',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Transient DOS in Modem while processing invalid System Information Block 1.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'product-security@qualcomm.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'NONE',
                  integrityImpact: 'NONE',
                  availabilityImpact: 'HIGH',
                  baseScore: 7.5,
                  baseSeverity: 'HIGH',
                },
                exploitabilityScore: 3.9,
                impactScore: 3.6,
              },
            ],
          },
          references: [
            {
              url: 'https://www.qualcomm.com/company/product-security/bulletins/september-2023-bulletin',
              source: 'product-security@qualcomm.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-21653',
          sourceIdentifier: 'product-security@qualcomm.com',
          published: '2023-09-05T07:15:12.490',
          lastModified: '2023-09-05T12:54:56.227',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Transient DOS in Modem while processing RRC reconfiguration message.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'product-security@qualcomm.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'NONE',
                  integrityImpact: 'NONE',
                  availabilityImpact: 'HIGH',
                  baseScore: 7.5,
                  baseSeverity: 'HIGH',
                },
                exploitabilityScore: 3.9,
                impactScore: 3.6,
              },
            ],
          },
          references: [
            {
              url: 'https://www.qualcomm.com/company/product-security/bulletins/september-2023-bulletin',
              source: 'product-security@qualcomm.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-21654',
          sourceIdentifier: 'product-security@qualcomm.com',
          published: '2023-09-05T07:15:12.570',
          lastModified: '2023-09-05T12:54:51.627',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Memory corruption in Audio during playback session with audio effects enabled.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'product-security@qualcomm.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:L/AC:L/PR:H/UI:N/S:U/C:H/I:H/A:H',
                  attackVector: 'LOCAL',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'HIGH',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'HIGH',
                  availabilityImpact: 'HIGH',
                  baseScore: 6.7,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 0.8,
                impactScore: 5.9,
              },
            ],
          },
          references: [
            {
              url: 'https://www.qualcomm.com/company/product-security/bulletins/september-2023-bulletin',
              source: 'product-security@qualcomm.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-21655',
          sourceIdentifier: 'product-security@qualcomm.com',
          published: '2023-09-05T07:15:12.697',
          lastModified: '2023-09-05T12:54:51.627',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Memory corruption in Audio while validating and mapping metadata.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'product-security@qualcomm.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:L/AC:L/PR:H/UI:N/S:U/C:H/I:H/A:H',
                  attackVector: 'LOCAL',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'HIGH',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'HIGH',
                  availabilityImpact: 'HIGH',
                  baseScore: 6.7,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 0.8,
                impactScore: 5.9,
              },
            ],
          },
          references: [
            {
              url: 'https://www.qualcomm.com/company/product-security/bulletins/september-2023-bulletin',
              source: 'product-security@qualcomm.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-21662',
          sourceIdentifier: 'product-security@qualcomm.com',
          published: '2023-09-05T07:15:12.780',
          lastModified: '2023-09-05T12:54:51.627',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Memory corruption in Core Platform while printing the response buffer in log.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'product-security@qualcomm.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:L/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:H',
                  attackVector: 'LOCAL',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'LOW',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'HIGH',
                  availabilityImpact: 'HIGH',
                  baseScore: 7.8,
                  baseSeverity: 'HIGH',
                },
                exploitabilityScore: 1.8,
                impactScore: 5.9,
              },
            ],
          },
          references: [
            {
              url: 'https://www.qualcomm.com/company/product-security/bulletins/september-2023-bulletin',
              source: 'product-security@qualcomm.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-21663',
          sourceIdentifier: 'product-security@qualcomm.com',
          published: '2023-09-05T07:15:12.863',
          lastModified: '2023-09-05T12:54:51.627',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value: 'Memory Corruption while accessing metadata in Display.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'product-security@qualcomm.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:L/AC:L/PR:H/UI:N/S:U/C:H/I:H/A:H',
                  attackVector: 'LOCAL',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'HIGH',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'HIGH',
                  availabilityImpact: 'HIGH',
                  baseScore: 6.7,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 0.8,
                impactScore: 5.9,
              },
            ],
          },
          references: [
            {
              url: 'https://www.qualcomm.com/company/product-security/bulletins/september-2023-bulletin',
              source: 'product-security@qualcomm.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-21664',
          sourceIdentifier: 'product-security@qualcomm.com',
          published: '2023-09-05T07:15:12.940',
          lastModified: '2023-09-05T12:54:51.627',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Memory Corruption in Core Platform while printing the response buffer in log.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'product-security@qualcomm.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:L/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:H',
                  attackVector: 'LOCAL',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'LOW',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'HIGH',
                  availabilityImpact: 'HIGH',
                  baseScore: 7.8,
                  baseSeverity: 'HIGH',
                },
                exploitabilityScore: 1.8,
                impactScore: 5.9,
              },
            ],
          },
          references: [
            {
              url: 'https://www.qualcomm.com/company/product-security/bulletins/september-2023-bulletin',
              source: 'product-security@qualcomm.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-21667',
          sourceIdentifier: 'product-security@qualcomm.com',
          published: '2023-09-05T07:15:13.020',
          lastModified: '2023-09-05T12:54:51.627',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Transient DOS in Bluetooth HOST while passing descriptor to validate the blacklisted BT keyboard.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'product-security@qualcomm.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:N/A:H',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'LOW',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'NONE',
                  integrityImpact: 'NONE',
                  availabilityImpact: 'HIGH',
                  baseScore: 6.5,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 2.8,
                impactScore: 3.6,
              },
            ],
          },
          references: [
            {
              url: 'https://www.qualcomm.com/company/product-security/bulletins/september-2023-bulletin',
              source: 'product-security@qualcomm.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-28538',
          sourceIdentifier: 'product-security@qualcomm.com',
          published: '2023-09-05T07:15:13.113',
          lastModified: '2023-09-05T12:54:51.627',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Memory corruption in WIN Product while invoking WinAcpi update driver in the UEFI region.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'product-security@qualcomm.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:L/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H',
                  attackVector: 'LOCAL',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'HIGH',
                  availabilityImpact: 'HIGH',
                  baseScore: 8.4,
                  baseSeverity: 'HIGH',
                },
                exploitabilityScore: 2.5,
                impactScore: 5.9,
              },
            ],
          },
          references: [
            {
              url: 'https://www.qualcomm.com/company/product-security/bulletins/september-2023-bulletin',
              source: 'product-security@qualcomm.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-28543',
          sourceIdentifier: 'product-security@qualcomm.com',
          published: '2023-09-05T07:15:13.197',
          lastModified: '2023-09-05T12:54:51.627',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'A malformed DLC can trigger Memory Corruption in SNPE library due to out of bounds read, such as by loading an untrusted model (e.g. from a remote source).',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'product-security@qualcomm.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:H/I:H/A:H',
                  attackVector: 'NETWORK',
                  attackComplexity: 'HIGH',
                  privilegesRequired: 'NONE',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'HIGH',
                  availabilityImpact: 'HIGH',
                  baseScore: 8.1,
                  baseSeverity: 'HIGH',
                },
                exploitabilityScore: 2.2,
                impactScore: 5.9,
              },
            ],
          },
          references: [
            {
              url: 'https://www.qualcomm.com/company/product-security/bulletins/september-2023-bulletin',
              source: 'product-security@qualcomm.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-28544',
          sourceIdentifier: 'product-security@qualcomm.com',
          published: '2023-09-05T07:15:13.280',
          lastModified: '2023-09-05T12:54:51.627',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Memory corruption in WLAN while sending transmit command from HLOS to UTF handlers.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'product-security@qualcomm.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:L/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:H',
                  attackVector: 'LOCAL',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'LOW',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'HIGH',
                  availabilityImpact: 'HIGH',
                  baseScore: 7.8,
                  baseSeverity: 'HIGH',
                },
                exploitabilityScore: 1.8,
                impactScore: 5.9,
              },
            ],
          },
          references: [
            {
              url: 'https://www.qualcomm.com/company/product-security/bulletins/september-2023-bulletin',
              source: 'product-security@qualcomm.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-28548',
          sourceIdentifier: 'product-security@qualcomm.com',
          published: '2023-09-05T07:15:13.360',
          lastModified: '2023-09-05T12:54:51.627',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Memory corruption in WLAN HAL while processing Tx/Rx commands from QDART.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'product-security@qualcomm.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:L/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:H',
                  attackVector: 'LOCAL',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'LOW',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'HIGH',
                  availabilityImpact: 'HIGH',
                  baseScore: 7.8,
                  baseSeverity: 'HIGH',
                },
                exploitabilityScore: 1.8,
                impactScore: 5.9,
              },
            ],
          },
          references: [
            {
              url: 'https://www.qualcomm.com/company/product-security/bulletins/september-2023-bulletin',
              source: 'product-security@qualcomm.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-28549',
          sourceIdentifier: 'product-security@qualcomm.com',
          published: '2023-09-05T07:15:13.437',
          lastModified: '2023-09-05T12:54:51.627',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Memory corruption in WLAN HAL while parsing Rx buffer in processing TLV payload.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'product-security@qualcomm.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:L/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:H',
                  attackVector: 'LOCAL',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'LOW',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'HIGH',
                  availabilityImpact: 'HIGH',
                  baseScore: 7.8,
                  baseSeverity: 'HIGH',
                },
                exploitabilityScore: 1.8,
                impactScore: 5.9,
              },
            ],
          },
          references: [
            {
              url: 'https://www.qualcomm.com/company/product-security/bulletins/september-2023-bulletin',
              source: 'product-security@qualcomm.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-28557',
          sourceIdentifier: 'product-security@qualcomm.com',
          published: '2023-09-05T07:15:13.517',
          lastModified: '2023-09-05T12:54:51.627',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Memory corruption in WLAN HAL while processing command parameters from untrusted WMI payload.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'product-security@qualcomm.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:L/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:H',
                  attackVector: 'LOCAL',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'LOW',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'HIGH',
                  availabilityImpact: 'HIGH',
                  baseScore: 7.8,
                  baseSeverity: 'HIGH',
                },
                exploitabilityScore: 1.8,
                impactScore: 5.9,
              },
            ],
          },
          references: [
            {
              url: 'https://www.qualcomm.com/company/product-security/bulletins/september-2023-bulletin',
              source: 'product-security@qualcomm.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-28558',
          sourceIdentifier: 'product-security@qualcomm.com',
          published: '2023-09-05T07:15:13.603',
          lastModified: '2023-09-05T12:54:51.627',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Memory corruption in WLAN handler while processing PhyID in Tx status handler.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'product-security@qualcomm.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:L/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:H',
                  attackVector: 'LOCAL',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'LOW',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'HIGH',
                  availabilityImpact: 'HIGH',
                  baseScore: 7.8,
                  baseSeverity: 'HIGH',
                },
                exploitabilityScore: 1.8,
                impactScore: 5.9,
              },
            ],
          },
          references: [
            {
              url: 'https://www.qualcomm.com/company/product-security/bulletins/september-2023-bulletin',
              source: 'product-security@qualcomm.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-28559',
          sourceIdentifier: 'product-security@qualcomm.com',
          published: '2023-09-05T07:15:13.687',
          lastModified: '2023-09-05T12:54:51.627',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Memory corruption in WLAN FW while processing command parameters from untrusted WMI payload.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'product-security@qualcomm.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:L/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:H',
                  attackVector: 'LOCAL',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'LOW',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'HIGH',
                  availabilityImpact: 'HIGH',
                  baseScore: 7.8,
                  baseSeverity: 'HIGH',
                },
                exploitabilityScore: 1.8,
                impactScore: 5.9,
              },
            ],
          },
          references: [
            {
              url: 'https://www.qualcomm.com/company/product-security/bulletins/september-2023-bulletin',
              source: 'product-security@qualcomm.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-28560',
          sourceIdentifier: 'product-security@qualcomm.com',
          published: '2023-09-05T07:15:13.763',
          lastModified: '2023-09-05T12:54:51.627',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Memory corruption in WLAN HAL while processing devIndex from untrusted WMI payload.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'product-security@qualcomm.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:L/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:H',
                  attackVector: 'LOCAL',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'LOW',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'HIGH',
                  availabilityImpact: 'HIGH',
                  baseScore: 7.8,
                  baseSeverity: 'HIGH',
                },
                exploitabilityScore: 1.8,
                impactScore: 5.9,
              },
            ],
          },
          references: [
            {
              url: 'https://www.qualcomm.com/company/product-security/bulletins/september-2023-bulletin',
              source: 'product-security@qualcomm.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-28562',
          sourceIdentifier: 'product-security@qualcomm.com',
          published: '2023-09-05T07:15:13.843',
          lastModified: '2023-09-05T12:54:51.627',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Memory corruption while handling payloads from remote ESL.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'product-security@qualcomm.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'HIGH',
                  availabilityImpact: 'HIGH',
                  baseScore: 9.8,
                  baseSeverity: 'CRITICAL',
                },
                exploitabilityScore: 3.9,
                impactScore: 5.9,
              },
            ],
          },
          references: [
            {
              url: 'https://www.qualcomm.com/company/product-security/bulletins/september-2023-bulletin',
              source: 'product-security@qualcomm.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-28564',
          sourceIdentifier: 'product-security@qualcomm.com',
          published: '2023-09-05T07:15:13.923',
          lastModified: '2023-09-05T12:54:51.627',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Memory corruption in WLAN HAL while passing command parameters through WMI interfaces.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'product-security@qualcomm.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:L/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:H',
                  attackVector: 'LOCAL',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'LOW',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'HIGH',
                  availabilityImpact: 'HIGH',
                  baseScore: 7.8,
                  baseSeverity: 'HIGH',
                },
                exploitabilityScore: 1.8,
                impactScore: 5.9,
              },
            ],
          },
          references: [
            {
              url: 'https://www.qualcomm.com/company/product-security/bulletins/september-2023-bulletin',
              source: 'product-security@qualcomm.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-28565',
          sourceIdentifier: 'product-security@qualcomm.com',
          published: '2023-09-05T07:15:14.000',
          lastModified: '2023-09-05T12:54:51.627',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Memory corruption in WLAN HAL while handling command streams through WMI interfaces.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'product-security@qualcomm.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:L/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:H',
                  attackVector: 'LOCAL',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'LOW',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'HIGH',
                  availabilityImpact: 'HIGH',
                  baseScore: 7.8,
                  baseSeverity: 'HIGH',
                },
                exploitabilityScore: 1.8,
                impactScore: 5.9,
              },
            ],
          },
          references: [
            {
              url: 'https://www.qualcomm.com/company/product-security/bulletins/september-2023-bulletin',
              source: 'product-security@qualcomm.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-28567',
          sourceIdentifier: 'product-security@qualcomm.com',
          published: '2023-09-05T07:15:14.083',
          lastModified: '2023-09-05T12:54:51.627',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Memory corruption in WLAN HAL while handling command through WMI interfaces.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'product-security@qualcomm.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:L/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:H',
                  attackVector: 'LOCAL',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'LOW',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'HIGH',
                  availabilityImpact: 'HIGH',
                  baseScore: 7.8,
                  baseSeverity: 'HIGH',
                },
                exploitabilityScore: 1.8,
                impactScore: 5.9,
              },
            ],
          },
          references: [
            {
              url: 'https://www.qualcomm.com/company/product-security/bulletins/september-2023-bulletin',
              source: 'product-security@qualcomm.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-28573',
          sourceIdentifier: 'product-security@qualcomm.com',
          published: '2023-09-05T07:15:14.167',
          lastModified: '2023-09-05T12:54:51.627',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Memory corruption in WLAN HAL while parsing WMI command parameters.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'product-security@qualcomm.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:L/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:H',
                  attackVector: 'LOCAL',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'LOW',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'HIGH',
                  availabilityImpact: 'HIGH',
                  baseScore: 7.8,
                  baseSeverity: 'HIGH',
                },
                exploitabilityScore: 1.8,
                impactScore: 5.9,
              },
            ],
          },
          references: [
            {
              url: 'https://www.qualcomm.com/company/product-security/bulletins/september-2023-bulletin',
              source: 'product-security@qualcomm.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-28581',
          sourceIdentifier: 'product-security@qualcomm.com',
          published: '2023-09-05T07:15:14.247',
          lastModified: '2023-09-05T12:54:46.447',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Memory corruption in WLAN Firmware while parsing receieved GTK Keys in GTK KDE.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'product-security@qualcomm.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'HIGH',
                  availabilityImpact: 'HIGH',
                  baseScore: 9.8,
                  baseSeverity: 'CRITICAL',
                },
                exploitabilityScore: 3.9,
                impactScore: 5.9,
              },
            ],
          },
          references: [
            {
              url: 'https://www.qualcomm.com/company/product-security/bulletins/september-2023-bulletin',
              source: 'product-security@qualcomm.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-28584',
          sourceIdentifier: 'product-security@qualcomm.com',
          published: '2023-09-05T07:15:14.323',
          lastModified: '2023-09-05T12:54:46.447',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Transient DOS in WLAN Host when a mobile station receives invalid channel in CSA IE while doing channel switch announcement (CSA).',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'product-security@qualcomm.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'NONE',
                  integrityImpact: 'NONE',
                  availabilityImpact: 'HIGH',
                  baseScore: 7.5,
                  baseSeverity: 'HIGH',
                },
                exploitabilityScore: 3.9,
                impactScore: 3.6,
              },
            ],
          },
          references: [
            {
              url: 'https://www.qualcomm.com/company/product-security/bulletins/september-2023-bulletin',
              source: 'product-security@qualcomm.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-33015',
          sourceIdentifier: 'product-security@qualcomm.com',
          published: '2023-09-05T07:15:14.407',
          lastModified: '2023-09-05T12:54:46.447',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Transient DOS in WLAN Firmware while interpreting MBSSID IE of a received beacon frame.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'product-security@qualcomm.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'NONE',
                  integrityImpact: 'NONE',
                  availabilityImpact: 'HIGH',
                  baseScore: 7.5,
                  baseSeverity: 'HIGH',
                },
                exploitabilityScore: 3.9,
                impactScore: 3.6,
              },
            ],
          },
          references: [
            {
              url: 'https://www.qualcomm.com/company/product-security/bulletins/september-2023-bulletin',
              source: 'product-security@qualcomm.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-33016',
          sourceIdentifier: 'product-security@qualcomm.com',
          published: '2023-09-05T07:15:14.487',
          lastModified: '2023-09-05T12:54:46.447',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Transient DOS in WLAN firmware while parsing MLO (multi-link operation).',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'product-security@qualcomm.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'NONE',
                  integrityImpact: 'NONE',
                  availabilityImpact: 'HIGH',
                  baseScore: 7.5,
                  baseSeverity: 'HIGH',
                },
                exploitabilityScore: 3.9,
                impactScore: 3.6,
              },
            ],
          },
          references: [
            {
              url: 'https://www.qualcomm.com/company/product-security/bulletins/september-2023-bulletin',
              source: 'product-security@qualcomm.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-33019',
          sourceIdentifier: 'product-security@qualcomm.com',
          published: '2023-09-05T07:15:14.560',
          lastModified: '2023-09-05T12:54:46.447',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Transient DOS in WLAN Host while doing channel switch announcement (CSA), when a mobile station receives invalid channel in CSA IE.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'product-security@qualcomm.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'NONE',
                  integrityImpact: 'NONE',
                  availabilityImpact: 'HIGH',
                  baseScore: 7.5,
                  baseSeverity: 'HIGH',
                },
                exploitabilityScore: 3.9,
                impactScore: 3.6,
              },
            ],
          },
          references: [
            {
              url: 'https://www.qualcomm.com/company/product-security/bulletins/september-2023-bulletin',
              source: 'product-security@qualcomm.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-33020',
          sourceIdentifier: 'product-security@qualcomm.com',
          published: '2023-09-05T07:15:14.640',
          lastModified: '2023-09-05T12:54:46.447',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Transient DOS in WLAN Host when an invalid channel (like channel out of range) is received in STA during CSA IE.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'product-security@qualcomm.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'NONE',
                  integrityImpact: 'NONE',
                  availabilityImpact: 'HIGH',
                  baseScore: 7.5,
                  baseSeverity: 'HIGH',
                },
                exploitabilityScore: 3.9,
                impactScore: 3.6,
              },
            ],
          },
          references: [
            {
              url: 'https://www.qualcomm.com/company/product-security/bulletins/september-2023-bulletin',
              source: 'product-security@qualcomm.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-33021',
          sourceIdentifier: 'product-security@qualcomm.com',
          published: '2023-09-05T07:15:14.717',
          lastModified: '2023-09-05T12:54:46.447',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Memory corruption in Graphics while processing user packets for command submission.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'product-security@qualcomm.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:L/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H',
                  attackVector: 'LOCAL',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'HIGH',
                  availabilityImpact: 'HIGH',
                  baseScore: 8.4,
                  baseSeverity: 'HIGH',
                },
                exploitabilityScore: 2.5,
                impactScore: 5.9,
              },
            ],
          },
          references: [
            {
              url: 'https://www.qualcomm.com/company/product-security/bulletins/september-2023-bulletin',
              source: 'product-security@qualcomm.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-41908',
          sourceIdentifier: 'cve@mitre.org',
          published: '2023-09-05T07:15:14.810',
          lastModified: '2023-09-05T12:54:46.447',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Cerebrate before 1.15 lacks the Secure attribute for the session cookie.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://github.com/cerebrate-project/cerebrate/commit/9be81055651649658243b5aa274b175064bfc6db',
              source: 'cve@mitre.org',
            },
            {
              url: 'https://github.com/cerebrate-project/cerebrate/compare/v1.14...v1.15',
              source: 'cve@mitre.org',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-41909',
          sourceIdentifier: 'cve@mitre.org',
          published: '2023-09-05T07:15:14.877',
          lastModified: '2023-09-05T12:54:46.447',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'An issue was discovered in FRRouting FRR through 9.0. bgp_nlri_parse_flowspec in bgpd/bgp_flowspec.c processes malformed requests with no attributes, leading to a NULL pointer dereference.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://github.com/FRRouting/frr/pull/13222/commits/cfd04dcb3e689754a72507d086ba3b9709fc5ed8',
              source: 'cve@mitre.org',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-41910',
          sourceIdentifier: 'cve@mitre.org',
          published: '2023-09-05T07:15:14.927',
          lastModified: '2023-09-05T12:54:46.447',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'An issue was discovered in lldpd before 1.0.17. By crafting a CDP PDU packet with specific CDP_TLV_ADDRESSES TLVs, a malicious actor can remotely force the lldpd daemon to perform an out-of-bounds read on heap memory. This occurs in cdp_decode in daemon/protocols/cdp.c.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://github.com/lldpd/lldpd/commit/a9aeabdf879c25c584852a0bb5523837632f099b',
              source: 'cve@mitre.org',
            },
            {
              url: 'https://github.com/lldpd/lldpd/releases/tag/1.0.17',
              source: 'cve@mitre.org',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-4540',
          sourceIdentifier: 'cvd@cert.pl',
          published: '2023-09-05T08:15:40.017',
          lastModified: '2023-09-05T12:54:46.447',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Improper Handling of Exceptional Conditions vulnerability in Daurnimator lua-http library allows Excessive Allocation and a denial of service (DoS) attack to be executed by sending a properly crafted request to the server. \n\nThis issue affects lua-http: all versions before commit ddab283.',
            },
          ],
          metrics: {},
          weaknesses: [
            {
              source: 'cvd@cert.pl',
              type: 'Secondary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-755',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://cert.pl/posts/2023/09/CVE-2023-4540/',
              source: 'cvd@cert.pl',
            },
            {
              url: 'https://github.com/daurnimator/lua-http/commit/ddab2835c583d45dec62680ca8d3cbde55e0bae6',
              source: 'cvd@cert.pl',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-38574',
          sourceIdentifier: 'vultures@jpcert.or.jp',
          published: '2023-09-05T09:15:08.037',
          lastModified: '2023-09-05T12:54:46.447',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Open redirect vulnerability in VI Web Client prior to 7.9.6 allows a remote unauthenticated attacker to redirect users to arbitrary web sites and conduct phishing attacks via a specially crafted URL.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://downloadvi.com/downloads/IPServer/v7.9/796232/v796232RN.pdf',
              source: 'vultures@jpcert.or.jp',
            },
            {
              url: 'https://jvn.jp/en/jp/JVN60140221/',
              source: 'vultures@jpcert.or.jp',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-39448',
          sourceIdentifier: 'vultures@jpcert.or.jp',
          published: '2023-09-05T09:15:08.803',
          lastModified: '2023-09-05T12:54:46.447',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Path traversal vulnerability in SHIRASAGI prior to v1.18.0  allows a remote authenticated attacker to alter or create arbitrary files on the server, resulting in arbitrary code execution.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://jvn.jp/en/jp/JVN82758000/',
              source: 'vultures@jpcert.or.jp',
            },
            {
              url: 'https://www.ss-proj.org/support/954.html',
              source: 'vultures@jpcert.or.jp',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-39938',
          sourceIdentifier: 'vultures@jpcert.or.jp',
          published: '2023-09-05T09:15:09.053',
          lastModified: '2023-09-05T12:54:46.447',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Reflected cross-site scripting vulnerability in VI Web Client prior to 7.9.6 allows a remote unauthenticated attacker to inject an arbitrary script.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://downloadvi.com/downloads/IPServer/v7.9/796232/v796232RN.pdf',
              source: 'vultures@jpcert.or.jp',
            },
            {
              url: 'https://jvn.jp/en/jp/JVN60140221/',
              source: 'vultures@jpcert.or.jp',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-40535',
          sourceIdentifier: 'vultures@jpcert.or.jp',
          published: '2023-09-05T09:15:09.213',
          lastModified: '2023-09-05T12:54:46.447',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Stored cross-site scripting vulnerability in View setting page of VI Web Client prior to 7.9.6 allows a remote authenticated attacker to inject an arbitrary script.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://downloadvi.com/downloads/IPServer/v7.9/796232/v796232RN.pdf',
              source: 'vultures@jpcert.or.jp',
            },
            {
              url: 'https://jvn.jp/en/jp/JVN60140221/',
              source: 'vultures@jpcert.or.jp',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-40705',
          sourceIdentifier: 'vultures@jpcert.or.jp',
          published: '2023-09-05T09:15:09.340',
          lastModified: '2023-09-05T12:54:46.447',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Stored cross-site scripting vulnerability in Map setting page of VI Web Client prior to 7.9.6 allows a remote authenticated attacker to inject an arbitrary script.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://downloadvi.com/downloads/IPServer/v7.9/796232/v796232RN.pdf',
              source: 'vultures@jpcert.or.jp',
            },
            {
              url: 'https://jvn.jp/en/jp/JVN60140221/',
              source: 'vultures@jpcert.or.jp',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-36492',
          sourceIdentifier: 'vultures@jpcert.or.jp',
          published: '2023-09-05T10:15:07.463',
          lastModified: '2023-09-05T12:54:46.447',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Reflected cross-site scripting vulnerability in SHIRASAGI prior to v1.18.0 allows a remote unauthenticated attacker to execute an arbitrary script on the web browser of the user who is logging in to the product.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://jvn.jp/en/jp/JVN82758000/',
              source: 'vultures@jpcert.or.jp',
            },
            {
              url: 'https://www.ss-proj.org/support/954.html',
              source: 'vultures@jpcert.or.jp',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-38569',
          sourceIdentifier: 'vultures@jpcert.or.jp',
          published: '2023-09-05T10:15:07.643',
          lastModified: '2023-09-05T12:54:46.447',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Stored cross-site scripting vulnerability in SHIRASAGI prior to v1.18.0 allows a remote authenticated attacker to execute an arbitrary script on the web browser of the user who is logging in to the product.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://jvn.jp/en/jp/JVN82758000/',
              source: 'vultures@jpcert.or.jp',
            },
            {
              url: 'https://www.ss-proj.org/support/954.html',
              source: 'vultures@jpcert.or.jp',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-20897',
          sourceIdentifier: 'security@vmware.com',
          published: '2023-09-05T11:15:32.973',
          lastModified: '2023-09-05T12:54:46.447',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Salt masters prior to 3005.2 or 3006.2 contain a DOS in minion return. After receiving several bad packets on the request server equal to the number of worker threads, the master will become unresponsive to return requests until restarted.\n',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'security@vmware.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:L',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'NONE',
                  integrityImpact: 'NONE',
                  availabilityImpact: 'LOW',
                  baseScore: 5.3,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 3.9,
                impactScore: 1.4,
              },
            ],
          },
          references: [
            {
              url: 'https://saltproject.io/security-announcements/2023-08-10-advisory/',
              source: 'security@vmware.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-20898',
          sourceIdentifier: 'security@vmware.com',
          published: '2023-09-05T11:15:33.300',
          lastModified: '2023-09-05T12:54:46.447',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Git Providers can read from the wrong environment because they get the same cache directory base name in Salt masters prior to 3005.2 or 3006.2. Anything that uses Git Providers with different environments can get garbage data or the wrong data, which can lead to wrongful data disclosure, wrongful executions, data corruption and/or crash.\n',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'security@vmware.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:L/AC:H/PR:L/UI:N/S:C/C:L/I:L/A:N',
                  attackVector: 'LOCAL',
                  attackComplexity: 'HIGH',
                  privilegesRequired: 'LOW',
                  userInteraction: 'NONE',
                  scope: 'CHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'NONE',
                  baseScore: 4.2,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 1.1,
                impactScore: 2.7,
              },
            ],
          },
          references: [
            {
              url: 'https://saltproject.io/security-announcements/2023-08-10-advisory/',
              source: 'security@vmware.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2022-41763',
          sourceIdentifier: 'cve@mitre.org',
          published: '2023-09-05T13:15:07.717',
          lastModified: '2023-09-05T13:33:34.903',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'An issue was discovered in NOKIA AMS 9.7.05. Remote Code Execution exists via the debugger of the ipAddress variable. A remote user, authenticated to the AMS server, could inject code in the PING function. The privileges of the command executed depend on the user that runs the service.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://www.gruppotim.it/it/footer/red-team.html',
              source: 'cve@mitre.org',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-2453',
          sourceIdentifier: 'disclosure@synopsys.com',
          published: '2023-09-05T15:15:42.377',
          lastModified: '2023-09-05T17:31:50.810',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'There is insufficient sanitization of tainted file names that are directly concatenated with a path that is subsequently passed to a ‘require_once’ statement. This allows arbitrary files with the ‘.php’ extension for which the absolute path is known to be included and executed. There are no known means in PHPFusion through which an attacker can upload and target a ‘.php’ file payload.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'disclosure@synopsys.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:H',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'LOW',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'HIGH',
                  availabilityImpact: 'HIGH',
                  baseScore: 8.8,
                  baseSeverity: 'HIGH',
                },
                exploitabilityScore: 2.8,
                impactScore: 5.9,
              },
            ],
          },
          weaknesses: [
            {
              source: 'disclosure@synopsys.com',
              type: 'Secondary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-829',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://www.synopsys.com/blogs/software-security/cyrc-vulnerability-advisory-cve-2023-2453/',
              source: 'disclosure@synopsys.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-32086',
          sourceIdentifier: 'security@pega.com',
          published: '2023-09-05T15:15:42.600',
          lastModified: '2023-09-05T15:15:42.600',
          vulnStatus: 'Rejected',
          descriptions: [
            {
              lang: 'en',
              value:
                '** REJECT ** This CVE ID has been rejected or withdrawn by its CVE Numbering Authority.',
            },
          ],
          metrics: {},
          references: [],
        },
      },
      {
        cve: {
          id: 'CVE-2023-40743',
          sourceIdentifier: 'security@apache.org',
          published: '2023-09-05T15:15:42.687',
          lastModified: '2023-09-05T17:31:50.810',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                '** UNSUPPPORTED WHEN ASSIGNED ** ** UNSUPPORTED WHEN ASSIGNED ** When integrating Apache Axis 1.x in an application, it may not have been obvious that looking up a service through "ServiceFactory.getService" allows potentially dangerous lookup mechanisms such as LDAP. When passing untrusted input to this API method, this could expose the application to DoS, SSRF and even attacks leading to RCE.\n\nAs Axis 1 has been EOL we recommend you migrate to a different SOAP engine, such as Apache Axis 2/Java. As a workaround, you may review your code to verify no untrusted or unsanitized input is passed to "ServiceFactory.getService", or by applying the patch from  https://github.com/apache/axis-axis1-java/commit/7e66753427466590d6def0125e448d2791723210 . The Apache Axis project does not expect to create an Axis 1.x release fixing this problem, though contributors that would like to work towards this are welcome.\n\n',
            },
          ],
          metrics: {},
          weaknesses: [
            {
              source: 'security@apache.org',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-20',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://github.com/apache/axis-axis1-java/commit/7e66753427466590d6def0125e448d2791723210',
              source: 'security@apache.org',
            },
            {
              url: 'https://lists.apache.org/thread/gs0qgk2mgss7zfhzdd6ftfjvm4kp7v82',
              source: 'security@apache.org',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-4480',
          sourceIdentifier: 'disclosure@synopsys.com',
          published: '2023-09-05T15:15:42.883',
          lastModified: '2023-09-05T17:31:50.810',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                '\nDue to an out-of-date dependency in the “Fusion File Manager” component accessible through the admin panel, an attacker can send a crafted request that allows them to read the contents of files on the system accessible within the privileges of the running process. Additionally, they may write files to arbitrary locations, provided the files pass the application’s mime-type and file extension validation. \n\n',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'disclosure@synopsys.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:H/UI:N/S:U/C:H/I:L/A:N',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'HIGH',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'NONE',
                  baseScore: 5.5,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 1.2,
                impactScore: 4.2,
              },
            ],
          },
          weaknesses: [
            {
              source: 'disclosure@synopsys.com',
              type: 'Secondary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-538',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://www.synopsys.com/blogs/software-security/cyrc-vulnerability-advisory-cve-2023-2453/',
              source: 'disclosure@synopsys.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-36361',
          sourceIdentifier: 'cve@mitre.org',
          published: '2023-09-05T16:15:07.567',
          lastModified: '2023-09-05T17:31:50.810',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Audimexee v14.1.7 was discovered to contain a SQL injection vulnerability via the p_table_name parameter.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'http://audimex.com',
              source: 'cve@mitre.org',
            },
            {
              url: 'http://audimexee.com',
              source: 'cve@mitre.org',
            },
            {
              url: 'https://gist.github.com/Cameleon037/40b3b6f6729d1d0984d6ce5b6837c46b',
              source: 'cve@mitre.org',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-41012',
          sourceIdentifier: 'cve@mitre.org',
          published: '2023-09-05T16:15:07.990',
          lastModified: '2023-09-05T17:31:50.810',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'An issue in China Mobile Communications China Mobile Intelligent Home Gateway v.HG6543C4 allows a remote attacker to execute arbitrary code via the authentication mechanism.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://github.com/te5tb99/For-submitting/wiki/Command-Execution-Vulnerability-in-China-Mobile-Intelligent-Home-Gateway-HG6543C4-Identity-verification-has-design-flaws',
              source: 'cve@mitre.org',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-41107',
          sourceIdentifier: 'cve@mitre.org',
          published: '2023-09-05T16:15:08.050',
          lastModified: '2023-09-05T17:31:50.810',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'TEF portal 2023-07-17 is vulnerable to a persistent cross site scripting (XSS)attack.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://www.syss.de/fileadmin/dokumente/Publikationen/Advisories/SYSS-2023-020.txt',
              source: 'cve@mitre.org',
            },
            {
              url: 'https://www.syss.de/pentest-blog/sicherheitsschwachstellen-im-tef-haendlerportal-syss-2023-020/-021',
              source: 'cve@mitre.org',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-41108',
          sourceIdentifier: 'cve@mitre.org',
          published: '2023-09-05T16:15:08.110',
          lastModified: '2023-09-05T17:31:50.810',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'TEF portal 2023-07-17 is vulnerable to authenticated remote code execution.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://www.syss.de/fileadmin/dokumente/Publikationen/Advisories/SYSS-2023-021.txt',
              source: 'cve@mitre.org',
            },
            {
              url: 'https://www.syss.de/pentest-blog/sicherheitsschwachstellen-im-tef-haendlerportal-syss-2023-020/-021',
              source: 'cve@mitre.org',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-4778',
          sourceIdentifier: 'security@huntr.dev',
          published: '2023-09-05T16:15:08.207',
          lastModified: '2023-09-05T17:31:50.810',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Out-of-bounds Read in GitHub repository gpac/gpac prior to 2.3-DEV.',
            },
          ],
          metrics: {
            cvssMetricV30: [
              {
                source: 'security@huntr.dev',
                type: 'Secondary',
                cvssData: {
                  version: '3.0',
                  vectorString: 'CVSS:3.0/AV:L/AC:L/PR:N/UI:N/S:U/C:L/I:L/A:L',
                  attackVector: 'LOCAL',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'LOW',
                  baseScore: 5.9,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 2.5,
                impactScore: 3.4,
              },
            ],
          },
          weaknesses: [
            {
              source: 'security@huntr.dev',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-125',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://github.com/gpac/gpac/commit/d553698050af478049e1a09e44a15ac884f223ed',
              source: 'security@huntr.dev',
            },
            {
              url: 'https://huntr.dev/bounties/abb450fb-4ab2-49b0-90da-3d878eea5397',
              source: 'security@huntr.dev',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-31242',
          sourceIdentifier: 'talos-cna@cisco.com',
          published: '2023-09-05T17:15:08.517',
          lastModified: '2023-09-05T18:15:08.780',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'An authentication bypass vulnerability exists in the OAS Engine functionality of Open Automation Software OAS Platform v18.00.0072. A specially-crafted series of network requests can lead to arbitrary authentication. An attacker can send a sequence of requests to trigger this vulnerability.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'talos-cna@cisco.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:H/I:H/A:H',
                  attackVector: 'NETWORK',
                  attackComplexity: 'HIGH',
                  privilegesRequired: 'NONE',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'HIGH',
                  availabilityImpact: 'HIGH',
                  baseScore: 8.1,
                  baseSeverity: 'HIGH',
                },
                exploitabilityScore: 2.2,
                impactScore: 5.9,
              },
            ],
          },
          weaknesses: [
            {
              source: 'talos-cna@cisco.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-284',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://talosintelligence.com/vulnerability_reports/TALOS-2023-1769',
              source: 'talos-cna@cisco.com',
            },
            {
              url: 'https://www.talosintelligence.com/vulnerability_reports/TALOS-2023-1769',
              source: 'talos-cna@cisco.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-32271',
          sourceIdentifier: 'talos-cna@cisco.com',
          published: '2023-09-05T17:15:08.670',
          lastModified: '2023-09-05T18:15:09.000',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'An information disclosure vulnerability exists in the OAS Engine configuration management functionality of Open Automation Software OAS Platform v18.00.0072. A specially crafted series of network requests can lead to a disclosure of sensitive information. An attacker can send a sequence of requests to trigger this vulnerability.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'talos-cna@cisco.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:H/I:N/A:N',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'LOW',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'NONE',
                  availabilityImpact: 'NONE',
                  baseScore: 6.5,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 2.8,
                impactScore: 3.6,
              },
            ],
          },
          weaknesses: [
            {
              source: 'talos-cna@cisco.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-200',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://talosintelligence.com/vulnerability_reports/TALOS-2023-1774',
              source: 'talos-cna@cisco.com',
            },
            {
              url: 'https://www.talosintelligence.com/vulnerability_reports/TALOS-2023-1774',
              source: 'talos-cna@cisco.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-32615',
          sourceIdentifier: 'talos-cna@cisco.com',
          published: '2023-09-05T17:15:08.777',
          lastModified: '2023-09-05T18:15:09.187',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'A file write vulnerability exists in the OAS Engine configuration functionality of Open Automation Software OAS Platform v18.00.0072. A specially crafted series of network requests can lead to arbitrary file creation or overwrite. An attacker can send a sequence of requests to trigger this vulnerability.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'talos-cna@cisco.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:H/A:N',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'LOW',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'NONE',
                  integrityImpact: 'HIGH',
                  availabilityImpact: 'NONE',
                  baseScore: 6.5,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 2.8,
                impactScore: 3.6,
              },
            ],
          },
          weaknesses: [
            {
              source: 'talos-cna@cisco.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-73',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://talosintelligence.com/vulnerability_reports/TALOS-2023-1771',
              source: 'talos-cna@cisco.com',
            },
            {
              url: 'https://www.talosintelligence.com/vulnerability_reports/TALOS-2023-1771',
              source: 'talos-cna@cisco.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-34317',
          sourceIdentifier: 'talos-cna@cisco.com',
          published: '2023-09-05T17:15:08.877',
          lastModified: '2023-09-05T18:15:09.367',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'An improper input validation vulnerability exists in the OAS Engine User Creation functionality of Open Automation Software OAS Platform v18.00.0072. A specially crafted series of network requests can lead to unexpected data in the configuration. An attacker can send a sequence of requests to trigger this vulnerability.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'talos-cna@cisco.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:N/I:H/A:N',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'LOW',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'NONE',
                  integrityImpact: 'HIGH',
                  availabilityImpact: 'NONE',
                  baseScore: 6.5,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 2.8,
                impactScore: 3.6,
              },
            ],
          },
          weaknesses: [
            {
              source: 'talos-cna@cisco.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-20',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://talosintelligence.com/vulnerability_reports/TALOS-2023-1772',
              source: 'talos-cna@cisco.com',
            },
            {
              url: 'https://www.talosintelligence.com/vulnerability_reports/TALOS-2023-1772',
              source: 'talos-cna@cisco.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-34353',
          sourceIdentifier: 'talos-cna@cisco.com',
          published: '2023-09-05T17:15:08.963',
          lastModified: '2023-09-05T18:15:09.533',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'An authentication bypass vulnerability exists in the OAS Engine authentication functionality of Open Automation Software OAS Platform v18.00.0072. A specially crafted network sniffing can lead to decryption of sensitive information. An attacker can sniff network traffic to trigger this vulnerability.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'talos-cna@cisco.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:N/A:N',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'NONE',
                  availabilityImpact: 'NONE',
                  baseScore: 7.5,
                  baseSeverity: 'HIGH',
                },
                exploitabilityScore: 3.9,
                impactScore: 3.6,
              },
            ],
          },
          weaknesses: [
            {
              source: 'talos-cna@cisco.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-330',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://talosintelligence.com/vulnerability_reports/TALOS-2023-1776',
              source: 'talos-cna@cisco.com',
            },
            {
              url: 'https://www.talosintelligence.com/vulnerability_reports/TALOS-2023-1776',
              source: 'talos-cna@cisco.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-34994',
          sourceIdentifier: 'talos-cna@cisco.com',
          published: '2023-09-05T17:15:09.053',
          lastModified: '2023-09-05T18:15:09.717',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'An improper resource allocation vulnerability exists in the OAS Engine configuration management functionality of Open Automation Software OAS Platform v18.00.0072. A specially crafted series of network requests can lead to creation of an arbitrary directory. An attacker can send a sequence of requests to trigger this vulnerability.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'talos-cna@cisco.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:H/PR:L/UI:N/S:U/C:N/I:N/A:L',
                  attackVector: 'NETWORK',
                  attackComplexity: 'HIGH',
                  privilegesRequired: 'LOW',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'NONE',
                  integrityImpact: 'NONE',
                  availabilityImpact: 'LOW',
                  baseScore: 3.1,
                  baseSeverity: 'LOW',
                },
                exploitabilityScore: 1.6,
                impactScore: 1.4,
              },
            ],
          },
          weaknesses: [
            {
              source: 'talos-cna@cisco.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-770',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://talosintelligence.com/vulnerability_reports/TALOS-2023-1773',
              source: 'talos-cna@cisco.com',
            },
            {
              url: 'https://www.talosintelligence.com/vulnerability_reports/TALOS-2023-1773',
              source: 'talos-cna@cisco.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-34998',
          sourceIdentifier: 'talos-cna@cisco.com',
          published: '2023-09-05T17:15:09.153',
          lastModified: '2023-09-05T18:15:09.897',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'An authentication bypass vulnerability exists in the OAS Engine functionality of Open Automation Software OAS Platform v18.00.0072. A specially crafted series of network requests can lead to arbitrary authentication. An attacker can sniff network traffic to trigger this vulnerability.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'talos-cna@cisco.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:H/I:H/A:H',
                  attackVector: 'NETWORK',
                  attackComplexity: 'HIGH',
                  privilegesRequired: 'NONE',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'HIGH',
                  availabilityImpact: 'HIGH',
                  baseScore: 8.1,
                  baseSeverity: 'HIGH',
                },
                exploitabilityScore: 2.2,
                impactScore: 5.9,
              },
            ],
          },
          weaknesses: [
            {
              source: 'talos-cna@cisco.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-319',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://talosintelligence.com/vulnerability_reports/TALOS-2023-1770',
              source: 'talos-cna@cisco.com',
            },
            {
              url: 'https://www.talosintelligence.com/vulnerability_reports/TALOS-2023-1770',
              source: 'talos-cna@cisco.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-35124',
          sourceIdentifier: 'talos-cna@cisco.com',
          published: '2023-09-05T17:15:09.237',
          lastModified: '2023-09-05T18:15:10.703',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'An information disclosure vulnerability exists in the OAS Engine configuration management functionality of Open Automation Software OAS Platform v18.00.0072. A specially crafted series of network requests can lead to a disclosure of sensitive information. An attacker can send a sequence of requests to trigger this vulnerability.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'talos-cna@cisco.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:H/PR:L/UI:N/S:U/C:L/I:N/A:N',
                  attackVector: 'NETWORK',
                  attackComplexity: 'HIGH',
                  privilegesRequired: 'LOW',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'NONE',
                  availabilityImpact: 'NONE',
                  baseScore: 3.1,
                  baseSeverity: 'LOW',
                },
                exploitabilityScore: 1.6,
                impactScore: 1.4,
              },
            ],
          },
          weaknesses: [
            {
              source: 'talos-cna@cisco.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-209',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://talosintelligence.com/vulnerability_reports/TALOS-2023-1775',
              source: 'talos-cna@cisco.com',
            },
            {
              url: 'https://www.talosintelligence.com/vulnerability_reports/TALOS-2023-1775',
              source: 'talos-cna@cisco.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-3374',
          sourceIdentifier: 'cve@usom.gov.tr',
          published: '2023-09-05T17:15:09.400',
          lastModified: '2023-09-06T08:15:44.193',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Incomplete List of Disallowed Inputs vulnerability in Unisign Bookreen allows Privilege Escalation.This issue affects Bookreen: before 3.0.0.\n\n',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'cve@usom.gov.tr',
                type: 'Primary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'HIGH',
                  availabilityImpact: 'HIGH',
                  baseScore: 9.8,
                  baseSeverity: 'CRITICAL',
                },
                exploitabilityScore: 3.9,
                impactScore: 5.9,
              },
            ],
          },
          weaknesses: [
            {
              source: 'cve@usom.gov.tr',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-184',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://www.usom.gov.tr/bildirim/tr-23-0489',
              source: 'cve@usom.gov.tr',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-3375',
          sourceIdentifier: 'cve@usom.gov.tr',
          published: '2023-09-05T17:15:09.497',
          lastModified: '2023-09-06T08:15:44.287',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Unrestricted Upload of File with Dangerous Type vulnerability in Unisign Bookreen allows OS Command Injection.This issue affects Bookreen: before 3.0.0.\n\n',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'cve@usom.gov.tr',
                type: 'Primary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:H/UI:N/S:C/C:H/I:H/A:H',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'HIGH',
                  userInteraction: 'NONE',
                  scope: 'CHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'HIGH',
                  availabilityImpact: 'HIGH',
                  baseScore: 9.1,
                  baseSeverity: 'CRITICAL',
                },
                exploitabilityScore: 2.3,
                impactScore: 6.0,
              },
            ],
          },
          weaknesses: [
            {
              source: 'cve@usom.gov.tr',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-434',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://www.usom.gov.tr/bildirim/tr-23-0489',
              source: 'cve@usom.gov.tr',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2015-1390',
          sourceIdentifier: 'cve@mitre.org',
          published: '2023-09-05T18:15:07.797',
          lastModified: '2023-09-05T18:29:49.867',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Aruba AirWave before 8.0.7 allows XSS attacks agsinat an administrator.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://www.arubanetworks.com/assets/alert/ARUBA-PSA-2015-005.txt',
              source: 'cve@mitre.org',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2015-1391',
          sourceIdentifier: 'cve@mitre.org',
          published: '2023-09-05T18:15:07.997',
          lastModified: '2023-09-05T18:29:49.867',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Aruba AirWave before 8.0.7 allows bypass of a CSRF protection mechanism.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://www.arubanetworks.com/assets/alert/ARUBA-PSA-2015-005.txt',
              source: 'cve@mitre.org',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2015-2201',
          sourceIdentifier: 'cve@mitre.org',
          published: '2023-09-05T18:15:08.177',
          lastModified: '2023-09-05T18:29:49.867',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Aruba AirWave before 7.7.14.2 and 8.x before 8.0.7 allows VisualRF remote OS command execution and file disclosure by administrative users.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://www.arubanetworks.com/assets/alert/ARUBA-PSA-2015-005.txt',
              source: 'cve@mitre.org',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2015-2202',
          sourceIdentifier: 'cve@mitre.org',
          published: '2023-09-05T18:15:08.357',
          lastModified: '2023-09-05T18:29:49.867',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Aruba AirWave before 7.7.14.2 and 8.x before 8.0.7 allows administrative users to escalate privileges to root on the underlying OS.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://www.arubanetworks.com/assets/alert/ARUBA-PSA-2015-005.txt',
              source: 'cve@mitre.org',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2017-9453',
          sourceIdentifier: 'cve@mitre.org',
          published: '2023-09-05T18:15:08.537',
          lastModified: '2023-09-05T18:29:49.867',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'BMC Server Automation before 8.9.01 patch 1 allows Process Spawner command execution because of authentication bypass.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'cve@mitre.org',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:C/C:H/I:H/A:H',
                  attackVector: 'NETWORK',
                  attackComplexity: 'HIGH',
                  privilegesRequired: 'NONE',
                  userInteraction: 'NONE',
                  scope: 'CHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'HIGH',
                  availabilityImpact: 'HIGH',
                  baseScore: 9.0,
                  baseSeverity: 'CRITICAL',
                },
                exploitabilityScore: 2.2,
                impactScore: 6.0,
              },
            ],
          },
          references: [
            {
              url: 'https://docs.bmc.com/docs/serverautomation/2002/notification-of-critical-security-issue-in-bmc-server-automation-cve-2017-9453-1020706453.html',
              source: 'cve@mitre.org',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-35065',
          sourceIdentifier: 'cve@usom.gov.tr',
          published: '2023-09-05T18:15:10.067',
          lastModified: '2023-09-05T18:29:49.867',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                "Improper Neutralization of Special Elements used in an SQL Command ('SQL Injection') vulnerability in Osoft Paint Production Management allows SQL Injection.This issue affects Paint Production Management: before 2.1.\n\n",
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'cve@usom.gov.tr',
                type: 'Primary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'HIGH',
                  availabilityImpact: 'HIGH',
                  baseScore: 9.8,
                  baseSeverity: 'CRITICAL',
                },
                exploitabilityScore: 3.9,
                impactScore: 5.9,
              },
            ],
          },
          weaknesses: [
            {
              source: 'cve@usom.gov.tr',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-89',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://www.usom.gov.tr/bildirim/tr-23-0490',
              source: 'cve@usom.gov.tr',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-35068',
          sourceIdentifier: 'cve@usom.gov.tr',
          published: '2023-09-05T18:15:10.327',
          lastModified: '2023-09-05T18:29:49.867',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                "Improper Neutralization of Special Elements used in an SQL Command ('SQL Injection') vulnerability in BMA Personnel Tracking System allows SQL Injection.This issue affects Personnel Tracking System: before 20230904.\n\n",
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'cve@usom.gov.tr',
                type: 'Primary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'HIGH',
                  availabilityImpact: 'HIGH',
                  baseScore: 9.8,
                  baseSeverity: 'CRITICAL',
                },
                exploitabilityScore: 3.9,
                impactScore: 5.9,
              },
            ],
          },
          weaknesses: [
            {
              source: 'cve@usom.gov.tr',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-89',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://www.usom.gov.tr/bildirim/tr-23-0491',
              source: 'cve@usom.gov.tr',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-35072',
          sourceIdentifier: 'cve@usom.gov.tr',
          published: '2023-09-05T18:15:10.507',
          lastModified: '2023-09-05T18:29:49.867',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                "Improper Neutralization of Special Elements used in an SQL Command ('SQL Injection') vulnerability in Coyav Travel Proagent allows SQL Injection.This issue affects Proagent: before 20230904 .\n\n",
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'cve@usom.gov.tr',
                type: 'Primary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'HIGH',
                  availabilityImpact: 'HIGH',
                  baseScore: 9.8,
                  baseSeverity: 'CRITICAL',
                },
                exploitabilityScore: 3.9,
                impactScore: 5.9,
              },
            ],
          },
          weaknesses: [
            {
              source: 'cve@usom.gov.tr',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-89',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://www.usom.gov.tr/bildirim/tr-23-0492',
              source: 'cve@usom.gov.tr',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-39598',
          sourceIdentifier: 'cve@mitre.org',
          published: '2023-09-05T18:15:10.900',
          lastModified: '2023-09-05T18:29:49.867',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Cross Site Scripting vulnerability in IceWarp Corporation WebClient v.10.2.1 allows a remote attacker to execute arbitrary code via a crafted payload to the mid parameter.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://medium.com/@muthumohanprasath.r/reflected-cross-site-scripting-on-icewarp-webclient-product-cve-2023-39598-9598b92da49c',
              source: 'cve@mitre.org',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-39681',
          sourceIdentifier: 'cve@mitre.org',
          published: '2023-09-05T18:15:11.027',
          lastModified: '2023-09-05T18:29:49.867',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'Cuppa CMS v1.0 was discovered to contain a remote code execution (RCE) vulnerability via the email_outgoing parameter at /Configuration.php. This vulnerability is triggered via a crafted payload.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://github.com/yanbochen97/CuppaCMS_RCE',
              source: 'cve@mitre.org',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-3616',
          sourceIdentifier: 'cve@usom.gov.tr',
          published: '2023-09-05T18:15:11.150',
          lastModified: '2023-09-05T18:29:49.867',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                "Improper Neutralization of Special Elements used in an SQL Command ('SQL Injection') vulnerability in Mava Software Hotel Management System allows SQL Injection.This issue affects Hotel Management System: before 2.0.\n\n",
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'cve@usom.gov.tr',
                type: 'Primary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'HIGH',
                  availabilityImpact: 'HIGH',
                  baseScore: 9.8,
                  baseSeverity: 'CRITICAL',
                },
                exploitabilityScore: 3.9,
                impactScore: 5.9,
              },
            ],
          },
          weaknesses: [
            {
              source: 'cve@usom.gov.tr',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-89',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://www.usom.gov.tr/bildirim/tr-23-0493',
              source: 'cve@usom.gov.tr',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-40918',
          sourceIdentifier: 'cve@mitre.org',
          published: '2023-09-05T18:15:11.317',
          lastModified: '2023-09-05T18:29:49.867',
          vulnStatus: 'Awaiting Analysis',
          descriptions: [
            {
              lang: 'en',
              value:
                'KnowStreaming 3.3.0 is vulnerable to Escalation of Privileges. Unauthorized users can create a new user with an admin role.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://github.com/didi/KnowStreaming/issues/1128',
              source: 'cve@mitre.org',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2020-35593',
          sourceIdentifier: 'cve@mitre.org',
          published: '2023-09-05T19:15:48.407',
          lastModified: '2023-09-05T20:15:07.687',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                'BMC PATROL Agent through 20.08.00 allows local privilege escalation via vectors involving pconfig +RESTART -host.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'http://web.archive.org/web/20210106175128/https://community.bmc.com/s/article/SECURITY-Patrol-Agent-Local-Privilege-Escalation-in-BMC-PATROL-Agent-CVE-2020-35593',
              source: 'cve@mitre.org',
            },
            {
              url: 'https://community.bmc.com/s/article/SECURITY-Patrol-Agent-Local-Privilege-Escalation-in-BMC-PATROL-Agent-CVE-2020-35593',
              source: 'cve@mitre.org',
            },
            {
              url: 'https://webapps.bmc.com/support/faces/az/prodallversions.jsp?seqid=304517',
              source: 'cve@mitre.org',
            },
            {
              url: 'https://www.securifera.com/advisories/',
              source: 'cve@mitre.org',
            },
            {
              url: 'https://www.securifera.com/blog/2021/03/08/bmc-patrol-agent-domain-user-to-domain-admin-part-2/',
              source: 'cve@mitre.org',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2021-40546',
          sourceIdentifier: 'cve@mitre.org',
          published: '2023-09-05T19:15:48.523',
          lastModified: '2023-09-05T19:15:48.523',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                'Tenda AC6 US_AC6V4.0RTL_V02.03.01.26_cn.bin allows attackers (who have the administrator password) to cause a denial of service (device crash) via a long string in the wifiPwd_5G parameter to /goform/setWifi.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://github.com/doudoudedi/buffer_overflow/blob/main/Tenda%20AC6%20V4.0-Denial%20of%20Service%20Vulnerability.md',
              source: 'cve@mitre.org',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-41317',
          sourceIdentifier: 'security-advisories@github.com',
          published: '2023-09-05T19:15:48.610',
          lastModified: '2023-09-05T19:15:48.610',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                'The Apollo Router is a configurable, high-performance graph router written in Rust to run a federated supergraph that uses Apollo Federation 2. Affected versions are subject to a Denial-of-Service (DoS) type vulnerability which causes the Router to panic and terminate when GraphQL Subscriptions are enabled.  It can be triggered when **all of the following conditions are met**: 1. Running Apollo Router v1.28.0, v1.28.1 or v1.29.0 ("impacted versions"); **and** 2. The Supergraph schema provided to the Router (either via Apollo Uplink or explicitly via other configuration) **has a `subscription` type** with root-fields defined; **and** 3. The YAML configuration provided to the Router **has subscriptions enabled** (they are _disabled_ by default), either by setting `enabled: true` _or_ by setting a valid `mode` within the `subscriptions` object (as seen in [subscriptions\' documentation](https://www.apollographql.com/docs/router/executing-operations/subscription-support/#router-setup)); **and** 4. An [anonymous](https://spec.graphql.org/draft/#sec-Anonymous-Operation-Definitions) (i.e., un-named) `subscription` operation (e.g., `subscription { ... }`) is received by the Router If **all four** of these criteria are met, the impacted versions will panic and terminate.  There is no data-privacy risk or sensitive-information exposure aspect to this vulnerability. This is fixed in Apollo Router v1.29.1. Users are advised to upgrade. Updating to v1.29.1 should be a clear and simple upgrade path for those running impacted versions.  However, if Subscriptions are **not** necessary for your Graph – but are enabled via configuration — then disabling subscriptions is another option to mitigate the risk.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'security-advisories@github.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'NONE',
                  integrityImpact: 'NONE',
                  availabilityImpact: 'HIGH',
                  baseScore: 7.5,
                  baseSeverity: 'HIGH',
                },
                exploitabilityScore: 3.9,
                impactScore: 3.6,
              },
            ],
          },
          weaknesses: [
            {
              source: 'security-advisories@github.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-755',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://github.com/apollographql/router/commit/b295c103dd86c57c848397d32e8094edfa8502aa',
              source: 'security-advisories@github.com',
            },
            {
              url: 'https://github.com/apollographql/router/releases/tag/v1.29.1',
              source: 'security-advisories@github.com',
            },
            {
              url: 'https://github.com/apollographql/router/security/advisories/GHSA-w8vq-3hf9-xppx',
              source: 'security-advisories@github.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-4034',
          sourceIdentifier: 'cve@usom.gov.tr',
          published: '2023-09-05T19:15:48.713',
          lastModified: '2023-09-05T19:15:48.713',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                "Improper Neutralization of Special Elements used in an SQL Command ('SQL Injection') vulnerability in Digita Information Technology Smartrise Document Management System allows SQL Injection.This issue affects Smartrise Document Management System: before Hvl-2.0.\n\n",
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'cve@usom.gov.tr',
                type: 'Primary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'HIGH',
                  availabilityImpact: 'HIGH',
                  baseScore: 9.8,
                  baseSeverity: 'CRITICAL',
                },
                exploitabilityScore: 3.9,
                impactScore: 5.9,
              },
            ],
          },
          weaknesses: [
            {
              source: 'cve@usom.gov.tr',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-89',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://www.usom.gov.tr/bildirim/tr-23-0494',
              source: 'cve@usom.gov.tr',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-4178',
          sourceIdentifier: 'cve@usom.gov.tr',
          published: '2023-09-05T19:15:48.820',
          lastModified: '2023-09-05T19:15:48.820',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                'Authentication Bypass by Spoofing vulnerability in Neutron Neutron Smart VMS allows Authentication Bypass.This issue affects Neutron Smart VMS: before b1130.1.0.1.\n\n',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'cve@usom.gov.tr',
                type: 'Primary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:N/A:L',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'NONE',
                  availabilityImpact: 'LOW',
                  baseScore: 8.2,
                  baseSeverity: 'HIGH',
                },
                exploitabilityScore: 3.9,
                impactScore: 4.2,
              },
            ],
          },
          weaknesses: [
            {
              source: 'cve@usom.gov.tr',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-290',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://www.usom.gov.tr/bildirim/tr-23-0496',
              source: 'cve@usom.gov.tr',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-4531',
          sourceIdentifier: 'cve@usom.gov.tr',
          published: '2023-09-05T19:15:48.923',
          lastModified: '2023-09-05T19:15:48.923',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                "Improper Neutralization of Special Elements used in an SQL Command ('SQL Injection') vulnerability in Mestav Software E-commerce Software allows SQL Injection.This issue affects E-commerce Software: before 20230901 .\n\n",
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'cve@usom.gov.tr',
                type: 'Primary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'HIGH',
                  availabilityImpact: 'HIGH',
                  baseScore: 9.8,
                  baseSeverity: 'CRITICAL',
                },
                exploitabilityScore: 3.9,
                impactScore: 5.9,
              },
            ],
          },
          weaknesses: [
            {
              source: 'cve@usom.gov.tr',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-89',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://www.usom.gov.tr/bildirim/tr-23-0495',
              source: 'cve@usom.gov.tr',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-4781',
          sourceIdentifier: 'security@huntr.dev',
          published: '2023-09-05T19:15:49.207',
          lastModified: '2023-09-05T19:15:49.207',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                'Heap-based Buffer Overflow in GitHub repository vim/vim prior to 9.0.1873.',
            },
          ],
          metrics: {
            cvssMetricV30: [
              {
                source: 'security@huntr.dev',
                type: 'Secondary',
                cvssData: {
                  version: '3.0',
                  vectorString: 'CVSS:3.0/AV:L/AC:L/PR:N/UI:R/S:U/C:H/I:H/A:H',
                  attackVector: 'LOCAL',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'REQUIRED',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'HIGH',
                  availabilityImpact: 'HIGH',
                  baseScore: 7.8,
                  baseSeverity: 'HIGH',
                },
                exploitabilityScore: 1.8,
                impactScore: 5.9,
              },
            ],
          },
          weaknesses: [
            {
              source: 'security@huntr.dev',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-122',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://github.com/vim/vim/commit/f6d28fe2c95c678cc3202cc5dc825a3fcc709e93',
              source: 'security@huntr.dev',
            },
            {
              url: 'https://huntr.dev/bounties/c867eb0a-aa8b-4946-a621-510350673883',
              source: 'security@huntr.dev',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2020-10128',
          sourceIdentifier: 'cret@cert.org',
          published: '2023-09-05T20:15:07.543',
          lastModified: '2023-09-05T20:15:07.543',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                'SearchBlox product with version before 9.2.1 is vulnerable to stored cross-site scripting at multiple user input parameters. In SearchBlox products multiple parameters are not sanitized/validate properly which allows an attacker to inject malicious JavaScript.',
            },
          ],
          metrics: {},
          weaknesses: [
            {
              source: 'cret@cert.org',
              type: 'Secondary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-79',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://developer.searchblox.com/v9.2/changelog/version-921',
              source: 'cret@cert.org',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-39654',
          sourceIdentifier: 'cve@mitre.org',
          published: '2023-09-05T20:15:07.883',
          lastModified: '2023-09-05T20:15:07.883',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                'abupy up to v0.4.0 was discovered to contain a SQL injection vulnerability via the component abupy.MarketBu.ABuSymbol.search_to_symbol_dict.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://github.com/Leeyangee/leeya_bug/blob/main/%5BWarning%5DSQL%20Injection%20in%20abupy%20%3C=%20v0.4.0.md',
              source: 'cve@mitre.org',
            },
            {
              url: 'https://github.com/bbfamily/abu',
              source: 'cve@mitre.org',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-41009',
          sourceIdentifier: 'cve@mitre.org',
          published: '2023-09-05T20:15:07.937',
          lastModified: '2023-09-05T20:15:07.937',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                'File Upload vulnerability in adlered bolo-solo v.2.6 allows a remote attacker to execute arbitrary code via a crafted script to the authorization field in the header.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'http://adlered.com',
              source: 'cve@mitre.org',
            },
            {
              url: 'https://github.com/Rabb1tQ/HillstoneCVEs/blob/main/CVE-2023-41009/CVE-2023-41009.md',
              source: 'cve@mitre.org',
            },
            {
              url: 'https://github.com/adlered/bolo-solo',
              source: 'cve@mitre.org',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-39359',
          sourceIdentifier: 'security-advisories@github.com',
          published: '2023-09-05T21:15:46.143',
          lastModified: '2023-09-05T21:15:46.143',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                'Cacti is an open source operational monitoring and fault management framework. An authenticated SQL injection vulnerability was discovered which allows authenticated users to perform privilege escalation and remote code execution. The vulnerability resides in the `graphs.php` file. When dealing with the cases of ajax_hosts and ajax_hosts_noany, if the `site_id` parameter is greater than 0, it is directly reflected in the WHERE clause of the SQL statement. This creates an SQL injection vulnerability. This issue has been addressed in version 1.2.25. Users are advised to upgrade. There are no known workarounds for this vulnerability.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'security-advisories@github.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:H',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'LOW',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'HIGH',
                  availabilityImpact: 'HIGH',
                  baseScore: 8.8,
                  baseSeverity: 'HIGH',
                },
                exploitabilityScore: 2.8,
                impactScore: 5.9,
              },
            ],
          },
          weaknesses: [
            {
              source: 'security-advisories@github.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-89',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://github.com/Cacti/cacti/security/advisories/GHSA-q4wh-3f9w-836h',
              source: 'security-advisories@github.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-39360',
          sourceIdentifier: 'security-advisories@github.com',
          published: '2023-09-05T21:15:46.800',
          lastModified: '2023-09-05T21:15:46.800',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                'Cacti is an open source operational monitoring and fault management framework.Affected versions are subject to a Stored Cross-Site-Scripting (XSS) Vulnerability allows an authenticated user to poison data. The vulnerability is found in `graphs_new.php`. Several validations are performed, but the `returnto` parameter is directly passed to `form_save_button`. In order to bypass this validation, returnto must contain `host.php`. This vulnerability has been addressed in version 1.2.25. Users are advised to upgrade. Users unable to update should manually filter HTML output.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'security-advisories@github.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:C/C:L/I:L/A:N',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'REQUIRED',
                  scope: 'CHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'NONE',
                  baseScore: 6.1,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 2.8,
                impactScore: 2.7,
              },
            ],
          },
          weaknesses: [
            {
              source: 'security-advisories@github.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-79',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://github.com/Cacti/cacti/security/advisories/GHSA-gx8c-xvjh-9qh4',
              source: 'security-advisories@github.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-39361',
          sourceIdentifier: 'security-advisories@github.com',
          published: '2023-09-05T21:15:46.880',
          lastModified: '2023-09-05T21:15:46.880',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                'Cacti is an open source operational monitoring and fault management framework. Affected versions are subject to a SQL injection discovered in graph_view.php. Since guest users can access graph_view.php without authentication by default, if guest users are being utilized in an enabled state, there could be the potential for significant damage. Attackers may exploit this vulnerability, and there may be possibilities for actions such as the usurpation of administrative privileges or remote code execution. This issue has been addressed in version 1.2.25. Users are advised to upgrade. There are no known workarounds for this vulnerability.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'security-advisories@github.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'HIGH',
                  availabilityImpact: 'HIGH',
                  baseScore: 9.8,
                  baseSeverity: 'CRITICAL',
                },
                exploitabilityScore: 3.9,
                impactScore: 5.9,
              },
            ],
          },
          weaknesses: [
            {
              source: 'security-advisories@github.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-89',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://github.com/Cacti/cacti/security/advisories/GHSA-6r43-q2fw-5wrg',
              source: 'security-advisories@github.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-39366',
          sourceIdentifier: 'security-advisories@github.com',
          published: '2023-09-05T21:15:46.963',
          lastModified: '2023-09-05T21:15:46.963',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                "Cacti is an open source operational monitoring and fault management framework. Affected versions are subject to a Stored Cross-Site-Scripting (XSS) Vulnerability allows an authenticated user to poison data stored in the _cacti_'s database. These data will be viewed by administrative _cacti_ accounts and execute JavaScript code in the victim's browser at view-time. The `data_sources.php` script displays the data source management information (e.g. data source path, polling configuration etc.) for different data visualizations of the _cacti_ app. \nCENSUS found that an adversary that is able to configure a malicious Device name, can deploy a stored XSS attack against any user of the same (or broader) privileges. A user that possesses the _General Administration>Sites/Devices/Data_ permissions can configure the device names in _cacti_. This configuration occurs through `http://<HOST>/cacti/host.php`, while the rendered malicious payload is exhibited at `http://<HOST>/cacti/data_sources.php`. This vulnerability has been addressed in version 1.2.25. Users are advised to upgrade. Users unable to update should manually filter HTML output.",
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'security-advisories@github.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:H/UI:R/S:U/C:H/I:H/A:N',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'HIGH',
                  userInteraction: 'REQUIRED',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'HIGH',
                  availabilityImpact: 'NONE',
                  baseScore: 6.1,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 0.9,
                impactScore: 5.2,
              },
            ],
          },
          weaknesses: [
            {
              source: 'security-advisories@github.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-79',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://github.com/Cacti/cacti/security/advisories/GHSA-rwhh-xxm6-vcrv',
              source: 'security-advisories@github.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-39510',
          sourceIdentifier: 'security-advisories@github.com',
          published: '2023-09-05T21:15:47.047',
          lastModified: '2023-09-05T21:15:47.047',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                "Cacti is an open source operational monitoring and fault management framework. Affected versions are subject to a Stored Cross-Site-Scripting (XSS) Vulnerability allows an authenticated user to poison data stored in the _cacti_'s database. These data will be viewed by administrative _cacti_ accounts and execute JavaScript code in the victim's browser at view-time. The`reports_admin.php` script displays reporting information about graphs, devices, data sources etc.\nCENSUS found that an adversary that is able to configure a malicious Device name, can deploy a stored XSS attack against any user of the same (or broader) privileges. A user that possesses the _General Administration>Sites/Devices/Data_ permissions can configure the device names in _cacti_. This configuration occurs through `http://<HOST>/cacti/host.php`, while the rendered malicious payload is exhibited at `http://<HOST>/cacti/reports_admin.php` when the a graph with the maliciously altered device name is linked to the report. This vulnerability has been addressed in version 1.2.25. Users are advised to upgrade. Users unable to update should manually filter HTML output.",
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'security-advisories@github.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:H/UI:R/S:U/C:H/I:H/A:N',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'HIGH',
                  userInteraction: 'REQUIRED',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'HIGH',
                  availabilityImpact: 'NONE',
                  baseScore: 6.1,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 0.9,
                impactScore: 5.2,
              },
            ],
          },
          weaknesses: [
            {
              source: 'security-advisories@github.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-79',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://github.com/Cacti/cacti/security/advisories/GHSA-24w4-4hp2-3j8h',
              source: 'security-advisories@github.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-39512',
          sourceIdentifier: 'security-advisories@github.com',
          published: '2023-09-05T21:15:47.127',
          lastModified: '2023-09-05T21:15:47.127',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                "Cacti is an open source operational monitoring and fault management framework. Affected versions are subject to a Stored Cross-Site-Scripting (XSS) Vulnerability which allows an authenticated user to poison data stored in the _cacti_'s database. These data will be viewed by administrative _cacti_ accounts and execute JavaScript code in the victim's browser at view-time. The script under `data_sources.php` displays the data source management information (e.g. data source path, polling configuration, device name related to the datasource etc.) for different data visualizations of the _cacti_ app. _CENSUS_ found that an adversary that is able to configure a malicious device name, can deploy a stored XSS attack against any user of the same (or broader) privileges. A user that possesses the _General Administration>Sites/Devices/Data_ permissions can configure the device names in _cacti_. This configuration occurs through `http://<HOST>/cacti/host.php`, while the rendered malicious payload is exhibited at `http://<HOST>/cacti/data_sources.php`. This vulnerability has been addressed in version 1.2.25. Users are advised to upgrade. Users unable to update should manually filter HTML output.",
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'security-advisories@github.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:H/UI:R/S:U/C:H/I:H/A:N',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'HIGH',
                  userInteraction: 'REQUIRED',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'HIGH',
                  availabilityImpact: 'NONE',
                  baseScore: 6.1,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 0.9,
                impactScore: 5.2,
              },
            ],
          },
          weaknesses: [
            {
              source: 'security-advisories@github.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-79',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://github.com/Cacti/cacti/security/advisories/GHSA-vqcc-5v63-g9q7',
              source: 'security-advisories@github.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-39513',
          sourceIdentifier: 'security-advisories@github.com',
          published: '2023-09-05T21:15:47.213',
          lastModified: '2023-09-05T21:15:47.213',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                "Cacti is an open source operational monitoring and fault management framework. Affected versions are subject to a Stored Cross-Site-Scripting (XSS) Vulnerability which allows an authenticated user to poison data stored in the _cacti_'s database. These data will be viewed by administrative _cacti_ accounts and execute JavaScript code in the victim's browser at view-time. The script under `host.php` is used to monitor and manage hosts in the _cacti_ app, hence displays useful information such as data queries and verbose logs. _CENSUS_ found that an adversary that is able to configure a data-query template with malicious code appended in the template path, in order to deploy a stored XSS attack against any user with the _General Administration>Sites/Devices/Data_ privileges. A user that possesses the _Template Editor>Data Queries_ permissions can configure the data query template path in _cacti_. Please note that such a user may be a low privileged user. This configuration occurs through `http://<HOST>/cacti/data_queries.php` by editing an existing or adding a new data query template. If a template is linked to a device then the formatted template path will be rendered in the device's management page, when a _verbose data query_ is requested. This vulnerability has been addressed in version 1.2.25. Users are advised to upgrade. Users unable to update should manually filter HTML output.",
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'security-advisories@github.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:H/UI:R/S:U/C:H/I:H/A:N',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'HIGH',
                  userInteraction: 'REQUIRED',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'HIGH',
                  availabilityImpact: 'NONE',
                  baseScore: 6.1,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 0.9,
                impactScore: 5.2,
              },
            ],
          },
          weaknesses: [
            {
              source: 'security-advisories@github.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-79',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://github.com/Cacti/cacti/security/advisories/GHSA-9fj7-8f2j-2rw2',
              source: 'security-advisories@github.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-39514',
          sourceIdentifier: 'security-advisories@github.com',
          published: '2023-09-05T21:15:47.297',
          lastModified: '2023-09-05T21:15:47.297',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                "Cacti is an open source operational monitoring and fault management framework. Affected versions are subject to a Stored Cross-Site-Scripting (XSS) Vulnerability which allows an authenticated user to poison data stored in the _cacti_'s database. These data will be viewed by administrative _cacti_ accounts and execute JavaScript code in the victim's browser at view-time. The script under `graphs.php` displays graph details such as data-source paths, data template information and graph related fields. _CENSUS_ found that an adversary that is able to configure either a data-source template with malicious code appended in the data-source name or a device with a malicious payload injected in the device name, may deploy a stored XSS attack against any user with _General Administration>Graphs_ privileges. A user that possesses the _Template Editor>Data Templates_ permissions can configure the data-source name in _cacti_. Please note that this may be a _low privileged_ user. This configuration occurs through `http://<HOST>/cacti/data_templates.php` by editing an existing or adding a new data template. If a template is linked to a graph then the formatted template name will be rendered in the graph's management page. A user that possesses the _General Administration>Sites/Devices/Data_ permissions can configure the device name in _cacti_. This vulnerability has been addressed in version 1.2.25. Users are advised to upgrade. Users unable to upgrade should add manual HTML escaping.\n",
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'security-advisories@github.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:H/UI:R/S:U/C:H/I:H/A:N',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'HIGH',
                  userInteraction: 'REQUIRED',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'HIGH',
                  availabilityImpact: 'NONE',
                  baseScore: 6.1,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 0.9,
                impactScore: 5.2,
              },
            ],
          },
          weaknesses: [
            {
              source: 'security-advisories@github.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-79',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://github.com/Cacti/cacti/security/advisories/GHSA-6hrc-2cfc-8hm7',
              source: 'security-advisories@github.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-39515',
          sourceIdentifier: 'security-advisories@github.com',
          published: '2023-09-05T21:15:47.387',
          lastModified: '2023-09-05T21:15:47.387',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                "Cacti is an open source operational monitoring and fault management framework. Affected versions are subject to a Stored Cross-Site-Scripting (XSS) Vulnerability allows an authenticated user to poison data stored in the cacti's database. These data will be viewed by administrative cacti accounts and execute JavaScript code in the victim's browser at view-time. The script under `data_debug.php` displays data source related debugging information such as _data source paths, polling settings, meta-data on the data source_. _CENSUS_ found that an adversary that is able to configure a malicious data-source path, can deploy a stored XSS attack against any user that has privileges related to viewing the `data_debug.php` information. A user that possesses the _General Administration>Sites/Devices/Data_ permissions can configure the data source path in _cacti_. This configuration occurs through `http://<HOST>/cacti/data_sources.php`. This vulnerability has been addressed in version 1.2.25. Users are advised to upgrade. Users unable to update should manually filter HTML output.",
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'security-advisories@github.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:H/UI:R/S:U/C:H/I:H/A:N',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'HIGH',
                  userInteraction: 'REQUIRED',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'HIGH',
                  availabilityImpact: 'NONE',
                  baseScore: 6.1,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 0.9,
                impactScore: 5.2,
              },
            ],
          },
          weaknesses: [
            {
              source: 'security-advisories@github.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-79',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://github.com/Cacti/cacti/security/advisories/GHSA-hrg9-qqqx-wc4h',
              source: 'security-advisories@github.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-41508',
          sourceIdentifier: 'cve@mitre.org',
          published: '2023-09-05T21:15:47.483',
          lastModified: '2023-09-05T21:15:47.483',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                'A hard coded password in Super Store Finder v3.6 allows attackers to access the administration panel.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://github.com/redblueteam/CVE-2023-41508/',
              source: 'cve@mitre.org',
            },
            {
              url: 'https://superstorefinder.net/support/forums/topic/super-store-finder-patch-notes/',
              source: 'cve@mitre.org',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-4310',
          sourceIdentifier: 'cve@mitre.org',
          published: '2023-09-05T21:15:47.537',
          lastModified: '2023-09-05T21:15:47.537',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                'BeyondTrust Privileged Remote Access (PRA) and Remote Support (RS) versions 23.2.1 and 23.2.2 contain a command injection vulnerability which can be exploited through a malicious HTTP request. Successful exploitation of this vulnerability can allow an unauthenticated remote attacker to execute underlying operating system commands within the context of the site user. This issue is fixed in version 23.2.3.\n',
            },
          ],
          metrics: {},
          weaknesses: [
            {
              source: 'cve@mitre.org',
              type: 'Secondary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-77',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://beyondtrustcorp.service-now.com/csm?id=kb_article_view&sysparm_article=KB0020207',
              source: 'cve@mitre.org',
            },
            {
              url: 'https://www.beyondtrust.com/blog/entry/security-update-for-remote-support-and-privileged-remote-access',
              source: 'cve@mitre.org',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-30534',
          sourceIdentifier: 'security-advisories@github.com',
          published: '2023-09-05T22:15:08.240',
          lastModified: '2023-09-05T22:15:08.240',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                'Cacti is an open source operational monitoring and fault management framework. There are two instances of insecure deserialization in Cacti version 1.2.24. While a viable gadget chain exists in Cacti’s vendor directory (phpseclib), the necessary gadgets are not included, making them inaccessible and the insecure deserializations not exploitable. Each instance of insecure deserialization is due to using the unserialize function without sanitizing the user input. Cacti has a “safe” deserialization that attempts to sanitize the content and check for specific values before calling unserialize, but it isn’t used in these instances. The vulnerable code lies in graphs_new.php, specifically within the host_new_graphs_save function. This issue has been addressed in version 1.2.25. Users are advised to upgrade. There are no known workarounds for this vulnerability.\n',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'security-advisories@github.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:L/I:N/A:N',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'LOW',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'NONE',
                  availabilityImpact: 'NONE',
                  baseScore: 4.3,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 2.8,
                impactScore: 1.4,
              },
            ],
          },
          weaknesses: [
            {
              source: 'security-advisories@github.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-502',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://github.com/Cacti/cacti/security/advisories/GHSA-77rf-774j-6h3p',
              source: 'security-advisories@github.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-31132',
          sourceIdentifier: 'security-advisories@github.com',
          published: '2023-09-05T22:15:08.487',
          lastModified: '2023-09-05T22:15:08.487',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                'Cacti is an open source operational monitoring and fault management framework. Affected versions are subject to a privilege escalation vulnerability. A low-privileged OS user with access to a Windows host where Cacti is installed can create arbitrary PHP files in a web document directory. The user can then execute the PHP files under the security context of SYSTEM. This allows an attacker to escalate privilege from a normal user account to SYSTEM. This issue has been addressed in version 1.2.25. Users are advised to upgrade. There are no known workarounds for this vulnerability.\n',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'security-advisories@github.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:L/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:H',
                  attackVector: 'LOCAL',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'LOW',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'HIGH',
                  availabilityImpact: 'HIGH',
                  baseScore: 7.8,
                  baseSeverity: 'HIGH',
                },
                exploitabilityScore: 1.8,
                impactScore: 5.9,
              },
            ],
          },
          weaknesses: [
            {
              source: 'security-advisories@github.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-306',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://github.com/Cacti/cacti/security/advisories/GHSA-rf5w-pq3f-9876',
              source: 'security-advisories@github.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-34637',
          sourceIdentifier: 'cve@mitre.org',
          published: '2023-09-05T22:15:08.577',
          lastModified: '2023-09-05T22:15:08.577',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                'A stored cross-site scripting (XSS) vulnerability in IsarNet AG IsarFlow v5.23 allows authenticated attackers to execute arbitrary web scripts or HTML via injecting a crafted payload into the dashboard title parameter in the IsarFlow Portal.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://www.mgm-sp.com/en/isarflow-xss-vulnerability/',
              source: 'cve@mitre.org',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-39357',
          sourceIdentifier: 'security-advisories@github.com',
          published: '2023-09-05T22:15:08.637',
          lastModified: '2023-09-05T22:15:08.637',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                'Cacti is an open source operational monitoring and fault management framework. A defect in the sql_save function was discovered. When the column type is numeric, the sql_save function directly utilizes user input. Many files and functions calling the sql_save function do not perform prior validation of user input, leading to the existence of multiple SQL injection vulnerabilities in Cacti. This allows authenticated users to exploit these SQL injection vulnerabilities to perform privilege escalation and remote code execution. This issue has been addressed in version 1.2.25. Users are advised to upgrade. There are no known workarounds for this vulnerability.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'security-advisories@github.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:H',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'LOW',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'HIGH',
                  availabilityImpact: 'HIGH',
                  baseScore: 8.8,
                  baseSeverity: 'HIGH',
                },
                exploitabilityScore: 2.8,
                impactScore: 5.9,
              },
            ],
          },
          weaknesses: [
            {
              source: 'security-advisories@github.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-20',
                },
                {
                  lang: 'en',
                  value: 'CWE-89',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://github.com/Cacti/cacti/security/advisories/GHSA-6jhp-mgqg-fhqg',
              source: 'security-advisories@github.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-39358',
          sourceIdentifier: 'security-advisories@github.com',
          published: '2023-09-05T22:15:08.733',
          lastModified: '2023-09-05T22:15:08.733',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                'Cacti is an open source operational monitoring and fault management framework. An authenticated SQL injection vulnerability was discovered which allows authenticated users to perform privilege escalation and remote code execution. The vulnerability resides in the `reports_user.php` file. In `ajax_get_branches`, the `tree_id` parameter is passed to the `reports_get_branch_select` function without any validation. This issue has been addressed in version 1.2.25. Users are advised to upgrade. There are no known workarounds for this vulnerability.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'security-advisories@github.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:H',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'LOW',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'HIGH',
                  availabilityImpact: 'HIGH',
                  baseScore: 8.8,
                  baseSeverity: 'HIGH',
                },
                exploitabilityScore: 2.8,
                impactScore: 5.9,
              },
            ],
          },
          weaknesses: [
            {
              source: 'security-advisories@github.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-89',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://github.com/Cacti/cacti/security/advisories/GHSA-gj95-7xr8-9p7g',
              source: 'security-advisories@github.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-39362',
          sourceIdentifier: 'security-advisories@github.com',
          published: '2023-09-05T22:15:08.817',
          lastModified: '2023-09-05T22:15:08.817',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                'Cacti is an open source operational monitoring and fault management framework. In Cacti 1.2.24, under certain conditions, an authenticated privileged user, can use a malicious string in the SNMP options of a Device, performing command injection and obtaining remote code execution on the underlying server. The `lib/snmp.php` file has a set of functions, with similar behavior, that accept in input some variables and place them into an `exec` call without a proper escape or validation. This issue has been addressed in version 1.2.25. Users are advised to upgrade. There are no known workarounds for this vulnerability.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'security-advisories@github.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:H/UI:N/S:U/C:H/I:H/A:H',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'HIGH',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'HIGH',
                  availabilityImpact: 'HIGH',
                  baseScore: 7.2,
                  baseSeverity: 'HIGH',
                },
                exploitabilityScore: 1.2,
                impactScore: 5.9,
              },
            ],
          },
          weaknesses: [
            {
              source: 'security-advisories@github.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-78',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://github.com/Cacti/cacti/security/advisories/GHSA-g6ff-58cj-x3cp',
              source: 'security-advisories@github.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-39364',
          sourceIdentifier: 'security-advisories@github.com',
          published: '2023-09-05T22:15:08.910',
          lastModified: '2023-09-05T22:15:08.910',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                "Cacti is an open source operational monitoring and fault management framework. In Cacti 1.2.24, users with console access can be redirected to an arbitrary website after a change password performed via a specifically crafted URL. The `auth_changepassword.php` file accepts `ref` as a URL parameter and reflects it in the form used to perform the change password. It's value is used to perform a redirect via `header` PHP function. A user can be tricked in performing the change password operation, e.g., via a phishing message, and then interacting with the malicious website where the redirection has been performed, e.g., downloading malwares, providing credentials, etc. This issue has been addressed in version 1.2.25. Users are advised to upgrade. There are no known workarounds for this vulnerability.",
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'security-advisories@github.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:L/UI:R/S:U/C:L/I:N/A:N',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'LOW',
                  userInteraction: 'REQUIRED',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'NONE',
                  availabilityImpact: 'NONE',
                  baseScore: 3.5,
                  baseSeverity: 'LOW',
                },
                exploitabilityScore: 2.1,
                impactScore: 1.4,
              },
            ],
          },
          weaknesses: [
            {
              source: 'security-advisories@github.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-601',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://github.com/Cacti/cacti/security/advisories/GHSA-4pjv-rmrp-r59x',
              source: 'security-advisories@github.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-39365',
          sourceIdentifier: 'security-advisories@github.com',
          published: '2023-09-05T22:15:09.017',
          lastModified: '2023-09-05T22:15:09.017',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                'Cacti is an open source operational monitoring and fault management framework. Issues with Cacti Regular Expression validation combined with the external links feature can lead to limited SQL Injections and subsequent data leakage. This issue has been addressed in version 1.2.25. Users are advised to upgrade. There are no known workarounds for this vulnerability.\n\n',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'security-advisories@github.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:L/UI:R/S:U/C:L/I:N/A:L',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'LOW',
                  userInteraction: 'REQUIRED',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'NONE',
                  availabilityImpact: 'LOW',
                  baseScore: 4.6,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 2.1,
                impactScore: 2.5,
              },
            ],
          },
          weaknesses: [
            {
              source: 'security-advisories@github.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-89',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://github.com/Cacti/cacti/security/advisories/GHSA-v5w7-hww7-2f22',
              source: 'security-advisories@github.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-39516',
          sourceIdentifier: 'security-advisories@github.com',
          published: '2023-09-05T22:15:09.180',
          lastModified: '2023-09-05T22:15:09.180',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                "Cacti is an open source operational monitoring and fault management framework. Affected versions are subject to a Stored Cross-Site-Scripting (XSS) Vulnerability which allows an authenticated user to poison data stored in the _cacti_'s database. These data will be viewed by administrative _cacti_ accounts and execute JavaScript code in the victim's browser at view-time. The script under `data_sources.php` displays the data source management information (e.g. data source path, polling configuration etc.) for different data visualizations of the _cacti_ app. CENSUS found that an adversary that is able to configure a malicious data-source path, can deploy a stored XSS attack against any user of the same (or broader) privileges. A user that possesses the 'General Administration>Sites/Devices/Data' permissions can configure the data source path in Cacti. This configuration occurs through `http://<HOST>/cacti/data_sources.php`. The same page can be used for previewing the data source path. This issue has been addressed in version 1.2.25. Users are advised to upgrade. Users unable to upgrade should manually escape HTML output.\n",
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'security-advisories@github.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:H/UI:R/S:U/C:H/I:H/A:N',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'HIGH',
                  userInteraction: 'REQUIRED',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'HIGH',
                  availabilityImpact: 'NONE',
                  baseScore: 6.1,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 0.9,
                impactScore: 5.2,
              },
            ],
          },
          weaknesses: [
            {
              source: 'security-advisories@github.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-79',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://github.com/Cacti/cacti/security/advisories/GHSA-r8qq-88g3-hmgv',
              source: 'security-advisories@github.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-41507',
          sourceIdentifier: 'cve@mitre.org',
          published: '2023-09-05T22:15:09.337',
          lastModified: '2023-09-05T22:15:09.337',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                'Super Store Finder v3.6 was discovered to contain multiple SQL injection vulnerabilities in the store locator component via the products, distance, lat, and lng parameters.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://github.com/redblueteam/CVE-2023-41507/',
              source: 'cve@mitre.org',
            },
            {
              url: 'https://superstorefinder.net/support/forums/topic/super-store-finder-patch-notes/',
              source: 'cve@mitre.org',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-4761',
          sourceIdentifier: 'chrome-cve-admin@google.com',
          published: '2023-09-05T22:15:09.583',
          lastModified: '2023-09-05T22:15:09.583',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                'Out of bounds memory access in FedCM in Google Chrome prior to 116.0.5845.179 allowed a remote attacker who had compromised the renderer process to perform an out of bounds memory read via a crafted HTML page. (Chromium security severity: High)',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://chromereleases.googleblog.com/2023/09/stable-channel-update-for-desktop.html',
              source: 'chrome-cve-admin@google.com',
            },
            {
              url: 'https://crbug.com/1476403',
              source: 'chrome-cve-admin@google.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-4762',
          sourceIdentifier: 'chrome-cve-admin@google.com',
          published: '2023-09-05T22:15:09.677',
          lastModified: '2023-09-05T22:15:09.677',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                'Type Confusion in V8 in Google Chrome prior to 116.0.5845.179 allowed a remote attacker to execute arbitrary code via a crafted HTML page. (Chromium security severity: High)',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://chromereleases.googleblog.com/2023/09/stable-channel-update-for-desktop.html',
              source: 'chrome-cve-admin@google.com',
            },
            {
              url: 'https://crbug.com/1473247',
              source: 'chrome-cve-admin@google.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-4763',
          sourceIdentifier: 'chrome-cve-admin@google.com',
          published: '2023-09-05T22:15:09.777',
          lastModified: '2023-09-05T22:15:09.777',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                'Use after free in Networks in Google Chrome prior to 116.0.5845.179 allowed a remote attacker to potentially exploit heap corruption via a crafted HTML page. (Chromium security severity: High)',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://chromereleases.googleblog.com/2023/09/stable-channel-update-for-desktop.html',
              source: 'chrome-cve-admin@google.com',
            },
            {
              url: 'https://crbug.com/1469928',
              source: 'chrome-cve-admin@google.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-4764',
          sourceIdentifier: 'chrome-cve-admin@google.com',
          published: '2023-09-05T22:15:09.883',
          lastModified: '2023-09-05T22:15:09.883',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                'Incorrect security UI in BFCache in Google Chrome prior to 116.0.5845.179 allowed a remote attacker to spoof the contents of the Omnibox (URL bar) via a crafted HTML page. (Chromium security severity: High)',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://chromereleases.googleblog.com/2023/09/stable-channel-update-for-desktop.html',
              source: 'chrome-cve-admin@google.com',
            },
            {
              url: 'https://crbug.com/1447237',
              source: 'chrome-cve-admin@google.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-4487',
          sourceIdentifier: 'ics-cert@hq.dhs.gov',
          published: '2023-09-05T23:15:08.177',
          lastModified: '2023-09-05T23:15:08.177',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                '\nGE CIMPLICITY 2023 is by a process control vulnerability, which could allow a local attacker to insert malicious configuration files in the expected web server execution path to escalate privileges and gain full control of the HMI software.\n\n',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'ics-cert@hq.dhs.gov',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:L/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:H',
                  attackVector: 'LOCAL',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'LOW',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'HIGH',
                  availabilityImpact: 'HIGH',
                  baseScore: 7.8,
                  baseSeverity: 'HIGH',
                },
                exploitabilityScore: 1.8,
                impactScore: 5.9,
              },
            ],
          },
          weaknesses: [
            {
              source: 'ics-cert@hq.dhs.gov',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-114',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://digitalsupport.ge.com/s/article/GE-Digital-CIMPLICITY-Privilege-Escalation-Vulnerability',
              source: 'ics-cert@hq.dhs.gov',
            },
            {
              url: 'https://www.cisa.gov/news-events/ics-advisories/icsa-23-243-02',
              source: 'ics-cert@hq.dhs.gov',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-4485',
          sourceIdentifier: 'ics-cert@hq.dhs.gov',
          published: '2023-09-06T00:15:07.530',
          lastModified: '2023-09-06T00:15:07.530',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                "ARDEREG ?Sistema SCADA Central versions 2.203 and prior\nlogin page are vulnerable to an unauthenticated blind SQL injection attack. An attacker could manipulate the application's SQL query logic to extract sensitive information or perform unauthorized actions within the database. In this case, the vulnerability could allow an attacker to execute arbitrary SQL queries through the login page, potentially leading to unauthorized access, data leakage, or even disruption of critical industrial processes.\n\n",
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'ics-cert@hq.dhs.gov',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'HIGH',
                  availabilityImpact: 'HIGH',
                  baseScore: 9.8,
                  baseSeverity: 'CRITICAL',
                },
                exploitabilityScore: 3.9,
                impactScore: 5.9,
              },
            ],
          },
          weaknesses: [
            {
              source: 'ics-cert@hq.dhs.gov',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-89',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://www.cisa.gov/news-events/ics-advisories/icsa-23-243-01',
              source: 'ics-cert@hq.dhs.gov',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2022-32920',
          sourceIdentifier: 'product-security@apple.com',
          published: '2023-09-06T02:15:07.873',
          lastModified: '2023-09-06T02:15:07.873',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                'The issue was addressed with improved checks. This issue is fixed in Xcode 14.0. Parsing a file may lead to disclosure of user information.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://support.apple.com/en-us/HT213883',
              source: 'product-security@apple.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-27950',
          sourceIdentifier: 'product-security@apple.com',
          published: '2023-09-06T02:15:08.280',
          lastModified: '2023-09-06T02:15:08.280',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                'An out-of-bounds read was addressed with improved input validation. This issue is fixed in macOS Ventura 13.3. Processing an image may result in disclosure of process memory.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://support.apple.com/en-us/HT213670',
              source: 'product-security@apple.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-28187',
          sourceIdentifier: 'product-security@apple.com',
          published: '2023-09-06T02:15:08.340',
          lastModified: '2023-09-06T02:15:08.340',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                'This issue was addressed with improved state management. This issue is fixed in macOS Ventura 13.3. A user may be able to cause a denial-of-service.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://support.apple.com/en-us/HT213670',
              source: 'product-security@apple.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-28188',
          sourceIdentifier: 'product-security@apple.com',
          published: '2023-09-06T02:15:08.393',
          lastModified: '2023-09-06T02:15:08.393',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                'A denial-of-service issue was addressed with improved input validation. This issue is fixed in macOS Ventura 13.3. A remote user may be able to cause a denial-of-service.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://support.apple.com/en-us/HT213670',
              source: 'product-security@apple.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-28195',
          sourceIdentifier: 'product-security@apple.com',
          published: '2023-09-06T02:15:08.447',
          lastModified: '2023-09-06T02:15:08.447',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                'A privacy issue was addressed with improved private data redaction for log entries. This issue is fixed in macOS Ventura 13.3. An app may be able to read sensitive location information.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://support.apple.com/en-us/HT213670',
              source: 'product-security@apple.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-28208',
          sourceIdentifier: 'product-security@apple.com',
          published: '2023-09-06T02:15:08.497',
          lastModified: '2023-09-06T02:15:08.497',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                'A logic issue was addressed with improved state management. This issue is fixed in macOS Ventura 13.2, iOS 16.3 and iPadOS 16.3. A user may send a text from a secondary eSIM despite configuring a contact to use a primary eSIM.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://support.apple.com/en-us/HT213605',
              source: 'product-security@apple.com',
            },
            {
              url: 'https://support.apple.com/en-us/HT213606',
              source: 'product-security@apple.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-28209',
          sourceIdentifier: 'product-security@apple.com',
          published: '2023-09-06T02:15:08.550',
          lastModified: '2023-09-06T02:15:08.550',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                'A buffer overflow issue was addressed with improved memory handling. This issue is fixed in macOS Ventura 13.3. An app may be able to cause unexpected system termination or write kernel memory.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://support.apple.com/en-us/HT213670',
              source: 'product-security@apple.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-28210',
          sourceIdentifier: 'product-security@apple.com',
          published: '2023-09-06T02:15:08.600',
          lastModified: '2023-09-06T02:15:08.600',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                'A buffer overflow issue was addressed with improved memory handling. This issue is fixed in macOS Ventura 13.3. An app may be able to cause unexpected system termination or write kernel memory.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://support.apple.com/en-us/HT213670',
              source: 'product-security@apple.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-28211',
          sourceIdentifier: 'product-security@apple.com',
          published: '2023-09-06T02:15:08.653',
          lastModified: '2023-09-06T02:15:08.653',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                'A buffer overflow issue was addressed with improved memory handling. This issue is fixed in macOS Ventura 13.3. An app may be able to cause unexpected system termination or write kernel memory.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://support.apple.com/en-us/HT213670',
              source: 'product-security@apple.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-28212',
          sourceIdentifier: 'product-security@apple.com',
          published: '2023-09-06T02:15:08.703',
          lastModified: '2023-09-06T02:15:08.703',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                'A buffer overflow issue was addressed with improved memory handling. This issue is fixed in macOS Ventura 13.3. An app may be able to cause unexpected system termination or write kernel memory.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://support.apple.com/en-us/HT213670',
              source: 'product-security@apple.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-28213',
          sourceIdentifier: 'product-security@apple.com',
          published: '2023-09-06T02:15:08.757',
          lastModified: '2023-09-06T02:15:08.757',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                'A buffer overflow issue was addressed with improved memory handling. This issue is fixed in macOS Ventura 13.3. An app may be able to cause unexpected system termination or write kernel memory.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://support.apple.com/en-us/HT213670',
              source: 'product-security@apple.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-28214',
          sourceIdentifier: 'product-security@apple.com',
          published: '2023-09-06T02:15:08.807',
          lastModified: '2023-09-06T02:15:08.807',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                'A buffer overflow issue was addressed with improved memory handling. This issue is fixed in macOS Ventura 13.3. An app may be able to cause unexpected system termination or write kernel memory.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://support.apple.com/en-us/HT213670',
              source: 'product-security@apple.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-28215',
          sourceIdentifier: 'product-security@apple.com',
          published: '2023-09-06T02:15:08.857',
          lastModified: '2023-09-06T02:15:08.857',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                'A buffer overflow issue was addressed with improved memory handling. This issue is fixed in macOS Ventura 13.3. An app may be able to cause unexpected system termination or write kernel memory.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://support.apple.com/en-us/HT213670',
              source: 'product-security@apple.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-29166',
          sourceIdentifier: 'product-security@apple.com',
          published: '2023-09-06T02:15:08.910',
          lastModified: '2023-09-06T02:15:08.910',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                'A logic issue was addressed with improved state management. This issue is fixed in Pro Video Formats 2.2.5. A user may be able to elevate privileges.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://support.apple.com/en-us/HT213882',
              source: 'product-security@apple.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-32356',
          sourceIdentifier: 'product-security@apple.com',
          published: '2023-09-06T02:15:08.967',
          lastModified: '2023-09-06T02:15:08.967',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                'A buffer overflow issue was addressed with improved memory handling. This issue is fixed in macOS Ventura 13.3. An app may be able to cause unexpected system termination or write kernel memory.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://support.apple.com/en-us/HT213670',
              source: 'product-security@apple.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-32362',
          sourceIdentifier: 'product-security@apple.com',
          published: '2023-09-06T02:15:09.017',
          lastModified: '2023-09-06T02:15:09.017',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                'Error handling was changed to not reveal sensitive information. This issue is fixed in macOS Ventura 13.3. A website may be able to track sensitive user information.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://support.apple.com/en-us/HT213670',
              source: 'product-security@apple.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-32370',
          sourceIdentifier: 'product-security@apple.com',
          published: '2023-09-06T02:15:09.070',
          lastModified: '2023-09-06T02:15:09.070',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                'A logic issue was addressed with improved validation. This issue is fixed in macOS Ventura 13.3. Content Security Policy to block domains with wildcards may fail.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://support.apple.com/en-us/HT213670',
              source: 'product-security@apple.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-32379',
          sourceIdentifier: 'product-security@apple.com',
          published: '2023-09-06T02:15:09.120',
          lastModified: '2023-09-06T08:15:43.273',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                'A buffer overflow issue was addressed with improved memory handling. This issue is fixed in macOS Ventura 13.4. An app may be able to execute arbitrary code with kernel privileges.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://support.apple.com/en-us/HT213758',
              source: 'product-security@apple.com',
            },
            {
              url: 'https://support.apple.com/kb/HT213758',
              source: 'product-security@apple.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-32425',
          sourceIdentifier: 'product-security@apple.com',
          published: '2023-09-06T02:15:09.177',
          lastModified: '2023-09-06T08:15:43.850',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                'The issue was addressed with improved memory handling. This issue is fixed in iOS 16.5 and iPadOS 16.5, watchOS 9.5. An app may be able to gain elevated privileges.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://support.apple.com/en-us/HT213757',
              source: 'product-security@apple.com',
            },
            {
              url: 'https://support.apple.com/en-us/HT213764',
              source: 'product-security@apple.com',
            },
            {
              url: 'https://support.apple.com/kb/HT213757',
              source: 'product-security@apple.com',
            },
            {
              url: 'https://support.apple.com/kb/HT213764',
              source: 'product-security@apple.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-32426',
          sourceIdentifier: 'product-security@apple.com',
          published: '2023-09-06T02:15:09.223',
          lastModified: '2023-09-06T02:15:09.223',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                'A logic issue was addressed with improved checks. This issue is fixed in macOS Ventura 13.3. An app may be able to gain root privileges.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://support.apple.com/en-us/HT213670',
              source: 'product-security@apple.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-32428',
          sourceIdentifier: 'product-security@apple.com',
          published: '2023-09-06T02:15:09.270',
          lastModified: '2023-09-06T08:15:43.913',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                'This issue was addressed with improved file handling. This issue is fixed in macOS Ventura 13.4, tvOS 16.5, iOS 16.5 and iPadOS 16.5, watchOS 9.5. An app may be able to gain root privileges.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://support.apple.com/en-us/HT213757',
              source: 'product-security@apple.com',
            },
            {
              url: 'https://support.apple.com/en-us/HT213758',
              source: 'product-security@apple.com',
            },
            {
              url: 'https://support.apple.com/en-us/HT213761',
              source: 'product-security@apple.com',
            },
            {
              url: 'https://support.apple.com/en-us/HT213764',
              source: 'product-security@apple.com',
            },
            {
              url: 'https://support.apple.com/kb/HT213757',
              source: 'product-security@apple.com',
            },
            {
              url: 'https://support.apple.com/kb/HT213758',
              source: 'product-security@apple.com',
            },
            {
              url: 'https://support.apple.com/kb/HT213761',
              source: 'product-security@apple.com',
            },
            {
              url: 'https://support.apple.com/kb/HT213764',
              source: 'product-security@apple.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-32432',
          sourceIdentifier: 'product-security@apple.com',
          published: '2023-09-06T02:15:09.327',
          lastModified: '2023-09-06T08:15:43.973',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                'A privacy issue was addressed with improved handling of temporary files. This issue is fixed in macOS Ventura 13.4, tvOS 16.5, iOS 16.5 and iPadOS 16.5, watchOS 9.5. An app may be able to access user-sensitive data.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://support.apple.com/en-us/HT213757',
              source: 'product-security@apple.com',
            },
            {
              url: 'https://support.apple.com/en-us/HT213758',
              source: 'product-security@apple.com',
            },
            {
              url: 'https://support.apple.com/en-us/HT213761',
              source: 'product-security@apple.com',
            },
            {
              url: 'https://support.apple.com/en-us/HT213764',
              source: 'product-security@apple.com',
            },
            {
              url: 'https://support.apple.com/kb/HT213757',
              source: 'product-security@apple.com',
            },
            {
              url: 'https://support.apple.com/kb/HT213758',
              source: 'product-security@apple.com',
            },
            {
              url: 'https://support.apple.com/kb/HT213761',
              source: 'product-security@apple.com',
            },
            {
              url: 'https://support.apple.com/kb/HT213764',
              source: 'product-security@apple.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-32438',
          sourceIdentifier: 'product-security@apple.com',
          published: '2023-09-06T02:15:09.383',
          lastModified: '2023-09-06T02:15:09.383',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                'This issue was addressed with improved checks to prevent unauthorized actions. This issue is fixed in tvOS 16.3, macOS Ventura 13.2, watchOS 9.3, iOS 16.3 and iPadOS 16.3. An app may be able to bypass Privacy preferences.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://support.apple.com/en-us/HT213599',
              source: 'product-security@apple.com',
            },
            {
              url: 'https://support.apple.com/en-us/HT213601',
              source: 'product-security@apple.com',
            },
            {
              url: 'https://support.apple.com/en-us/HT213605',
              source: 'product-security@apple.com',
            },
            {
              url: 'https://support.apple.com/en-us/HT213606',
              source: 'product-security@apple.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-34352',
          sourceIdentifier: 'product-security@apple.com',
          published: '2023-09-06T02:15:09.440',
          lastModified: '2023-09-06T08:15:44.120',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                'A permissions issue was addressed with improved redaction of sensitive information. This issue is fixed in macOS Ventura 13.4, tvOS 16.5, iOS 16.5 and iPadOS 16.5, watchOS 9.5. An attacker may be able to leak user account emails.',
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://support.apple.com/en-us/HT213757',
              source: 'product-security@apple.com',
            },
            {
              url: 'https://support.apple.com/en-us/HT213758',
              source: 'product-security@apple.com',
            },
            {
              url: 'https://support.apple.com/en-us/HT213761',
              source: 'product-security@apple.com',
            },
            {
              url: 'https://support.apple.com/en-us/HT213764',
              source: 'product-security@apple.com',
            },
            {
              url: 'https://support.apple.com/kb/HT213757',
              source: 'product-security@apple.com',
            },
            {
              url: 'https://support.apple.com/kb/HT213758',
              source: 'product-security@apple.com',
            },
            {
              url: 'https://support.apple.com/kb/HT213761',
              source: 'product-security@apple.com',
            },
            {
              url: 'https://support.apple.com/kb/HT213764',
              source: 'product-security@apple.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-4719',
          sourceIdentifier: 'security@wordfence.com',
          published: '2023-09-06T02:15:09.500',
          lastModified: '2023-09-06T02:15:09.500',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                'The Simple Membership plugin for WordPress is vulnerable to Reflected Cross-Site Scripting via the `list_type` parameter in versions up to, and including, 4.3.5 due to insufficient input sanitization and output escaping. Using this vulnerability, unauthenticated attackers could inject arbitrary web scripts into pages that are being executed if they can successfully trick a user into taking an action, such as clicking a malicious link.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'security@wordfence.com',
                type: 'Primary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:C/C:L/I:L/A:N',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'NONE',
                  scope: 'CHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'NONE',
                  baseScore: 7.2,
                  baseSeverity: 'HIGH',
                },
                exploitabilityScore: 3.9,
                impactScore: 2.7,
              },
            ],
          },
          weaknesses: [
            {
              source: 'security@wordfence.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-79',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://plugins.trac.wordpress.org/changeset?sfp_email=&sfph_mail=&reponame=&old=2962730%40simple-membership&new=2962730%40simple-membership&sfp_email=&sfph_mail=',
              source: 'security@wordfence.com',
            },
            {
              url: 'https://wordpress.org/plugins/simple-membership/',
              source: 'security@wordfence.com',
            },
            {
              url: 'https://www.wordfence.com/threat-intel/vulnerabilities/id/e4b10172-7e54-4ff8-9fbb-41d160ce49e4?source=cve',
              source: 'security@wordfence.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-30706',
          sourceIdentifier: 'mobile.security@samsung.com',
          published: '2023-09-06T04:15:11.063',
          lastModified: '2023-09-06T04:15:11.063',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                'Improper authorization in Samsung Keyboard prior to SMR Sep-2023 Release 1 allows attacker to read arbitrary file with system privilege.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'mobile.security@samsung.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:N/A:N',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'NONE',
                  availabilityImpact: 'NONE',
                  baseScore: 7.5,
                  baseSeverity: 'HIGH',
                },
                exploitabilityScore: 3.9,
                impactScore: 3.6,
              },
            ],
          },
          weaknesses: [
            {
              source: 'mobile.security@samsung.com',
              type: 'Secondary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-285',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://security.samsungmobile.com/securityUpdate.smsb?year=2023&month=09',
              source: 'mobile.security@samsung.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-30707',
          sourceIdentifier: 'mobile.security@samsung.com',
          published: '2023-09-06T04:15:11.520',
          lastModified: '2023-09-06T04:15:11.520',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                'Improper input validation vulnerability in FileProviderStatusReceiver in Samsung Keyboard prior to SMR Sep-2023 Release 1 allows local attackers to delete arbitrary files with Samsung Keyboard privilege.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'mobile.security@samsung.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:L/AC:L/PR:N/UI:N/S:U/C:N/I:L/A:N',
                  attackVector: 'LOCAL',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'NONE',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'NONE',
                  baseScore: 4.0,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 2.5,
                impactScore: 1.4,
              },
            ],
          },
          weaknesses: [
            {
              source: 'mobile.security@samsung.com',
              type: 'Secondary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-20',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://security.samsungmobile.com/securityUpdate.smsb?year=2023&month=09',
              source: 'mobile.security@samsung.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-30708',
          sourceIdentifier: 'mobile.security@samsung.com',
          published: '2023-09-06T04:15:11.627',
          lastModified: '2023-09-06T04:15:11.627',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                'Improper authentication in SecSettings prior to SMR Sep-2023 Release 1 allows attacker to access Captive Portal Wi-Fi in Reactivation Lock status.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'mobile.security@samsung.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:P/AC:L/PR:N/UI:N/S:U/C:N/I:N/A:H',
                  attackVector: 'PHYSICAL',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'NONE',
                  integrityImpact: 'NONE',
                  availabilityImpact: 'HIGH',
                  baseScore: 4.6,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 0.9,
                impactScore: 3.6,
              },
            ],
          },
          weaknesses: [
            {
              source: 'mobile.security@samsung.com',
              type: 'Secondary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-287',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://security.samsungmobile.com/securityUpdate.smsb?year=2023&month=09',
              source: 'mobile.security@samsung.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-30709',
          sourceIdentifier: 'mobile.security@samsung.com',
          published: '2023-09-06T04:15:11.833',
          lastModified: '2023-09-06T04:15:11.833',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                'Improper access control in Dual Messenger prior to SMR Sep-2023 Release 1 allows local attackers launch activity with system privilege.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'mobile.security@samsung.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:L/AC:L/PR:N/UI:N/S:C/C:H/I:L/A:N',
                  attackVector: 'LOCAL',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'NONE',
                  scope: 'CHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'NONE',
                  baseScore: 7.9,
                  baseSeverity: 'HIGH',
                },
                exploitabilityScore: 2.5,
                impactScore: 4.7,
              },
            ],
          },
          weaknesses: [
            {
              source: 'mobile.security@samsung.com',
              type: 'Secondary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-284',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://security.samsungmobile.com/securityUpdate.smsb?year=2023&month=09',
              source: 'mobile.security@samsung.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-30710',
          sourceIdentifier: 'mobile.security@samsung.com',
          published: '2023-09-06T04:15:12.220',
          lastModified: '2023-09-06T04:15:12.220',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                'Improper input validation vulnerability in Knox AI prior to SMR Sep-2023 Release 1 allows local attackers to launch privileged activities.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'mobile.security@samsung.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:L/AC:L/PR:N/UI:N/S:C/C:H/I:L/A:L',
                  attackVector: 'LOCAL',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'NONE',
                  scope: 'CHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'LOW',
                  baseScore: 8.5,
                  baseSeverity: 'HIGH',
                },
                exploitabilityScore: 2.5,
                impactScore: 5.3,
              },
            ],
          },
          weaknesses: [
            {
              source: 'mobile.security@samsung.com',
              type: 'Secondary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-20',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://security.samsungmobile.com/securityUpdate.smsb?year=2023&month=09',
              source: 'mobile.security@samsung.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-30711',
          sourceIdentifier: 'mobile.security@samsung.com',
          published: '2023-09-06T04:15:12.570',
          lastModified: '2023-09-06T04:15:12.570',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                'Improper authentication in Phone and Messaging Storage SMR SEP-2023 Release 1 allows attacker to insert arbitrary data to the provider.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'mobile.security@samsung.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:L/AC:L/PR:N/UI:N/S:U/C:N/I:L/A:N',
                  attackVector: 'LOCAL',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'NONE',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'NONE',
                  baseScore: 4.0,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 2.5,
                impactScore: 1.4,
              },
            ],
          },
          weaknesses: [
            {
              source: 'mobile.security@samsung.com',
              type: 'Secondary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-287',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://security.samsungmobile.com/securityUpdate.smsb?year=2023&month=09',
              source: 'mobile.security@samsung.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-30712',
          sourceIdentifier: 'mobile.security@samsung.com',
          published: '2023-09-06T04:15:13.007',
          lastModified: '2023-09-06T04:15:13.007',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                'Improper input validation in Settings Suggestions prior to SMR Sep-2023 Release 1 allows attackers to launch arbitrary activity.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'mobile.security@samsung.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:L/AC:L/PR:N/UI:N/S:U/C:H/I:L/A:N',
                  attackVector: 'LOCAL',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'NONE',
                  baseScore: 6.8,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 2.5,
                impactScore: 4.2,
              },
            ],
          },
          weaknesses: [
            {
              source: 'mobile.security@samsung.com',
              type: 'Secondary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-20',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://security.samsungmobile.com/securityUpdate.smsb?year=2023&month=09',
              source: 'mobile.security@samsung.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-30713',
          sourceIdentifier: 'mobile.security@samsung.com',
          published: '2023-09-06T04:15:13.383',
          lastModified: '2023-09-06T04:15:13.383',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                'Improper privilege management vulnerability in FolderLockNotifier in One UI Home prior to SMR Sep-2023 Release 1 allows local attackers to change some settings of the folder lock.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'mobile.security@samsung.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:L/AC:L/PR:N/UI:N/S:U/C:N/I:H/A:N',
                  attackVector: 'LOCAL',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'NONE',
                  integrityImpact: 'HIGH',
                  availabilityImpact: 'NONE',
                  baseScore: 6.2,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 2.5,
                impactScore: 3.6,
              },
            ],
          },
          weaknesses: [
            {
              source: 'mobile.security@samsung.com',
              type: 'Secondary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-269',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://security.samsungmobile.com/securityUpdate.smsb?year=2023&month=09',
              source: 'mobile.security@samsung.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-30714',
          sourceIdentifier: 'mobile.security@samsung.com',
          published: '2023-09-06T04:15:13.740',
          lastModified: '2023-09-06T04:15:13.740',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                'Improper authorization vulnerability in FolderContainerDragDelegate in One UI Home prior to SMR Sep-2023 Release 1 allows physical attackers to change some settings of the folder lock.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'mobile.security@samsung.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:P/AC:L/PR:N/UI:N/S:U/C:N/I:H/A:N',
                  attackVector: 'PHYSICAL',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'NONE',
                  integrityImpact: 'HIGH',
                  availabilityImpact: 'NONE',
                  baseScore: 4.6,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 0.9,
                impactScore: 3.6,
              },
            ],
          },
          weaknesses: [
            {
              source: 'mobile.security@samsung.com',
              type: 'Secondary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-285',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://security.samsungmobile.com/securityUpdate.smsb?year=2023&month=09',
              source: 'mobile.security@samsung.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-30715',
          sourceIdentifier: 'mobile.security@samsung.com',
          published: '2023-09-06T04:15:14.080',
          lastModified: '2023-09-06T04:15:14.080',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                'Improper access control vulnerability in Weather prior to SMR Sep-2023 Release 1 allows attackers to access location information set in Weather without permission.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'mobile.security@samsung.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:L/AC:L/PR:N/UI:N/S:U/C:L/I:N/A:N',
                  attackVector: 'LOCAL',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'NONE',
                  availabilityImpact: 'NONE',
                  baseScore: 4.0,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 2.5,
                impactScore: 1.4,
              },
            ],
          },
          weaknesses: [
            {
              source: 'mobile.security@samsung.com',
              type: 'Secondary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-284',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://security.samsungmobile.com/securityUpdate.smsb?year=2023&month=09',
              source: 'mobile.security@samsung.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-30716',
          sourceIdentifier: 'mobile.security@samsung.com',
          published: '2023-09-06T04:15:14.283',
          lastModified: '2023-09-06T04:15:14.283',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                'Improper access control vulnerability in SVCAgent prior to SMR Sep-2023 Release 1 allows attackers to trigger certain commands.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'mobile.security@samsung.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:L/AC:L/PR:N/UI:N/S:U/C:L/I:N/A:N',
                  attackVector: 'LOCAL',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'NONE',
                  availabilityImpact: 'NONE',
                  baseScore: 4.0,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 2.5,
                impactScore: 1.4,
              },
            ],
          },
          weaknesses: [
            {
              source: 'mobile.security@samsung.com',
              type: 'Secondary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-269',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://security.samsungmobile.com/securityUpdate.smsb?year=2023&month=09',
              source: 'mobile.security@samsung.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-30717',
          sourceIdentifier: 'mobile.security@samsung.com',
          published: '2023-09-06T04:15:14.467',
          lastModified: '2023-09-06T04:15:14.467',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                'Sensitive information exposure vulnerability in SVCAgent prior to SMR Sep-2023 Release 1 allows attackers to get unresettable identifiers.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'mobile.security@samsung.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:L/AC:L/PR:N/UI:N/S:U/C:L/I:N/A:N',
                  attackVector: 'LOCAL',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'NONE',
                  availabilityImpact: 'NONE',
                  baseScore: 4.0,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 2.5,
                impactScore: 1.4,
              },
            ],
          },
          weaknesses: [
            {
              source: 'mobile.security@samsung.com',
              type: 'Secondary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-269',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://security.samsungmobile.com/securityUpdate.smsb?year=2023&month=09',
              source: 'mobile.security@samsung.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-30718',
          sourceIdentifier: 'mobile.security@samsung.com',
          published: '2023-09-06T04:15:14.640',
          lastModified: '2023-09-06T04:15:14.640',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                'Improper export of android application components vulnerability in WifiApAutoHotspotEnablingActivity prior to SMR Sep-2023 Release 1 allows local attacker to change a Auto Hotspot setting.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'mobile.security@samsung.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:L/AC:L/PR:N/UI:N/S:U/C:N/I:L/A:N',
                  attackVector: 'LOCAL',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'NONE',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'NONE',
                  baseScore: 4.0,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 2.5,
                impactScore: 1.4,
              },
            ],
          },
          weaknesses: [
            {
              source: 'mobile.security@samsung.com',
              type: 'Secondary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-926',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://security.samsungmobile.com/securityUpdate.smsb?year=2023&month=09',
              source: 'mobile.security@samsung.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-30719',
          sourceIdentifier: 'mobile.security@samsung.com',
          published: '2023-09-06T04:15:14.860',
          lastModified: '2023-09-06T04:15:14.860',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                'Exposure of Sensitive Information vulnerability in InboundSmsHandler prior to SMR Sep-2023 Release 1 allows local attackers to access certain message data.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'mobile.security@samsung.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:L/AC:L/PR:N/UI:N/S:U/C:L/I:N/A:N',
                  attackVector: 'LOCAL',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'NONE',
                  availabilityImpact: 'NONE',
                  baseScore: 4.0,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 2.5,
                impactScore: 1.4,
              },
            ],
          },
          weaknesses: [
            {
              source: 'mobile.security@samsung.com',
              type: 'Secondary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-200',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://security.samsungmobile.com/securityUpdate.smsb?year=2023&month=09',
              source: 'mobile.security@samsung.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-30720',
          sourceIdentifier: 'mobile.security@samsung.com',
          published: '2023-09-06T04:15:15.067',
          lastModified: '2023-09-06T04:15:15.067',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                'PendingIntent hijacking in LmsAssemblyTrackerCTC prior to SMR Sep-2023 Release 1 allows local attacker to gain arbitrary file access.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'mobile.security@samsung.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:L/AC:H/PR:N/UI:R/S:U/C:H/I:N/A:N',
                  attackVector: 'LOCAL',
                  attackComplexity: 'HIGH',
                  privilegesRequired: 'NONE',
                  userInteraction: 'REQUIRED',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'NONE',
                  availabilityImpact: 'NONE',
                  baseScore: 4.7,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 1.0,
                impactScore: 3.6,
              },
            ],
          },
          weaknesses: [
            {
              source: 'mobile.security@samsung.com',
              type: 'Secondary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-284',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://security.samsungmobile.com/securityUpdate.smsb?year=2023&month=09',
              source: 'mobile.security@samsung.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-30721',
          sourceIdentifier: 'mobile.security@samsung.com',
          published: '2023-09-06T04:15:15.263',
          lastModified: '2023-09-06T04:15:15.263',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                'Insertion of sensitive information into log vulnerability in Locksettings prior to SMR Sep-2023 Release 1 allows a privileged local attacker to get lock screen match information from the log.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'mobile.security@samsung.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:L/AC:L/PR:H/UI:N/S:U/C:H/I:N/A:N',
                  attackVector: 'LOCAL',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'HIGH',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'NONE',
                  availabilityImpact: 'NONE',
                  baseScore: 4.4,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 0.8,
                impactScore: 3.6,
              },
            ],
          },
          weaknesses: [
            {
              source: 'mobile.security@samsung.com',
              type: 'Secondary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-532',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://security.samsungmobile.com/securityUpdate.smsb?year=2023&month=09',
              source: 'mobile.security@samsung.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-30722',
          sourceIdentifier: 'mobile.security@samsung.com',
          published: '2023-09-06T04:15:15.493',
          lastModified: '2023-09-06T04:15:15.493',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                'Protection Mechanism Failure in bc_tui trustlet from Samsung Blockchain Keystore prior to version 1.3.13.5 allows local attacker to execute arbitrary code.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'mobile.security@samsung.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:L/AC:L/PR:L/UI:N/S:U/C:N/I:H/A:N',
                  attackVector: 'LOCAL',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'LOW',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'NONE',
                  integrityImpact: 'HIGH',
                  availabilityImpact: 'NONE',
                  baseScore: 5.5,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 1.8,
                impactScore: 3.6,
              },
            ],
          },
          weaknesses: [
            {
              source: 'mobile.security@samsung.com',
              type: 'Secondary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-693',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://security.samsungmobile.com/serviceWeb.smsb?year=2023&month=09',
              source: 'mobile.security@samsung.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-30723',
          sourceIdentifier: 'mobile.security@samsung.com',
          published: '2023-09-06T04:15:15.703',
          lastModified: '2023-09-06T04:15:15.703',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                'Improper input validation vulnerability in Samsung Health prior to version 6.24.2.011 allows attackers to write arbitrary file with Samsung Health privilege.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'mobile.security@samsung.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:L/AC:L/PR:N/UI:R/S:U/C:H/I:N/A:N',
                  attackVector: 'LOCAL',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'REQUIRED',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'NONE',
                  availabilityImpact: 'NONE',
                  baseScore: 5.5,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 1.8,
                impactScore: 3.6,
              },
            ],
          },
          weaknesses: [
            {
              source: 'mobile.security@samsung.com',
              type: 'Secondary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-20',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://security.samsungmobile.com/serviceWeb.smsb?year=2023&month=09',
              source: 'mobile.security@samsung.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-30724',
          sourceIdentifier: 'mobile.security@samsung.com',
          published: '2023-09-06T04:15:15.987',
          lastModified: '2023-09-06T04:15:15.987',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                'Improper authentication in GallerySearchProvider of Gallery prior to version 14.5.01.2 allows attacker to access search history.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'mobile.security@samsung.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:L/AC:L/PR:N/UI:N/S:U/C:L/I:N/A:N',
                  attackVector: 'LOCAL',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'NONE',
                  availabilityImpact: 'NONE',
                  baseScore: 4.0,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 2.5,
                impactScore: 1.4,
              },
            ],
          },
          weaknesses: [
            {
              source: 'mobile.security@samsung.com',
              type: 'Secondary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-287',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://security.samsungmobile.com/serviceWeb.smsb?year=2023&month=09',
              source: 'mobile.security@samsung.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-30725',
          sourceIdentifier: 'mobile.security@samsung.com',
          published: '2023-09-06T04:15:16.277',
          lastModified: '2023-09-06T04:15:16.277',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                'Improper authentication in LocalProvier of Gallery prior to version 14.5.01.2 allows attacker to access the data in content provider.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'mobile.security@samsung.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:L/AC:L/PR:N/UI:N/S:U/C:L/I:L/A:N',
                  attackVector: 'LOCAL',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'NONE',
                  baseScore: 5.1,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 2.5,
                impactScore: 2.5,
              },
            ],
          },
          weaknesses: [
            {
              source: 'mobile.security@samsung.com',
              type: 'Secondary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-287',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://security.samsungmobile.com/serviceWeb.smsb?year=2023&month=09',
              source: 'mobile.security@samsung.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-30726',
          sourceIdentifier: 'mobile.security@samsung.com',
          published: '2023-09-06T04:15:16.470',
          lastModified: '2023-09-06T04:15:16.470',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                'PendingIntent hijacking vulnerability in GameLauncher prior to version 4.2.59.5 allows local attackers to access data.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'mobile.security@samsung.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:L/AC:H/PR:N/UI:R/S:U/C:H/I:N/A:N',
                  attackVector: 'LOCAL',
                  attackComplexity: 'HIGH',
                  privilegesRequired: 'NONE',
                  userInteraction: 'REQUIRED',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'NONE',
                  availabilityImpact: 'NONE',
                  baseScore: 4.7,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 1.0,
                impactScore: 3.6,
              },
            ],
          },
          weaknesses: [
            {
              source: 'mobile.security@samsung.com',
              type: 'Secondary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-284',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://security.samsungmobile.com/serviceWeb.smsb?year=2023&month=09',
              source: 'mobile.security@samsung.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-30728',
          sourceIdentifier: 'mobile.security@samsung.com',
          published: '2023-09-06T04:15:16.673',
          lastModified: '2023-09-06T04:15:16.673',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                'Intent redirection vulnerability in PackageInstallerCHN prior to version 13.1.03.00 allows local attacker to access arbitrary file. This vulnerability requires user interaction.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'mobile.security@samsung.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:L/AC:L/PR:N/UI:R/S:U/C:L/I:L/A:N',
                  attackVector: 'LOCAL',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'REQUIRED',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'NONE',
                  baseScore: 4.4,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 1.8,
                impactScore: 2.5,
              },
            ],
          },
          weaknesses: [
            {
              source: 'mobile.security@samsung.com',
              type: 'Secondary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-285',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://security.samsungmobile.com/serviceWeb.smsb?year=2023&month=09',
              source: 'mobile.security@samsung.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-30729',
          sourceIdentifier: 'mobile.security@samsung.com',
          published: '2023-09-06T04:15:16.890',
          lastModified: '2023-09-06T04:15:16.890',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                'Improper Certificate Validation in Samsung Email prior to version 6.1.82.0 allows remote attacker to intercept the network traffic including sensitive information.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'mobile.security@samsung.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:H/PR:N/UI:N/S:U/C:H/I:H/A:H',
                  attackVector: 'NETWORK',
                  attackComplexity: 'HIGH',
                  privilegesRequired: 'NONE',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'HIGH',
                  availabilityImpact: 'HIGH',
                  baseScore: 8.1,
                  baseSeverity: 'HIGH',
                },
                exploitabilityScore: 2.2,
                impactScore: 5.9,
              },
            ],
          },
          weaknesses: [
            {
              source: 'mobile.security@samsung.com',
              type: 'Secondary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-295',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://security.samsungmobile.com/serviceWeb.smsb?year=2023&month=09',
              source: 'mobile.security@samsung.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-30730',
          sourceIdentifier: 'mobile.security@samsung.com',
          published: '2023-09-06T04:15:17.130',
          lastModified: '2023-09-06T04:15:17.130',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                'Implicit intent hijacking vulnerability in Camera prior to versions 11.0.16.43 in Android 11, 12.1.00.30, 12.0.07.53, 12.1.03.10 in Android 12, and 13.0.01.43, 13.1.00.83 in Android 13 allows local attacker to access specific file.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'mobile.security@samsung.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:L/AC:L/PR:N/UI:R/S:U/C:L/I:N/A:N',
                  attackVector: 'LOCAL',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'REQUIRED',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'NONE',
                  availabilityImpact: 'NONE',
                  baseScore: 3.3,
                  baseSeverity: 'LOW',
                },
                exploitabilityScore: 1.8,
                impactScore: 1.4,
              },
            ],
          },
          weaknesses: [
            {
              source: 'mobile.security@samsung.com',
              type: 'Secondary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-285',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://security.samsungmobile.com/serviceWeb.smsb?year=2023&month=09',
              source: 'mobile.security@samsung.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-4773',
          sourceIdentifier: 'security@wordfence.com',
          published: '2023-09-06T04:15:17.377',
          lastModified: '2023-09-06T04:15:17.377',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                "The WordPress Social Login plugin for WordPress is vulnerable to Stored Cross-Site Scripting via the 'wordpress_social_login_meta' shortcode in versions up to, and including, 3.0.4 due to insufficient input sanitization and output escaping on user supplied attributes. This makes it possible for authenticated attackers with contributor-level and above permissions to inject arbitrary web scripts in pages that will execute whenever a user accesses an injected page.",
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'security@wordfence.com',
                type: 'Primary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:C/C:L/I:L/A:N',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'LOW',
                  userInteraction: 'NONE',
                  scope: 'CHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'NONE',
                  baseScore: 6.4,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 3.1,
                impactScore: 2.7,
              },
            ],
          },
          weaknesses: [
            {
              source: 'security@wordfence.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-79',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://plugins.trac.wordpress.org/browser/wordpress-social-login/tags/3.0.4/includes/widgets/wsl.auth.widgets.php#L413',
              source: 'security@wordfence.com',
            },
            {
              url: 'https://www.wordfence.com/threat-intel/vulnerabilities/id/b987822d-2b1b-4f79-988b-4bd731864b63?source=cve',
              source: 'security@wordfence.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-32162',
          sourceIdentifier: 'zdi-disclosures@trendmicro.com',
          published: '2023-09-06T05:15:42.243',
          lastModified: '2023-09-06T05:15:42.243',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                'Wacom Drivers for Windows Incorrect Permission Assignment Local Privilege Escalation Vulnerability. This vulnerability allows local attackers to escalate privileges on affected installations of Wacom Drivers for Windows. An attacker must first obtain the ability to execute low-privileged code on the target system in order to exploit this vulnerability.\n\nThe specific flaw exists within the handling of the WacomInstallI.txt file by the PrefUtil.exe utility. The issue results from incorrect permissions on the WacomInstallI.txt file. An attacker can leverage this vulnerability to escalate privileges and execute arbitrary code in the context of SYSTEM. Was ZDI-CAN-16318.',
            },
          ],
          metrics: {
            cvssMetricV30: [
              {
                source: 'zdi-disclosures@trendmicro.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.0',
                  vectorString: 'CVSS:3.0/AV:L/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:H',
                  attackVector: 'LOCAL',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'LOW',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'HIGH',
                  availabilityImpact: 'HIGH',
                  baseScore: 7.8,
                  baseSeverity: 'HIGH',
                },
                exploitabilityScore: 1.8,
                impactScore: 5.9,
              },
            ],
          },
          weaknesses: [
            {
              source: 'zdi-disclosures@trendmicro.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-732',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://www.zerodayinitiative.com/advisories/ZDI-23-741',
              source: 'zdi-disclosures@trendmicro.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-32163',
          sourceIdentifier: 'zdi-disclosures@trendmicro.com',
          published: '2023-09-06T05:15:42.347',
          lastModified: '2023-09-06T05:15:42.347',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                'Wacom Drivers for Windows Link Following Local Privilege Escalation Vulnerability. This vulnerability allows local attackers to escalate privileges on affected installations of Wacom Drivers for Windows. An attacker must first obtain the ability to execute low-privileged code on the target system in order to exploit this vulnerability.\n\nThe specific flaw exists within the Tablet Service. By creating a symbolic link, an attacker can abuse the service to create a file. An attacker can leverage this vulnerability to escalate privileges and execute arbitrary code in the context of SYSTEM. Was ZDI-CAN-16857.',
            },
          ],
          metrics: {
            cvssMetricV30: [
              {
                source: 'zdi-disclosures@trendmicro.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.0',
                  vectorString: 'CVSS:3.0/AV:L/AC:L/PR:L/UI:N/S:U/C:H/I:H/A:H',
                  attackVector: 'LOCAL',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'LOW',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'HIGH',
                  availabilityImpact: 'HIGH',
                  baseScore: 7.8,
                  baseSeverity: 'HIGH',
                },
                exploitabilityScore: 1.8,
                impactScore: 5.9,
              },
            ],
          },
          weaknesses: [
            {
              source: 'zdi-disclosures@trendmicro.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-59',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://www.zerodayinitiative.com/advisories/ZDI-23-742',
              source: 'zdi-disclosures@trendmicro.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-35719',
          sourceIdentifier: 'zdi-disclosures@trendmicro.com',
          published: '2023-09-06T05:15:42.437',
          lastModified: '2023-09-06T05:15:42.437',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                'ManageEngine ADSelfService Plus GINA Client Insufficient Verification of Data Authenticity Authentication Bypass Vulnerability. This vulnerability allows physically present attackers to execute arbitrary code on affected installations of ManageEngine ADSelfService Plus. Authentication is not required to exploit this vulnerability.\n\nThe specific flaw exists within the Password Reset Portal used by the GINA client. The issue results from the lack of proper authentication of data received via HTTP. An attacker can leverage this vulnerability to bypass authentication and execute code in the context of SYSTEM. Was ZDI-CAN-17009.',
            },
          ],
          metrics: {
            cvssMetricV30: [
              {
                source: 'zdi-disclosures@trendmicro.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.0',
                  vectorString: 'CVSS:3.0/AV:P/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H',
                  attackVector: 'PHYSICAL',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'HIGH',
                  availabilityImpact: 'HIGH',
                  baseScore: 6.8,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 0.9,
                impactScore: 5.9,
              },
            ],
          },
          weaknesses: [
            {
              source: 'zdi-disclosures@trendmicro.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-345',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://www.zerodayinitiative.com/advisories/ZDI-23-891',
              source: 'zdi-disclosures@trendmicro.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-3471',
          sourceIdentifier: 'product-security@gg.jp.panasonic.com',
          published: '2023-09-06T05:15:42.520',
          lastModified: '2023-09-06T05:15:42.520',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                'Buffer overflow vulnerability in Panasonic KW Watcher versions 1.00 through 2.82 may allow attackers to execute arbitrary code.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'product-security@gg.jp.panasonic.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:L/AC:L/PR:N/UI:R/S:C/C:H/I:H/A:H',
                  attackVector: 'LOCAL',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'REQUIRED',
                  scope: 'CHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'HIGH',
                  availabilityImpact: 'HIGH',
                  baseScore: 8.6,
                  baseSeverity: 'HIGH',
                },
                exploitabilityScore: 1.8,
                impactScore: 6.0,
              },
            ],
          },
          weaknesses: [
            {
              source: 'product-security@gg.jp.panasonic.com',
              type: 'Secondary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-119',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://www3.panasonic.biz/ac/e/fasys/software_info/eco/kwwatcher_versioninfo.jsp',
              source: 'product-security@gg.jp.panasonic.com',
            },
            {
              url: 'https://www3.panasonic.biz/ac/j/fasys/software_info/eco/tol_kwwatcher.jsp',
              source: 'product-security@gg.jp.panasonic.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-3472',
          sourceIdentifier: 'product-security@gg.jp.panasonic.com',
          published: '2023-09-06T05:15:42.613',
          lastModified: '2023-09-06T05:15:42.613',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                'Use after free vulnerability in Panasonic KW Watcher versions 1.00 through 2.82 may allow attackers to execute arbitrary code.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'product-security@gg.jp.panasonic.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:L/AC:L/PR:N/UI:R/S:C/C:H/I:H/A:H',
                  attackVector: 'LOCAL',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'REQUIRED',
                  scope: 'CHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'HIGH',
                  availabilityImpact: 'HIGH',
                  baseScore: 8.6,
                  baseSeverity: 'HIGH',
                },
                exploitabilityScore: 1.8,
                impactScore: 6.0,
              },
            ],
          },
          weaknesses: [
            {
              source: 'product-security@gg.jp.panasonic.com',
              type: 'Secondary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-416',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://www3.panasonic.biz/ac/e/fasys/software_info/eco/kwwatcher_versioninfo.jsp',
              source: 'product-security@gg.jp.panasonic.com',
            },
            {
              url: 'https://www3.panasonic.biz/ac/j/fasys/software_info/eco/tol_kwwatcher.jsp',
              source: 'product-security@gg.jp.panasonic.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-4779',
          sourceIdentifier: 'security@wordfence.com',
          published: '2023-09-06T07:15:09.690',
          lastModified: '2023-09-06T07:15:09.690',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                "The User Submitted Posts plugin for WordPress is vulnerable to Stored Cross-Site Scripting via the plugin's [usp_gallery] shortcode in versions up to, and including, 20230811 due to insufficient input sanitization and output escaping on user supplied attributes like 'before'. This makes it possible for authenticated attackers with contributor-level and above permissions to inject arbitrary web scripts in pages that will execute whenever a user accesses an injected page.",
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'security@wordfence.com',
                type: 'Primary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:L/UI:N/S:C/C:L/I:L/A:N',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'LOW',
                  userInteraction: 'NONE',
                  scope: 'CHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'NONE',
                  baseScore: 6.4,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 3.1,
                impactScore: 2.7,
              },
            ],
          },
          weaknesses: [
            {
              source: 'security@wordfence.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-79',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://plugins.trac.wordpress.org/changeset/2961841',
              source: 'security@wordfence.com',
            },
            {
              url: 'https://www.wordfence.com/threat-intel/vulnerabilities/id/d21ca709-183f-4dd1-849c-f1b2a4f7ec43?source=cve',
              source: 'security@wordfence.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-29441',
          sourceIdentifier: 'audit@patchstack.com',
          published: '2023-09-06T08:15:43.077',
          lastModified: '2023-09-06T08:15:43.077',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                'Unauth. Reflected Cross-Site Scripting (XSS) vulnerability in Robert Heller WebLibrarian plugin <= 3.5.8.1 versions.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'audit@patchstack.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:C/C:L/I:L/A:L',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'REQUIRED',
                  scope: 'CHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'LOW',
                  baseScore: 7.1,
                  baseSeverity: 'HIGH',
                },
                exploitabilityScore: 2.8,
                impactScore: 3.7,
              },
            ],
          },
          weaknesses: [
            {
              source: 'audit@patchstack.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-79',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://patchstack.com/database/vulnerability/weblibrarian/wordpress-weblibrarian-plugin-3-5-8-1-multiple-reflected-cross-site-scripting-xss-vulnerability?_s_id=cve',
              source: 'audit@patchstack.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-4705',
          sourceIdentifier: 'secalert@redhat.com',
          published: '2023-09-06T08:15:44.380',
          lastModified: '2023-09-06T08:15:44.380',
          vulnStatus: 'Rejected',
          descriptions: [
            {
              lang: 'en',
              value:
                '** REJECT ** CVE-2023-4705 was wrongly assigned to a bug that was deemed to be a non-security issue by the Linux kernel security team.',
            },
          ],
          metrics: {},
          references: [],
        },
      },
      {
        cve: {
          id: 'CVE-2023-30497',
          sourceIdentifier: 'audit@patchstack.com',
          published: '2023-09-06T09:15:07.707',
          lastModified: '2023-09-06T09:15:07.707',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                'Unauth. Reflected Cross-Site Scripting (XSS) vulnerability in Simon Chuang WP LINE Notify plugin <= 1.4.4 versions.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'audit@patchstack.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:C/C:L/I:L/A:L',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'REQUIRED',
                  scope: 'CHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'LOW',
                  baseScore: 7.1,
                  baseSeverity: 'HIGH',
                },
                exploitabilityScore: 2.8,
                impactScore: 3.7,
              },
            ],
          },
          weaknesses: [
            {
              source: 'audit@patchstack.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-79',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://patchstack.com/database/vulnerability/wp-line-notify/wordpress-wordpress-line-notify-plugin-1-4-2-cross-site-scripting-xss-vulnerability?_s_id=cve',
              source: 'audit@patchstack.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-40007',
          sourceIdentifier: 'audit@patchstack.com',
          published: '2023-09-06T09:15:08.137',
          lastModified: '2023-09-06T09:15:08.137',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                'Auth. (admin+) Stored Cross-Site Scripting (XSS) vulnerability in Ujwol Bastakoti CT Commerce plugin <= 2.0.1 versions.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'audit@patchstack.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:H/UI:R/S:C/C:L/I:L/A:L',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'HIGH',
                  userInteraction: 'REQUIRED',
                  scope: 'CHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'LOW',
                  baseScore: 5.9,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 1.7,
                impactScore: 3.7,
              },
            ],
          },
          weaknesses: [
            {
              source: 'audit@patchstack.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-79',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://patchstack.com/database/vulnerability/ct-commerce/wordpress-ct-commerce-plugin-2-0-1-cross-site-scripting-xss-vulnerability?_s_id=cve',
              source: 'audit@patchstack.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-40328',
          sourceIdentifier: 'audit@patchstack.com',
          published: '2023-09-06T09:15:08.243',
          lastModified: '2023-09-06T09:15:08.243',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                'Auth. (admin+) Stored Cross-Site Scripting (XSS) vulnerability in Carrrot plugin <= 1.1.0 versions.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'audit@patchstack.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:H/UI:R/S:C/C:L/I:L/A:L',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'HIGH',
                  userInteraction: 'REQUIRED',
                  scope: 'CHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'LOW',
                  baseScore: 5.9,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 1.7,
                impactScore: 3.7,
              },
            ],
          },
          weaknesses: [
            {
              source: 'audit@patchstack.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-79',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://patchstack.com/database/vulnerability/carrrot/wordpress-carrot-plugin-1-1-0-cross-site-scripting-xss-vulnerability?_s_id=cve',
              source: 'audit@patchstack.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-40329',
          sourceIdentifier: 'audit@patchstack.com',
          published: '2023-09-06T09:15:08.330',
          lastModified: '2023-09-06T09:15:08.330',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                'Auth. (admin+) Stored Cross-Site Scripting (XSS) vulnerability in WPZest Custom Admin Login Page | WPZest plugin <= 1.2.0 versions.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'audit@patchstack.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:H/UI:R/S:C/C:L/I:L/A:L',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'HIGH',
                  userInteraction: 'REQUIRED',
                  scope: 'CHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'LOW',
                  baseScore: 5.9,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 1.7,
                impactScore: 3.7,
              },
            ],
          },
          weaknesses: [
            {
              source: 'audit@patchstack.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-79',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://patchstack.com/database/vulnerability/custom-admin-login-styler-wpzest/wordpress-custom-admin-login-page-wpzest-plugin-1-2-0-cross-site-scripting-xss-vulnerability?_s_id=cve',
              source: 'audit@patchstack.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-40552',
          sourceIdentifier: 'audit@patchstack.com',
          published: '2023-09-06T09:15:08.413',
          lastModified: '2023-09-06T09:15:08.413',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                'Auth. (admin+) Stored Cross-Site Scripting (XSS) vulnerability in Gurcharan Singh Fitness calculators plugin plugin <= 2.0.7 versions.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'audit@patchstack.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:H/UI:R/S:C/C:L/I:L/A:L',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'HIGH',
                  userInteraction: 'REQUIRED',
                  scope: 'CHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'LOW',
                  baseScore: 5.9,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 1.7,
                impactScore: 3.7,
              },
            ],
          },
          weaknesses: [
            {
              source: 'audit@patchstack.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-79',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://patchstack.com/database/vulnerability/fitness-calculators/wordpress-fitness-calculators-plugin-plugin-2-0-7-cross-site-scripting-xss?_s_id=cve',
              source: 'audit@patchstack.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-40553',
          sourceIdentifier: 'audit@patchstack.com',
          published: '2023-09-06T09:15:08.507',
          lastModified: '2023-09-06T09:15:08.507',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                'Unauth. Reflected Cross-Site Scripting (XSS) vulnerability in Plausible.Io Plausible Analytics plugin <= 1.3.3 versions.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'audit@patchstack.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:H/PR:N/UI:R/S:C/C:L/I:L/A:L',
                  attackVector: 'NETWORK',
                  attackComplexity: 'HIGH',
                  privilegesRequired: 'NONE',
                  userInteraction: 'REQUIRED',
                  scope: 'CHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'LOW',
                  baseScore: 5.8,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 1.6,
                impactScore: 3.7,
              },
            ],
          },
          weaknesses: [
            {
              source: 'audit@patchstack.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-79',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://patchstack.com/database/vulnerability/plausible-analytics/wordpress-plausible-analytics-plugin-1-3-3-reflected-cross-site-scripting-xss-vulnerability?_s_id=cve',
              source: 'audit@patchstack.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-40554',
          sourceIdentifier: 'audit@patchstack.com',
          published: '2023-09-06T09:15:08.587',
          lastModified: '2023-09-06T09:15:08.587',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                'Unauth. Reflected Cross-Site Scripting (XSS) vulnerability in Blog2Social, Adenion Blog2Social: Social Media Auto Post & Scheduler plugin <= 7.2.0 versions.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'audit@patchstack.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:C/C:L/I:L/A:L',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'REQUIRED',
                  scope: 'CHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'LOW',
                  baseScore: 7.1,
                  baseSeverity: 'HIGH',
                },
                exploitabilityScore: 2.8,
                impactScore: 3.7,
              },
            ],
          },
          weaknesses: [
            {
              source: 'audit@patchstack.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-79',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://patchstack.com/database/vulnerability/blog2social/wordpress-blog2social-plugin-7-2-0-reflected-cross-site-scripting-xss-vulnerability?_s_id=cve',
              source: 'audit@patchstack.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-40560',
          sourceIdentifier: 'audit@patchstack.com',
          published: '2023-09-06T09:15:08.670',
          lastModified: '2023-09-06T09:15:08.670',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                'Auth. (admin+) Stored Cross-Site Scripting (XSS) vulnerability in Greg Ross Schedule Posts Calendar plugin <= 5.2 versions.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'audit@patchstack.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:H/UI:R/S:C/C:L/I:L/A:L',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'HIGH',
                  userInteraction: 'REQUIRED',
                  scope: 'CHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'LOW',
                  baseScore: 5.9,
                  baseSeverity: 'MEDIUM',
                },
                exploitabilityScore: 1.7,
                impactScore: 3.7,
              },
            ],
          },
          weaknesses: [
            {
              source: 'audit@patchstack.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-79',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://patchstack.com/database/vulnerability/schedule-posts-calendar/wordpress-schedule-posts-calendar-plugin-5-2-cross-site-scripting-xss?_s_id=cve',
              source: 'audit@patchstack.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-40601',
          sourceIdentifier: 'audit@patchstack.com',
          published: '2023-09-06T09:15:08.753',
          lastModified: '2023-09-06T09:15:08.753',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                'Unauth. Reflected Cross-Site Scripting (XSS) vulnerability in Estatik Estatik Mortgage Calculator plugin <= 2.0.7 versions.',
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'audit@patchstack.com',
                type: 'Secondary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:C/C:L/I:L/A:L',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'REQUIRED',
                  scope: 'CHANGED',
                  confidentialityImpact: 'LOW',
                  integrityImpact: 'LOW',
                  availabilityImpact: 'LOW',
                  baseScore: 7.1,
                  baseSeverity: 'HIGH',
                },
                exploitabilityScore: 2.8,
                impactScore: 3.7,
              },
            ],
          },
          weaknesses: [
            {
              source: 'audit@patchstack.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-79',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://patchstack.com/database/vulnerability/estatik-mortgage-calculator/wordpress-mortgage-calculator-estatik-plugin-2-0-7-cross-site-scripting-xss-vulnerability?_s_id=cve',
              source: 'audit@patchstack.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-4634',
          sourceIdentifier: 'security@wordfence.com',
          published: '2023-09-06T09:15:08.873',
          lastModified: '2023-09-06T09:15:08.873',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                "The Media Library Assistant plugin for WordPress is vulnerable to Local File Inclusion and Remote Code Execution in versions up to, and including, 3.09. This is due to insufficient controls on file paths being supplied to the 'mla_stream_file' parameter from the ~/includes/mla-stream-image.php file, where images are processed via Imagick(). This makes it possible for unauthenticated attackers to supply files via FTP that will make directory lists, local file inclusion, and remote code execution possible.",
            },
          ],
          metrics: {
            cvssMetricV31: [
              {
                source: 'security@wordfence.com',
                type: 'Primary',
                cvssData: {
                  version: '3.1',
                  vectorString: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H',
                  attackVector: 'NETWORK',
                  attackComplexity: 'LOW',
                  privilegesRequired: 'NONE',
                  userInteraction: 'NONE',
                  scope: 'UNCHANGED',
                  confidentialityImpact: 'HIGH',
                  integrityImpact: 'HIGH',
                  availabilityImpact: 'HIGH',
                  baseScore: 9.8,
                  baseSeverity: 'CRITICAL',
                },
                exploitabilityScore: 3.9,
                impactScore: 5.9,
              },
            ],
          },
          weaknesses: [
            {
              source: 'security@wordfence.com',
              type: 'Primary',
              description: [
                {
                  lang: 'en',
                  value: 'CWE-73',
                },
              ],
            },
          ],
          references: [
            {
              url: 'https://github.com/Patrowl/CVE-2023-4634/',
              source: 'security@wordfence.com',
            },
            {
              url: 'https://packetstormsecurity.com/files/174508/wpmla309-lfiexec.tgz',
              source: 'security@wordfence.com',
            },
            {
              url: 'https://patrowl.io/blog-wordpress-media-library-rce-cve-2023-4634/',
              source: 'security@wordfence.com',
            },
            {
              url: 'https://plugins.trac.wordpress.org/changeset?sfp_email=&sfph_mail=&reponame=&old=2955933%40media-library-assistant&new=2955933%40media-library-assistant&sfp_email=&sfph_mail=#file4',
              source: 'security@wordfence.com',
            },
            {
              url: 'https://www.wordfence.com/threat-intel/vulnerabilities/id/05c68377-feb6-442d-a3a0-1fbc246c7cbf?source=cve',
              source: 'security@wordfence.com',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-31188',
          sourceIdentifier: 'vultures@jpcert.or.jp',
          published: '2023-09-06T10:15:13.183',
          lastModified: '2023-09-06T10:15:13.183',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                "Multiple TP-LINK products allow a network-adjacent authenticated attacker to execute arbitrary OS commands. Affected products/versions are as follows: Archer C50 firmware versions prior to 'Archer C50(JP)_V3_230505', Archer C55 firmware versions prior to 'Archer C55(JP)_V1_230506', and Archer C20 firmware versions prior to 'Archer C20(JP)_V1_230616'.",
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://jvn.jp/en/vu/JVNVU99392903/',
              source: 'vultures@jpcert.or.jp',
            },
            {
              url: 'https://www.tp-link.com/jp/support/download/archer-c20/v1/#Firmware',
              source: 'vultures@jpcert.or.jp',
            },
            {
              url: 'https://www.tp-link.com/jp/support/download/archer-c50/v3/#Firmware',
              source: 'vultures@jpcert.or.jp',
            },
            {
              url: 'https://www.tp-link.com/jp/support/download/archer-c55/#Firmware',
              source: 'vultures@jpcert.or.jp',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-32619',
          sourceIdentifier: 'vultures@jpcert.or.jp',
          published: '2023-09-06T10:15:13.650',
          lastModified: '2023-09-06T10:15:13.650',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                "Archer C50 firmware versions prior to 'Archer C50(JP)_V3_230505' and Archer C55 firmware versions prior to 'Archer C55(JP)_V1_230506' use hard-coded credentials to login to the affected device, which may allow a network-adjacent unauthenticated attacker to execute an arbitrary OS command.",
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://jvn.jp/en/vu/JVNVU99392903/',
              source: 'vultures@jpcert.or.jp',
            },
            {
              url: 'https://www.tp-link.com/jp/support/download/archer-c50/v3/#Firmware',
              source: 'vultures@jpcert.or.jp',
            },
            {
              url: 'https://www.tp-link.com/jp/support/download/archer-c55/#Firmware',
              source: 'vultures@jpcert.or.jp',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-36489',
          sourceIdentifier: 'vultures@jpcert.or.jp',
          published: '2023-09-06T10:15:13.710',
          lastModified: '2023-09-06T10:15:13.710',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                "Multiple TP-LINK products allow a network-adjacent unauthenticated attacker to execute arbitrary OS commands. Affected products/versions are as follows: TL-WR802N firmware versions prior to 'TL-WR802N(JP)_V4_221008', TL-WR841N firmware versions prior to 'TL-WR841N(JP)_V14_230506', and TL-WR902AC firmware versions prior to 'TL-WR902AC(JP)_V3_230506'.",
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://jvn.jp/en/vu/JVNVU99392903/',
              source: 'vultures@jpcert.or.jp',
            },
            {
              url: 'https://www.tp-link.com/jp/support/download/tl-wr802n/#Firmware',
              source: 'vultures@jpcert.or.jp',
            },
            {
              url: 'https://www.tp-link.com/jp/support/download/tl-wr841n/v14/#Firmware',
              source: 'vultures@jpcert.or.jp',
            },
            {
              url: 'https://www.tp-link.com/jp/support/download/tl-wr902ac/#Firmware',
              source: 'vultures@jpcert.or.jp',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-37284',
          sourceIdentifier: 'vultures@jpcert.or.jp',
          published: '2023-09-06T10:15:13.770',
          lastModified: '2023-09-06T10:15:13.770',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                "Improper authentication vulnerability in Archer C20 firmware versions prior to 'Archer C20(JP)_V1_230616' allows a network-adjacent unauthenticated attacker to execute an arbitrary OS command via a crafted request to bypass authentication.",
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://jvn.jp/en/vu/JVNVU99392903/',
              source: 'vultures@jpcert.or.jp',
            },
            {
              url: 'https://www.tp-link.com/jp/support/download/archer-c20/v1/#Firmware',
              source: 'vultures@jpcert.or.jp',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-38563',
          sourceIdentifier: 'vultures@jpcert.or.jp',
          published: '2023-09-06T10:15:14.030',
          lastModified: '2023-09-06T10:15:14.030',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                "Archer C1200 firmware versions prior to 'Archer C1200(JP)_V2_230508' and Archer C9 firmware versions prior to 'Archer C9(JP)_V3_230508' allow a network-adjacent unauthenticated attacker to execute arbitrary OS commands.",
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://jvn.jp/en/vu/JVNVU99392903/',
              source: 'vultures@jpcert.or.jp',
            },
            {
              url: 'https://www.tp-link.com/jp/support/download/archer-c1200/#Firmware',
              source: 'vultures@jpcert.or.jp',
            },
            {
              url: 'https://www.tp-link.com/jp/support/download/archer-c9/v3/#Firmware',
              source: 'vultures@jpcert.or.jp',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-38568',
          sourceIdentifier: 'vultures@jpcert.or.jp',
          published: '2023-09-06T10:15:14.273',
          lastModified: '2023-09-06T10:15:14.273',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                "Archer A10 firmware versions prior to 'Archer A10(JP)_V2_230504' allows a network-adjacent unauthenticated attacker to execute arbitrary OS commands.",
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://jvn.jp/en/vu/JVNVU99392903/',
              source: 'vultures@jpcert.or.jp',
            },
            {
              url: 'https://www.tp-link.com/jp/support/download/archer-a10/#Firmware',
              source: 'vultures@jpcert.or.jp',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-38588',
          sourceIdentifier: 'vultures@jpcert.or.jp',
          published: '2023-09-06T10:15:14.490',
          lastModified: '2023-09-06T10:15:14.490',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                "Archer C3150 firmware versions prior to 'Archer C3150(JP)_V2_230511' allows a network-adjacent authenticated attacker to execute arbitrary OS commands.",
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://jvn.jp/en/vu/JVNVU99392903/',
              source: 'vultures@jpcert.or.jp',
            },
            {
              url: 'https://www.tp-link.com/jp/support/download/archer-c3150/#Firmware',
              source: 'vultures@jpcert.or.jp',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-39224',
          sourceIdentifier: 'vultures@jpcert.or.jp',
          published: '2023-09-06T10:15:14.587',
          lastModified: '2023-09-06T10:15:14.587',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                "Archer C5 firmware all versions and Archer C7 firmware versions prior to 'Archer C7(JP)_V2_230602' allow a network-adjacent authenticated attacker to execute arbitrary OS commands. Note that Archer C5 is no longer supported, therefore the update for this product is not provided.",
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://jvn.jp/en/vu/JVNVU99392903/',
              source: 'vultures@jpcert.or.jp',
            },
            {
              url: 'https://www.tp-link.com/jp/support/download/archer-c7/v2/#Firmware',
              source: 'vultures@jpcert.or.jp',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-39935',
          sourceIdentifier: 'vultures@jpcert.or.jp',
          published: '2023-09-06T10:15:14.643',
          lastModified: '2023-09-06T10:15:14.643',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                "Archer C5400 firmware versions prior to 'Archer C5400(JP)_V2_230506' allows a network-adjacent authenticated attacker to execute arbitrary OS commands.",
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://jvn.jp/en/vu/JVNVU99392903/',
              source: 'vultures@jpcert.or.jp',
            },
            {
              url: 'https://www.tp-link.com/jp/support/download/archer-c5400/#Firmware',
              source: 'vultures@jpcert.or.jp',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-40193',
          sourceIdentifier: 'vultures@jpcert.or.jp',
          published: '2023-09-06T10:15:14.697',
          lastModified: '2023-09-06T10:15:14.697',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                "Deco M4 firmware versions prior to 'Deco M4(JP)_V2_1.5.8 Build 20230619' allows a network-adjacent authenticated attacker to execute arbitrary OS commands.",
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://jvn.jp/en/vu/JVNVU99392903/',
              source: 'vultures@jpcert.or.jp',
            },
            {
              url: 'https://www.tp-link.com/jp/support/download/deco-m4/v2/#Firmware',
              source: 'vultures@jpcert.or.jp',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-40357',
          sourceIdentifier: 'vultures@jpcert.or.jp',
          published: '2023-09-06T10:15:14.820',
          lastModified: '2023-09-06T10:15:14.820',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                "Multiple TP-LINK products allow a network-adjacent authenticated attacker to execute arbitrary OS commands. Affected products/versions are as follows: Archer AX50 firmware versions prior to 'Archer AX50(JP)_V1_230529', Archer A10 firmware versions prior to 'Archer A10(JP)_V2_230504', Archer AX10 firmware versions prior to 'Archer AX10(JP)_V1.2_230508', and Archer AX11000 firmware versions prior to 'Archer AX11000(JP)_V1_230523'.",
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://jvn.jp/en/vu/JVNVU99392903/',
              source: 'vultures@jpcert.or.jp',
            },
            {
              url: 'https://www.tp-link.com/jp/support/download/archer-a10/#Firmware',
              source: 'vultures@jpcert.or.jp',
            },
            {
              url: 'https://www.tp-link.com/jp/support/download/archer-ax10/#Firmware',
              source: 'vultures@jpcert.or.jp',
            },
            {
              url: 'https://www.tp-link.com/jp/support/download/archer-ax11000/#Firmware',
              source: 'vultures@jpcert.or.jp',
            },
            {
              url: 'https://www.tp-link.com/jp/support/download/archer-ax50/#Firmware',
              source: 'vultures@jpcert.or.jp',
            },
          ],
        },
      },
      {
        cve: {
          id: 'CVE-2023-40531',
          sourceIdentifier: 'vultures@jpcert.or.jp',
          published: '2023-09-06T10:15:15.097',
          lastModified: '2023-09-06T10:15:15.097',
          vulnStatus: 'Received',
          descriptions: [
            {
              lang: 'en',
              value:
                "Archer AX6000 firmware versions prior to 'Archer AX6000(JP)_V1_1.3.0 Build 20221208' allows a network-adjacent authenticated attacker to execute arbitrary OS commands.",
            },
          ],
          metrics: {},
          references: [
            {
              url: 'https://jvn.jp/en/vu/JVNVU99392903/',
              source: 'vultures@jpcert.or.jp',
            },
            {
              url: 'https://www.tp-link.com/jp/support/download/archer-ax6000/v1/#Firmware',
              source: 'vultures@jpcert.or.jp',
            },
          ],
        },
      },
    ]);
  }
}
