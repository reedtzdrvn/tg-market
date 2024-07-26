import React from 'react';
import bg from "../../images/bg.png"
import { Link } from 'react-router-dom';
import { LightButton } from '../UI/Button/button';

const Main = () => {
    return (
        <div className='relative h-[735px]'>
            <img src={bg} alt="bg" className='w-full absolute h-[735px] -z-10' />
            <div className='py-[43px] text-white'>
                <div className='flex text-[16px] justify-between px-[26px]'>
                    <Link to="/artists">Каталог артистов</Link>
                    <Link to="/requests">Каталог заявок</Link>
                </div>
                <div className='mt-[195px] text-white text-[40px] font-bold text-center w-full leading-[44px] tracking-[0%]'>
                    Создай событие,<br /> которое <br /> запомнится!
                </div>
                <div className='mt-[58px] flex flex-col gap-[12px] px-[23px]'>
                    <LightButton text="Я артист" />
                    <LightButton text="Я хочу организовать событие" />
                </div>
                <div className='mt-[23px] text-[16px] text-center px-[43px] leading-[19px] tracking-[0%] mb-[14px]'>
                    Eventra помогает найти первоклассных артистов для любого случая,
                    а таланты смогут заявить о себе и начать выгодное сотрудничество
                </div>
            </div>
        </div>

    );
};

export default Main;
