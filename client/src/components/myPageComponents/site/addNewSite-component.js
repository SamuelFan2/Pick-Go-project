import React from "react";
import { useState } from "react";
import siteService from "../../../service/site";
import { useNavigate } from "react-router-dom";

const AddNewSiteComponent = () => {
  const navigate = useNavigate();

  const [country, setCountry] = useState("");
  const [message, setMessage] = useState("");

  const handleAddSite = async (e) => {
    e.preventDefault();
    // 處理form data
    const formData = new FormData(e.currentTarget);

    // loading中禁用submit按鈕
    document.querySelector("#add-new-site-button").disabled = true;

    try {
      document.body.style.cursor = "wait";
      let result = await siteService.post_new_site(formData);
      console.log(result);
      alert("新增完成");
      navigate("/users/sites/overview/mine");
      navigate(0);
    } catch (e) {
      // 回復游標與submit按鈕
      document.querySelector("#add-new-site-button").disabled = false;
      document.body.style.cursor = "default";

      // 處理錯誤訊息
      console.log(e);
      if (e.response) {
        console.log(e.response.data);
        setMessage(e.response.data);
      } else {
        setMessage("伺服器發生問題，請稍後再試");
      }
    }
  };

  const handleCountry = (e) => {
    setCountry(e.target.value);
    document.querySelector("#region_site_add").value = "";
  };

  const handleImage = (e) => {
    if (e.target.files[0]) {
      let file = e.target.files[0];
      let size = file.size;
      let type = file.type;
      console.log(file);

      if (
        type !== "image/jpeg" &&
        type !== "image/png" &&
        type !== "image/jpg"
      ) {
        // 只允許上傳 jpeg 或 png 檔

        setMessage("只能上傳 jpeg, jpg 或 png 檔!");
        document.querySelector("#photo_site").value = null;
      } else if (size > 2.5 * 1024 * 1024) {
        // 如果檔案大小大於 2.5 MB，不允許上傳

        setMessage("圖片過大，請使用其它方式上傳！(限制 2.5 MB)");
        document.querySelector("#photo_site").value = null;
      } else {
        setMessage("");
      }
    } else {
      document.querySelector("#photo_site").value = null;
    }
  };

  return (
    <div className="container">
      <div className="d-flex flex-wrap">
        <h2 className="me-4 my-2">新增景點</h2>
      </div>
      <hr />
      <form onSubmit={handleAddSite}>
        <div className="mb-3">
          <label className="form-label">標題</label>
          <input
            type="text"
            className="form-control"
            id="titleEdit"
            name="title"
          />
        </div>
        <div className="mb-3">
          <label className="form-label">國家</label>
          <div>
            <div className="form-check-inline ">
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="country"
                  id="japan_country"
                  value="日本"
                  onChange={handleCountry}
                />
                <label className="form-check-label" htmlFor="japan_country">
                  日本
                </label>
              </div>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="country"
                id="taiwan_country"
                value="臺灣"
                onChange={handleCountry}
              />
              <label className="form-check-label" htmlFor="taiwan_country">
                臺灣
              </label>
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">地區</label>
          {!country && (
            <select
              className="form-select"
              aria-label="Default select example"
              id="region_site_add"
            >
              <option>請選擇地區</option>
            </select>
          )}
          {country === "日本" && (
            <select
              className="form-select"
              aria-label="Default select example"
              id="region_site_add"
              name="region"
            >
              <option value="">請選擇地區</option>
              <option value="北海道地區">北海道地區</option>
              <option value="東北">東北地區</option>
              <option value="關東">關東地區</option>
              <option value="近畿">近畿地區</option>
              <option value="中部">中部地區</option>
              <option value="中國">中國地區</option>
              <option value="九州">九州地區</option>
              <option value="四國">四國地區</option>
              <option value="沖繩">沖繩地區</option>
              <option value="日本其他">其他地區</option>
            </select>
          )}
          {country === "臺灣" && (
            <select
              className="form-select"
              aria-label="Default select example"
              id="region_site_add"
              name="region"
            >
              <option value="">請選擇地區</option>
              <option value="台北">台北</option>
              <option value="新北">新北</option>
              <option value="桃園">桃園</option>
              <option value="台中">台中</option>
              <option value="台南">台南</option>
              <option value="高雄">高雄</option>
              <option value="臺灣其他">其他</option>
            </select>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label">類型</label>
          <div>
            <div className="form-check-inline ">
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="type"
                  id="restaurant_type"
                  value="餐廳"
                />
                <label className="form-check-label" htmlFor="restaurant_type">
                  餐廳
                </label>
              </div>
            </div>
            <div className="form-check-inline ">
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="type"
                  id="spot_type"
                  value="景點"
                />
                <label className="form-check-label" htmlFor="spot_type">
                  景點
                </label>
              </div>
            </div>
            <div className="form-check-inline ">
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="type"
                  id="shopping_type"
                  value="購物"
                />
                <label className="form-check-label" htmlFor="shopping_type">
                  購物
                </label>
              </div>
            </div>
            <div className="form-check-inline ">
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="type"
                  id="other_type"
                  value="其他"
                />
                <label className="form-check-label" htmlFor="other_type">
                  其他
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="content_site" className="mb-3">
            內文
          </label>
          <textarea
            className="form-control"
            id="content_site"
            style={{ whiteSpace: "pre-line", height: "200px" }}
            name="content"
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="photo_site" className="mb-3">
            上傳照片
          </label>
          <input
            type="file"
            className="form-control"
            id="photo_site"
            name="photo"
            onChange={handleImage}
          />
        </div>
        <div className="small mb-2 pb-lg-2">
          {message && (
            <div className="alert alert-danger" role="alert">
              {message}
            </div>
          )}
        </div>
        <button id="add-new-site-button" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddNewSiteComponent;
