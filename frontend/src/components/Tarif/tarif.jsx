import axios from "../../axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import donereview from "../../images/donereview.png"
import Loader from "../UI/Loader/loader";
import attention from "../../images/attention.svg"
import { DarkButton, LightButton2 } from "../UI/Button/button";
import confetti from "../../images/Confetti.svg"
import { useUser } from "../../context/userContext";


const Tarif = () => {
    const { id } = useParams();
    const [tarif, setTarif] = useState({})
    const [promo, setPromo] = useState(null)
    const [inputPromo, setInputPromo] = useState('')
    const [promoData, setPromoData] = useState({})
    const [price, setPrice] = useState(0);
    const [name, setName] = useState('');
    const { user } = useUser();
    const [payload, setPayload] = useState(false);

    useEffect(() => {
        axios.get('/tarif', { params: { id: id } })
            .then((res) => {
                setTarif(res.data)
                setPrice(res.data.price)
                setName(res.data.name)
            })
            .catch(err => console.log(err))
    }, [])


    const usePromo = () => {
        // Сброс цены на исходную перед применением новой скидки
        setPrice(tarif.price); 
    
        axios.get('/promo', { params: { promo: inputPromo, tarif: tarif._id } })
            .then((res) => {
                if (res.status === 200) {
                    setPromoData(res.data);
                    setPromo(true);
    
                    // Применение скидки после сброса цены
                    if (res.data.percentPrice !== null && res.data.percentPrice !== undefined) {
                        const discountedPrice = tarif.price * (1 - res.data.percentPrice / 100);
                        setPrice(Math.max(discountedPrice, 0)); // Убедимся, что цена не меньше 0
                    } else if (res.data.fixPrice !== null && res.data.fixPrice !== undefined) {
                        const discountedPrice = tarif.price - res.data.fixPrice;
                        setPrice(Math.max(discountedPrice, 0)); // Убедимся, что цена не меньше 0
                    }
                }
            })
            .catch((err) => {
                console.log(err);
                setPromo(false);
                setPromoData({});
            });
    }
    


    const handleSubmit = () => {
        pay();
    };

    const pay = function () {

        if (price === 0) {
            handleSuccessfulPayment();
            return
        }

        if (!window.pw) {
            console.error("PayWidget is not loaded");
            return;
        }

        var widget = new window.pw.PayWidget();

        widget.pay(
            {
                serviceId: 24592,
                key: "04a25dadd74d683f2c82197f7b4dabbcec3c17e8ff9ad40eb8473d73ff6ddbb2835bcdb159a96ebcc5e52df854f22322933d1cdd7e16a40f25bace07937810f06d",
            },
            {
                MetaData: {
                    PaymentType: "Pay",
                },
                PaymentRequest: {
                    OrderId: String(Math.floor(Math.random() * (100000 - 1000) + 1000)),
                    Amount: String(price),
                    Currency: "RUB",
                    Description: `Оплата подписки "${name}"`,
                },
            }
            , {
                onSuccess: function (res) {
                    handleSuccessfulPayment();
                },
                onError: function (res) {
                    handleErrorPayment();
                },
                onClose: function (res) {
                    window.location.reload();
                },
            });
    };

    const handleSuccessfulPayment = () => {
        let dateExpression = new Date();

        if (name === 'Пробный период') {
            dateExpression.setDate(dateExpression.getDate() + 3);
        } else if (name === 'Премиум 1 месяц') {
            dateExpression.setMonth(dateExpression.getMonth() + 1);
        } else if (name === 'Премиум 3 месяца') {
            dateExpression.setMonth(dateExpression.getMonth() + 3);
        } else if (name === 'Премиум 12 месяцев') {
            dateExpression.setMonth(dateExpression.getMonth() + 12);
        }

        const dateNow = new Date().toISOString();
        const dateExpressionISO = dateExpression.toISOString();

        axios.patch('/promo', {id: promoData._id})

        axios.post('/subscription', {
            userId: user._id,
            nameSubscription: name,
            dateNow: dateNow,
            dateExpression: dateExpressionISO
        })
            .then(() => {
                setPayload(true);
                window.location.href = '/'
            })
            .catch(error => {
                console.error('Error adding subscription:', error);
            })
    };

    const handleErrorPayment = () => {
        console.log('ошибка оплаты');
    };

    const handleExit = () => {
        window.location.href = '/subscription'
    };

    const handleGoHome = () => {
        window.location.href = '/';
    };

    if (!tarif) {
        return <Loader />
    }

    console.log(promo)

    return (
        <div className="px-[16px] pt-[60px]">
            <div className="text-center">
                <div className="flex justify-center items-center"><img src={donereview} alt="done" /></div>
                <div className="mt-[18px] font-bold text-[24px]">Вы подключаете<br /> «{tarif?.name}»</div>
            </div>
            <div className="mt-[16px] ">
                {tarif.price > 0 && <>
                    <div className="text-[16px] opacity-55">Введите промокод</div>
                    <div className="flex gap-1 mt-1 text-[12px] opacity-55 items-center">
                        <img src={attention} alt="attention" />Нажмите «Применить» после введения промокода
                    </div>
                    <div className="mt-[8px] h-[59px] py-[20px] px-[24px] flex justify-between items-center border-[2px] border-black border-solid">
                        <input value={inputPromo} onChange={(e) => setInputPromo(e.target.value)} type="text" placeholder="PROMOCODE" />
                        <div onClick={usePromo}>Применить</div>
                    </div></>}
                {promo === true && <div className="mt-[20px] px-[23px] py-[17px] bg-back">
                    <div className="flex gap-7 justify-between]">
                        <div className="flex justify-between items-center">
                            <img src={confetti} alt="confetti" />
                        </div>
                        <div className="leading-5">
                            Поздравляем, ваш промокод дарит вам {promoData.fixPrice !== null && promoData.fixPrice !== undefined ? `скидку ${promoData.fixPrice}Р ` : promoData.percentPrice !== null && promoData.percentPrice !== undefined ? promoData.percentPrice === 100 ? `бесплатную подписку ` : `скидку ${promoData.percentPrice}% ` : ""} на указанный период
                        </div>
                    </div>
                </div>}
                {promo === false && <div className="mt-[20px]">Промокод не найден</div>}
                <div className="mt-[20px]">
                    По истечению срока действия мы напомним вам о продлении тарифа
                </div>
                <div className="mt-[46px]">
                    <div className="opacity-55 ">Ваша подписка</div>
                    <div className="mt-[18px] flex justify-between">
                        <div className="text-[18px] font-bold">{tarif.name}</div>
                        <div className="text-[18px]">
                            {promo && promoData.percentPrice || promoData.fixPrice ? (
                                <>
                                    <span className="line-through mr-2">{tarif.price} Р</span>
                                </>
                            ) : (
                                <span>{price} Р</span>
                            )}
                        </div>
                    </div>
                    <div className="mt-[18px] flex justify-between">
                        <div className="text-[24px] font-bold">Итого</div>
                        <div className="text-[24px] font-bold">{price} Р</div>
                    </div>
                    <div className="my-[46px] flex flex-col gap-3" >
                        <DarkButton text={"Подтвердить"} onClick={handleSubmit} />
                        <LightButton2 text={"Отмена"} onClick={handleExit} />
                    </div>
                </div>
            </div>
        </div >
    );
}

export default Tarif;
