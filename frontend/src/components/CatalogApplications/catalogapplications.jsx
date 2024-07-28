import React, { useState, useEffect } from "react";
import calendarIcon from "../../images/Calendar-2.svg";
import moneyIcon from "../../images/Coins.svg";
import mmm from "../../images/mmm.svg";
import { useLocation } from "react-router-dom";
import CategoriesButtons from "../UI/Categories/categoriesButtons";
import axios from "../../axios.js"
import CatalogBanner from "../UI/CatalogBanner/catalogBannerArtist.jsx";
import Loader from "../UI/Loader/loader.jsx";
import { Link } from "react-router-dom";

const CatalogApplications = () => {
  
  const location = useLocation();
  // в category - айди текущей категории выбранной
  const [category, setCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');
  const [loading, setLoading] = useState(true)

  useEffect(() => {
      if (id) {
          setCategory(id);
      }
  }, [id]);

  useEffect(() => {
      axios.get("/category")
          .then((res) => {
              setCategories(res.data);
              if (!id && res.data.length > 0) {
                  setCategory(res.data[0]._id);
              }
              setLoading(false)
          })
          .catch((err) => {
              console.log(err);
          });
  }, [id]);

  const handleChangeCategory = (id) => {
      if(category!==id){
          setCategory(id);
      }
  };

  if(loading){
    return <Loader/>
  }

  return (
    <div className="bg-back">
      <div className="pt-[52px]">
        <div className="flex flex-col gap-[27px] items-center">
          <span className="text-[24px] w-full text-center font-bold opacity-50">
            Каталог заявок
          </span>
          <CategoriesButtons categories={categories} category={category} handleChangeCategory={handleChangeCategory} />
        </div>
      </div>

      <div className="mt-[38px] flex flex-col">
        <Link to={'/application-details/1'}>
        <div className="bg-white p-4 shadow-custom mb-6">
          <div className="pt-7 pb-[24px] font-[Inter] font-bold text-2xl leading-8">
            <span className="mb-[24px]">Детский праздник для двух девочек</span>
          </div>

          <div className="flex flex-row gap-4 font-[Inter] text-[12px] font-normal ">
            <span
              className={`py-[4.5px] px-4 flex justify-center items-center rounded-xl bg-customyellow`}
            >
              Танцы
            </span>
            <span
              className={`py-[4.5px] px-4 flex justify-center items-center rounded-xl bg-customyellow`}
            >
              Аниматоры
            </span>
            <span
              className={`py-[4.5px] px-4 flex justify-center items-center rounded-xl bg-customyellow`}
            >
              Ведущие
            </span>
          </div>

          <div className="mt-[24px] flex justify-between items-center font-[Inter] text-4 font-semibold">
            <div className="flex items-center">
              <img className="w-[18px] mr-2" src={calendarIcon} alt="data" />
              <span>11.12.2024</span>
            </div>

            <div className="flex items-center">
              <img className="w-[16px] mr-2" src={moneyIcon} alt="money" />
              <span>10 000</span> - <span>40 000</span>
            </div>
          </div>

          <div className="mt-4 font-[Inter] text-[14px] opacity-50 leading-4">
            Детский праздник в ярком парке соберет маленьких гостей на веселые
            игры и конкурсы под руководством аниматоров. Программа включает ...
          </div>

          <button className="mt-4 w-full flex justify-center items-center bg-black font-[Inter] text-[20px] font-bold rounded-2xl text-white py-4">
            Откликнуться
          </button>
        </div>
        </Link>

        <div className="bg-white p-4 shadow-custom mb-6">
          <div className="pt-7 pb-[24px] font-[Inter] font-bold text-2xl leading-8">
            <span className="mb-[24px]">Выпускной в школе</span>
          </div>

          <div className="flex flex-row gap-4 font-[Inter] text-[12px] font-normal ">
            <span
              className={`py-[4.5px] px-4 flex justify-center items-center rounded-xl bg-customyellow`}
            >
              Танцы
            </span>
          </div>

          <div className="mt-[24px] flex justify-between items-center font-[Inter] text-4 font-semibold">
            <div className="flex items-center">
              <img className="w-[18px] mr-2" src={calendarIcon} alt="data" />
              <span>25.03.2024</span>
            </div>

            <div className="flex items-center">
              <img className="w-[16px] mr-2" src={moneyIcon} alt="money" />
              <span>5 000</span> - <span>20 000</span>
            </div>
          </div>

          <div className="mt-4 font-[Inter] text-[14px] opacity-50 leading-4">
            Выпускной в школе 106. <br />
            Ищем талантливого аниматора-танцора и веселого ведущего, чтобы
            сделать этот день особенным и запоминающимся.
          </div>

          <button className="mt-4 w-full flex justify-center items-center bg-black font-[Inter] text-[20px] font-bold rounded-2xl text-white py-4">
            Откликнуться
          </button>
        </div>

        <CatalogBanner />

        <div className="bg-white p-4 shadow-custom mb-6">
          <div className="pt-7 pb-[24px] font-[Inter] font-bold text-2xl leading-8">
            <span className="mb-[24px]">Тимбилдинг выходного дня</span>
          </div>

          <div className="flex flex-row gap-4 font-[Inter] text-[12px] font-normal ">
            <span
              className={`py-[4.5px] px-4 flex justify-center items-center rounded-xl bg-customyellow`}
            >
              Танцы
            </span>
            <span
              className={`py-[4.5px] px-4 flex justify-center items-center rounded-xl bg-customyellow`}
            >
              Ведущие
            </span>
          </div>

          <div className="mt-[24px] flex justify-between items-center font-[Inter] text-4 font-semibold">
            <div className="flex items-center">
              <img className="w-[18px] mr-2" src={calendarIcon} alt="data" />
              <span>25.03.2024</span>
            </div>

            <div className="flex items-center">
              <img className="w-[16px] mr-2" src={moneyIcon} alt="money" />
              <span>60 000</span> - <span>120 000</span>
            </div>
          </div>

          <div className="mt-4 font-[Inter] text-[14px] opacity-50 leading-4">
            Хотим организовать танцевальный тимбилдинг для группы программистов.
            Мы бы хотели организовать это в серии мастер классов выходного дня.
          </div>

          <button className="mt-4 w-full flex justify-center items-center bg-black font-[Inter] text-[20px] font-bold rounded-2xl text-white py-4">
            Откликнуться
          </button>
        </div>
      </div>
    </div>
  );
};

export default CatalogApplications;
