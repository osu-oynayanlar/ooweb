import { useState, useEffect, useRef } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";

const SearchInput = () => {
    const [query, setQuery] = useState("");
    const [allSuggestions, setAllSuggestions] = useState([]);
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [isInputFocused, setIsInputFocused] = useState(false);
    const [isFadingOut, setIsFadingOut] = useState(false);

    const inputRef = useRef(null);

    useEffect(() => {
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
        const timeoutId = setTimeout(() => {
            if (query.length > 0) {
                const filtered = allSuggestions.filter((suggestion) =>
                    suggestion.name.toLowerCase().includes(query.toLowerCase())
                );
                setFilteredSuggestions(filtered);
                setIsFadingOut(false);
            } else {
                setFilteredSuggestions([]);
            }
        }, 500);
        return () => clearTimeout(timeoutId);
    }, [query, allSuggestions]);

    const handleBlur = () => {
        setIsFadingOut(true);
        setTimeout(() => {
            setIsInputFocused(false);
            setFilteredSuggestions([]);
            setIsFadingOut(false);
        }, 250);
    };

    return (
        <div className="search-container">
            <input
                name="searchPlayer"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for a player..."
                id="searchPlayer"
                ref={inputRef}
                onFocus={() => setIsInputFocused(true)}
                onBlur={handleBlur}
            />
            {filteredSuggestions.length > 0 && (isInputFocused || isFadingOut) && (
                <ul className={`suggestions ${isFadingOut ? "fade-out" : isInputFocused ? "fade-in" : ""}`}>
                    {filteredSuggestions.map((suggestion, index) => (
                        <Link to={`/u/${suggestion.id}`} className="userLink" key={index}>
                            <li>
                                <img
                                    src={`https://a.bancho.osuoynayanlar.com.tr/${suggestion.id}`}
                                    alt="Profile picture of the user"
                                    className="pfpli"
                                />
                                {suggestion.name}
                            </li>
                        </Link>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchInput;
