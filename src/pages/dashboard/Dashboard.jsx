import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/navigation/Sidebar'

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState("cultivos")
    const [isExpanded, setIsExpanded] = useState(true)
    const toggleSidebar = () => setIsExpanded(!isExpanded)

    return (
        <div className="flex h-screen  bg-gray-100">
            {/* Sidebar */}
            <Sidebar
                toggleSidebar={toggleSidebar}
                activeTab={activeTab}
                setIsExpanded={setIsExpanded}
                isExpanded={isExpanded}
                setActiveTab={setActiveTab}
            />
            {/* Contenido principal */}
            <main
            className={`
                ${isExpanded ? 'ml-64' : 'ml-20'}
                flex-1 p-6 overflow-y-auto
                transition-all duration-300 ease-in-out
            `}
             >
                <Outlet />

            </main>
        </div>
    )
}
