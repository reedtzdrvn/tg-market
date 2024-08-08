import { Link, useNavigate } from "react-router-dom";
import createArtistRequest from "../../images/createArtistRequest.png"
import zvezda from "../../images/zvezda.svg"
import attention from "../../images/attention.svg"
import { useCategories } from "../../context/categoryContext";
import { DarkButton } from "../UI/Button/button";
import { useUser } from "../../context/userContext";
import { useState } from "react";
import axios from "../../axios"
import Loader from "../UI/Loader/loader";
import { useEffect } from "react";

const AddArtistRequest = () => {

    const { user } = useUser()

    const [loading, setLoading] = useState(false)

    const { categories } = useCategories()


    console.log(user)
    const navigate = useNavigate()

    const cities = [
        'Екатеринбург',
        'Москва',
        'Санкт-Петербург',
        'Новосибирск',
        'Казань',
        'Челябинск'
    ];

    const handleGoForm = async (e) => {
        e.preventDefault();

        let formDataToSend = new FormData();

        if (formData.mainPhotoFile) {
            formDataToSend.append('files', formData.mainPhotoFile);
        }

        if (formData.backGroundPhotoFile) {
            formDataToSend.append('files', formData.backGroundPhotoFile);
        }

        if (formData.galleryFiles && formData.galleryFiles.length > 0) {
            formData.galleryFiles.forEach(file => formDataToSend.append('files', file));
        }

        axios.post('/upload', formDataToSend, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((res) => {
                setFormData(prevData => ({
                    ...prevData,
                    mainPhoto: res.data.filenames[0],
                    backGroundPhoto: res.data.filenames[1],
                    gallery: res.data.filenames.slice(2),

                }));

                axios.post("/artist-request", {
                    city: formData.setCitySearch,
                    artistId: user._id,
                    categoryId: formData.category,
                    description: formData.description,
                    price: formData.priceFrom + ' - ' + formData.priceTo,
                    mainPhoto: res.data.filenames[0],
                    backGroundPhoto: res.data.filenames[1],
                    photo: res.data.filenames.slice(2),
                    link_video: formData.videoLinks,
                    vk: formData.vk,
                    instagram: formData.instagram,
                    youtube: formData.youtube,
                    tiktok: formData.tiktok
                });

                axios.patch("/user", {
                    lastName: formData.fullName.split(' ')[0],
                    firstName: formData.fullName.split(' ')[1],
                    userName: formData.userName,
                    phoneNumber: formData.phoneNumber,
                    telegramId: user.telegramId
                })
                    .then((res) => {
                        window.location.href = "/artist-request-done";
                    })
            })
    };


    const [formData, setFormData] = useState({
        fullName: '',
        userName: '',
        phoneNumber: '',
        category: [],
        setCitySearch: "",
        priceFrom: '',
        priceTo: '',
        description: '',
        instagram: '',
        vk: '',
        youtube: '',
        tiktok: '',
        mainPhoto: null,
        mainPhotoFile: null,
        backGroundPhoto: null,
        backGroundPhotoFile: null,
        gallery: [],
        galleryFiles: [],
        videoLinks: ['', '', '', '', ''],
    });

    console.log(formData)

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        const file = files[0];

        console.log(file)

        if (name === 'mainPhoto') {
            setFormData((prevData) => ({
                ...prevData,
                mainPhotoFile: file,
            }));
        } else if (name === 'backGroundPhoto') {
            setFormData((prevData) => ({
                ...prevData,
                backGroundPhotoFile: file,
            }));
        } else {
            setFormData((prevData) => ({
                ...prevData,
                galleryFiles: [...prevData.galleryFiles, file],
            }));
        }
    };

    const handleUpdateVideoLink = (event) => {
        const parts = event.target.name.split('_');
        const index = parts.length > 1 ? parseInt(parts[1]) : NaN;
        let links = formData.videoLinks
        links[index - 1] = event.target.value
        setFormData({ ...formData, videoLinks: links })
    }

    useEffect(() => {
        if (user && categories) {
            setFormData({
                ...formData,
                fullName: `${user?.lastName || ''} ${user?.firstName || ''}`,
                userName: user?.userName || '',
                phoneNumber: user?.phoneNumber || '',
                category: categories?.length > 0 ? [categories?.[0]?._id] : [],
                setCitySearch: user?.setCitySearch || '',
            });
        }
    }, [user, categories]);

    const handleChange = (e) => {
        const { name, options } = e.target;
        const selectedOptions = Array.from(options).filter(option => option.selected).map(option => option.value);
        setFormData({ ...formData, [name]: selectedOptions });
    };

    if (loading) {
        return <Loader />
    }

    return (
        <div>
            <div className="flex flex-col items-center justify-center mt-[68px]">
                <img src={createArtistRequest} alt="createArtistRequest" />
                <div className="text-[24px] font-bold leading-[29px] text-center">Создайте анкету артиста,<br />чтобы получать заявки</div>
                <div className="mt-[18px] text-[16px]">Или посмотрите <Link className="underline" to={"/catalog-applications"}>каталог заявок</Link></div>
            </div>
            <form className="mt-[78px] px-[16px]" onSubmit={handleGoForm}>
                <div>
                    <div className="text-[20px] font-bold">Контактная информация</div>
                </div>
                <div className="mt-[27px] flex flex-col gap-[24px]">
                    <div className="flex flex-col gap-[8px]">
                        <div className="flex text-[14px] opacity-70 gap-[8px]"><div>Имя Фамилия</div><div><img src={zvezda} alt="zvezda" /></div></div>
                        <div className="flex gap-2 text-[12px] items-center opacity-70"><img src={attention} alt="attention" />Так ваше имя увидит заказчик </div>
                        <div><input required value={formData.fullName} onChange={(event) => setFormData({ ...formData, fullName: event.target.value })} type="text" placeholder="Иван Иванов" className=" px-[24px] py-[16px] border-black border-solid border-2 w-full" /></div>
                    </div>
                    <div className="flex flex-col gap-[8px]">
                        <div className="flex text-[14px] opacity-70 gap-[8px]"><div>Ваш ник Telegram</div><div><img src={zvezda} alt="zvezda" /></div></div>
                        <div className="flex gap-2 text-[12px] items-center  opacity-70"><img src={attention} alt="attention" />Проверьте, что у вас открыты личные сообщения в Telegram</div>
                        <div><input required type="text" placeholder="@yournick" value={'@' + formData.userName} onChange={(event) => setFormData({ ...formData, userName: event.target.value })} className="px-[24px] py-[16px] border-black border-solid border-2 w-full" /></div>
                    </div>
                    <div className="flex flex-col gap-[8px]">
                        <div className="flex text-[14px] opacity-70 gap-[8px]"><div>Ваш номер телефона</div><div><img src={zvezda} alt="zvezda" /></div></div>
                        <div><input value={formData.phoneNumber} required onChange={(event) => setFormData({ ...formData, phoneNumber: event.target.value })} type="text" placeholder="+7 999 000 00 00" className="px-[24px] py-[16px] border-black border-solid border-2 w-full" /></div>
                    </div>
                </div>
                <div className="mt-[48px]">
                    <div className="text-[20px] font-bold">Ваша анкета</div>
                </div>
                <div className="mt-[27px] flex flex-col gap-[24px]">
                    <div className="flex flex-col gap-[8px]">
                        <div className="flex text-[14px] opacity-70 gap-[8px]"><div>Категория</div><div><img src={zvezda} alt="zvezda" /></div></div>
                        <div className="select-wrapper">
                            <select multiple required value={formData.category} name="category" onChange={handleChange} className="custom-select" id="1">
                                {categories.map((el) => (
                                    <option key={el._id} value={el._id}>{el.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-col gap-[8px]">
                        <div className="flex text-[14px] opacity-70 gap-[8px]"><div>Город</div><div><img src={zvezda} alt="zvezda" /></div></div>
                        <div className="select-wrapper">
                            <select required value={formData.setCitySearch} onChange={(event) => setFormData({ ...formData, setCitySearch: event.target.value })} className="custom-select" name="1" id="1">
                                {cities.map((el) => (
                                    <option key={el} value={el}>{el}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-col gap-[8px]">
                        <div className="flex text-[14px] opacity-70 gap-[8px]"><div>Укажите диапазон цен</div><div><img src={zvezda} alt="zvezda" /></div></div>
                        <div className="flex items-center gap-[8px]">
                            <input required value={formData.priceFrom} onChange={(event) => setFormData({ ...formData, priceFrom: event.target.value })} type="text" placeholder="От 1 000 Р" className=" px-[24px] py-[16px] border-black border-solid border-2 w-full" />
                            <input required value={formData.priceTo} onChange={(event) => setFormData({ ...formData, priceTo: event.target.value })} type="text" placeholder="До 10 000 Р" className=" px-[24px] py-[16px] border-black border-solid border-2 w-full" />
                        </div>
                    </div>
                    <div className="flex flex-col gap-[8px]">
                        <div className="flex text-[14px] opacity-70 gap-[8px]"><div>Обо мне. Услуги и стоимость</div></div>
                        <div className="flex gap-2 text-[12px] items-center opacity-70"><img src={attention} alt="attention" />Здесь можете расписать ваш прайс-лист</div>
                        <div className="flex items-center gap-[8px]">
                            <textarea value={formData.description} onChange={(event) => setFormData({ ...formData, description: event.target.value })} className="h-[132px] px-[24px] py-[16px] border-black border-solid border-2 w-full" name="2" id="2" placeholder="Ваши сильные стороны, опыт и стоимость работ. Яркое описание увеличивает шансы  на получение заявки!"></textarea>
                        </div>
                    </div>
                    <div className="flex flex-col gap-[8px]">
                        <div className="flex text-[14px] opacity-70 gap-[8px]"><div>Instagram</div></div>
                        <div><input value={formData.instagram} onChange={(event) => setFormData({ ...formData, instagram: event.target.value })} type="text" placeholder="@yournick" className="px-[24px] py-[16px] border-black border-solid border-2 w-full" /></div>
                    </div>
                    <div className="flex flex-col gap-[8px]">
                        <div className="flex text-[14px] opacity-70 gap-[8px]"><div>Vkontakte</div></div>
                        <div><input value={formData.vk} onChange={(event) => setFormData({ ...formData, vk: event.target.value })} type="text" placeholder="https://" className="px-[24px] py-[16px] border-black border-solid border-2 w-full" /></div>
                    </div>
                    <div className="flex flex-col gap-[8px]">
                        <div className="flex text-[14px] opacity-70 gap-[8px]"><div>YouTube</div></div>
                        <div><input value={formData.youtube} onChange={(event) => setFormData({ ...formData, youtube: event.target.value })} type="text" placeholder="https://" className="px-[24px] py-[16px] border-black border-solid border-2 w-full" /></div>
                    </div>
                    <div className="flex flex-col gap-[8px]">
                        <div className="flex text-[14px] opacity-70 gap-[8px]"><div>TikTok</div></div>
                        <div><input value={formData.tiktok} onChange={(event) => setFormData({ ...formData, tiktok: event.target.value })} type="text" placeholder="@yournick" className="px-[24px] py-[16px] border-black border-solid border-2 w-full" /></div>
                    </div>
                    <div className="flex flex-col gap-[8px]">
                        <div className="flex text-[14px] opacity-70 gap-[8px]">
                            <div>Добавьте аватарку и фото фона</div>
                            <div><img src={zvezda} alt="zvezda" /></div>
                        </div>
                        <div className="flex gap-2 text-[12px] items-center opacity-70">
                            <img src={attention} alt="attention" />Первое окно – аватарка, второе – фото фона вашего профиля
                        </div>
                        <div className="flex w-full gap-[16px]">
                            <input required type="file" name="mainPhoto" id="mainPhoto" className="hidden" onChange={(e) => handleFileChange(e)} />
                            <label htmlFor="mainPhoto" className="border-black border-solid border-2 w-full h-[60px] flex items-center justify-center text-[40px]">
                                {formData.mainPhotoFile ? (
                                    <img src={URL.createObjectURL(formData.mainPhotoFile)} alt="mainPhoto" className="w-full h-full object-cover" />
                                ) : (
                                    '+'
                                )}
                            </label>
                            <input required type="file" name="backGroundPhoto" id="backGroundPhoto" className="hidden" onChange={(e) => handleFileChange(e)} />
                            <label htmlFor="backGroundPhoto" className="border-black border-solid border-2 w-full h-[60px] flex items-center justify-center text-[40px]">
                                {formData.backGroundPhotoFile ? (
                                    <img src={URL.createObjectURL(formData.backGroundPhotoFile)} alt="backGroundPhoto" className="w-full h-full object-cover" />
                                ) : (
                                    '+'
                                )}
                            </label>
                        </div>
                    </div>
                    <div className="flex flex-col gap-[8px]">
                        <div className="flex text-[14px] opacity-70 gap-[8px]">
                            <div>Добавьте фото в галерею</div>
                        </div>
                        <div className="flex w-full gap-[16px]">
                            <input type="file" name="gallery" id="gallery1" className="hidden" onChange={(e) => handleFileChange(e)} />
                            <label htmlFor="gallery1" className="border-black border-solid border-2 w-full h-[60px] flex items-center justify-center text-[40px]">
                                {formData.galleryFiles[0] ? (
                                    <img src={URL.createObjectURL(formData.galleryFiles[0])} alt="gallery1" className="w-full h-full object-cover" />
                                ) : (
                                    '+'
                                )}
                            </label>
                            <input type="file" name="gallery" id="gallery2" className="hidden" onChange={(e) => handleFileChange(e)} />
                            <label htmlFor="gallery2" className="border-black border-solid border-2 w-full h-[60px] flex items-center justify-center text-[40px]">
                                {formData.galleryFiles[1] ? (
                                    <img src={URL.createObjectURL(formData.galleryFiles[1])} alt="gallery2" className="w-full h-full object-cover" />
                                ) : (
                                    '+'
                                )}
                            </label>
                            <input type="file" name="gallery" id="gallery3" className="hidden" onChange={(e) => handleFileChange(e)} />
                            <label htmlFor="gallery3" className="border-black border-solid border-2 w-full h-[60px] flex items-center justify-center text-[40px]">
                                {formData.galleryFiles[2] ? (
                                    <img src={URL.createObjectURL(formData.galleryFiles[2])} alt="gallery2" className="w-full h-full object-cover" />
                                ) : (
                                    '+'
                                )}
                            </label>
                            <input type="file" name="gallery" id="gallery4" className="hidden" onChange={(e) => handleFileChange(e)} />
                            <label htmlFor="gallery4" className="border-black border-solid border-2 w-full h-[60px] flex items-center justify-center text-[40px]">
                                {formData.galleryFiles[3] ? (
                                    <img src={URL.createObjectURL(formData.galleryFiles[3])} alt="gallery2" className="w-full h-full object-cover" />
                                ) : (
                                    '+'
                                )}
                            </label>
                        </div>
                    </div>
                    <div className="flex flex-col gap-[8px]">
                        <div className="flex text-[14px] opacity-70 gap-[8px]"><div>Добавьте видео</div></div>
                        <div className="flex gap-2 text-[12px] items-center opacity-70"><img src={attention} alt="attention" />Ссылка на видео в YouTube, Vimeo, VK Video</div>
                        <div><input name="link_1" value={formData.videoLinks[0]} onChange={(event) => handleUpdateVideoLink(event)} type="text" placeholder="https://" className="px-[24px] py-[16px] border-black border-solid border-2 w-full" /></div>
                        {formData.videoLinks[0] !== '' && <div><input name="link_2" value={formData.videoLinks[1]} onChange={(event) => handleUpdateVideoLink(event)} type="text" placeholder="https://" className="px-[24px] py-[16px] border-black border-solid border-2 w-full" /></div>}
                        {formData.videoLinks[0] !== '' && formData.videoLinks[1] !== '' && <div><input name="link_3" value={formData.videoLinks[2]} onChange={(event) => handleUpdateVideoLink(event)} type="text" placeholder="https://" className="px-[24px] py-[16px] border-black border-solid border-2 w-full" /></div>}
                        {formData.videoLinks[0] !== '' && formData.videoLinks[1] !== '' && formData.videoLinks[2] !== '' && <div><input name="link_4" value={formData.videoLinks[3]} onChange={(event) => handleUpdateVideoLink(event)} type="text" placeholder="https://" className="px-[24px] py-[16px] border-black border-solid border-2 w-full" /></div>}
                        {formData.videoLinks[0] !== '' && formData.videoLinks[1] !== '' && formData.videoLinks[2] !== '' && formData.videoLinks[3] !== '' && <div><input name="link_5" value={formData.videoLinks[4]} onChange={(event) => handleUpdateVideoLink(event)} type="text" placeholder="https://" className="px-[24px] py-[16px] border-black border-solid border-2 w-full" /></div>}
                    </div>

                    <div className="mb-6">
                        <DarkButton text={"Отправить"} />
                    </div>
                </div>
            </form>
        </div>
    );
}

export default AddArtistRequest;