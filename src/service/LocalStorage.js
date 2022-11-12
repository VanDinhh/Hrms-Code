class LocalStorageService {
    getLocalAccessToken() {
        return localStorage.getItem("accessToken");
    }
    updateLocalAccessToken(accessToken) {
        localStorage.setItem("accessToken", accessToken);
    }
    removeAccessToken() {
        localStorage.removeItem("accessToken");
    }
    clearLocal() {
        localStorage.clear();
    }
  }
  export default new LocalStorageService();