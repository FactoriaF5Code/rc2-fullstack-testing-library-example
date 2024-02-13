export const SearchBar = ({ onQueryChange }) => {
    return (
        <input type="search" name="query" onChange={(e) => onQueryChange(e.target.value)} placeholder="Buscar"/>
    )
}
