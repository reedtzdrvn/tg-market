import { Link, useNavigate } from "react-router-dom";
import createArtistRequest from "../../images/createArtistRequest.png"
import zvezda from "../../images/zvezda.svg"
import attention from "../../images/attention.svg"
import { useCategories } from "../../context/categoryContext";
import { DarkButton } from "../UI/Button/button";
import { useUser } from "../../context/userContext";
import { useState } from "react";
import axios from "../../axios"
import { useEffect } from "react";
import Loader from "../UI/Loader/loader";
import { useCities } from "../../context/citiesContext";
import { CSSTransition } from 'react-transition-group';
import { motion } from "framer-motion";

const AddArtistRequest = () => {

    const { user } = useUser()
    const [disabled, setDisabled] = useState(false)
    const { categories } = useCategories()
    const { cities } = useCities()
    const [message, setMessage] = useState(null);
    const [messageOn, setMessageOn] = useState(false)

    const [personAccept, setPersonAccept] = useState(false);


    const validateFullName = (fullName) => {
        const words = fullName.trim().split(" ");
        return words.length === 2 && words[0] && words[1];
    };

    const handleGoForm = async (e) => {
        if (!personAccept) return;
        e.preventDefault();
        setDisabled(true);

        if (!validateFullName(formData.fullName)) {
            setDisabled(false);
            alert("Поле 'Имя Фамилия' должно содержать два слова, разделённых пробелом.");
            return;
        }

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
        videoLinks: ['', '', ''],
    });


    const handleFileChange = (e) => {
        const { name, files } = e.target;
        const file = files[0];

        const maxSize = 5 * 1024 * 1024;
        const validFormats = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/heic'];

        if (file?.size > maxSize) {
            showMessage("Размер фото больше 5 мб");
            return;
        }

        if (!validFormats.includes(file?.type)) {
            showMessage("Загрузите фото формата .jpeg/.jpg/.png");
            return;
        }

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
            const index = parseInt(name.replace('gallery', ''), 10) - 1;

            setFormData((prevData) => {
                const updatedGalleryFiles = [...prevData.galleryFiles];
                updatedGalleryFiles[index] = file;
                return {
                    ...prevData,
                    galleryFiles: updatedGalleryFiles,
                };
            });
        }
    };

    const showMessage = (message) => {
        setMessage(message);
        setMessageOn(true)
        setTimeout(() => {
            setMessage(null);
            setMessageOn(false)
        }, 3000);
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
            let namePerson = ''
            if (user?.firstName && user?.lastName) {
                namePerson = user?.firstName + ' ' + user?.lastName
            }
            setFormData({
                ...formData,
                fullName: namePerson,
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

    if (!cities) {
        return <Loader />
    }


    return (
        <div className="relative">
            {
                messageOn && <CSSTransition timeout={300} classNames="popup">
                    <motion.div
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 1, y: -20 }}
                        transition={{ duration: 0.5 }}
                        className="fixed top-0 w-full"
                    >
                        <div className="flex justify-center mt-[24px]">
                            <div className="opacity-100 text-center py-[8px] w-[300px] z-10 rounded-3xl text-black border-black border-[2px] bg-white flex justify-center items-center">
                                {message}
                            </div>
                        </div>
                    </motion.div>
                </CSSTransition>
            }
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
                            <select required value={formData.category} name="category" onChange={handleChange} className="custom-select" id="1">
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
                            <input required type="file" accept="image/*" name="mainPhoto" id="mainPhoto" className="hidden" onChange={(e) => handleFileChange(e)} />
                            <label htmlFor="mainPhoto" className="border-black border-solid border-2 w-full h-[60px] flex items-center justify-center text-[40px]">
                                {formData.mainPhotoFile ? (
                                    <img src={URL.createObjectURL(formData.mainPhotoFile)} alt="mainPhoto" className="w-full h-full object-cover" />
                                ) : (
                                    '+'
                                )}
                            </label>
                            <input required accept="image/*" type="file" name="backGroundPhoto" id="backGroundPhoto" className="hidden" onChange={(e) => handleFileChange(e)} />
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
                            <input type="file" name="gallery1" accept="image/*" id="gallery1" className="hidden" onChange={(e) => handleFileChange(e)} />
                            <label htmlFor="gallery1" className="border-black border-solid border-2 w-full h-[60px] flex items-center justify-center text-[40px]">
                                {formData.galleryFiles[0] ? (
                                    <img src={URL.createObjectURL(formData.galleryFiles[0])} alt="gallery1" className="w-full h-full object-cover" />
                                ) : (
                                    '+'
                                )}
                            </label>
                            <input type="file" name="gallery2" accept="image/*" id="gallery2" className="hidden" onChange={(e) => handleFileChange(e)} />
                            <label htmlFor="gallery2" className="border-black border-solid border-2 w-full h-[60px] flex items-center justify-center text-[40px]">
                                {formData.galleryFiles[1] ? (
                                    <img src={URL.createObjectURL(formData.galleryFiles[1])} alt="gallery2" className="w-full h-full object-cover" />
                                ) : (
                                    '+'
                                )}
                            </label>
                            <input type="file" name="gallery3" accept="image/*" id="gallery3" className="hidden" onChange={(e) => handleFileChange(e)} />
                            <label htmlFor="gallery3" className="border-black border-solid border-2 w-full h-[60px] flex items-center justify-center text-[40px]">
                                {formData.galleryFiles[2] ? (
                                    <img src={URL.createObjectURL(formData.galleryFiles[2])} alt="gallery2" className="w-full h-full object-cover" />
                                ) : (
                                    '+'
                                )}
                            </label>
                            <input type="file" name="gallery4" accept="image/*" id="gallery4" className="hidden" onChange={(e) => handleFileChange(e)} />
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
                        <div className="flex gap-2 text-[12px] items-center opacity-70"><img src={attention} alt="attention" />Ссылка на Vk-видео</div>
                        <div><input name="link_1" value={formData.videoLinks[0]} onChange={(event) => handleUpdateVideoLink(event)} type="text" placeholder="https://" className="px-[24px] py-[16px] border-black border-solid border-2 w-full" /></div>
                        {formData.videoLinks[0] !== '' && <div><input name="link_2" value={formData.videoLinks[1]} onChange={(event) => handleUpdateVideoLink(event)} type="text" placeholder="https://" className="px-[24px] py-[16px] border-black border-solid border-2 w-full" /></div>}
                        {formData.videoLinks[0] !== '' && formData.videoLinks[1] !== '' && <div><input name="link_3" value={formData.videoLinks[2]} onChange={(event) => handleUpdateVideoLink(event)} type="text" placeholder="https://" className="px-[24px] py-[16px] border-black border-solid border-2 w-full" /></div>}
                    </div>
                    <div className="flex gap-3">
                        <input type="checkbox" required value={personAccept} onChange={(e) => setPersonAccept(e.target.checked)} id="accept_pers_data" /> <label htmlFor="accept_pers_data" className="text-[12px]"><Link className='text-black underline' to="https://docs.google.com/document/d/1ZeJG7cl2raszu6VWoclo38WSxZKl_qRt/edit">Согласен</Link> на обработку моих персональных данных согласно <Link className='text-black underline' to={"https://docs.google.com/document/d/13SBC6s4-XB9GCrZEUbNjqsj-_SBw5nvE/edit"}>Политике</Link></label>
                    </div>
                    <div className={`mb-6 ${disabled ? "opacity-50" : ""}`} >
                        <DarkButton text={"Отправить"} disabled={disabled} />
                    </div>
                </div>
            </form>
        </div>
    );
}

export default AddArtistRequest;