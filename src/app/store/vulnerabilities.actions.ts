import { createAction, props } from '@ngrx/store';

export const  LOAD_ALL_VULNERABILITIES = "[CVE] LOAD_ALL_VULNERABILITIES";
export const SET_VULNERABILITIES = "[CVE] SET_VULNERABILITIES";
export const SET_CRITICAL_VULNERABILITIES = "[CVE] SET_CRITICAL_VULNERABILITIES";
export const SET_HIGH_VULNERABILITIES = "[CVE] SET_HIGH_VULNERABILITIES";
export const SET_MEDIUM_VULNERABILITIES = "[CVE] SET_MEDIUM_VULNERABILITIES";
export const SET_LOW_VULNERABILITIES = "[CVE] SET_LOW_VULNERABILITIES";
export const SET_CURRENT_VULNERABILITY = "[CVE] SET_CURRENT_VULNERABILITY";
export const SET_LOADING = "[CVE] SET_LOADING";
export const SET_SELECTED_ASSET_ID = "[CVE] SET_SELECTED_ASSET_ID";
export const UPLOAD_ASSETS_FILE = "[CVE] UPLOAD_ASSETS_FILE";
export const LOAD_ALL_ASSETS = "[CVE] LOAD_ALL_ASSETS";
export const SET_ALL_ASSETS = "[CVE] SET_ALL_ASSETS";
export const DELETE_ASSETS = "[CVE] DELETE_ASSETS";
export const UPDATE_ASSET = "[CVE] UPDATE_ASSET";
export const GET_CVE_DETAILS = "[CVE] GET_CVE_DETAILS";
export const SET_CVE_DETAILS = "[CVE] SET_CVE_DETAILS";
export const SET_SEVERITY = "[CVE] SET_SEVERITY";
export const LOAD_ASSET_VULNERABILITIES = "[CVE] LOAD_ASSET_VULNERABILITIES";
export const SET_ASSET_LOAD_MESSAGE= "[CVE] SET_ASSET_LOAD_MESSAGE";
export const SET_SELECTED_DATE_RANGE = "[CVE] SET_SELECTED_DATE_RANGE";

export const setVulnerabilities = createAction(
    SET_VULNERABILITIES,
    props<{ vulnerabilities: any[] }>()
);


export const setCriticalVulnerabilities = createAction(
    SET_CRITICAL_VULNERABILITIES,
    props<{ vulnerabilities: any[] }>()
);

export const setHighVulnerabilities = createAction(
    SET_HIGH_VULNERABILITIES,
    props<{ vulnerabilities: any[] }>()
);

export const setMediumVulnerabilities = createAction(
    SET_MEDIUM_VULNERABILITIES,
    props<{ vulnerabilities: any[] }>()
);

export const setLowVulnerabilities = createAction(
    SET_LOW_VULNERABILITIES,
    props<{ vulnerabilities: any[] }>()
);

export const loadAllVulnerabilities = createAction(
    LOAD_ALL_VULNERABILITIES,
    props<{ payload: any }>()
);

export const setCurrentVulnerability = createAction(
    SET_CURRENT_VULNERABILITY,
    props<{ vulnerability: any}>()
);

export const setLoading = createAction(
    SET_LOADING,
    props<{ isLoading: boolean}>()
);


export const setSelectedAssetId = createAction(
    SET_SELECTED_ASSET_ID,
    props<{ assetId: string}>()
);

export const uploadFile = createAction(
    UPLOAD_ASSETS_FILE,
    props<{ data: FormData}>()
)


export const loadAllAssets = createAction(
    LOAD_ALL_ASSETS
)

export const setAllAssets = createAction(
    SET_ALL_ASSETS,
    props<{ assets: any[]}>()
);

export const deleteAssets = createAction(
    DELETE_ASSETS,
    props<{ assets: any[]}>()
);

export const updateAsset = createAction(
    UPDATE_ASSET,
    props<{ asset:  any}>()
);
export const updateAssetSuccess = createAction(
    '[Asset] Update Asset Success',
    props<{ asset: any }>()
  );
  
  export const updateAssetFailure = createAction(
    '[Asset] Update Asset Failure',
    props<{ error: any }>()
  );
export const getCveDetails = createAction(
    GET_CVE_DETAILS,
    props<{ cveId: string}>()
)

export const setCveDetails = createAction(
    SET_CVE_DETAILS,
    props<{ cveData: any[]}>()
)

export const setCurrentSeverity = createAction(
    SET_SEVERITY,
    props<{ severity: string}>()
)


export const loadAssetVulnerabilities = createAction(
    LOAD_ASSET_VULNERABILITIES,
    props<{asset: any}>()
)

export const setAssetsLoadMessage  = createAction(
    SET_ASSET_LOAD_MESSAGE,
    props<{message: string}>()
)

export const setSelectedDateRange = createAction(
    SET_SELECTED_DATE_RANGE,
    props<{ selectedDateRange: Date[] }>()
  );