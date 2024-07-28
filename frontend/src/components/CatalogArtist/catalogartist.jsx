import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from "../../axios.js";
import CategoriesButtons from '../UI/Categories/categoriesButtons.jsx';
import CatalogArtistCard from './catalogArtistCard.jsx';
import CatalogBanner from '../UI/CatalogBanner/catalogBannerCustomer.jsx';
import Loader from '../UI/Loader/loader.jsx';

const CatalogArtist = () => {
    const location = useLocation();
    // в category - айди текущей категории выбранной
    const [category, setCategory] = useState(null);
    const [categories, setCategories] = useState([]);
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (id) {
            setCategory(id);
        }
    }, [id]);

    useEffect(() => {
        axios.get("/category")
            .then((res) => {
                setCategories(res.data);
                if (!id && res.data.length > 0) {
                    setCategory(res.data[0]._id);
                }
                setLoading(false)
            })
            .catch((err) => {
                console.log(err);
            });
    }, [id]);

    const handleChangeCategory = (id) => {
        if(category!==id){
            setCategory(id);
        }
    };

    if(loading){
        return <Loader />
    }

    return (
        <div className='bg-back'>
            <div className='pt-[34px]'>
                <div className='flex flex-col gap-[27px] items-center'>
                    <span className='text-[24px] w-full text-center font-bold'>Каталог артистов</span>
                    <CategoriesButtons categories={categories} category={category} handleChangeCategory={handleChangeCategory} />
                </div>
                <div className='mt-[39px] flex flex-col gap-[24px]'>
                    <CatalogArtistCard />
                    <CatalogBanner />
                    <CatalogArtistCard />
                </div>
            </div>
        </div>
    );
};

export default CatalogArtist;
