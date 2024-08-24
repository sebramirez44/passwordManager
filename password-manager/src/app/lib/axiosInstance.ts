import axios from 'axios';

//creo la instance afuera para intentar usar sus cookies a lo largo de varios requests, si no funciona rip ig
export const axiosInstance = axios.create({
    baseURL: `http://localhost:3000/api`,
    timeout: 1000,
});

//maybe hacerlo en un hook para poder hacerleeject a los intercceptors y correrlo cuando hay un cambio en el localstorage o refresh
axiosInstance.interceptors.request.use(
    config => {
        const jwt = localStorage.getItem("jwt") || "";
        if (!config.headers['Authorization'] && jwt != "") {
            //obtener la access token de algun lugar del request no se donde chingados
            config.headers['Authorization'] = `Bearer ${jwt}`;
        }
        return config;
    }, (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    response => response,
    async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
            prevRequest.sent = true;
            //no se si cambiar esto?
            //idk si tengo que hacer withcredentials aqui?
            const newAccessToken = await fetch("http://localhost:3000/api/refresh");
            const accessJson = await newAccessToken.json();
            prevRequest.headers['Authorization'] = `Bearer ${accessJson?.accessToken}`;
            localStorage.setItem("jwt", `${accessJson?.accessToken}`);
            return axiosInstance(prevRequest);
        }
    }
);
