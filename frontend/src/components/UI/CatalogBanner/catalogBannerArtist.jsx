import { Link } from "react-router-dom";
import mmm from "../../../images/mmm.svg";

const CatalogBanner = () => {
    return (
        <Link to={"/add-artist-request"} className="border-2 bg-main mb-6 border-black rounded-[15px] px-[27px] py-[25px] flex gap-[18px] items-center mx-[16px]">
            <img src={mmm} className="h-[60px]" alt="1" />
            <div className="text-[18px] font-bold leading-6">
                Создайте свою анкету,
                <br />
                чтобы начать получать <br />
                заявки
            </div>
        </Link>
    );
}

export default CatalogBanner;