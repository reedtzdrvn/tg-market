import { DarkButton } from '../UI/Button/button';
import picture from "../../images/picture.png";
import image from "../../images/photo 1.png";
import star from "../../images/Star.svg";
import coins from "../../images/Coins.svg";
import { Link } from "react-router-dom"

const CatalogArtistCard = ({info, category}) => {

    const handleContactClick = () => {
        window.location.href = 'https://t.me/XrenMoX';
    };
    
    return (
        <div className='bg-main px-[16px] py-[25px] shadow-custom '>
            <div className='flex items-center gap-[12px]'>
                <img src={picture} className='w-[88px] h-[88px] rounded-full ' alt="1" />
                <div className='flex flex-col gap-[12px] h-full justify-center'>
                    <span className='font-bold text-[24px]'>{info.artistId.firstName} {info.artistId.lastName}</span>
                    <span className={`px-[16px] py-[4px] text-[12px] rounded-[10px] w-max bg-custom${info.categoryId.color}`}>{info.categoryId.name}</span>
                </div>
            </div>
            <div className='mt-[24px]'>
                <div className='flex justify-between'>
                    <div className='flex items-center'>
                        <img src={star} alt="2" className='-mt-1' /> <span className='text-[20px] font-bold mr-[8px] ml-[2px]'>4.5</span> <span className='text-[16px]'> Отзывы (15)</span>
                    </div>
                    <div className='flex items-center gap-1'>
                        <img src={coins} alt="3" /> <span className='text-[16px]'>{info.price} Р</span>
                    </div>
                </div>
            </div>
            <div className='my-[17px] opacity-50 text-[14px]'>
                {info.description}
            </div>
            <div className='flex gap-[6px] justify-between flex-wrap opacity-50'>
                {info.photo.map((img) => <img src={`http://localhost:4444${img}`} className='h-[80px] w-[80px]' alt="1" />)}
            </div>
            <div className='mt-[16px] text-[18px]'>
                <Link to={`/artist/${info.artistId._id}/${category}`}><DarkButton text={"Связаться"}/></Link>
            </div>
        </div>
    );
}

export default CatalogArtistCard;