import React from 'react';
import bg from "../../images/bg.png"
import { Link } from 'react-router-dom';
import { LightButton } from '../UI/Button/button';
import axios from "../../axios"
import { useNavigate } from 'react-router-dom';

const Main = () => {

    const navigate = useNavigate();
    let tg = window.Telegram.WebApp;

    let userId = ''

    if (!tg.initDataUnsafe.user) {
        userId = '703999322'
    }
    else {
        userId = tg.initDataUnsafe.user?.id
    }

    const handleGoArtistCatalog = () => {
        axios.patch("/user", { telegramId: userId, role: 'customer' })
            .then(() => {
                window.location.href="/catalog-artist";
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleGoCustomerCatalog = () => {
        axios.patch("/user", { telegramId: userId, role: 'artist' })
            .then(() => {
                window.location.href="/category-artist";
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <div className='relative h-max'>
            <img src={bg} alt="bg" className='w-full absolute h-full -z-10' />
            <div className='py-[31px] text-white'>
                <div className='flex text-[16px] justify-between px-[19px]'>
                    <Link to="/catalog-artist">Каталог артистов</Link>
                    <Link to="/catalog-applications">Каталог заявок</Link>
                </div>
                <div className='mt-[195px] text-white text-[40px] font-bold text-center w-full leading-[44px] tracking-[0%]'>
                    Создай событие,<br /> которое <br /> запомнится!
                </div>
                <div className='mt-[58px] flex flex-col gap-[12px] px-[23px]'>
                    <button onClick={() => handleGoArtistCatalog()}><LightButton text="Я артист" /></button>
                    <button onClick={() => handleGoCustomerCatalog()}><LightButton text="Я хочу организовать событие" /></button>
                </div>
                <div className='mt-[23px] text-[16px] text-center px-[43px] leading-[19px] tracking-[0%] mb-[16px]'>
                    Eventra помогает найти первоклассных артистов для любого случая,
                    а таланты смогут заявить о себе и начать выгодное сотрудничество
                </div>
            </div>
        </div>
    );
};

export default Main;
