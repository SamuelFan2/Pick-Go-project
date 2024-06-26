import React from "react";
import { useEffect, useState } from "react";
import tourService from "../../../service/tour";
import { useNavigate, Link } from "react-router-dom";
import PageChooseComponent from "../../smallComponents/pageChoose-component";
import TourTableComponent from "../../smallComponents/tourTable-component";
import ProfileComponent from "../../smallComponents/profile-component";

const MyAppliedComponent = () => {
  const navigate = useNavigate();

  const [tours, setTours] = useState();
  const [user_id, setUser_id] = useState();
  const [count, setCount] = useState(); // 計算有幾個sites 分頁用
  const [page, setPage] = useState(1);
  const numberPerPage = 8; //每頁顯示幾個

  // 剛進網站時，讀取site總數以設定分頁格式
  useEffect(() => {
    tourService
      .get_myTour_count()
      .then((data) => {
        console.log(data.data);
        console.log("讀取sites總數");
        setCount(Math.ceil(data.data.count / numberPerPage));
      })
      .catch((e) => {
        if (e.response && e.response.status === 401) {
          localStorage.removeItem("auth");
          navigate("/login");
          navigate(0);
        }
      });
  }, [navigate]);

  // 每次切換頁面讀取一次
  useEffect(() => {
    tourService
      .get_myApplied(page, numberPerPage)
      .then((data) => {
        let result = data.data;
        console.log(result);
        console.log("讀取tours詳細資料");
        setTours(result);
      })
      .catch((e) => {
        if (e.response && e.response.status === 401) {
          localStorage.removeItem("auth");
          navigate("/login");
          navigate(0);
        }
      });
  }, [page, navigate]);
  return (
    <div className="container">
      <div className="d-flex">
        {/* 選擇我建立的景點or我收藏的景點 */}
        <div className="me-5 mb-3">
          <Link
            to="/users/tours/overview"
            className="btn btn-outline-primary me-3 "
            disabled
          >
            我建立的旅程
          </Link>
          <Link
            to="/users/tours/overview/Apply"
            className="btn btn-outline-primary active"
          >
            我參加的旅程
          </Link>
        </div>
        {/* 頁數選擇 */}
        <PageChooseComponent page={page} setPage={setPage} count={count} />
      </div>

      {/* 旅程列表 */}
      <div style={{ width: "97%" }}>
        <TourTableComponent tours={tours} setUser_id={setUser_id} tourPublic={false} />
      </div>
      {/* // 查看profile */}
      {user_id && (
        <ProfileComponent user_id={user_id} setUser_id={setUser_id} />
      )}
    </div>
  );
};

export default MyAppliedComponent;
