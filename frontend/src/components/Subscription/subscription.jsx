import { useEffect, useState } from "react";
import { useSubscription } from "../../context/subscriptionContext";
import backgroundPayment from "../../images/backgroundPayment.png";
import calendar from "../../images/Calendar.svg";
import coins from "../../images/Coins.svg";
import { DarkButton, LightButton2 } from "../UI/Button/button";
import axios from "../../axios";
import { useUser } from "../../context/userContext";

const Subscription = () => {
    const { subscription } = useSubscription()
    const [showPopup, setShowPopup] = useState(false)
    const [popupMessage, setPopupMessage] = useState('')
    const [price, setPrice] = useState(0)
    const [name, setName] = useState('')
    const { user } = useUser()
    const [payload, setPayload] = useState(false)
    const [subOn, setSubOn] = useState(false)

    useEffect(() => {
        if (subscription === null || new Date(subscription.dateExpression) < new Date()) {
            setSubOn(false); // Subscription is expired or does not exist
        } else {
            setSubOn(true);  // Subscription is active
        }
    }, [subscription]); // Add subscription to the dependency array


    const handleGoSub = (name, price) => {
        setPrice(price)
        setName(name)
        setPopupMessage(`Вы уверены, что хотите подключить подписку "${name} за ${price}Р`)
        setShowPopup(true)
    }


    const handleSubmit = () => {
        setShowPopup(false);

        let dateExpression = new Date();

        if (name === 'Пробный период') {
            dateExpression.setDate(dateExpression.getDate() + 3); // Add 3 days
        } else if (name === 'Премиум 1 месяц') {
            dateExpression.setMonth(dateExpression.getMonth() + 1); // Add 1 month
        } else if (name === 'Премиум 3 месяца') {
            dateExpression.setMonth(dateExpression.getMonth() + 3); // Add 3 months
        } else if (name === 'Премиум 12 месяцев') {
            dateExpression.setMonth(dateExpression.getMonth() + 12); // Add 12 months
        }

        const dateNow = new Date().toISOString();
        const dateExpressionISO = dateExpression.toISOString();

        axios.post('/subscription', {
            userId: user._id,
            nameSubscription: name,
            dateNow: dateNow,
            dateExpression: dateExpressionISO
        })
            .then(() => {
                setPayload(true)
                setPopupMessage(`Вы успешно подключили подписку "${name}"`)
                setShowPopup(true)
            })
            .catch(error => {
                console.error('Error adding subscription:', error);
            });
    };


    const handleExit = () => {
        setShowPopup(false)
    }

    const handleGoHome = () => {
        window.location.href = '/'
    }

    return (
        <div className="bg-back relative min-h-screen">
            {showPopup &&
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-md shadow-lg max-w-xs text-center">
                        <p className="text-lg font-semibold">{popupMessage}</p>
                        <div className="mt-4 flex flex-col gap-3 justify-around text-[18px]">
                            {payload && <LightButton2 onClick={() => handleGoHome()} text="Продолжить" />}
                            {!payload && <>
                                <LightButton2 onClick={() => handleExit()} text="Отмена" />
                                <DarkButton onClick={() => handleSubmit()} text="Подтвердить" />
                            </>}
                        </div>
                    </div>
                </div>}
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
                    {subscription === null && <div className="rounded-[15px] px-[16px] py-[32px] bg-main shadow-custom flex-grow cartTarif flex flex-col">
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
                        {!subOn && <div className="flex flex-col justify-end h-full">
                            <DarkButton onClick={() => handleGoSub('Пробный период', 0)} text={"Создать анкету"} />
                        </div>}
                        {subscription?.nameSubscription  === 'Пробный период' && new Date(subscription.dateExpression) > new Date() && <div className="flex flex-col justify-end h-full">
                            Подписка активна до {subscription?.dateExpression.split('T')[0]}
                        </div>}
                    </div>}

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
                        {!subOn && <div className="flex flex-col justify-end h-full">
                            <LightButton2 onClick={() => handleGoSub('Премиум 1 месяц', 990)} text={"Продолжить"} />
                        </div>}
                        {subscription?.nameSubscription === 'Премиум 1 месяц' && new Date(subscription.dateExpression) > new Date() && (
                            <div className="flex flex-col justify-end h-full">
                                Подписка активна до {subscription.dateExpression.split('T')[0]}
                            </div>
                        )}

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
                        {!subOn && <div className="flex flex-col justify-end h-full">
                            <LightButton2 onClick={() => handleGoSub('Премиум 3 месяца', 2499)} text={"Продолжить"} />
                        </div>}
                        {subscription?.nameSubscription === 'Премиум 3 месяца' && new Date(subscription.dateExpression) > new Date()  && <div className="flex flex-col justify-end h-full">
                            Подписка активна до {subscription?.dateExpression.split('T')[0]}
                        </div>}
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
                        {!subOn && <div className="flex flex-col justify-end h-full">
                            <LightButton2 onClick={() => handleGoSub('Премиум 12 месяцев', 6999)} text={"Продолжить"} />
                        </div>}
                        {subscription?.nameSubscription  === 'Премиум 12 месяцев' && new Date(subscription.dateExpression) > new Date() && <div className="flex flex-col justify-end h-full">
                            Подписка активна до {subscription?.dateExpression.split('T')[0]}
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Subscription;
