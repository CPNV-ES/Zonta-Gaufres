import {Input} from "@/Components/ui/input.jsx";

const Search = () => {
    // item exemple for SearchResult component
    const items = [
        {
            content: ['Paul', 'Dupont', 'untruc']
        },
        {
            content: ['michel', 'vaudoise', 'unautretruc']
        }
    ]
    return (
        <>
            <Input className=""></Input>
            <div className="overflow-scroll max-h-80">
            </div>
        </>
    )
}
export default Search
