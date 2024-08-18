import { Link } from "react-router-dom";
import Share from "../../images/share btn.svg"

const Footer = () => {

    const handleGoSupport = () => {
        window.location.href='https://t.me/EventsApp_bot'
    }

    return ( 
        <div className=" bg-black px-[52px] py-[40px] text-white">
            <div>
                EVENTRA
            </div>
            <div className="flex text-[12px] mt-[21px]">
                <div className="flex flex-col gap-[23px] justify-start items-start w-1/2">
                    <Link to="/catalog-applications">Каталог заявок</Link>
                    <Link to="/category-artist">Каталог артистов</Link>
                    <Link to={"/share"} className="flex gap-[4px] items-start text-[12px]">
                        <img src={Share} alt="share" /> <span>Рассказать другу</span>
                    </Link>
                </div>
                <div className="flex flex-col gap-[23px] justify-start items-start w-1/2 pl-[30px]">
                    <Link  to="/about" > О приложении </Link>
                    <div onClick={()=>handleGoSupport()} > Поддержка </div>
                    <Link to="https://taplink.cc/sirviler" > Колесо Сира:<br/> путь к мастерству </Link>
                </div>
            </div>
        </div>
     );
}
 
export default Footer;