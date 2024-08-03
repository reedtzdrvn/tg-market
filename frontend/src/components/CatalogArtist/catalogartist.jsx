import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "../../axios.js";

import CategoriesButtons from "../UI/Categories/categoriesButtons.jsx";
import CatalogArtistCard from "./catalogArtistCard.jsx";
import CatalogBanner from "../UI/CatalogBanner/catalogBannerCustomer.jsx";
import { useCategories } from "../../context/categoryContext.js";

const CatalogArtist = () => {
  const location = useLocation();
  const [category, setCategory] = useState(null);
  const [applications, setApplications] = useState(null);
  const { categories } = useCategories();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/artist-request", {
          params: { categoryId: category },
        });
        let data;
        if (response.data) {
          data = Array.isArray(response.data) ? response.data : [response.data];
        } else {
          data = null;
        }
        setApplications(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setApplications([]);
      }
    };

    if (category) {
      fetchData();
    }
  }, [category]);

  useEffect(() => {
    if (id) {
      setCategory(id);
    }
  }, [id]);

  useEffect(() => {
    if (!id && categories.length > 0) {
      setCategory(categories[0]._id);
    }
  }, [categories, id]);

  const handleChangeCategory = (id) => {
    if (category !== id) {
      setCategory(id);
    }
  };

  return (
    <div className="bg-back">
      <div className="pt-[34px]">
        <div className="flex flex-col gap-[27px] items-center">
          <span className="text-[24px] w-full text-center font-bold">
            Каталог артистов
          </span>
          <CategoriesButtons
            categories={categories}
            category={category}
            handleChangeCategory={handleChangeCategory}
          />
        </div>
        <div className="mt-[39px] flex flex-col gap-[24px] last:mb-[27px]">
          {applications && applications.length > 0 ? (
            applications.map((app) => (
              <CatalogArtistCard key={app._id} info={app} />
            ))
          ) : (
            <div className="text-center">нет данных</div>
          )}
          <CatalogBanner />
        </div>
      </div>
    </div>
  );
};

export default CatalogArtist;
