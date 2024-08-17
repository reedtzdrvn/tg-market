import React from 'react';
import bg from "../../images/bg.png"
import { Link } from 'react-router-dom';
import { LightButton } from '../UI/Button/button';
import axios from "../../axios"
import { useNavigate } from 'react-router-dom';
import mainsvgt from "../../images/mainsvgt.svg"

const Main = () => {

    const navigate = useNavigate();
    let tg = window.Telegram.WebApp;

    let userId = ''

    if (!tg.initDataUnsafe.user) {
        userId = '5835906613'
    }
    else {
        userId = tg.initDataUnsafe.user?.id
    }

    const handleGoArtistCatalog = () => {
        axios.patch("/user", { telegramId: userId, role: 'artist' })
            .then(() => {
                window.location.href="/catalog-applications";
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const handleGoCustomerCatalog = () => {
        axios.patch("/user", { telegramId: userId, role: 'customer' })
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
                <div className=' mt-[110px] mb-[85px] flex justify-center items-center'><img src={mainsvgt} alt="mainsvg" /></div>
                <div className=' text-white text-[40px] font-bold text-center w-full leading-[44px] tracking-[0%]'>
                    Создай событие,<br /> которое <br /> запомнится!
                </div>
                <div className='mt-[58px] flex flex-col gap-[12px] px-[23px]'>
                    <button onClick={() => handleGoArtistCatalog()}><LightButton text="Я артист" /></button>
                    <button onClick={() => handleGoCustomerCatalog()}><LightButton text="Я организатор" /></button>
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
