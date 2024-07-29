import star from "../../images/Star.svg";
import avatar from "../../images/avatar.png";

const Review = () => {
    return (
        <div className="flex">
            <div className="px-[22px] pb-[22px] flex flex-col ga-[8px] items-center">
                <img src={avatar} className="w-[52px] h-[52px] rounded-full" alt="avatar" />
                <div className="opacity-60">Кирилл</div>
            </div>
            <div className="ml-[10px] flex-col flex gap-[6px] flex-nowrap">
                <div className="text-[16px] font-bold">Сомнительно, но окэй</div>
                <div className=" flex items-center gap-[2px]"><img src={star} alt="" /><img src={star} alt="" /><img src={star} alt="" /><img src={star} className="opacity-30" alt="" /><img src={star} className="opacity-30" alt="" /></div>
                <div className="text-[16px] !flex-nowrap">Ира опоздала, я такое не люблю</div>
                <div className="text-[12px] opacity-60">02.02.2020</div>
            </div>
        </div>
    );
}

export default Review;