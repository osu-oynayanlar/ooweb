import { useState, useEffect, useRef } from "react";

const useFetch = (urls) => {
    const [data, setData] = useState([]);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    const ref = useRef();

    useEffect(() => {
        // Fetch data if urls change or on initial mount
        if (!ref.current || JSON.stringify(ref.current) !== JSON.stringify(urls)) {
            ref.current = urls;

            const fetchData = async () => {
                console.log(`Starting fetch for URLs at ${new Date().toISOString()}`);
                try {
                    const responses = await Promise.all(urls.map((url) => fetch(url)));
                    const dataPromises = responses.map((response) => {
                        if (!response.ok) {
                            throw new Error("Network response was not ok");
                        }
                        return response.json();
                    });

                    const results = await Promise.all(dataPromises);
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

// import { useState, useEffect } from "react";

// const useFetch = (url) => {
//     const [data, setData] = useState(null);
//     const [isPending, setIsPending] = useState(true);
//     const [error, setError] = useState(null);

//     useEffect(() => {
//         const fetchData = async () => {
//             console.log(`Starting fetch for ${url} at ${new Date().toISOString()}`);
//             try {
//                 const response = await fetch(url);
//                 if (!response.ok) {
//                     throw new Error("Network response was not ok");
//                 }
//                 const data = await response.json();
//                 setData(data);
//                 setIsPending(false);
//                 setError(null);
//                 console.log(`Completed fetch for ${url} at ${new Date().toISOString()}`);
//             } catch (err) {
//                 setIsPending(false);
//                 setError(err.message);
//                 console.log(`Error fetch for ${url} at ${new Date().toISOString()}`);
//             }
//         };

//         fetchData();
//     }, [url]);

//     return { data, isPending, error };
// };

// export default useFetch;
