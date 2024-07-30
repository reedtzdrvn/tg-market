import { Link } from "react-router-dom";
import calendar from "../../images/Calendar.svg"
import coins from "../../images/Coins.svg"
import zvezda from "../../images/zvezda.svg"
import { DarkButton, LightButton2 } from "../UI/Button/button";
import { useState } from "react";
import arrow from "../../images/arrow.svg"


const MyRequest = () => {
    const [tap, setTap] = useState(false)
    return (
        <div className="px-[16px]">
            <div className="py-[44px] flex gap-[33px] justify-center">
                <Link to={"/my-add-request"} className=" text-[20px] opacity-60">Моя анкета</Link><div className="text-[20px]  underline font-bold " >Мои заказы (6)</div>
            </div>
            <div className="flex flex-col gap-[24px] last:mb-[24px]">
                <div className="flex-col">
                    <div onClick={()=>setTap(!tap)} className="h-[59px] bg-customgreen flex items-center justify-center text-white text-[18px] font-bold relative">Активна <img className={`absolute right-4 text-white ${tap ? 'rotate-180' : ""}`} src={arrow} alt="arrow"/></div>
                    {tap && <div className="py-[24px] px-[19px] bg-main">
                        <div className="text-[24px] font-bold">Детский праздник для двух девочек</div>
                        <div className="mt-[20px] flex gap-[16px]">
                            <div className="bg-custompink px-[16px] py-[4px] rounded-[10px] text-[12px]">Ведущие</div>
                            <div className="bg-customyellow px-[16px] py-[4px] rounded-[10px] text-[12px]">Танцы</div>
                        </div>
                        <div className="mt-[21px] flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <img className="w-[18px]" src={calendar} alt="calendar" /> <div className="text-[16px] font-bold">11.02.2024</div>
                            </div>
                            <div className="flex items-center gap-2" >
                                <img src={coins} alt="coins" /> <div className="text-[16px] font-bold">10 000 - 40 000 P</div>
                            </div>
                        </div>
                        <div className="mt-[20px]">
                            <LightButton2 text={"Связаться"} />
                        </div>
                    </div>}
                </div>
            </div>
        </div>
    );
}

export default MyRequest;