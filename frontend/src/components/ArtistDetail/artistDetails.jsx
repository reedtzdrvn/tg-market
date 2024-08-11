import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import bgartist from "../../images/bgartist.png";
import avatar from "../../images/avatar.png";
import star from "../../images/Star.svg";
import coins from "../../images/Coins.svg";
import inst from "../../images/Instagram.svg";
import vk from "../../images/VK.svg";
import tiktok from "../../images/Tiktok.svg";
import youtube from "../../images/Youtube.svg";
import photo from "../../images/photo 1.png";
import arrow from "../../images/arrow.svg";
import Review from "./review";
import crossIcon from "../../images/close.svg";
import { Link } from "react-router-dom";
import { DarkButton } from "../UI/Button/button";
import axios from "../../axios";
import CategoriesButton from "../UI/Categories/categoryButton";
import Loader from "../UI/Loader/loader";

const ArtistDetails = () => {
  const { id, idCategory } = useParams();
  const [showMore, setShowMore] = useState(false);
  const [showMoreReview, setShowMoreReview] = useState(false);
  const [visiblePhotos, setVisiblePhotos] = useState(8);
  const [visibleReview, setVisibleReview] = useState(3);
  const [request, setRequest] = useState({})
  const [loading, setLoading] = useState(true)

  const [reviews, setReviews] = useState([])

  useEffect(() => {
    if (id) {
      axios.get('/review', { params: { artistId: id } })
      .then((res)=>{
        setReviews(res.data)
      })
      .catch((err)=>{
        console.log(err)
      })
    }
  }, [id])

  const handleContactClick = () => {
    window.location.href = `https://t.me/${request.artistId.userName}`;
  };

  useEffect(() => {
    axios.get("/artist-request", { params: { artistId: id } })
      .then((res) => {
        setRequest(res.data[0])
        setLoading(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }, []);

  const toggleShowMore = () => {
    if (showMore) {
      setVisiblePhotos(8);
    } else {
      setVisiblePhotos(visiblePhotos + 8);
    }
    setShowMore(!showMore);
  };

  const toggleShowMoreReview = () => {
    if (showMoreReview) {
      setVisibleReview(3);
    } else {
      setVisibleReview(visiblePhotos + 3);
    }
    setShowMoreReview(!showMoreReview);
  };

  function ratingCalculate(reviews){
    let rating = 0
    for (let i = 0; i<reviews.length; i++){
      rating+=reviews[i].grade
    }
    return parseFloat((rating / reviews.length).toFixed(1));
  }

  const photos = new Array(28).fill(photo);

  if (loading) return <Loader />

  return (
    <div className="w-full font-[Inter] relative">
      <div className="w-full h-[160px] ">
        <img src={process.env.REACT_APP_API_URL + request.backGroundPhoto} className="w-full h-full" alt="bgartist" />
        <Link
          to={`/catalog-artist?id=${idCategory}`}
          className="absolute top-[16px] right-[16px] "
        >
          <img className="w-[16px]" src={crossIcon} alt="close" />
        </Link>
      </div>
      <div className="rounded-full flex justify-center w-full -mt-[80px]">
        <img className="w-[160px] h-[160px] rounded-full" src={process.env.REACT_APP_API_URL + request.mainPhoto} alt="picture" />
      </div>
      <div className="px-[16px]">
        <div className="text-center text-[30px] font-bold mt-[35px]">
          {request.artistId.lastName + " " + request.artistId.firstName}
        </div>
        <div className="flex items-center flex-wrap gap-3 justify-center mt-[24px]">
          {request.categoryId.map((el) => (
            <CategoriesButton category={el} />
          ))}
        </div>
        <div className="px-[8px]">
          <div className="flex flex-wrap items-center justify-center w-full mt-[24px] gap-3">
            <div className="flex gap-1 items-center justify-center mb-2">
              <img src={coins} className="w-[16px]" alt="coins" />
              <div className="text-[18px] font-bold">{request.price} Р</div>
            </div>
            {reviews.length>0 && <div className="flex items-center justify-center -mt-[8px]">
              <img src={star} alt="star" />
              <div className="ml-[1px] mr-[6px] font-bold text-[18px]">{ratingCalculate(reviews)}</div>
              <div className="underline text-[18px] font-bold">Отзывы ({reviews.length})</div>
            </div>}
          </div>
          <div className="mt-[36px] flex gap-5 justify-center items-center">
            {request.instagram && request.instagram !== " " && request.instagram !== "" && <Link to={`https://instagram.com/${request.instagram}`}><img src={inst} alt="inst" /></Link>}
            {request.vk && request.vk !== " " && request.vk !== "" && <Link to={`https://vk.com/${request.vk}`}><img src={vk} alt="vk" /></Link>}
            {request.youtube && request.youtube !== " " && request.youtube !== "" && <Link to={`${request.youtube}`}><img src={youtube} alt="youtube" /></Link>}
            {request.tiktok && request.tiktok !== " " && request.tiktok !== "" && <Link to={`https://tiktok.com/${request.tiktok}`}><img src={tiktok} alt="tiktok" /></Link>}
          </div>
          <div className="mt-[64px] text-[16px] leading-5">
            <div className="mb-[21px] font-bold text-[20px]">
              Обо мне. Услуги и стоимость
            </div>
            <div className="mb-[21px]">
              {request.description}
            </div>
            <div>г.{request.city}</div>
          </div>
        </div>
        <div className="mt-[39px]">
          <div className="font-bold text-[24px]">Галерея</div>
          <div className="mt-[16px] flex flex-wrap gap-[5px] justify-around">
            {request.photo.slice(0, visiblePhotos).map((photo, index) => (
              <img
                key={index}
                src={process.env.REACT_APP_API_URL + photo}
                className="w-[80px] h-[80px]"
                alt={`photo ${index + 1}`}
              />
            ))}
          </div>
          <div className="mt-[29px] flex justify-center">
            <img
              src={showMore ? arrow : arrow}
              alt="arrow"
              onClick={toggleShowMore}
              className={`cursor-pointer ${showMore ? `rotate-180` : ""}`}
            />
          </div>
        </div>
        {reviews.length > 0 && <div className="mt-[50px]">
          <div className="text-[20px] font-bold">Отзывы ({reviews.length})</div>
          <div className="flex flex-col gap-[23px] mt-[32px]">
            {reviews.slice(0, visibleReview).map((review) => (
              <Review review={review} key={review._id} />
            ))}
          </div>
          <div className="mt-[29px] flex justify-center">
            <img
              src={showMoreReview ? arrow : arrow}
              alt="arrow"
              onClick={toggleShowMoreReview}
              className={`cursor-pointer ${showMoreReview ? `rotate-180` : ""}`}
            />
          </div>
        </div> }
        <div className="mt-[54px] mb-[111px]">
          <DarkButton text={"Связаться"} onClick={handleContactClick} />
        </div>
      </div>
    </div>
  );
};

export default ArtistDetails;
