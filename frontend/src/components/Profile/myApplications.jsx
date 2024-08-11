import { Link } from "react-router-dom";
import calendar from "../../images/Calendar.svg"
import coins from "../../images/Coins.svg"
import zvezda from "../../images/zvezda.svg"
import { LightButton2 } from "../UI/Button/button";
import { useEffect, useState } from "react";
import Loader from "../UI/Loader/loader";
import axios from "../../axios"
import { useUser } from "../../context/userContext";
import CategoriesButton from "../UI/Categories/categoryButton";
import CatalogBanner from "../UI/CatalogBanner/catalogBannerCustomer"

const MyApplications = () => {

    const [applications, setApplications] = useState([])
    const [loading, setLoading] = useState(true)
    const { user } = useUser()

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

    function dateNormal(data) {
        const isoDate = data;
        const date = new Date(isoDate);

        const day = date.getUTCDate().toString().padStart(2, '0');
        const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
        const year = date.getUTCFullYear();

        const formattedDate = `${day}.${month}.${year}`;
        return formattedDate
    }

    const handleDeleteApplication = (id) => {
        axios.delete(`/customer-request?requestId=${id}`)
        .then(()=>{
            setApplications(applications.filter((el) => (el._id !== id)))
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    if (loading) {
        return <Loader />
    }

    if (applications.length === 0) {
        return (
            <div className="px-[16px] bg-back min-h-screen">
                <div className="py-[44px] flex gap-[33px] justify-center">
                    <Link to={"/my-add-application"} className="text-[20px] opacity-60">Создать заявку</Link><div className="underline font-bold text-[20px]">Мои заявки ({applications.length})</div>
                </div>
                <div className="min-h-screen flex justify-center items-center mt-[-200px]"><CatalogBanner /></div>
            </div>
        )
    }

    return (
        <div className="px-[16px] bg-back min-h-screen">
            <div className="py-[44px] flex gap-[33px] justify-center">
                <Link to={"/my-add-application"} className="text-[20px] opacity-60">Создать заявку</Link><div className="underline font-bold text-[20px]">Мои заявки ({applications.length})</div>
            </div>
            <div className="flex flex-col gap-[24px] last:pb-[24px]">
                {applications.map((application) => (
                    <div className="flex-col">
                        <div className={`h-[59px] ${application.approved ? " bg-customgreen" : "bg-custompink"} flex items-center justify-center text-white text-[18px] font-bold`}> {application.approved ? "Активна" : "На модерации"}</div>
                        <div className="py-[24px] px-[19px] bg-main">
                            <div className="text-[24px] font-bold">{application.eventName}</div>
                            <div className="mt-[20px] flex gap-[16px] flex-wrap">
                                {application.categoryId.map((el) => (
                                    <CategoriesButton category={el} />
                                ))}
                            </div>
                            <div className="mt-[21px] flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <img className="w-[18px]" src={calendar} alt="calendar" /> <div className="text-[16px] font-bold">{dateNormal(application.date)}</div>
                                </div>
                                <div className="flex items-center gap-2" >
                                    <img src={coins} alt="coins" /> <div className="text-[16px] font-bold">{application.fee} P</div>
                                </div>
                            </div>
                            <div className="flex gap-[14px] mt-[20px]">
                                <div>
                                    <img className="w-[11px]" src={zvezda} alt="zvezda" />
                                </div>
                                <div className="text-[16px]">
                                    Если вы редактируете, заявка потребует повторной модерации
                                </div>
                            </div>
                            <div className="mt-[20px] flex gap-2 w-full">
                                <Link className="w-full" to={`/my-edit-application/${application._id}`} ><LightButton2 text={"Редактировать"} /></Link>
                                {!application.approved ? <Link className="w-full" onClick={() => handleDeleteApplication(application._id)} ><LightButton2 text={"Отменить"} /></Link> : ""}
                                {/*<Link className="w-full" to={`/my-adit-application/${application._id}`} ><DarkButton text={"Написать отзыв"} /></Link>*/}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MyApplications;