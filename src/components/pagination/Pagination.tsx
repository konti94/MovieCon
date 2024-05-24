import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const handlePrevPage = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            onPageChange(currentPage + 1);
        }
    };

    const handlePageClick = (page: number) => {
        if (page !== currentPage) {
            onPageChange(page);
        }
    };

    const renderPageNumbers = () => {
        const pageNumbers = [];
        const maxButtons = 10;
        const halfMaxButtons = Math.floor(maxButtons / 2);

        let startPage = Math.max(1, currentPage - halfMaxButtons);
        let endPage = Math.min(totalPages, currentPage + halfMaxButtons);

        if (currentPage <= halfMaxButtons) {
            endPage = Math.min(totalPages, maxButtons);
        } else if (currentPage + halfMaxButtons >= totalPages) {
            startPage = Math.max(1, totalPages - maxButtons + 1);
        }

        if (startPage > 1) {
            pageNumbers.push(
                <button
                    key={1}
                    className={`mx-1 rounded px-4 py-2 ${1 === currentPage ? 'bg-mc-red text-white' : 'bg-mc-gray-dark'}`}
                    onClick={() => handlePageClick(1)}
                >
                    1
                </button>,
            );
            if (startPage > 2) {
                pageNumbers.push(
                    <span key="start-ellipsis" className="mx-1 rounded bg-mc-gray-dark px-4 py-2">
                        ...
                    </span>,
                );
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(
                <button
                    key={i}
                    className={`mx-1 rounded px-4 py-2 ${i === currentPage ? 'bg-mc-red text-white' : 'bg-mc-gray-dark'}`}
                    onClick={() => handlePageClick(i)}
                >
                    {i}
                </button>,
            );
        }

        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                pageNumbers.push(
                    <span key="end-ellipsis" className="mx-1 rounded bg-mc-gray-dark px-4 py-2">
                        ...
                    </span>,
                );
            }
            pageNumbers.push(
                <button
                    key={totalPages}
                    className={`mx-1 rounded px-4 py-2 ${totalPages === currentPage ? 'bg-mc-red text-white' : 'bg-mc-gray-dark'}`}
                    onClick={() => handlePageClick(totalPages)}
                >
                    {totalPages}
                </button>,
            );
        }

        return pageNumbers;
    };

    return (
        <div className="mt-4 flex items-center justify-center">
            <button
                className="mx-1 rounded bg-mc-gray-dark px-4 py-2"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
            >
                Previous
            </button>
            {renderPageNumbers()}
            <button
                className="mx-1 rounded bg-mc-gray-dark px-4 py-2"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
