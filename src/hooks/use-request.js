import {useCallback, useState} from "react";


const useRequest = (onCompleteRequest, errorHandler) => {
    const [error, setError] = useState(null);

    const sendHttpRequest = useCallback(async (requestOptions) => {
        setError(null);
        console.log("requestOptions", requestOptions)
        try {
            if (requestOptions.init) {
                // console.log('body: ' + requestOptions.init.body)
                // throw new Error("Ошибка запроса.");
            }

            const response = await fetch(
                requestOptions.url,
                requestOptions.init
            );


            if (!response.ok) {
                throw new Error("Ошибка запроса.");
            }

            const data = await response.json();

            if (onCompleteRequest) {
                onCompleteRequest(data)
            }
            return data;

        } catch
            (err) {
            const errorMessage = err.message || "Что-то пошло не так..."
            setError(errorMessage);
            if (errorHandler) {
                errorHandler(errorMessage)
            }
        }
    }, [onCompleteRequest, errorHandler]);

    return {
        error,
        sendHttpRequest
    }
}

export default useRequest