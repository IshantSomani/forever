import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import loader from '../assets/loader.lottie';

const LoadingSpinner = ({ message }) => {
    return (
        <div className="text-center space-y-4">
            <DotLottieReact
                src={loader}
                loop={true}
                autoplay={true}
                className=' place-self-center items-center'
            />
            <p>{message}</p>
        </div>
    );
};

export default LoadingSpinner;