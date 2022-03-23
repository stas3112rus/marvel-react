import {useState, useCallback} from 'react'

export const useHttp = () =>{
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [process, setProcess] = useState('waiting');

    const request = useCallback(async(url, method = 'Get', body = null, headers = {'Content-Type': 'application/json'})=>
    {
        setLoading(true);
        setProcess('loading');

        try {
            const response  = await fetch(url, {method, body, headers});
            const data = await response.json();

            if (!response.ok){
                throw new Error (`Could not fetch ${url}, status: ${response.status}`);
            }

            setLoading(false);           
            return data;

        }
        catch(e){
            setLoading(false);
            setProcess('error');
            setError(e.message);
            throw e;
        }

    }, []);

    const clearError = useCallback(()=> {
        setError(null)
        setProcess('waiting')
    }, []);

    return {loading, request, clearError, error, process, setProcess};
}