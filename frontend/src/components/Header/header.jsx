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
        <div className="h-[48px] shadow-custom flex justify-between items-center px-[16px]">
            <div className="current_city">
                <select
                    value={selectedCity}
                    onChange={handleCityChange}
                    className="text-[12px] underline"
                >
                    {cities.map((city, index) => (
                        <option key={index} value={city}>
                            {city}
                        </option>
                    ))}
                </select>
            </div>
            <Link to="/profile" className="text-[14px] font-bold">
                Мой профиль
            </Link>
        </div>
    );
};

export default Header;
