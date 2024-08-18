// hooks/useProductData.js
import { useState, useEffect } from "react";

export const useProductData = () => {
    const API_URL = "https://fakestoreapi.com/products";
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchProductData = async () => {
            setLoading(true);
            try {
                const res = await fetch(API_URL);
                const data = await res.json();
                setPosts(data);
            } catch (error) {
                console.error("Error fetching data:", error);
                setPosts([]);
            }
            setLoading(false);
        };

        fetchProductData();
    }, []);

    return { loading, posts };
};