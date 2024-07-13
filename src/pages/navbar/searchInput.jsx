import { useState, useEffect, useRef } from "react";
import "./navbar.css";

const SearchInput = () => {
    const [query, setQuery] = useState("");
    const [allSuggestions, setAllSuggestions] = useState([]);
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [isFocused, setIsFocused] = useState(false);

    const inputRef = useRef(null);
    const suggestionsRef = useRef(null);

    useEffect(() => {
        // Fetch data once when the component mounts
        fetch(`https://api.bancho.osuoynayanlar.com.tr/v1/search_players`)
            .then((response) => response.json())
            .then((data) => {
                const suggestionsArray = data.result;
                const suggestions = suggestionsArray.map((item) => ({
                    name: item.name,
                    id: item.id,
                }));
                setAllSuggestions(suggestions);
            })
            .catch((error) => console.error("Error fetching suggestions:", error));
    }, []);

    useEffect(() => {
        // Filter suggestions based on the input query
        if (query.length > 0) {
            const filtered = allSuggestions.filter((suggestion) =>
                suggestion.name.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredSuggestions(filtered);
        } else {
            setFilteredSuggestions([]);
        }
    }, [query, allSuggestions]);

    const handleFocus = () => {
        setIsFocused(true);
    };

    const handleBlur = (e) => {
        if (
            suggestionsRef.current &&
            !suggestionsRef.current.contains(e.relatedTarget) &&
            e.relatedTarget !== inputRef.current
        ) {
            setIsFocused(false);
        }
    };

    return (
        <div className="search-container">
            <input
                name="searchPlayer"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={handleFocus}
                onBlur={handleBlur}
                placeholder="Search a player..."
                id="searchPlayer"
                ref={inputRef}
            />
            {isFocused && filteredSuggestions.length > 0 && (
                <ul className="suggestions" ref={suggestionsRef}>
                    {filteredSuggestions.map((suggestion, index) => (
                        <a href={`/u/${suggestion.id}`} className="userLink" key={index}>
                            <li>
                                <img
                                    src={`https://a.bancho.osuoynayanlar.com.tr/${suggestion.id}`}
                                    alt="Profile picture of the user"
                                    className="pfpli"
                                />
                                {suggestion.name}
                            </li>
                        </a>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchInput;
