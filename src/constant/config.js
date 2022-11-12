export const SERVICE_URL = "localhost:8181"
export const API_URL = {
    getAllDepartment: "/em_tt1/department/getAllDepartment",
    getAllEthnic: "/em_tt1/ethnic/getAllEthnic",
    getAllNation: "/em_tt1/nation/getAllNation",
    getAllCity: "/em_tt1/city/getAllCity",
    getCityByNationId: "/em_tt1/city/getCityByNationId",
    getAllDistrict: "/em_tt1/district/getAllDistrict",
    getDistrictByCityId: "/em_tt1/district/getDistrictByCityId",
    getAllCommune: "/em_tt1/commune/getAllCommune",
    getCommuneByDistrictId: "/em_tt1/commune/getCommuneByDistrictId",
    getAllEmployee: "/em_tt1/employee/getAllEmployee",
    getEmployeeByEmployeeIdOrEmployeeNameOrDepartmentName: "/em_tt1/employee/getEmployeeByEmployeeIdOrEmployeeNameOrDepartmentName",
    getEmployeeByEmployeeId: "/em_tt1/employee/getEmployeeByEmployeeId",
    updateInformationEmployee: "/em_tt1/employee/updateInformationEmployee",
    insertInformationEmployee: "/em_tt1/employee/insertInformationEmployee",
    deleteEmployee: "/em_tt1/employee/deleteEmployee",
}