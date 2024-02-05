import React from 'react';

const LegoSetCard = ({ set }) => {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
            <img className="w-full h-64 object-cover" src={set.image} alt={set.name} />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{set.name}</div>
                <p className="text-gray-700 text-base">{set.theme}</p>
            </div>
            <div className="px-6 pt-4 pb-2">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Pieces: {set.price || "Not available"}</span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">Year: {set.year}</span>
            </div>
        </div>
    );
};

export default LegoSetCard;