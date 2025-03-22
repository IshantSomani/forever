import { ArrowPathIcon } from "@heroicons/react/16/solid";

const LoadingSpinner = ({ title, message, note }) => {
    return (
        <div className="text-center space-y-4">
            <ArrowPathIcon className='h-20 w-20 mx-auto animate-spin' />
            <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
            <p>{message}</p>
            <p className="text-sm text-gray-500 mt-4">
                {note}
            </p>
        </div>
    );
};

export default LoadingSpinner;