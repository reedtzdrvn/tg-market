import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from '../../axios';
import FrameAdd from "../../images/FrameAdd.png";
import zvezda from "../../images/zvezda.svg";
import attention from "../../images/attention.svg";
import { useCategories } from "../../context/categoryContext";
import { DarkButton } from "../UI/Button/button";
import { useUser } from '../../context/userContext';
import Loader from '../UI/Loader/loader';

const AddMyApplication = () => {

    const { categories } = useCategories();
    const navigate = useNavigate();
    const {user} = useUser()

    const [applications, setApplications] = useState([])
    const [loading, setLoading] = useState(true)

    
    useEffect(() => {
        if (user) {
            axios.get(`/customer-requests?customerId=${user._id}`)
                .then((res) => {
                    setApplications(res.data);
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    setLoading(false);
                });
        }
    }, [user]);

    const [formData, setFormData] = useState({
        name: '',
        telegramNick: '',
        phoneNumber: '',
        eventName: '',
        category: [],
        city: '',
        feeFrom: '',
        feeTo: '',
        eventDetails: '',
        date: '',
        timeInterval: '',
        guestCount: '50-100',
    });

    const cities = [
        'Екатеринбург',
        'Москва',
        'Санкт-Петербург',
        'Новосибирск',
        'Казань',
        'Челябинск',
    ];

    const handleChange = (e) => {
        const { name, value, options } = e.target;
        if (name === 'category') {
            const selectedOptions = Array.from(options).filter(option => option.selected).map(option => option.value);
            setFormData({ ...formData, [name]: selectedOptions });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    useEffect(() => {
        if (user && categories) {
            setFormData(prevData => ({
                ...prevData,
                name: `${user?.lastName || ''} ${user?.firstName || ''}`,
                telegramNick: user.userName,
                phoneNumber: user.phoneNumber,
                city: user.setCitySearch,
                category: [categories[0]._id]
            }));
        }
    }, [user, categories]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/customer-request', {fee: formData.feeFrom + ' - ' + formData.feeTo ,eventName: formData.eventName,description:formData.eventDetails, city: formData.city, customerId: user._id, categoryId: formData.category ,date: formData.date, time: formData.timeInterval, guestCount: formData.guestCount});
            const response2 = await axios.patch('/user', {telegramId: user.telegramId, firstName: formData.name.split(" ")[0], lastName: formData.name.split(" ")[1], userName: formData.telegramNick})
            if (response.status === 201) {
                window.location.href = "/application-done";
            }
        } catch (error) {
            console.error('Error submitting form', error);
        }
    };

    if (loading){
        return <Loader />
    }

    return (
        <div className="px-[16px] bg-main">
            <div className="py-[44px] flex gap-[33px] justify-center">
                <div className="underline font-bold text-[20px]">Создать заявку</div><Link to={"/my-applications"} className="text-[20px] opacity-60" >Мои заявки ({applications.length})</Link>
            </div>
            <div>
            <form className=" px-[16px]" onSubmit={handleSubmit}>
                <div>
                    <div className="text-[20px] font-bold">Контактная информация</div>
                </div>
                <div className="mt-[27px] flex flex-col gap-[24px]">
                    <div className="flex flex-col gap-[8px]">
                        <div className="flex text-[14px] opacity-70 gap-[8px]">
                            <div>Имя Фамилия</div>
                            <div><img src={zvezda} alt="zvezda" /></div>
                        </div>
                        <div className="flex gap-2 text-[12px] items-center">
                            <img src={attention} alt="attention" />Так ваше имя увидит заказчик
                        </div>
                        <div>
                            <input
                                type="text"
                                name="name"
                                placeholder="Иван Иванов"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="px-[24px] py-[16px] border-black border-solid border-2 w-full"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-[8px]">
                        <div className="flex text-[14px] opacity-70 gap-[8px]">
                            <div>Ваш ник Telegram</div>
                            <div><img src={zvezda} alt="zvezda" /></div>
                        </div>
                        <div className="flex gap-2 text-[12px] items-center">
                            <img src={attention} alt="attention" />Проверьте, что у вас открыты личные сообщения в Telegram
                        </div>
                        <div>
                            <input
                                type="text"
                                name="telegramNick"
                                placeholder="@yournick"
                                value={formData.telegramNick}
                                onChange={handleChange}
                                required
                                className="px-[24px] py-[16px] border-black border-solid border-2 w-full"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-[8px]">
                        <div className="flex text-[14px] opacity-70 gap-[8px]">
                            <div>Ваш номер телефона</div>
                            <div><img src={zvezda} alt="zvezda" /></div>
                        </div>
                        <div>
                            <input
                                type="text"
                                name="phoneNumber"
                                placeholder="+7 999 000 00 00"
                                value={formData.phoneNumber}
                                onChange={handleChange}
                                required
                                className="px-[24px] py-[16px] border-black border-solid border-2 w-full"
                            />
                        </div>
                    </div>
                </div>
                <div className="mt-[48px]">
                    <div className="text-[20px] font-bold">Ваша заявка</div>
                </div>
                <div className="mt-[27px] flex flex-col gap-[24px]">
                    <div className="flex flex-col gap-[8px]">
                        <div className="flex text-[14px] opacity-70 gap-[8px]">
                            <div>Названия вашего мероприятия</div>
                            <div><img src={zvezda} alt="zvezda" /></div>
                        </div>
                        <div>
                            <input
                                type="text"
                                name="eventName"
                                placeholder="Детский праздник"
                                value={formData.eventName}
                                onChange={handleChange}
                                required
                                className="px-[24px] py-[16px] border-black border-solid border-2 w-full"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-[8px]">
                        <div className="flex text-[14px] opacity-70 gap-[8px]">
                            <div>Категория</div>
                            <div><img src={zvezda} alt="zvezda" /></div>
                        </div>
                        <div className="select-wrapper">
                            <select
                                className="custom-select"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                multiple
                                required
                            >
                                {categories.map((el) => (
                                    <option key={el._id} value={el._id}>{el.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-col gap-[8px]">
                        <div className="flex text-[14px] opacity-70 gap-[8px]">
                            <div>Город</div>
                            <div><img src={zvezda} alt="zvezda" /></div>
                        </div>
                        <div className="select-wrapper">
                            <select
                                className="custom-select"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                required
                            >
                                {cities.map((el) => (
                                    <option key={el} value={el}>{el}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-col gap-[8px]">
                        <div className="flex text-[14px] opacity-70 gap-[8px]">
                            <div>Гонорар</div>
                            <div><img src={zvezda} alt="zvezda" /></div>
                        </div>
                        <div className="flex gap-2 text-[12px] items-center">
                            <img src={attention} alt="attention" />Укажите диапазон цен
                        </div>
                        <div className="flex items-center gap-[8px]">
                            <input
                                type="text"
                                name="feeFrom"
                                placeholder="От 1 000 Р"
                                value={formData.feeFrom}
                                onChange={handleChange}
                                required
                                className="px-[24px] py-[16px] border-black border-solid border-2 w-full"
                            />
                            <input
                                type="text"
                                name="feeTo"
                                placeholder="До 10 000 Р"
                                value={formData.feeTo}
                                onChange={handleChange}
                                required
                                className="px-[24px] py-[16px] border-black border-solid border-2 w-full"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-[8px]">
                        <div className="flex text-[14px] opacity-70 gap-[8px]">
                            <div>О вашем мероприятии</div>
                        </div>
                        <div className="flex items-center gap-[8px]">
                            <textarea
                                className="h-[132px] px-[24px] py-[16px] border-black border-solid border-2 w-full"
                                name="eventDetails"
                                placeholder="Добавьте больше деталей о вашем событии, чтобы привлечь артистов. Яркое описание увеличивает шансы на получение откликов!"
                                value={formData.eventDetails}
                                onChange={handleChange}
                            ></textarea>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="flex flex-col gap-[8px] w-1/2">
                            <div className="flex text-[14px] opacity-70 gap-[8px]">
                                <div>Дата</div>
                                <div><img src={zvezda} alt="zvezda" /></div>
                            </div>
                            <div>
                                <input
                                    type="date"
                                    name="date"
                                    value={formData.date}
                                    onChange={handleChange}
                                    required
                                    className="h-[59px] px-[24px] py-[16px] border-black border-solid border-2 w-full"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col gap-[8px]">
                            <div className="flex text-[14px] opacity-70 gap-[8px]">
                                <div>Временной интервал</div>
                            </div>
                            <div>
                                <input
                                    type="text"
                                    name="timeInterval"
                                    placeholder="9:00-12:00"
                                    value={formData.timeInterval}
                                    onChange={handleChange}
                                    className="px-[24px] py-[16px] border-black border-solid border-2 w-full"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-[8px]">
                        <div className="flex text-[14px] opacity-70 gap-[8px]">
                            <div>Количество гостей</div>
                        </div>
                        <div className="select-wrapper">
                            <select
                                className="custom-select"
                                name="guestCount"
                                value={formData.guestCount}
                                onChange={handleChange}
                                required
                            >
                                <option value="0-50">0-50</option>
                                <option value="50-100">50-100</option>
                                <option value="100-200">100-200</option>
                                <option value="200+">более 200</option>
                            </select>
                        </div>
                    </div>
                    <div className="mb-6">
                        <DarkButton text={"Отправить"} />
                    </div>
                </div>
            </form>

            </div>
        </div>
    );
}

export default AddMyApplication;