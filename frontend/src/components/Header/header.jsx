import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCategories } from '../../context/categoryContext';
import Loader from '../UI/Loader/loader';
import axios from "../../axios";
import { useUser } from '../../context/userContext';
import { useArtist } from "../../context/artistContext"
import { useCities } from '../../context/citiesContext';

const Header = () => {
  let tg = window.Telegram.WebApp;
  let userId = tg.initDataUnsafe.user ? tg.initDataUnsafe.user.id : "703999322";

  const { categories, setCategories } = useCategories();
  const { user, setUser } = useUser();
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingUser, setLoadingUser] = useState(true);
  const [loadingArtist, setLoadingArtist] = useState(true);
  const { artist, setArtist } = useArtist()

  const {cities} = useCities()

  const handleCityChange = (event) => {
    const newCity = event.target.value;

    if (user && user.telegramId) {
      axios.patch("/selectcity", { telegramId: user.telegramId, setCitySearch: newCity })
        .then(() => {
          setUser(prevUser => ({ ...prevUser, setCitySearch: newCity }));
          window.location.reload()
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    if (categories.length === 0 && user) {
      axios.get("/category", {params: { city: user.setCitySearch}})
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
  }, [categories, setCategories, user]);

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

  useEffect(() => {
    if (user?.role === 'artist') {
      axios.get(`/artist-request?artistId=${user._id}`)
        .then((res) => {
          setArtist(res.data[0]);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setLoadingArtist(false);
    }
  }, [user, setUser, userId]);

  if (loadingCategories || loadingUser || loadingArtist) {
    return <Loader />;
  }

  return (
    <div className='relative'>
      <div className="h-[48px] shadow-custom flex justify-between items-center px-[16px] bg-white relative">
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
        <div className='absolute left-[50%] ml-[-38px] text-center'>
          <Link to="/" className="text-[16px] font-bold w-max">
            EVENTRA
          </Link>
        </div>
        {user.role && user.role !== "" && <Link to={`${user.role === 'customer' ? "/my-applications" : "my-requests"}`} className="text-[14px] flex justify-end font-bold w-1/3">
          Мой профиль
        </Link>}
      </div>
    </div>

  );
};

export default Header;
