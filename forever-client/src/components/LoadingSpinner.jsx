import { memo } from "react";

const LoadingSpinner = ({ message = "Loading..." }) => {
    return (
        <div className="flex flex-col items-center justify-center py-12 space-y-4" role="status" aria-live="polite">
            <div className="relative w-12 h-12">
                <div className="w-12 h-12 rounded-full border-2 border-gray-200"></div>
                <div className="absolute top-0 left-0 w-12 h-12 rounded-full border-2 border-black border-t-transparent animate-spin"></div>
            </div>
            {message && <p className="text-sm text-gray-500 font-medium">{message}</p>}
        </div>
    );
};

export default memo(LoadingSpinner);
