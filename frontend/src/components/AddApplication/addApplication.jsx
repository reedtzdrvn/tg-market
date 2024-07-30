import { Link, useNavigate } from "react-router-dom";
import FrameAdd from "../../images/FrameAdd.png"
import zvezda from "../../images/zvezda.svg"
import attention from "../../images/attention.svg"
import { useCategories } from "../../context/categoryContext";
import { DarkButton } from "../UI/Button/button";

const AddApplication = () => {

    const { categories } = useCategories()

    const navigate = useNavigate()

    const cities = [
        'Екатеринбург',
        'Москва',
        'Санкт-Петербург',
        'Новосибирск',
        'Казань',
        'Челябинск'
    ];

    const handleGoForm = () => {
        navigate("/application-done")
    }

    return (
        <div>
            <div className="flex flex-col items-center justify-center mt-[81px]">
                <img src={FrameAdd} alt="FrameAdd" />
                <div className="text-[24px] font-bold leading-[29px] text-center">Создайте свою заявку,<br />чтобы получать отклики</div>
                <div className="mt-[18px] text-[16px]">Или посмотрите <Link className="underline" to={"/catalog-artist"}>каталог артистов</Link></div>
            </div>
            <form className="mt-[78px] px-[16px]" onSubmit={handleGoForm}>
                <div>
                    <div className="text-[20px] font-bold">Контактная информация</div>
                </div>
                <div className="mt-[27px] flex flex-col gap-[24px]">
                    <div className="flex flex-col gap-[8px]">
                        <div className="flex text-[14px] opacity-70 gap-[8px]"><div>Имя Фамилия</div><div><img src={zvezda} alt="zvezda" /></div></div>
                        <div className="flex gap-2 text-[12px] items-center"><img src={attention} alt="attention" />Так ваше имя увидит заказчик </div>
                        <div><input type="text" placeholder="Иван Иванов" className=" px-[24px] py-[16px] border-black border-solid border-2 w-full" /></div>
                    </div>
                    <div className="flex flex-col gap-[8px]">
                        <div className="flex text-[14px] opacity-70 gap-[8px]"><div>Ваш ник Telegram</div><div><img src={zvezda} alt="zvezda" /></div></div>
                        <div className="flex gap-2 text-[12px] items-center"><img src={attention} alt="attention" />Проверьте, что у вас открыты личные сообщения в Telegram</div>
                        <div><input type="text" placeholder="@yournick" className="px-[24px] py-[16px] border-black border-solid border-2 w-full" /></div>
                    </div>
                    <div className="flex flex-col gap-[8px]">
                        <div className="flex text-[14px] opacity-70 gap-[8px]"><div>Ваш номер телефона</div><div><img src={zvezda} alt="zvezda" /></div></div>
                        <div><input type="text" placeholder="+7 999 000 00 00" className="px-[24px] py-[16px] border-black border-solid border-2 w-full" /></div>
                    </div>
                </div>
                <div className="mt-[48px]">
                    <div className="text-[20px] font-bold">Ваша заявка</div>
                </div>
                <div className="mt-[27px] flex flex-col gap-[24px]">
                    <div className="flex flex-col gap-[8px]">
                        <div className="flex text-[14px] opacity-70 gap-[8px]"><div>Названия вашего мероприятия</div><div><img src={zvezda} alt="zvezda" /></div></div>
                        <div><input type="text" placeholder="Детский праздник" className=" px-[24px] py-[16px] border-black border-solid border-2 w-full" /></div>
                    </div>
                    <div className="flex flex-col gap-[8px]">
                        <div className="flex text-[14px] opacity-70 gap-[8px]"><div>Категория</div><div><img src={zvezda} alt="zvezda" /></div></div>
                        <div className="select-wrapper">
                            <select className="custom-select" name="1" id="1">
                                {categories.map((el) => (
                                    <option key={el._id} value={el._id}>{el.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-col gap-[8px]">
                        <div className="flex text-[14px] opacity-70 gap-[8px]"><div>Город</div><div><img src={zvezda} alt="zvezda" /></div></div>
                        <div className="select-wrapper">
                            <select className="custom-select" name="1" id="1">
                                {cities.map((el) => (
                                    <option key={el} value={el}>{el}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-col gap-[8px]">
                        <div className="flex text-[14px] opacity-70 gap-[8px]"><div>Гонорар</div><div><img src={zvezda} alt="zvezda" /></div></div>
                        <div className="flex gap-2 text-[12px] items-center"><img src={attention} alt="attention" />Укажите диапазон цен</div>
                        <div className="flex items-center gap-[8px]">
                            <input type="text" placeholder="От 1 000 Р" className=" px-[24px] py-[16px] border-black border-solid border-2 w-full" />
                            <input type="text" placeholder="До 10 000 Р" className=" px-[24px] py-[16px] border-black border-solid border-2 w-full" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-[8px]">
                        <div className="flex text-[14px] opacity-70 gap-[8px]"><div>О вашем мероприятии</div></div>
                        <div className="flex items-center gap-[8px]">
                            <textarea className="h-[132px] px-[24px] py-[16px] border-black border-solid border-2 w-full" name="2" id="2" placeholder="Добавьте больше деталей о вашем событии, чтобы привлечь артистов. Яркое описание увеличивает шансы на получение откликов!"></textarea>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="flex flex-col gap-[8px] w-1/2">
                            <div className="flex text-[14px] opacity-70 gap-[8px]"><div>Дата</div><div><img src={zvezda} alt="zvezda" /></div></div>
                            <div><input type="date" placeholder="Детский праздник" className="h-[59px] px-[24px] py-[16px] border-black border-solid border-2 w-full" /></div>
                        </div>
                        <div className="flex flex-col gap-[8px]">
                            <div className="flex text-[14px] opacity-70 gap-[8px]"><div>Временной интервал</div></div>
                            <div><input type="text" placeholder="9:00-12:00" className=" px-[24px] py-[16px] border-black border-solid border-2 w-full" /></div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-[8px]">
                        <div className="flex text-[14px] opacity-70 gap-[8px]"><div>Количество гостей</div></div>
                        <div className="select-wrapper">
                            <select className="custom-select" name="1" id="1">
                                <option>0-50</option>
                                <option>50-100</option>
                                <option>100-200</option>
                                <option>более 200</option>
                            </select>
                        </div>
                    </div>
                    <div className="mb-6">
                        <DarkButton text={"Отправить"} />
                    </div>
                </div>
            </form>


        </div>
    );
}

export default AddApplication;