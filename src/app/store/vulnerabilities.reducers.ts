import { createReducer, on, Action } from '@ngrx/store';

import { VulnerablitiesState } from "./models/vulnerabilities.model";
import { 
    setVulnerabilities,
    setCriticalVulnerabilities,
    setHighVulnerabilities,
    setMediumVulnerabilities,
    setLowVulnerabilities,
    setCurrentVulnerability,
    setLoading,
    setSelectedAssetId,
    setAllAssets,
    setCveDetails,
    setCurrentSeverity,
    setAssetsLoadMessage,
    setSelectedDateRange
} from "./vulnerabilities.actions";

export const initialVulnerablitiesState: VulnerablitiesState = {
    totalVulnerabilities: [],
    criticalVulnerabilities: [],
    highVulnerabilities: [],
    mediumVulnerabilities: [],
    lowVulnerabilities: [],
    currentVulnearabilty: {},
    dataLoading: false,
    selctedAsset: "",
    allAssets: [],
    cveData: [],
    currentSeverity: "",
    assetsUploadMessage:"",
    selectedDateRange: null,
};

const reducer = createReducer<VulnerablitiesState>(
    initialVulnerablitiesState,
    on(setVulnerabilities, (state, action) => ({
        ...state,
        totalVulnerabilities: action.vulnerabilities
    })),
    on(setCriticalVulnerabilities, (state, action) =>({
        ...state,
        criticalVulnerabilities: action.vulnerabilities
    })),
    on(setHighVulnerabilities, (state, action) =>({
        ...state,
        highVulnerabilities: action.vulnerabilities
    })),
    on(setMediumVulnerabilities, (state, action) =>({
        ...state,
        mediumVulnerabilities: action.vulnerabilities
    })),
    on(setLowVulnerabilities, (state, action) =>({
        ...state,
        lowVulnerabilities: action.vulnerabilities
    })),
    on(setCurrentVulnerability, (state, action) =>({
        ...state,
        currentVulnearabilty: action.vulnerability
    })),
    on(setLoading, (state, action) =>({
        ...state,
        dataLoading: action.isLoading
    })),
    on(setSelectedAssetId, (state, action) =>({
        ...state,
        selctedAsset: action.assetId
    })),
    on(setAllAssets, (state, action) =>({
        ...state,
        allAssets: action.assets
    })),
    on(setCveDetails, (state, action) =>({
        ...state,
        cveData: action.cveData
    })),
    on(setCurrentSeverity, (state, action) =>({
        ...state,
        currentSeverity: action.severity
    })),
    on(setAssetsLoadMessage, (state, action) =>({
        ...state,
        assetsUploadMessage: action.message
    })),
    on(setSelectedDateRange, (state, action) => ({
        ...state,
        selectedDateRange: action.selectedDateRange,
      })),


);

export function vulnerabilitiesReducer(state: VulnerablitiesState, action: Action): VulnerablitiesState {
    return reducer(state, action);
}
