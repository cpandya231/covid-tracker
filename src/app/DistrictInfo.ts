export interface DistrictInfo {
    district: string,
    active: string,
    confirmed: string,
    deceased: string,
    recovered: string  
}

export interface StateDistrictInfo{
    state:string,
    stateCode:string,
    districtData:DistrictInfo[]


}