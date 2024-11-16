export interface VulnerablitiesState {
    totalVulnerabilities: any[];
    criticalVulnerabilities: any[];
    highVulnerabilities: any[];
    mediumVulnerabilities: any[];
    lowVulnerabilities: any[];
    currentVulnearabilty: any;
    dataLoading: boolean;
    selctedAsset: string;
    allAssets: any[];
    cveData: any[];
    currentSeverity: string;
    assetsUploadMessage: string;
    selectedDateRange?: Date[] | null;
}