import React from 'react'

const Pagination = ({ setCurrentPage, currentPage, totalPages }) => {
    return (
        <div aria-label="pagination" className='place-self-center mt-6'>
            <ul className="flex shrink-0 items-center gap-2 text-sm font-medium">
                <li>
                    <button
                        onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                        disabled={currentPage === 1}
                        className="flex items-center p-1 hover:text-primary disabled:opacity-50"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-6">
                            <path fillRule="evenodd" d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
                        </svg>
                        Previous
                    </button>
                </li>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <li key={page}>
                        <button
                            onClick={() => setCurrentPage(page)}
                            className={`flex size-6 items-center justify-center rounded-radius p-1 ${currentPage === page
                                ? 'bg-primary font-bold text-on-primary dark:bg-primary-dark'
                                : 'text-on-surface hover:text-primary dark:text-on-surface-dark'
                                }`}
                        >
                            {page}
                        </button>
                    </li>
                ))}

                <li>
                    <button
                        onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="flex items-center p-1 hover:text-primary disabled:opacity-50"
                    >
                        Next
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-6">
                            <path fillRule="evenodd" d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                        </svg>
                    </button>
                </li>
            </ul>
        </div>
    )
}

export default Pagination