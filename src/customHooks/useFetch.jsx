import { useState, useEffect, useRef } from "react";
import axios from "axios";

const useFetch = (urls) => {
    const [data, setData] = useState([]);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    const ref = useRef();

    useEffect(() => {
        if (!ref.current || JSON.stringify(ref.current) !== JSON.stringify(urls)) {
            ref.current = urls;

            const fetchData = async () => {
                console.log(`Starting fetch for URLs at ${new Date().toISOString()}`);
                try {
                    const responses = await Promise.all(urls.map((url) => axios.get(url)));
                    const results = responses.map((response) => response.data);

                    setData(results);
                    setIsPending(false);
                    setError(null);
                    console.log(`Completed fetch for URLs at ${new Date().toISOString()}`);
                } catch (err) {
                    setIsPending(false);
                    setError(err.message);
                    console.log(`Error fetch for URLs at ${new Date().toISOString()}`);
                }
            };

            fetchData();
        }
    }, [urls]);

    return { data, isPending, error };
};

export default useFetch;
