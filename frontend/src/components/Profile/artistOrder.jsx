import arrow from "../../images/arrow.svg"
import calendar from "../../images/Calendar.svg"
import coins from "../../images/Coins.svg"
import zvezda from "../../images/zvezda.svg"
import CategoriesButton from "../UI/Categories/categoryButton";
import { DarkButton, LightButton2 } from "../UI/Button/button";
import { useEffect, useState } from "react";
import axios from "../../axios"

const ArtistOrder = ({ el }) => {
    const [statuts, setStatuts] = useState([]);
    const [tap, setTap] = useState(false);

    useEffect(() => {
        axios.get("/status")
            .then((res) => {
                setStatuts(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleGoTg = (el) => {
        window.location.href = `https://t.me/${el.customerRequestId.customerId.userName}`;
    };

    function normDate(date) {
        let dateNorm = date.split("T")[0].split("-");
        return dateNorm[2] + "." + dateNorm[1] + "." + dateNorm[0];
    }

    const handleToggleTap = () => {
        setTap(prevTap => !prevTap);  // Используем функцию для обновления состояния на основе предыдущего значения
    };

    return (
        <div className="flex-col relative">
            <div onClick={handleToggleTap} className={`h-[59px] ${el.statusArtist.statusIdArtist.name === 'Создан' && "bg-customgreen" } ${el.statusArtist.statusIdArtist.name === 'Завершён' && "bg-custompurple"  }  ${el.statusArtist.statusIdArtist.name === 'Договор' && "bg-customyellow"  } ${el.statusArtist.statusIdArtist.name === 'Отменён' && "bg-customorange"  } flex items-center justify-center text-white text-[18px] font-bold relative`}>
                {el.statusArtist.statusIdArtist.name}
                <img className={`absolute right-4 text-white ${tap && "rotate-180"}`} src={arrow} alt="arrow" />
            </div>
            {tap && <div className="absolute w-full">
                {statuts.map((status) => {
                    if (status._id !== el.statusArtist.statusIdArtist._id && status.roleStatus==="artist") {
                        return (
                            <div key={status._id} className={`h-[59px] ${status.name === 'Создан' && "bg-customgreen" } ${status.name === 'Завершён' && "bg-custompurple"  }  ${status.name === 'Договор' && "bg-customyellow"  } ${status.name === 'Отменён' && "bg-customorange"  } flex items-center justify-center text-white text-[18px] font-bold relative`}>
                                {status.name}
                            </div>
                        )
                    }
                })}

            </div>}
            <div className="py-[24px] px-[19px] bg-main">
                <div className="text-[24px] font-bold">{el.customerRequestId.eventName}</div>
                <div className="mt-[20px] flex gap-[16px] flex-wrap">
                    {el.customerRequestId.categoryId.map((el) => {
                        return <CategoriesButton key={el._id} category={el} />;
                    })}
                </div>
                <div className="mt-[21px] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <img className="w-[18px]" src={calendar} alt="calendar" />
                        <div className="text-[16px] font-bold">{normDate(el.customerRequestId.date)}</div>
                    </div>
                    <div className="flex items-center gap-2">
                        <img src={coins} alt="coins" />
                        <div className="text-[16px] font-bold">{el.customerRequestId.fee} P</div>
                    </div>
                </div>
                <div className="mt-[20px]">
                    <LightButton2 onClick={() => handleGoTg(el)} text={"Связаться"} />
                </div>
            </div>
        </div>
    );
}

export default ArtistOrder;
