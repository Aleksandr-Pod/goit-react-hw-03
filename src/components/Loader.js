// import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
// import { Audio } from 'react-loader-spinner'
import RingLoader from "react-spinners/RingLoader";

export default function Loader({ loading }) { 

    return (<div className="spinner">
        <RingLoader color="red" loading={loading} size={150} />
        {/* <Audio color="red"/> */}
        </div>
    )
}