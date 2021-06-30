import { useEffect, useRef, useState } from "react"

export const useFetch = (url) => {

    const isMounted = useRef(true);
    
    const [state, setState] = useState({data: null, loading: true, error: null});

    useEffect(() => {
        
        return () => { //Cuando el componente se desmonta, que el isMouted.current cambi a false
            isMounted.current = false;
        }

    }, [])

    useEffect(() => {
        
        setState({data:null, loading:true, error:null}); //Para que cada que cambie, vuelvan a estos valores y después, cuandoya haya cargado la petición fetch, se muetren los valores y se quite el loading...

        fetch(url)
            .then(resp => resp.json())
            .then(data => {

                    if(isMounted.current){
                        
                        setState({
                            loading: false,
                            error: null,
                            data
                        });

                    }

            })
            .catch(() => {
                setState({
                    data: null,
                    loading: false,
                    error: 'No se pudo cargar la info'
                })
            })
        
    }, [url])

    return state;
}
