import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, mergeMap, switchMap, tap } from 'rxjs/operators';
import { Observable, of } from "rxjs";
import { Action } from "@ngrx/store";
import { HttpClient } from '@angular/common/http';
import { VulnerabilitiesService } from '../services/api/vulnerabilities.service';
import { NavigationEnd, Router } from '@angular/router';


import { 
    LOAD_ALL_VULNERABILITIES,
    setCriticalVulnerabilities,
    setVulnerabilities,
    setHighVulnerabilities,
    setMediumVulnerabilities,
    setLowVulnerabilities,
    setLoading,
    UPLOAD_ASSETS_FILE,
    LOAD_ALL_ASSETS,
    setAllAssets,
    DELETE_ASSETS,
    deleteAssets,
    loadAllAssets,
    UPDATE_ASSET,
    GET_CVE_DETAILS,
    setCveDetails,
    LOAD_ASSET_VULNERABILITIES,
    setAssetsLoadMessage,
    updateAssetSuccess,
    updateAssetFailure
} from "./vulnerabilities.actions";
import { environment } from 'src/environment/environment';
import { UserService } from '../services/auth/user.service';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class VulnerablitiesEffects {

    constructor(
        private readonly actions$: Actions,
        private readonly vulnerabilitiesService: VulnerabilitiesService,
        private readonly httpClient: HttpClient,
        private readonly userService: UserService,
    private router: Router,private toastr: ToastrService,
        
        ) {
    }

    private readonly BASE_URL = environment.baseUrl;


    loadVulnerabilities$: Observable<Action> = createEffect(() => {
        return this.actions$.pipe(
          ofType(LOAD_ALL_VULNERABILITIES),
          map((action: { payload: any }) => action.payload),
          concatMap((request: any) =>
            this.httpClient.post<any>(
                `${this.BASE_URL+"/getCveDataBySeviarity"}`,
              request,
              this.userService.getRequestHeaders()
            ).pipe(
              switchMap((response: any) => {
                const result = this.processVulnerabilities(response);
                const actions = [
                  setVulnerabilities({ vulnerabilities: result?.total }),
                  setCriticalVulnerabilities({ vulnerabilities: result?.critical }),
                  setHighVulnerabilities({ vulnerabilities: result?.high }),
                  setMediumVulnerabilities({ vulnerabilities: result?.medium }),
                  setLowVulnerabilities({ vulnerabilities: result?.low }),
                  setLoading({ isLoading: false }),
                ];
                return of(...actions);
              }),
              tap(() => {
                this.vulnerabilitiesService.setCurrentRouteName('vulnerabilties');
                this.router.navigate(['vulnerabilties']);
                this.vulnerabilitiesService.setDataLoading(false); 
              })
            )
          )
        );
      });
      
    uploadAssetsFile$: Observable<Action> = createEffect(() => {
        return this.actions$.pipe(
            
            ofType(UPLOAD_ASSETS_FILE),
            map((payload: any) => {
                return payload.data;
            }),
            concatMap((data) => this.httpClient.post(`${this.BASE_URL+"/uploadAssets"}`, data, this.userService.getRequestHeaders()).pipe(
                switchMap((response: any) => {                    
                    this.vulnerabilitiesService.loadAllAssets();
                    return [
                        setLoading({isLoading:true})
                        // setAssetsLoadMessage({message: response.message})
                    ]
                })
            ))
        )
    });

    loadAllAssets$: Observable<Action> = createEffect(() => {
        return this.actions$.pipe(
            ofType(LOAD_ALL_ASSETS),
            concatMap(() => this.httpClient.get(`${this.BASE_URL+"/getAssets"}`, this.userService.getRequestHeaders()).pipe(
                switchMap((response: any) => {
                    return [setAllAssets({assets: response}),
                        setLoading({isLoading:false})]
                })
            ))
        )
    });

    deleteAssets$: Observable<Action> = createEffect(() => {
        return this.actions$.pipe(
            ofType(DELETE_ASSETS),
            map((payload: any) => {
                return payload;
            }),
            concatMap((assets) => this.httpClient.post(`${this.BASE_URL+"/deleteAssets"}`, assets, this.userService.getRequestHeaders()).pipe(
                switchMap((response: any) => {
                    this.vulnerabilitiesService.loadAllAssets();
                    return [ setLoading({isLoading: true})]
                })
            ))
        )
    });

    // updateAsset$: Observable<Action> = createEffect(() => {
    //     return this.actions$.pipe(
    //         ofType(UPDATE_ASSET),
    //         map((payload: any) => payload.asset),
    //         concatMap((asset) => this.httpClient.post(`${this.BASE_URL+"/updateAsset"}`, asset, this.userService.getRequestHeaders()).pipe(
    //             switchMap((response: any) => {
    //                 this.vulnerabilitiesService.loadAllAssets();
    //                 return [ setLoading({isLoading: true})]
    //             })
    //         ))
    //     )
    // });
    updateAsset$ = createEffect((): Observable<Action> => {
        return this.actions$.pipe(
          ofType(UPDATE_ASSET),
          map((payload: any) => payload.asset),
          concatMap((asset) => 
            this.httpClient.post(`${this.BASE_URL + "/updateAsset"}`, asset, this.userService.getRequestHeaders()).pipe(
              switchMap((response: any): Action[] => {
                this.vulnerabilitiesService.loadAllAssets();
                return [
                  setLoading({ isLoading: true }),
                  updateAssetSuccess({ asset: response })  // Dispatch success action
                ];
              }),
              catchError((error): Observable<Action> => 
                of(
                  setLoading({ isLoading: false }),
                  updateAssetFailure({ error })  // Dispatch failure action
                )
              )
            )
          )
        );
      });
      
      updateAssetSuccess$ = createEffect(() =>
        this.actions$.pipe(
          ofType(updateAssetSuccess),
          tap(() => {
            this.toastr.success('Asset updated successfully', 'Success', {
              timeOut: 3000,
              positionClass: 'toast-bottom-right',
            });
          })
        ),
        { dispatch: false }
      );
    
      updateAssetFailure$ = createEffect(() =>
        this.actions$.pipe(
          ofType(updateAssetFailure),
          tap(() => {
            this.toastr.error('Failed to update asset', 'Error', {
              timeOut: 3000,
              positionClass: 'toast-bottom-right',
            });
          })
        ),
        { dispatch: false }
      );
    



    getCveDetails$: Observable<Action> = createEffect(() => {
        return this.actions$.pipe(
            ofType(GET_CVE_DETAILS),
            map((payload: any) => payload.cveId),
            concatMap((cveId) => this.httpClient.get(`${this.BASE_URL+"/getOemData/"+cveId}`, this.userService.getRequestHeaders()).pipe(
                switchMap((response: any) => {
                    return [  setCveDetails({cveData: response}) ]
                })
            ))
        )
    });

    loadAssetVulnerabilities$: Observable<Action> = createEffect(() => {
        return this.actions$.pipe(
            ofType(LOAD_ASSET_VULNERABILITIES),
            map((payload: any) => {
                return payload.asset;
            }),
            concatMap((data) => this.httpClient.post(`${this.BASE_URL+"/fetchcves"}`, data, this.userService.getRequestHeaders()).pipe(
                switchMap((response: any) => {
                    const result = this.processVulnerabilities(response);
                    return [
                        setCriticalVulnerabilities( {vulnerabilities: result.total}),
                        setLoading({isLoading:true})
                    ]
                })
            ))
        )
    });

    private processVulnerabilities(totalVulnerabilities: any[]): any {
        const valnerabilities: any[] = [];
        const criticalVulnerabilities: any[] = [];
        const highVulnerabilities: any[] = [];
        const mediumVulnerabilities: any[] = [];
        const lowVulnerabilities: any[] = [];

        totalVulnerabilities.forEach((cveData) => {
          const metrcis = cveData.cveDetails?.cve?.metrics ?? {};
          //  const metrcis = cveData.cve?.metrics  ??{};
           let cveDataCopy = { ...cveData.cveDetails };
            if (Object.keys(metrcis)?.length > 0) {
        
            //  let cveDataCopy = { ...cveData };
                const filteredMetrics: any[] = [];
                Object.keys(metrcis).forEach((key) => {
                    const sortedMetrics = metrcis[key].sort((a: any, b: any) => (a.cvssData.baseScore < b.cvssData.baseScore) ? 1 : a.cvssData.baseScore > b.cvssData.baseScore ? -1 : 0);
                    filteredMetrics.push(sortedMetrics[0])
                })

                const priorityMetric = filteredMetrics.sort((a: any, b: any) => (a.cvssData.baseScore < b.cvssData.baseScore) ? 1 : a.cvssData.baseScore > b.cvssData.baseScore ? -1 : 0)[0];
                cveDataCopy = {
                    ...cveDataCopy,
                    metrics: {
                        [Object.keys(metrcis)[0]]: [{ ...priorityMetric }]
                    }
                }
                const severity = priorityMetric.cvssData.baseSeverity ?? priorityMetric.baseSeverity
                if (severity === 'CRITICAL') {
                    criticalVulnerabilities.push(cveDataCopy);
                }
                if (severity === 'HIGH') {
                    highVulnerabilities.push(cveDataCopy);
                }
                if (severity === 'MEDIUM') {
                    mediumVulnerabilities.push(cveDataCopy);
                }
                if (severity === 'LOW') {
                    lowVulnerabilities.push(cveDataCopy);
                }
            } 
            
            valnerabilities.push(cveDataCopy);

        });

        return { total: valnerabilities, critical: criticalVulnerabilities, high: highVulnerabilities, medium: mediumVulnerabilities, low: lowVulnerabilities };
    }


}
