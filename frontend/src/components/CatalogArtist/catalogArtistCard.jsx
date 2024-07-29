import { DarkButton } from '../UI/Button/button';
import picture from "../../images/picture.png";
import image from "../../images/photo 1.png";
import star from "../../images/Star.svg";
import coins from "../../images/Coins.svg";
import { Link } from "react-router-dom"

const CatalogArtistCard = ({category}) => {
    return (
        <div className='bg-main px-[16px] py-[25px] shadow-custom '>
            <Link  to={`/artist/${"1"}/${category}`} className='flex items-center gap-[12px]'>
                <img src={picture} className='w-[88px] h-[88px] rounded-full ' alt="1" />
                <div className='flex flex-col gap-[12px] h-full justify-center'>
                    <span className='font-bold text-[24px]'>Ира Петрова</span>
                    <button className={`px-[16px] py-[4px] text-[12px] rounded-[10px] w-max bg-customyellow`}>Танцы</button>
                </div>
            </Link>
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
            <div className='flex gap-[16px] justify-center flex-wrap opacity-50'>
                <img src={image} className='h-[80px] w-[86px]' alt="1" />
                <img src={image} className='h-[80px] w-[86px]' alt="1" />
                <img src={image} className='h-[80px] w-[86px]' alt="1" />
                <img src={image} className='h-[80px] w-[86px]' alt="1" />
            </div>
            <div className='mt-[16px] text-[18px]'>
                <DarkButton text={"Связаться"} />
            </div>
        </div>
    );
}

export default CatalogArtistCard;