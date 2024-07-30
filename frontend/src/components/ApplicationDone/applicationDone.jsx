import done from "../../images/done.png"
import { LightButton2 } from "../UI/Button/button";
import { useNavigate } from "react-router-dom";

const ApplicationDone = () => {

    const navigate = useNavigate()

    const handleGoArtistCatalog = () => {
        navigate("/catalog-artist")
    }

    const handleGoMyApplications = () => {
        navigate("/my-applications")
    }

    return (
        <div className="h-screen flex flex-col items-center justify-center px-[16px]">
            <img src={done} alt="done" className="mb-[72px]" />
            <div className="w-full"><LightButton2 onClick={handleGoArtistCatalog} text={"Каталог артистов"} /></div>
            <div className="mt-[12px] w-full"><LightButton2 onClick={handleGoMyApplications} text={"Мои заявки (1)"} /></div>
        </div>
    );
}

export default ApplicationDone;