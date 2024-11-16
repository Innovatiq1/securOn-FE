import { createFeatureSelector, createSelector } from '@ngrx/store';
import { VulnerablitiesState } from "./models/vulnerabilities.model";

const selectVulnerabilitiesState = createFeatureSelector<VulnerablitiesState>("vulnerabilities");

export const getAllVulnerabilities = createSelector(selectVulnerabilitiesState,
     (vulnerabilitiesState: VulnerablitiesState) => vulnerabilitiesState.totalVulnerabilities);

export const getCriticalVulnerabilities = createSelector(selectVulnerabilitiesState,
        (vulnerabilitiesState: VulnerablitiesState) => vulnerabilitiesState.criticalVulnerabilities);
        
export const getHighVulnerabilities = createSelector(selectVulnerabilitiesState,
     (vulnerabilitiesState: VulnerablitiesState) => vulnerabilitiesState.highVulnerabilities);
     
export const getLowVulnerabilities = createSelector(selectVulnerabilitiesState,
     (vulnerabilitiesState: VulnerablitiesState) => vulnerabilitiesState.lowVulnerabilities);
     
export const getMediumVulnerabilities = createSelector(selectVulnerabilitiesState,
     (vulnerabilitiesState: VulnerablitiesState) => vulnerabilitiesState.mediumVulnerabilities);

export const getCurrentVulnerabilty = createSelector(selectVulnerabilitiesState,
     (vulnerabilitiesState: VulnerablitiesState) => vulnerabilitiesState.currentVulnearabilty);

export const getDataLoading = createSelector(selectVulnerabilitiesState,
     (vulnerabilitiesState: VulnerablitiesState) => vulnerabilitiesState.dataLoading);

export const getSelectedAssetId = createSelector(selectVulnerabilitiesState,
     (vulnerabilitiesState: VulnerablitiesState) => vulnerabilitiesState.selctedAsset);

export const getAllAssets = createSelector(selectVulnerabilitiesState,
      (vulnerabilitiesState: VulnerablitiesState) => vulnerabilitiesState.allAssets);

export const getCurrentCveData = createSelector(selectVulnerabilitiesState,
      (vulnerabilitiesState: VulnerablitiesState) => vulnerabilitiesState.cveData);

export const getCurrentSeverity = createSelector(selectVulnerabilitiesState,
     (vulnerabilitiesState: VulnerablitiesState) => vulnerabilitiesState.currentSeverity);
     
export const getAssetUploadMessage = createSelector(selectVulnerabilitiesState,
     (vulnerabilitiesState: VulnerablitiesState) => vulnerabilitiesState.assetsUploadMessage);

export const getSelectedDateRange = createSelector(selectVulnerabilitiesState,
     (vulnerabilitiesState: VulnerablitiesState) => vulnerabilitiesState.selectedDateRange || [] );

     export const selectUpdateAssetSuccess = createSelector(
          selectVulnerabilitiesState,
          (state: any) => state.updateSuccess // Adjust according to how you manage the state
        );
        export const selectUpdateAssetFailure = createSelector(
          selectVulnerabilitiesState,
          (state: any) => state.updateFailure // Adjust according to how you manage the state
        );
  