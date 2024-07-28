import React, { useState } from "react";
import calendarIcon from "../../images/Calendar-2.svg";
import moneyIcon from "../../images/Coins.svg";
import mmm from "../../images/mmm.svg";
import { Link } from "react-router-dom";

const CatalogApplications = () => {
  const [selectedCategory, setSelectedCategory] = useState(1);

  const categories = [
    {
      id: 1,
      svgName: "icon.svg",
      name: "Песни",
      count: 1151,
      color: "purple",
    },
    {
      id: 2,
      svgName: "icon.svg",
      name: "Ведущие",
      count: 1151,
      color: "pink",
    },
    {
      id: 3,
      svgName: "icon.svg",
      name: "Муз. группа",
      count: 1151,
      color: "orange",
    },
    {
      id: 4,
      svgName: "icon.svg",
      name: "Аниматоры",
      count: 1151,
      color: "green",
    },
    {
      id: 5,
      svgName: "icon.svg",
      name: "Шоу артисты",
      count: 1151,
      color: "yellow",
    },
    {
      id: 6,
      svgName: "icon.svg",
      name: "Танцы",
      count: 1151,
      color: "yellow",
    },
    {
      id: 7,
      svgName: "icon.svg",
      name: "Диджеи",
      count: 1151,
      color: "pink",
    },
  ];

  const handleCategoryClick = (category) => {
    if (category !== selectedCategory) setSelectedCategory(category);
  };

  return (
    <div className="bg-back">
      <div className="pt-[52px]">
        <div className="flex flex-col gap-[27px] items-center">
          <span className="text-[24px] w-full text-center font-bold opacity-50">
            Каталог заявок
          </span>
          <div className="w-full flex justify-center">
            <div className="flex flex-col gap-[12px] w-full">
              <div className="flex w-full justify-center items-center gap-[12px]">
                {categories.slice(0, 4).map((el, index) => (
                  <button
                    key={index}
                    className={`px-[16px] py-[4px] text-[12px] rounded-[10px] w-max ${
                      el.id === selectedCategory
                        ? "bg-yellow"
                        : "bg-buttoncategory opacity-50"
                    }`}
                    onClick={() => handleCategoryClick(el.id)}
                  >
                    {el.name}
                  </button>
                ))}
              </div>
              <div className="flex w-full justify-center items-center gap-[12px]">
                {categories.slice(4, 9).map((el, index) => (
                  <button
                    key={index + 4}
                    className={`px-[16px] py-[4px] text-[12px] rounded-[10px] w-max ${
                      el.id === selectedCategory
                        ? "bg-yellow"
                        : "bg-buttoncategory opacity-50"
                    }`}
                    onClick={() => handleCategoryClick(el.id)}
                  >
                    {el.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
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
              className={`py-[4.5px] px-4 flex justify-center items-center rounded-xl bg-yellow`}
            >
              Танцы
            </span>
            <span
              className={`py-[4.5px] px-4 flex justify-center items-center rounded-xl bg-green`}
            >
              Аниматоры
            </span>
            <span
              className={`py-[4.5px] px-4 flex justify-center items-center rounded-xl bg-pink`}
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
              className={`py-[4.5px] px-4 flex justify-center items-center rounded-xl bg-yellow`}
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

        <div className="border-2 bg-main mb-6 border-black rounded-[15px] px-[27px] py-[25px] flex gap-[18px] items-center mx-[16px]">
          <img src={mmm} className="h-[60px]" alt="1" />
          <div className="text-[18px] font-bold leading-6">
            Создайте свою анкету,
            <br />
            чтобы начать получать <br />
            заявки
          </div>
        </div>

        <div className="bg-white p-4 shadow-custom mb-6">
          <div className="pt-7 pb-[24px] font-[Inter] font-bold text-2xl leading-8">
            <span className="mb-[24px]">Тимбилдинг выходного дня</span>
          </div>

          <div className="flex flex-row gap-4 font-[Inter] text-[12px] font-normal ">
            <span
              className={`py-[4.5px] px-4 flex justify-center items-center rounded-xl bg-yellow`}
            >
              Танцы
            </span>
            <span
              className={`py-[4.5px] px-4 flex justify-center items-center rounded-xl bg-pink`}
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
