import axios from "axios";
axios.defaults.withCredentials = true;

const apiURL = process.env.REACT_APP_API_URL;

// 負責"景點"相關與server的互動
class siteService {
  // 取得使用者自己建立的景點資訊
  get_mySite() {
    return axios.get(apiURL + "/api/sites/mySite");
  }

  // 建立新景點
  post_site_test(data) {
    return axios.post(apiURL + "/api/sites/new", data, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Client-ID {42dd75588885b5e}",
      },
    });
  }
}

export default new siteService();