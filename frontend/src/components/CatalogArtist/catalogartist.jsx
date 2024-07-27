import React from 'react';
import picture from "../../images/picture.png"
import image from "../../images/photo 1.png"
import star from "../../images/Star.svg"
import coins from "../../images/Coins.svg"
import { useLocation } from 'react-router-dom';
import { DarkButton } from '../UI/Button/button';
import mmm from "../../images/mmm.svg"

const CatalogArtist = () => {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const category = searchParams.get('category');

    const categories = [
        {
            svgName: "icon.svg",
            name: "Песни",
            count: 1151,
            color: "purple"
        },
        {
            svgName: "icon.svg",
            name: "Ведущие",
            count: 1151,
            color: "pink"
        },
        {
            svgName: "icon.svg",
            name: "Муз. группа",
            count: 1151,
            color: "orange"
        },
        {
            svgName: "icon.svg",
            name: "Аниматоры",
            count: 1151,
            color: "green"
        },
        {
            svgName: "icon.svg",
            name: "Шоу артисты",
            count: 1151,
            color: "yellow"
        },
        {
            svgName: "icon.svg",
            name: "Танцы",
            count: 1151,
            color: "yellow"
        },
        {
            svgName: "icon.svg",
            name: "Диджеи",
            count: 1151,
            color: "pink"
        }
    ]

    return (
        <div className='bg-back'>
            <div className='pt-[34px]'>
                <div className='flex flex-col gap-[27px] items-center'>
                    <span className='text-[24px] w-full text-center font-bold'>Каталог артистов</span>
                    <div className='w-full flex justify-center'>
                        <div className='flex flex-col gap-[12px] w-full  '>
                            <div className='flex w-full justify-center items-center gap-[12px]'>
                                {categories.slice(0, 4).map((el, index) => (
                                    <button
                                        key={el.index}
                                        className={`px-[16px] py-[4px] text-[12px] rounded-[10px] w-max ${el.name === category ? 'bg-green' : 'bg-buttoncategory opacity-50'
                                            }`}
                                    >
                                        {el.name}
                                    </button>
                                ))}
                            </div>
                            <div className='flex w-full justify-center items-center gap-[12px]'>
                                {categories.slice(4, 9).map((el, index) => (
                                    <button
                                        key={el.index}
                                        className={`px-[16px] py-[4px] text-[12px] rounded-[10px] w-max ${el.name === category ? 'bg-green' : 'bg-buttoncategory opacity-50'
                                            }`}
                                    >
                                        {el.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='mt-[39px] flex flex-col gap-[24px]'>
                    <div className='bg-main px-[16px] py-[25px] shadow-custom '>
                        <div className='flex items-center gap-[12px]'>
                            <img src={picture} className='w-[88px] h-[88px] rounded-full ' alt="1" />
                            <div className='flex flex-col gap-[12px] h-full justify-center'>
                                <span className='font-bold text-[24px]'>Ира Петрова</span>
                                <button
                                    className={`px-[16px] py-[4px] text-[12px] rounded-[10px] w-max bg-green`}
                                >
                                    Танцы
                                </button>
                            </div>
                        </div>
                        <div className='mt-[24px]'>
                            <div className='flex justify-between'>
                                <div className='flex items-center'>
                                    <img src={star} alt="2" className='-mt-1' /> <span className='text-[20px] font-bold mr-[8px] ml-[2px]'>4.5</span> <span className='text-[16px]'> Отзывы (15)</span>
                                </div>
                                <div className='flex items-center gap-1'>
                                    <img src={coins} alt="3" /> <span className='text-[16px]'>5 000 - 20 000 Р</span>
                                </div>
                            </div>
                        </div>
                        <div className='my-[17px] opacity-50 text-[14px]'>
                            Привет! Меня зовут Ира. Я страстно люблю танцы и считаю, что они являются моим способом самовыражения. Мое тело говорит на...
                        </div>
                        <div className='flex justify-between opacity-50'>
                            <img src={image} className='h-[80px] w-[86px]' alt="1" />
                            <img src={image} className='h-[80px] w-[86px]' alt="1" />
                            <img src={image} className='h-[80px] w-[86px]' alt="1" />
                            <img src={image} className='h-[80px] w-[86px]' alt="1" />
                        </div>
                        <div className='mt-[16px] text-[18px]'>
                            <DarkButton text={"Связаться"} />
                        </div>
                    </div>
                    <div className='my-[12px] border-2 bg-main border-black rounded-[15px] px-[27px] py-[25px] flex gap-[18px] items-center mx-[16px]'>
                        <img src={mmm} className='h-[60px]' alt="1" />
                        <div className='text-[18px] font-bold leading-6'>Создайте свою заявку,
                            чтобы специалисты <br/>
                            вас нашли</div>
                    </div>
                    <div className='bg-main px-[16px] py-[25px] shadow-custom '>
                        <div className='flex items-center gap-[12px]'>
                            <img src={picture} className='w-[88px] h-[88px] rounded-full ' alt="1" />
                            <div className='flex flex-col gap-[12px] h-full justify-center'>
                                <span className='font-bold text-[24px]'>Ира Петрова</span>
                                <button
                                    className={`px-[16px] py-[4px] text-[12px] rounded-[10px] w-max bg-green`}
                                >
                                    Танцы
                                </button>
                            </div>
                        </div>
                        <div className='mt-[24px]'>
                            <div className='flex justify-between'>
                                <div className='flex items-center'>
                                    <img src={star} alt="2" className='-mt-1' /> <span className='text-[20px] font-bold mr-[8px] ml-[2px]'>4.5</span> <span className='text-[16px]'> Отзывы (15)</span>
                                </div>
                                <div className='flex items-center gap-1'>
                                    <img src={coins} alt="3" /> <span className='text-[16px]'>5 000 - 20 000 Р</span>
                                </div>
                            </div>
                        </div>
                        <div className='my-[17px] opacity-50 text-[14px]'>
                            Привет! Меня зовут Ира. Я страстно люблю танцы и считаю, что они являются моим способом самовыражения. Мое тело говорит на...
                        </div>
                        <div className='flex justify-between opacity-50'>
                            <img src={image} className='h-[80px] w-[86px]' alt="1" />
                            <img src={image} className='h-[80px] w-[86px]' alt="1" />
                            <img src={image} className='h-[80px] w-[86px]' alt="1" />
                            <img src={image} className='h-[80px] w-[86px]' alt="1" />
                        </div>
                        <div className='mt-[16px] text-[18px]'>
                            <DarkButton text={"Связаться"} />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default CatalogArtist;
