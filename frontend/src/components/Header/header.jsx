import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCategories } from '../../context/categoryContext';
import Loader from '../UI/Loader/loader';
import axios from "../../axios";
import { useUser } from '../../context/userContext';

const Header = () => {
  let tg = window.Telegram.WebApp;
  let userId = tg.initDataUnsafe.user ? tg.initDataUnsafe.user.id : "703999322";

  const { categories, setCategories } = useCategories();
  const { user, setUser } = useUser();
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingUser, setLoadingUser] = useState(true);

  const cities = [
    'Екатеринбург',
    'Москва',
    'Санкт-Петербург',
    'Новосибирск',
    'Казань',
    'Челябинск'
  ];


  const handleCityChange = (event) => {
    const newCity = event.target.value;

    if (user && user.telegramId) {
      axios.patch("/selectcity", { telegramId: user.telegramId, setCitySearch: newCity })
        .then(() => {
          setUser(prevUser => ({ ...prevUser, setCitySearch: newCity }));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    if (categories.length === 0) {
      axios.get("/category")
        .then((res) => {
          setCategories(res.data);
          setLoadingCategories(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setLoadingCategories(false);
    }
  }, [categories, setCategories]);

  useEffect(() => {

    if (!user) {
      axios.get(`/user?telegramId=${userId}`)
        .then((res) => {
          setUser(res.data[0]);
          setLoadingUser(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setLoadingUser(false);
    }
  }, [user, setUser, userId]);

  if (loadingCategories || loadingUser) {
    return <Loader />;
  }

  return (
    <div className="h-[48px] shadow-custom flex justify-between items-center px-[16px] relative bg-white">
      <div className="current_city flex justify-start w-1/3">
        <select
          value={user.setCitySearch}
          onChange={(event) => handleCityChange(event)}
          className="text-[12px] underline w-[110px]"
        >
          {cities.map((city, index) => (
            <option key={index} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>
      <Link to="/" className="text-[16px] font-bold text-center w-1/3">
        EVENTRA
      </Link>
      <Link to={`${user.role === 'customer' ? "/my-applications" : "my-requests"}`} className="text-[14px] flex justify-end font-bold w-1/3">
        Мой профиль
      </Link>
    </div>
  );
};

export default Header;
