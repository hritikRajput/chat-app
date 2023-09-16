// .searchbox{
//     border: 2px solid pink;
//     padding: 1rem 0;
// }
// input{
//     // /* border: none; */
//     color: inherit;
//     /* border: 1px solid transparent; */
//     background: transparent url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' class='bi bi-search' viewBox='0 0 16 16'%3E%3Cpath d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z'%3E%3C/path%3E%3C/svg%3E") no - repeat 13px center;
// }
// input[type = "search"]::placeholder {
//     color: #bbb;
// }


const SearchBox = () => {
    return (
        <div className="mb-4">
            <form>
                <input type="text" placeholder="search" className="w-full py-2 pr-2 pl-10 text-base rounded-md outline-none text-pearl-white bg-slate-gray placeholder:text-pearl-white" />
            </form>
        </div>
    )
}

export default SearchBox






