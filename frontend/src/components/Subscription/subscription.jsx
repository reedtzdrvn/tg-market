import backgroundPayment from "../../images/backgroundPayment.png";
import calendar from "../../images/Calendar.svg";
import coins from "../../images/Coins.svg";
import { DarkButton, LightButton2 } from "../UI/Button/button";

const Subscription = () => {
    return (
        <div className="bg-back relative min-h-screen">
            <div className="absolute mt-[313px] mb-[112px] z-[1]">
                <img src={backgroundPayment} alt="backgroundPayment" />
            </div>
            <div className="relative z-[10] text-center px-[16px]">
                <div className="pt-[82px] font-bold text-[30px] text-center leading-9">
                    Выберите удобный тариф, чтобы заявить о себе и получать заказы
                </div>
                <div className="mt-[32px] leading-6">
                    После активации тарифа можно оставлять неограниченное количество откликов за оплаченный период
                </div>
                <div className="mt-[67px] flex flex-wrap justify-center gap-[16px] mb-[98px]">
                    <div className="rounded-[15px] px-[16px] py-[32px] bg-main shadow-custom flex-grow cartTarif flex flex-col">
                        <div className="font-bold text-center leading-[32px] text-[24px]">
                            Пробный период
                        </div>
                        <div className="mt-[15px] flex items-center text-[16px] font-bold gap-[9px]">
                            <img src={calendar} className="h-[18px]" alt="calendar" />3 дня
                        </div>
                        <div className="mt-[15px] flex items-center text-[16px] font-bold gap-[9px]">
                            <img src={coins} className="h-[18px]" alt="calendar" />бесплатно
                        </div>
                        <div className="opacity-30 text-[16px] text-left mt-[15px] mb-[15px] flex-grow">
                            Полный доступ к базе
                        </div>
                        <div className="flex flex-col justify-end h-full">
                            <DarkButton text={"Создать анкету"} />
                        </div>
                    </div>

                    <div className="rounded-[15px] px-[16px] py-[32px] bg-main shadow-custom flex-grow cartTarif flex flex-col">
                        <div className="font-bold text-center leading-[32px] text-[24px]">
                            Премиум 1 месяц
                        </div>
                        <div className="mt-[15px] flex items-center text-[16px] font-bold gap-[9px]">
                            <img src={calendar} className="h-[18px]" alt="calendar" />1 месяц
                        </div>
                        <div className="mt-[15px] flex items-center text-[16px] font-bold gap-[9px]">
                            <img src={coins} className="h-[18px]" alt="calendar" />990 Р
                        </div>
                        <div className="opacity-30 text-[16px] text-left mt-[15px] mb-[15px]">
                            990 Р/мес
                        </div>
                        <div className="flex flex-col justify-end h-full">
                            <LightButton2 text={"Продолжить"} />
                        </div>
                    </div>

                    <div className="rounded-[15px] px-[16px] py-[32px] bg-main shadow-custom flex-grow cartTarif flex flex-col">
                        <div className="font-bold text-center leading-[32px] text-[24px]">
                            Премиум 3 месяца
                        </div>
                        <div className="mt-[15px] flex items-center text-[16px] font-bold gap-[9px]">
                            <img src={calendar} className="h-[18px]" alt="calendar" />3 месяца
                        </div>
                        <div className="mt-[15px] flex items-center text-[16px] font-bold gap-[9px]">
                            <img src={coins} className="h-[18px]" alt="calendar" />2 499 Р
                        </div>
                        <div className="opacity-30 text-[16px] text-left mt-[15px] mb-[15px]">
                            833 Р/мес
                        </div>
                        <div className="flex flex-col justify-end h-full">
                            <LightButton2 text={"Продолжить"} />
                        </div>
                    </div>

                    <div className="rounded-[15px] px-[16px] py-[32px] bg-main shadow-custom flex-grow cartTarif flex flex-col">
                        <div className="font-bold text-center leading-[32px] text-[24px]">
                            Премиум 12 месяцев
                        </div>
                        <div className="mt-[15px] flex items-center text-[16px] font-bold gap-[9px]">
                            <img src={calendar} className="h-[18px]" alt="calendar" />12 месяцев
                        </div>
                        <div className="mt-[15px] flex items-center text-[16px] font-bold gap-[9px]">
                            <img src={coins} className="h-[18px]" alt="calendar" />6 999 Р
                        </div>
                        <div className="opacity-30 text-[16px] text-left mt-[15px] mb-[15px]">
                            583 Р/мес
                        </div>
                        <div className="flex flex-col justify-end h-full">
                            <LightButton2 text={"Продолжить"} />
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Subscription;
