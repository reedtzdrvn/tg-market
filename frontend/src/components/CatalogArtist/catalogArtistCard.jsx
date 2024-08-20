import { DarkButton } from '../UI/Button/button';
import picture from "../../images/picture.png";
import image from "../../images/photo 1.png";
import star from "../../images/Star.svg";
import coins from "../../images/Coins.svg";
import { Link } from "react-router-dom"
import axios from '../../axios';
import { useState, useEffect } from 'react';
import Loader from '../UI/Loader/loader';
import CategoriesButton from '../UI/Categories/categoryButton';
import { useUser } from '../../context/userContext';

const CatalogArtistCard = ({ info, category }) => {

    const [reviews, setReviews] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get('/review', { params: { artistId: info.artistId._id } })
            .then((res) => {
                setReviews(res.data)
                setLoading(false)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    function ratingCalculate(reviews) {
        let rating = 0
        for (let i = 0; i < reviews.length; i++) {
            rating += reviews[i].grade
        }
        return parseFloat((rating / reviews.length).toFixed(1)) || 0;
    }

    if (loading) {
        return <Loader />
    }

    const handleContactClick = (event) => {
        event.stopPropagation();
        window.location.href = `https://t.me/${info.artistId.userName}`;
      };

    return (
        <Link to={`/artist/${info.artistId._id}/${category}`} className='bg-main px-[16px] py-[25px] shadow-custom '>
            <div className='flex items-center gap-[12px]'>
                <img src={process.env.REACT_APP_API_URL + info.mainPhoto} className='w-[88px] h-[88px] rounded-full ' alt="1" />
                <div className='flex flex-col gap-[12px] h-full justify-center'>
                    <span className='font-bold text-[24px]'>{info.artistId.firstName} {info.artistId.lastName}</span>
                    <div className='gap-2 flex flex-wrap'>
                        {info.categoryId.map((el) => (
                            <CategoriesButton key={el._id} category={el} />
                        ))}
                    </div>
                </div>
            </div>
            <div className='mt-[24px]'>
                <div className='flex justify-between'>
                    <div className='flex items-center'>
                        <img src={star} alt="2" className='-mt-1' /> <span className='text-[20px] font-bold mr-[8px] ml-[2px]'>{ratingCalculate(reviews)}</span> <span className='text-[16px]'> Отзывы ({reviews.length})</span>
                    </div>
                    <div className='flex items-center gap-1'>
                        <img src={coins} alt="3" /> <span className='text-[16px]'>{info.price} Р</span>
                    </div>
                </div>
            </div>
            <div className='my-[17px] opacity-50 text-[14px]'>
                {info.description}
            </div>
            <div className='flex justify-between flex-wrap opacity-50'>
                {info.photo.map((img) => <img src={process.env.REACT_APP_API_URL + img} className='w-[32%]' alt="1" />)}
            </div>
            <div className='mt-[16px] text-[18px]'>
                <div onClick={(e) => handleContactClick(e)}><DarkButton text={"Связаться"} /></div>
            </div>
        </Link>
    );
}

export default CatalogArtistCard;