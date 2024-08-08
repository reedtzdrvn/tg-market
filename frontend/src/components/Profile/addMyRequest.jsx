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
const AddMyRequest = () => {
    const { user } = useUser();
    const [loading, setLoading] = useState(true);
    const { categories } = useCategories();
    const navigate = useNavigate();
    const [request, setRequest] = useState({});
    const [added, setAdded] = useState(false);
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
        backGroundPhoto: null,
        gallery: [],
        videoLinks: ['', '', '', '', ''],
    });

    const cities = [
        'Екатеринбург',
        'Москва',
        'Санкт-Петербург',
        'Новосибирск',
        'Казань',
        'Челябинск'
    ];

    useEffect(() => {
        if (user) {
            axios.get(`/artist-request?artistId=${user._id}`)
                .then((res) => {
                    setRequest(res.data[0]);
                    if (res.data.length > 0) {
                        setAdded(true);
                    }
                    setLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [user]);

    useEffect(() => {
        if (user && categories) {
            setFormData((prevData) => ({
                ...prevData,
                fullName: `${user?.lastName || ''} ${user?.firstName || ''}`.trim(),
                userName: user.userName || '',
                phoneNumber: user.phoneNumber || '',
            }));
        }
    }, [user, categories]);

    useEffect(() => {
        if (request) {
            let priceFrom = "";
            let priceTo = "";
            if (request.price && typeof request.price === "string") {
                const priceParts = request.price.split(" ");
                priceFrom = priceParts[0];
                priceTo = priceParts[priceParts.length - 1];
            }

            setFormData((prevData) => ({
                ...prevData,
                category: request.categoryId?.map((el)=>(el._id)) || [],
                setCitySearch: request.city || '',
                priceFrom,
                priceTo,
                description: request.description || '',
                instagram: request.instagram || '',
                vk: request.vk || '',
                youtube: request.youtube || '',
                tiktok: request.tiktok || '',
                mainPhoto: request.mainPhoto || null,
                backGroundPhoto: request.backGroundPhoto || null,
                gallery: request.photo || [],
                videoLinks: request.link_video || ['', '', '', '', ''],
            }));
        }
    }, [request]);
    
    const handleChange = (e) => {
        const { name, options } = e.target;
        const selectedOptions = Array.from(options).filter(option => option.selected).map(option => option.value);
        setFormData({ ...formData, [name]: selectedOptions });
    };

    const handleFileChange = async (e) => {
        const { name, files } = e.target;
        const file = files[0];

        try {

            const res = await axios.post("/upload", {files: file}, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const uploadedFile = res.data.filenames[0];

            if (name === 'mainPhoto') {
                setFormData((prevData) => ({
                    ...prevData,
                    mainPhoto: uploadedFile,
                }));
            } else if (name === 'backGroundPhoto') {
                setFormData((prevData) => ({
                    ...prevData,
                    backGroundPhoto: uploadedFile,
                }));
            } else {
                const index = parseInt(name.replace('gallery', ''), 10) - 1;
                const updatedGallery = [...formData.gallery];
                updatedGallery[index] = uploadedFile;

                setFormData((prevData) => ({
                    ...prevData,
                    gallery: updatedGallery,
                }));
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleUpdateVideoLink = (event) => {
        const index = parseInt(event.target.name.replace('link_', ''), 10) - 1;
        const updatedLinks = [...formData.videoLinks];
        updatedLinks[index] = event.target.value;
        setFormData((prevData) => ({
            ...prevData,
            videoLinks: updatedLinks,
        }));
    };

    const handleGoForm = async (e) => {
        e.preventDefault();
        try {
            await axios.patch("/artist-request", {
                city: formData.setCitySearch,
                artistId: user._id,
                categoryId: formData.category,
                description: formData.description,
                price: `${formData.priceFrom} - ${formData.priceTo}`,
                mainPhoto: formData.mainPhoto,
                backGroundPhoto: formData.backGroundPhoto,
                photo: formData.gallery,
                link_video: formData.videoLinks,
                vk: formData.vk,
                instagram: formData.instagram,
                youtube: formData.youtube,
                tiktok: formData.tiktok,
                requestId: request._id,
                approved: false,
            });

            await axios.patch("/user", {
                lastName: formData.fullName.split(' ')[0],
                firstName: formData.fullName.split(' ')[1],
                userName: formData.userName,
                phoneNumber: formData.phoneNumber,
                telegramId: user.telegramId
            });

            navigate("/artist-request-done");
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) {
        return <Loader />;
    }

    if (!added) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen mt-[-80px] mb-[80px]">
                <img src={createArtistRequest} alt="createArtistRequest" />
                <Link to={"/add-artist-request"} className="underline text-[24px] font-bold leading-[29px] text-center">
                    Создайте анкету артиста,<br />чтобы получать заявки
                </Link>
            </div>
        );
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
                            <select multiple required value={formData.category} onChange={handleChange} className="custom-select" name="category" id="1">
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
                            <input
                                type="file"
                                name="mainPhoto"
                                id="mainPhoto"
                                className="hidden"
                                onChange={(e) => handleFileChange(e)}
                            />
                            <label htmlFor="mainPhoto" className="border-black border-solid border-2 w-full h-[60px] flex items-center justify-center text-[40px]">
                                {formData.mainPhoto ? (
                                    <img src={process.env.REACT_APP_API_URL + formData.mainPhoto} alt="mainPhoto" className="w-full h-full object-cover" />
                                ) : (
                                    '+'
                                )}
                            </label>
                            <input
                                type="file"
                                name="backGroundPhoto"
                                id="backGroundPhoto"
                                className="hidden"
                                onChange={(e) => handleFileChange(e)}
                            />
                            <label htmlFor="backGroundPhoto" className="border-black border-solid border-2 w-full h-[60px] flex items-center justify-center text-[40px]">
                                {formData.backGroundPhoto ? (
                                    <img src={process.env.REACT_APP_API_URL + formData.backGroundPhoto} alt="backGroundPhoto" className="w-full h-full object-cover" />
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
                            <input type="file" name="gallery1" id="gallery1" className="hidden" onChange={(e) => handleFileChange(e)} />
                            <label htmlFor="gallery1" className="border-black border-solid border-2 w-full h-[60px] flex items-center justify-center text-[40px]">
                                {formData.gallery?.[0] ? (
                                    <img src={process.env.REACT_APP_API_URL + formData.gallery[0]} alt="gallery1" className="w-full h-full object-cover" />
                                ) : (
                                    '+'
                                )}
                            </label>
                            <input type="file" name="gallery2" id="gallery2" className="hidden" onChange={(e) => handleFileChange(e)} />
                            <label htmlFor="gallery2" className="border-black border-solid border-2 w-full h-[60px] flex items-center justify-center text-[40px]">
                                {formData.gallery?.[1] ? (
                                    <img src={process.env.REACT_APP_API_URL + formData.gallery[1]} alt="gallery2" className="w-full h-full object-cover" />
                                ) : (
                                    '+'
                                )}
                            </label>
                            <input type="file" name="gallery3" id="gallery3" className="hidden" onChange={(e) => handleFileChange(e)} />
                            <label htmlFor="gallery3" className="border-black border-solid border-2 w-full h-[60px] flex items-center justify-center text-[40px]">
                                {formData.gallery?.[2] ? (
                                    <img src={process.env.REACT_APP_API_URL + formData.gallery[2]} alt="gallery2" className="w-full h-full object-cover" />
                                ) : (
                                    '+'
                                )}
                            </label>
                            <input type="file" name="gallery4" id="gallery4" className="hidden" onChange={(e) => handleFileChange(e)} />
                            <label htmlFor="gallery4" className="border-black border-solid border-2 w-full h-[60px] flex items-center justify-center text-[40px]">
                                {formData.gallery?.[3] ? (
                                    <img src={process.env.REACT_APP_API_URL + formData.galleryFiles[3]} alt="gallery2" className="w-full h-full object-cover" />
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
                        <DarkButton text={"Сохранить"} />
                    </div>
                </div>
            </form>
        </div>
    );
}

export default AddMyRequest;