import React from 'react';

export default function Paginador(props) {
    const {
        itemsPerPage,
        currentPage,
        setCurrentPage,
        filteredData,
        pageCount
    } = props;

    return (
        <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            {/* Previous Page Button */}
            <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
                Anterior
            </button>

            {/* Page Number Buttons */}
            {[...Array(pageCount)].map((_, i) => (
                <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium
                                ${currentPage === i + 1 ? 'z-10 bg-green-50 border-green-500 text-green-600' : 'text-gray-500 hover:bg-gray-50'}`}
                >
                    {i + 1}
                </button>
            ))}

            {/* Next Page Button */}
            <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, pageCount))}
                disabled={currentPage === pageCount}
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
                Siguiente
            </button>
        </nav>
    );
}
