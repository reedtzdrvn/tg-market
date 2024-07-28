import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../../axios.js";
import { DarkButton } from "../UI/Button/button";
import Categories from "../UI/Categories/categories.jsx";
import Loader from "../UI/Loader/loader.jsx";
import { useCategories } from "../../context/categoryContext.js";

const CategorySearch = () => {
  const {categories} = useCategories()

  return (
    <div className="py-[84px] flex flex-col gap-[34px] items-center">
      <div className="text-[18px] text-center px-[12px]">
        Выберите артиста или создайте <br /> заявку для вашего события
      </div>
      <div className="flex flex-col items-center w-full px-[12px]">
        <Categories categories={categories} />
        <Link to="/addrequest" className="w-full"><DarkButton text={"Создать заявку"} /></Link>
      </div>
    </div>
  );
}

export default CategorySearch;
