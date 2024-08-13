import { Link } from "react-router-dom";
import calendar from "../../images/Calendar.svg"
import coins from "../../images/Coins.svg"
import zvezda from "../../images/zvezda.svg"
import { DarkButton, LightButton2 } from "../UI/Button/button";
import { useEffect, useState } from "react";
import arrow from "../../images/arrow.svg"
import { useUser } from "../../context/userContext";
import axios from "../../axios";
import Loader from "../UI/Loader/loader";
import CategoriesButton from "../UI/Categories/categoryButton";


const MyRequest = () => {
    const [tap, setTap] = useState(false)
    const { user } = useUser()
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (user) {
            axios.get("/order", { params: { artistId: user._id } })
                .then((res) => {
                    setOrders(res.data)
                    setLoading(false)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }, [user])

    const handleGoTg = (el) =>{
        window.location.href = `https://t.me/${el.customerRequestId.customerId.userName}`;
    }

    function normDate(date) {
        let dateNorm = date.split("T")[0].split("-")
        return dateNorm[2] + "." + dateNorm[1] + "." + dateNorm[0]
      }

    if (loading){
        return <Loader />
    }

    return (
        <div className="px-[16px]">
            <div className="py-[44px] flex gap-[33px] justify-center">
                <Link to={"/my-add-request"} className=" text-[20px] opacity-60">Моя анкета</Link><div className="text-[20px]  underline font-bold " >Мои заказы ({orders.length})</div>
            </div>
            <div className="flex flex-col gap-[24px] last:mb-[24px]">
                {orders.map((el) => (
                    <div className="flex-col">
                        <div className="h-[59px] bg-customgreen flex items-center justify-center text-white text-[18px] font-bold relative">{el.statusArtist.statusIdArtist.name} <img className={`absolute right-4 text-white`} src={arrow} alt="arrow" /></div>
                        <div className="py-[24px] px-[19px] bg-main">
                            <div className="text-[24px] font-bold">{el.customerRequestId.eventName}</div>
                            <div className="mt-[20px] flex gap-[16px] flex-wrap">
                                {el.customerRequestId.categoryId.map((el)=>{
                                    return <CategoriesButton category={el} />
                                })}
                            </div>
                            <div className="mt-[21px] flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <img className="w-[18px]" src={calendar} alt="calendar" /> <div className="text-[16px] font-bold">{normDate(el.customerRequestId.date)}</div>
                                </div>
                                <div className="flex items-center gap-2" >
                                    <img src={coins} alt="coins" /> <div className="text-[16px] font-bold">{el.customerRequestId.fee} P</div>
                                </div>
                            </div>
                            <div className="mt-[20px]">
                                <LightButton2 onClick={() => handleGoTg(el)} text={"Связаться"} />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MyRequest;