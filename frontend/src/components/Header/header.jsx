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
            <div className="current_city">
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
            <Link to="/" className="text-[16px] font-bold absolute text-center w-full left-0">
                EVENTRA
            </Link>
            <Link to="/profile" className="text-[14px] font-bold">
                Мой профиль
            </Link>
        </div>
    );
};

export default Header;
