import done from "../../images/done.png"
import Loader from "../UI/Loader/loader";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../axios";

const ReviewDone = () => {

    const { id } = useParams();
    const [order, setOrder] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (id) {
            axios.get("/order", { params: { orderId: id } })
                .then((res) => {
                    setOrder(res.data)
                    setLoading(false)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }, [id])

    if (loading){
        return <Loader />
    }

    return (
        <div className="h-screen flex flex-col items-center justify-center px-[16px]">
            <img src={done} alt="done" className="mb-[25px]" />
            <div className="text-24px font-bold text-center">
                Спасибо, ваш отзыв об {order.artistRequestId.artistId.firstName + ' ' + order.artistRequestId.artistId.lastName} пригодится будущим заказчикам
            </div>
        </div>
    );
}
 
export default ReviewDone;