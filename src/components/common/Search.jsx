import React from 'react'

export default function Search(props) {
    const {
        searchTerm,
        setSearchTerm
    } = props
    return (
        <div className="mb-6">
            <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
        </div>
    )
}
