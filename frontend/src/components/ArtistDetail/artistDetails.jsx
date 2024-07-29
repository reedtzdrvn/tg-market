import React, { useState } from "react";
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
import { DarkButton } from "../UI/Button/button";
import { useUser } from "../../context/userContext";

const ArtistDetails = () => {
    const { id } = useParams();
    const [showMore, setShowMore] = useState(false);
    const [showMoreReview, setShowMoreReview] = useState(false);
    const [visiblePhotos, setVisiblePhotos] = useState(8);
    const [visibleReview, setVisibleReview] = useState(3);

    const {user} = useUser()
    const handleContactClick = () => {
        window.location.href = `tg://resolve?domain=${user.userName}`;
    }

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


    const photos = new Array(28).fill(photo);
    const reviews = new Array(28).fill(<Review />);

    return (
        <div className="w-full">
            <div className="w-full h-[160px]">
                <img src={bgartist} className="w-full h-full" alt="bgartist" />
            </div>
            <div className="rounded-full flex justify-center w-full -mt-[80px]">
                <img className="w-[160px] h-[160px]" src={avatar} alt="picture" />
            </div>
            <div className="px-[16px]">
                <div className="text-center text-[30px] font-bold mt-[35px]">Ира Петрова</div>
                <div className="flex items-center flex-wrap gap-3 justify-center mt-[24px]">
                    <div className="w-max flex justify-center items-center">
                        <div className="bg-customyellow px-[16px] py-[4px] rounded-[15px] text-[12px]">Танцы</div>
                    </div>
                    <div className="w-max flex justify-center items-center">
                        <div className="bg-customyellow px-[16px] py-[4px] rounded-[15px] text-[12px]">Муз. группа</div>
                    </div>
                </div>
                <div className="px-[8px]">
                    <div className="flex flex-wrap items-center justify-center w-full mt-[24px] gap-3">
                        <div className="flex gap-1 items-center justify-center mb-2">
                            <img src={coins} className="w-[16px]" alt="coins" />
                            <div className="text-[18px] font-bold">5.000 - 20.000Р</div>
                        </div>
                        <div className="flex items-center justify-center -mt-[8px]">
                            <img src={star} alt="star" />
                            <div className="ml-[1px] mr-[6px] font-bold text-[18px]">4.5</div>
                            <div className="underline text-[18px] font-bold">Отзывы (15)</div>
                        </div>
                    </div>
                    <div className="mt-[36px] flex gap-5 justify-center items-center">
                        <img src={inst} alt="inst" />
                        <img src={vk} alt="vk" />
                        <img src={youtube} alt="youtube" />
                        <img src={tiktok} alt="tiktok" />
                    </div>
                    <div className="mt-[64px] text-[16px] leading-5">
                        <div className="mb-[21px] font-bold text-[20px]">Обо мне. Услуги и стоимость</div>
                        <div className="mb-[21px]">
                            Привет! Меня зовут Ира. Я страстно люблю танцы и считаю, что они являются моим способом самовыражения. Мое тело говорит на языке музыки, а движения — выражение души.
                        </div>
                        <div className="mb-[24px]">
                            Выступление до 30 минут - 5 000р<br />
                            Выступление 30-60 минут - 10 000р<br />
                            Индивидуальная разработка танцевального номера - 20 000р
                        </div>
                        <div>г.Екатеринбург</div>
                    </div>
                </div>
                <div className="mt-[39px]">
                    <div className="font-bold text-[24px]">Галерея</div>
                    <div className="mt-[16px] flex flex-wrap gap-[8px] justify-around">
                        {photos.slice(0, visiblePhotos).map((photo, index) => (
                            <img key={index} src={photo} className="w-[90px] h-[90px]" alt={`photo ${index + 1}`} />
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
                <div className="mt-[50px]">
                    <div className="text-[20px] font-bold">Отзывы (15)</div>
                    <div className="flex flex-col gap-[23px] mt-[32px]">
                        {reviews.slice(0, visibleReview).map((review, index) => (
                            <Review />
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
                </div>
                <div className="mt-[54px] mb-[111px]">
                    <DarkButton text={"Связаься"} onClick={handleContactClick} />
                </div>
            </div>
        </div>
    );
};

export default ArtistDetails;
