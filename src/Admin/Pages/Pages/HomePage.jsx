import React from 'react'
import SideBarHome from './components/SideBarHome'

export default function HomePage() {
  return (
    <div className="flex p-10">
      <div className="w-1/4 text-dark">
        <SideBarHome />
      </div>
    </div>
  );
}
