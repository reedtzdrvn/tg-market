import { Link } from "react-router-dom";
import Share from "../../images/share btn.svg"

const Footer = () => {
    return ( 
        <div className=" bg-black px-[52px] py-[40px] text-white">
            <div>
                EVENTRA
            </div>
            <div className="flex text-[12px] mt-[21px]">
                <div className="flex flex-col gap-[23px] justify-start items-start w-1/2">
                    <Link to="/requests">Каталог заявок</Link>
                    <Link to="/artists">Каталог заявок</Link>
                    <div className="flex gap-[4px] items-start text-[12px]">
                        <img src={Share} alt="share" /> <span>Рассказать другу</span>
                    </div>
                </div>
                <div className="flex flex-col gap-[23px] justify-start items-start w-1/2 pl-[30px]">
                    <Link  to="/about" > О приложении </Link>
                    <Link to="/support" > Поддержка </Link>
                    <Link to="/docs" > Документы </Link>
                </div>
            </div>
        </div>
     );
}
 
export default Footer;