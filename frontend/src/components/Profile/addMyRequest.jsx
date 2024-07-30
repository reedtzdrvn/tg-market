import { Link, useNavigate } from "react-router-dom";
import createArtistRequest from "../../images/createArtistRequest.png"
import zvezda from "../../images/zvezda.svg"
import attention from "../../images/attention.svg"
import { useCategories } from "../../context/categoryContext";
import { DarkButton } from "../UI/Button/button";

const AddMyRequest = () => {
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
        navigate("/artist-request-done")
    }

    return (
        <div>
            <div className="py-[44px] flex gap-[33px] justify-center">
                <div className="underline font-bold text-[20px]">Моя анкета</div><Link to={"/my-requests"} className="text-[20px] opacity-60" >Мои заказы (6)</Link>
            </div>
            <form className=" px-[16px]" onSubmit={handleGoForm}>
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
                    <div className="text-[20px] font-bold">Ваша анкета</div>
                </div>
                <div className="mt-[27px] flex flex-col gap-[24px]">
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
                        <div className="flex text-[14px] opacity-70 gap-[8px]"><div>Укажите диапазон цен</div><div><img src={zvezda} alt="zvezda" /></div></div>
                        <div className="flex items-center gap-[8px]">
                            <input type="text" placeholder="От 1 000 Р" className=" px-[24px] py-[16px] border-black border-solid border-2 w-full" />
                            <input type="text" placeholder="До 10 000 Р" className=" px-[24px] py-[16px] border-black border-solid border-2 w-full" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-[8px]">
                        <div className="flex text-[14px] opacity-70 gap-[8px]"><div>Обо мне. Услуги и стоимость</div></div>
                        <div className="flex items-center gap-[8px]">
                            <textarea className="h-[132px] px-[24px] py-[16px] border-black border-solid border-2 w-full" name="2" id="2" placeholder="Ваши сильные стороны, опыт и стоимость работ. Яркое описание увеличивает шансы  на получение заявки!"></textarea>
                        </div>
                    </div>
                    <div className="flex flex-col gap-[8px]">
                        <div className="flex text-[14px] opacity-70 gap-[8px]"><div>Instagram</div></div>
                        <div><input type="text" placeholder="@yournick" className="px-[24px] py-[16px] border-black border-solid border-2 w-full" /></div>
                    </div>
                    <div className="flex flex-col gap-[8px]">
                        <div className="flex text-[14px] opacity-70 gap-[8px]"><div>Vkontakte</div></div>
                        <div><input type="text" placeholder="https://" className="px-[24px] py-[16px] border-black border-solid border-2 w-full" /></div>
                    </div>
                    <div className="flex flex-col gap-[8px]">
                        <div className="flex text-[14px] opacity-70 gap-[8px]"><div>YouTube</div></div>
                        <div><input type="text" placeholder="https://" className="px-[24px] py-[16px] border-black border-solid border-2 w-full" /></div>
                    </div>
                    <div className="flex flex-col gap-[8px]">
                        <div className="flex text-[14px] opacity-70 gap-[8px]"><div>TikTok</div></div>
                        <div><input type="text" placeholder="@yournick" className="px-[24px] py-[16px] border-black border-solid border-2 w-full" /></div>
                    </div>
                    <div className="flex flex-col gap-[8px]">
                        <div className="flex text-[14px] opacity-70 gap-[8px]"><div>Добавьте аватарку и фото фона </div><div><img src={zvezda} alt="zvezda" /></div></div>
                        <div className="flex gap-2 text-[12px] items-center"><img src={attention} alt="attention" />Первое окно – аватарка, второе – фото фона вашего профиля</div>
                        <div className="flex w-full gap-[16px]">
                            <input type="file" name="3" id="3" className="hidden" />
                            <label htmlFor="3" className=" border-black border-solid border-2 w-full h-[60px] flex items-center justify-center text-[40px]">+</label>
                            <input type="file" name="4" id="4" className="hidden"  />
                            <label htmlFor="4" className=" border-black border-solid border-2 w-full h-[60px] flex items-center justify-center text-[40px]">+</label>
                        </div>
                    </div>
                    <div className="flex flex-col gap-[8px]">
                        <div className="flex text-[14px] opacity-70 gap-[8px]"><div>Добавьте фото и видео в галерею </div></div>
                        <div className="flex w-full gap-[16px]">
                            <input type="file" name="3" id="3" className="hidden" />
                            <label htmlFor="3" className=" border-black border-solid border-2 w-full h-[60px] flex items-center justify-center text-[40px]">+</label>
                            <input type="file" name="4" id="4" className="hidden"  />
                            <label htmlFor="4" className=" border-black border-solid border-2 w-full h-[60px] flex items-center justify-center text-[40px]">+</label>
                        </div>
                    </div>
                    <div className="flex flex-col gap-[8px]">
                        <div className="flex text-[14px] opacity-70 gap-[8px]"><div>Добавьте видео</div></div>
                        <div className="flex gap-2 text-[12px] items-center"><img src={attention} alt="attention" />Ссылка на видео в YouTube, Vimeo, VK Video</div>
                        <div><input type="text" placeholder="https://" className="px-[24px] py-[16px] border-black border-solid border-2 w-full" /></div>
                    </div>
                    <div className="mb-6">
                        <DarkButton text={"Сохранить"} />
                    </div>
                </div>
            </form>


        </div>
    );
}
 
export default AddMyRequest;