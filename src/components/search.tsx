const SearchBar = () => {
    return (
        <div className="w-full box-border ml-[15px] my-[5px] font-normal">
            <input 
                className="w-full bg-base-200 rounded-[4px] focus:outline-none px-[10px] h-[40px] text-[14px]"
                placeholder="Type here..."
            />
        </div>
    )
}

export default SearchBar;