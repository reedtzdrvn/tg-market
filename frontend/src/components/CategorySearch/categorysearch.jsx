import { DarkButton } from "../UI/Button/button";
import icon from "../../images/icon.svg"
import { Link } from "react-router-dom";

const doc = [
    {
        svgName: "icon.svg",
        name: "Песни",
        count: 1151,
        color: "purple"
    },
    {
        svgName: "icon.svg",
        name: "Ведущие",
        count: 1151,
        color: "pink"
    },
    {
        svgName: "icon.svg",
        name: "Муз. группа",
        count: 1151,
        color: "orange"
    },
    {
        svgName: "icon.svg",
        name: "Аниматоры",
        count: 1151,
        color: "green"
    },
    {
        svgName: "icon.svg",
        name: "Шоу артисты",
        count: 1151,
        color: "yellow"
    },
    {
        svgName: "icon.svg",
        name: "Танцы",
        count: 1151,
        color: "yellow"
    },
    {
        svgName: "icon.svg",
        name: "Диджеи",
        count: 1151,
        color: "pink"
    }
]

const CategorySearch = () => {
    return (
        <div className=" py-[84px] flex flex-col gap-[34px] items-center">
            <div className="text-[18px] text-center px-[12px]">
                Выберите артиста или создайте <br/> заявку для вашего события
            </div>
            <div className="flex flex-col items-center w-full px-[12px]">
                <div className="grid grid-cols-3 w-full justify-around">
                    {doc.map((el) => (
                        <Link to={`/catalogartist?category=${el.name}`} key={el.name} className="relative my-[27px] -ml-4">
                            <div className="w-full flex flex-col items-center gap-[12px]">
                                <img src={icon} alt="icon" className="w-[60px] h-[60px]" />
                                <span className="text-[16px] font-bold">{el.name}</span>
                            </div>
                            <div className={`bg-green rounded-[15px] py-[4px] px-[8px] flex items-center justify-center absolute right-4 -top-8 text-[12px]`}>
                                {el.count}
                            </div>
                        </Link>
                    ))}
                </div>
                <Link to="/addrequest" className="w-full"><DarkButton text={"Создать заявку"}  /></Link>
            </div>

        </div>
    );
}

export default CategorySearch;