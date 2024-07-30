import { Link } from "react-router-dom";
import calendar from "../../images/Calendar.svg"
import coins from "../../images/Coins.svg"
import zvezda from "../../images/zvezda.svg"
import { DarkButton, LightButton2 } from "../UI/Button/button";

const MyApplications = () => {
    return (
        <div className="px-[16px] bg-back">
            <div className="py-[44px] flex gap-[33px] justify-center">
                <Link to={"/my-add-application"} className="text-[20px] opacity-60">Создать заявку</Link><div className="underline font-bold text-[20px]">Мои заявки (6)</div>
            </div>
            <div className="flex flex-col gap-[24px] last:mb-[24px]">
                <div className="flex-col">
                    <div className="h-[59px] bg-customgreen flex items-center justify-center text-white text-[18px] font-bold">Активна</div>
                    <div className="py-[24px] px-[19px] bg-main">
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
                        <div className="flex gap-[14px] mt-[20px]">
                            <div>
                                <img className="w-[11px]" src={zvezda} alt="zvezda" />
                            </div>
                            <div className="text-[16px]">
                                Если вы редактируете, заявка потребует повторной модерации
                            </div>
                        </div>
                        <div className="mt-[20px]">
                            <LightButton2 text={"Редактировать"} />
                        </div>
                    </div>
                </div>
                <div className="flex-col">
                    <div className="h-[59px] bg-customyellow flex items-center justify-center text-white text-[18px] font-bold">Истекает срок размещения</div>
                    <div className="py-[24px] px-[19px] bg-main">
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
                        <div className="flex gap-[14px] mt-[20px]">
                            <div>
                                <img className="w-[11px]" src={zvezda} alt="zvezda" />
                            </div>
                            <div className="text-[16px]">
                                Если вы редактируете, заявка потребует повторной модерации
                            </div>
                        </div>
                        <div className="mt-[20px] flex gap-2">
                            <LightButton2 text={"Редактировать"} />
                            <LightButton2 text={"Отменить"} />
                        </div>
                    </div>
                </div>
                <div className="flex-col">
                    <div className="h-[59px] bg-custompurple flex items-center justify-center text-white text-[18px] font-bold">Завершена</div>
                    <div className="py-[24px] px-[19px] bg-main">
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
                        <div className="mt-[20px] text-[20px] font-bold">
                            <DarkButton text={"Написать отзыв"} />
                        </div>
                    </div>
                </div>
                <div className="flex-col">
                    <div className="h-[59px] bg-custompink flex items-center justify-center text-white text-[18px] font-bold">На модерации</div>
                    <div className="py-[24px] px-[19px] bg-main">
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
                        <div className="flex gap-[14px] mt-[20px]">
                            <div>
                                <img className="w-[11px]" src={zvezda} alt="zvezda" />
                            </div>
                            <div className="text-[16px]">
                                Если вы редактируете, заявка потребует повторной модерации
                            </div>
                        </div>
                        <div className="mt-[20px] flex gap-2">
                            <LightButton2 text={"Редактировать"} />
                            <LightButton2 text={"Отменить"} />
                        </div>
                    </div>
                </div>
                <div className="flex-col">
                    <div className="h-[59px] bg-customorange flex items-center justify-center text-white text-[18px] font-bold">Отменена</div>
                    <div className="py-[24px] px-[19px] bg-main opacity-60">
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
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MyApplications;