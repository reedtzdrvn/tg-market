import { useEffect, useState } from "react";
import { useSubscription } from "../../context/subscriptionContext";
import backgroundPayment from "../../images/backgroundPayment.png";
import calendar from "../../images/Calendar.svg";
import coins from "../../images/Coins.svg";
import { DarkButton, LightButton2 } from "../UI/Button/button";
import axios from "../../axios";

const Subscription = () => {
    const { subscription } = useSubscription();
    const [subOn, setSubOn] = useState(false);
    const [tarif, setTarif] = useState([])

    useEffect(() => {
        axios.get('/tarif')
            .then((res) => {
                setTarif(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])

    useEffect(() => {
        if (subscription === null || new Date(subscription.dateExpression) < new Date()) {
            setSubOn(false);
        } else {
            setSubOn(true);
        }
    }, [subscription]);

    // const handleGoSub = (name, price) => {
    //     setPrice(price);
    //     setName(name);
    //     setPopupMessage(`Вы подключаете ${name === 'Пробный период' ? 'пробный период "3 дня бесплатно"' : `"` + `${name}` + `"`}. По истечению срока действия напомним о продлении тарифа👌`);
    //     setShowPopup(true);
    // };

    const handleGoSub = (id) => {
        window.location.href = `/tarif/${id}`
    }

    return (
        <div className="bg-back relative min-h-screen">
            <div className="absolute mt-[313px] pb-[112px] z-[1]">
                <img src={backgroundPayment} alt="backgroundPayment" />
            </div>
            <div className="relative z-[10] text-center px-[16px]">
                <div className="pt-[82px] font-bold text-[30px] text-center leading-9">
                    Выберите удобный тариф, чтобы заявить о себе и получать заказы
                </div>
                <div className="mt-[32px] leading-6">
                    После активации тарифа можно оставлять неограниченное количество откликов за оплаченный период
                </div>
                <div className="mt-[67px] flex flex-wrap justify-center gap-[16px] pb-[98px]">
                    {tarif.map((el) => ( <div key={el._id} className="rounded-[15px] px-[16px] py-[32px] bg-main shadow-custom flex-grow cartTarif flex flex-col">
                            <div className="font-bold text-center leading-[32px] text-[24px]">
                                {el.name}
                            </div>
                            <div className="mt-[15px] flex items-center text-[16px] font-bold gap-[9px]">
                                <img src={calendar} className="h-[18px]" alt="calendar" />{el.term}
                            </div>
                            <div className="mt-[15px] flex items-center text-[16px] font-bold gap-[9px]">
                                <img src={coins} className="h-[18px]" alt="calendar" />{el.price === 0 ? 'бесплатно' : el.price + ' ' + 'P'}
                            </div>
                            <div className="opacity-30 text-[16px] text-left mt-[15px] mb-[15px] flex-grow">
                                {el.price === 0 ? 'Полный доступ к базе' : (
                                    parseInt(el.term.split(' ')[0])
                                        ? `${Math.floor(el.price / parseInt(el.term.split(' ')[0]))} P/мес`
                                        : 'Invalid term'
                                )}
                            </div>
                            {!subOn && <div className="flex flex-col justify-end h-full">
                                {el.name === 'Пробный период' ? <DarkButton onClick={() => handleGoSub(el._id)} text={"Создать анкету"} /> : <LightButton2 onClick={() => handleGoSub(el._id)} text={"Продолжить"} />}
                            </div>}
                            {subscription?.nameSubscription === el.name && new Date(subscription.dateExpression) > new Date() && <div className="flex flex-col justify-end h-full">
                                Подписка активна до {subscription?.dateExpression.split('T')[0]}
                            </div>}
                        </div>
                    )
                    )}
                </div>
            </div >
        </div >
    );
};

export default Subscription;
