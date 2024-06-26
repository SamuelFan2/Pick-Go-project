import React from "react";
import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import tourService from "../../../service/tour";
import TourCardComponent from "../../smallComponents/tourCard-component";

const MyTourDetailComponent = () => {
  const navigate = useNavigate();

  const { tour_id } = useParams();

  const [tour, setTour] = useState(""); // 景點詳細資料
  const [sites, setSites] = useState(""); // 每天行程
  const [days, setDays] = useState([""]); // 設定每天格式用
  const [type, setType] = useState(""); // 主辦人 or 參加者?
  const [tourist_id, setTourist_id] = useState(""); // 使用者於此行程的參加id

  // 得到景點資訊
  useEffect(() => {
    tourService
      .get_myTour_detail(tour_id)
      .then((data) => {
        console.log(data.data);
        setTour(data.data.foundTour);
        setSites(data.data.dayPlan);

        let array = new Array(data.data.foundTour.totalDays).fill("");
        setDays(array.map((n, i) => i + 1));
      })
      .catch((e) => {
        if (e.response && e.response.status === 403) {
          navigate("/noAuth");
        } else if (e.response && e.response.status === 401) {
          alert("請先登入");
          navigate("/login");
        } else if (e.response && e.response.status === 404) {
          navigate("/404");
        }
      });
  }, [navigate, tour_id]);

  // 自己的參加狀態
  useEffect(() => {
    tourService
      .get_myType(tour_id)
      .then((data) => {
        console.log(data.data);
        setType(data.data.type);
        setTourist_id(data.data._id);
      })
      .catch((e) => {
        if (e.response && e.response.status === 401) {
          setType("無登入");
        }
      });
  }, [navigate, tour_id]);

  return (
    <div>
      <div className="mx-5 mb-3">
        <Link
          to="/users/tours/overview"
          className="btn btn-outline-primary me-3"
        >
          回到我的旅程
        </Link>
      </div>
      <hr
        className="mx-4 "
        style={{ border: "2px solid rgb(90, 178, 255)", opacity: "1" }}
      />

      {/* 旅程詳細資料 */}
      <TourCardComponent
        tour_id={tour_id}
        tour={tour}
        sites={sites}
        days={days}
        type={type}
        tourist_id={tourist_id}
      />
    </div>
  );
};

export default MyTourDetailComponent;
