import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    const [selectedCity, setSelectedCity] = useState('Екатеринбург');

    const cities = [
        'Екатеринбург',
        'Москва',
        'Санкт-Петербург',
        'Новосибирск',
        'Казань',
        'Челябинск'
    ];

    const handleCityChange = (event) => {
        setSelectedCity(event.target.value);
    };

    return (
        <div className="h-[48px] shadow-custom flex justify-between items-center px-[16px] relative">
            <div className="current_city flex justify-start w-1/3">
                <select
                    value={selectedCity}
                    onChange={handleCityChange}
                    className={`text-[12px] underline`}
                >
                    {cities.map((city, index) => (
                        <option key={index} value={city}>
                            {city}
                        </option>
                    ))}
                </select>
            </div>
            <Link to="/" className="text-[16px] font-bold text-center  w-1/3">
                EVENTRA
            </Link>
            <Link to="/profile" className="text-[14px] flex justify-end font-bold  w-1/3">
                Мой профиль
            </Link>
        </div>
    );
};

export default Header;
