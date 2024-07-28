const CategoriesButtons = ({ categories, category, handleChangeCategory }) => {
    return (
        <div className='w-full flex justify-center'>
            <div className='flex flex-col gap-[12px] w-full'>
                <div className='flex w-full justify-center items-center gap-[12px]'>
                    {categories.slice(0, 4).map((el) => (
                        <button
                            key={el._id}
                            className={`px-[16px] py-[4px] text-[12px] rounded-[10px] w-max ${el._id === category ? getClassColor(el.color) : 'bg-buttoncategory opacity-50'}`}
                            onClick={() => handleChangeCategory(el._id)}
                        >
                            {el.name}
                        </button>
                    ))}
                </div>
                <div className='flex w-full justify-center items-center gap-[12px]'>
                    {categories.slice(4, 9).map((el) => (
                        <button
                            key={el._id}
                            className={`px-[16px] py-[4px] text-[12px] rounded-[10px] w-max ${el._id === category ? getClassColor(el.color) : 'bg-buttoncategory opacity-50'}`}
                            onClick={() => handleChangeCategory(el._id)}
                        >
                            {el.name}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

const getClassColor = (color) => {
    switch (color) {
        case 'orange':
            return 'bg-customorange';
        case 'green':
            return 'bg-customgreen';
        case 'yellow':
            return 'bg-customyellow';
        case 'pink':
            return 'bg-custompink';
        case 'purple':
            return 'bg-custompurple';
        default:
            return '';
    }
};

export default CategoriesButtons;
