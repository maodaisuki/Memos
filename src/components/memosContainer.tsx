

const MemosContainer = ({ children } : { children: React.ReactNode }) => {
    return (
        <div className="w-full flex flex-col mt-[10px] space-y-4 px-[10px]">
            { children }
        </div>
    )
}

export default MemosContainer;