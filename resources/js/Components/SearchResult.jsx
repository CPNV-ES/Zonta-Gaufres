const SearchResult = ({itemType, itemList}) => {
    const types = {
        "Facture": {
            title: "Facture",
            icon: "[gravity-ui--file-dollar]",
        },
        "Commandes": {
            title: "Commandes",
            icon: "[material-symbols--article-outline]",
        },
        "Personnel": {
            title: "Personnel",
            icon: "[ic--outline-people]",
        },
        "Livraisons": {
            title: "Livraisons",
            icon: "[mdi--truck-outline]",
        },
    }

    return (
        <>
            <div className="text-red-900 m-2">
                <span>{types[itemType]?.title}</span>
            </div>
            <div>
                {itemList.map((item, index) => (
                    <div key={index}
                         className="flex items-center p-2 border-b rounded bg-gray-100 m-2 border-gray-200 hover:bg-gray-200 cursor-pointer">
                        <div className="flex items-center justify-center w-25 h-25">
                            <span className={`icon-${types[itemType]?.icon} text-xl`}></span>
                        </div>
                        <div className="ml-2 flex flex-row truncate">
                            <div>{item.content.join(' - ')}</div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}
export default SearchResult
