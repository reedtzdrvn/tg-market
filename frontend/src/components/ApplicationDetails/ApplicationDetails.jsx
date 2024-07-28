import crossIcon from "../../images/close.svg";
import calendarIcon from "../../images/Calendar-2.svg";
import moneyIcon from "../../images/Coins.svg";
import userIcon from "../../images/User.svg";
import { Link, useParams } from "react-router-dom";

const ApplicationDetails = () => {
  const { id } = useParams();

  return (
    <div className="font-[Inter] bg-white">
      <div className="w-full flex justify-end px-[44px] pt-[46px]">
        <Link to={"/catalog-applications"}>
          <img className="w-[16px]" src={crossIcon} alt="close" />
        </Link>
      </div>

      <div className="flex justify-center flex-col w-full px-12 mt-6">
        <span className="text-center text-[30px] font-bold leading-9">
          Детский праздник для двух девочек
        </span>

        <div className="flex justify-center gap-4 mt-8 text-[12px] leading-3">
          <span
            className={`py-[4.5px] px-4 flex justify-center items-center rounded-xl bg-customyellow`}
          >
            Танцы
          </span>
          <span
            className={`py-[4.5px] px-4 flex justify-center items-center rounded-xl bg-customyellow`}
          >
            Аниматоры
          </span>
          <span
            className={`py-[4.5px] px-4 flex justify-center items-center rounded-xl bg-customyellow`}
          >
            Ведущие
          </span>
        </div>
      </div>

      <div className="flex px-9 gap-8 mt-10 justify-between font-semibold text-[16px] leading-5">
        <div className="flex flex-col gap-4">
          <div className="flex items-center">
            <img className="w-[18px] mr-2" src={calendarIcon} alt="calendar" />
            <span>
              11.12.2024,
              <br />
              12-17:00
            </span>
          </div>
          <div className="flex items-center">
            <img className="w-[16px] mr-2" src={userIcon} alt="people" />
            <span>0-50 человек</span>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex items-center">
            <img className="w-[16px] mr-2" src={moneyIcon} alt="money" />
            <span>10 000 - 40 000 ₽</span>
          </div>
          <div>
            <span>
              г. Екатеринбург,
              <br />
              Свердловаская обл.
            </span>
          </div>
        </div>
      </div>

      <div className="mt-9 px-4 opacity-70 text-[16px] leading-5">
        Детский праздник в ярком парке соберет маленьких гостей на веселые игры
        и конкурсы под руководством аниматоров. <br />
        <br />
        Ищем талантливого аниматора-танцора и веселого ведущего, чтобы сделать
        этот день особенным и запоминающимся. Мы хотим организовать веселые
        танцевальные баталии под любимые музыкальные хиты, увлекательные игры с
        призами и креативные конкурсы. <br />
        <br />
        Праздник хочу организовать в парке Зеленая роща, днем. Плачу аванс,
        заключаю с вами договор. Жду ваших откликов.
      </div>

      <div className="px-4 py-10">
        <button className="w-full flex justify-center items-center bg-black font-[Inter] text-[20px] font-bold rounded-2xl text-white py-4">
          Откликнуться
        </button>
      </div>
    </div>
  );
};

export default ApplicationDetails;
