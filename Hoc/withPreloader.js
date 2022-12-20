import Preloader from "../Preloader";

export const WithPreloaderHOC = ({children, loading, mobile}) => {

    if (loading) {
        return <Preloader mobile={mobile ? mobile : null}/>
    }
    return children;
};
