import { useState, useCallback, useEffect } from 'react';

export const useSearch = (items = []) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredItems, setFilteredItems] = useState(items);

    const handleSearch = useCallback((term) => {
        setSearchTerm(term);
        if (term.trim() === '') {
            setFilteredItems(items);
        } else {
            const filtered = items.filter((item) =>
                item.title.toLowerCase().includes(term.toLowerCase())
            );
            setFilteredItems(filtered);
        }
    }, [items]);

    // TODO: UPDATES filteredItems WHENEVER THE ITEMS PROP CHANGE
    useEffect(() => {
        setFilteredItems(items);
    }, [items])

    return {
        searchTerm,
        setSearchTerm,
        filteredItems,
        handleSearch,
    };
};