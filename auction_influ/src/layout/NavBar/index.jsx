// 상단 NavBar
// rafce

import React, { useState } from 'react'

function NavBar () {
  const [menu, setMenu] = useState(false);

  const handleMenu = () => {
    setMenu(!menu);
  }
  return (
    <section className='relative z-10 text-white bg-gray-900'>
      <div className='w-full'>
        <div className='flex items-center justify-between mx-5 sm:mx-10 lg:mx-20'>
          {/* logo */}
          <div>
            <Link to = '/'><Logo></Logo></Link>
          </div>

          {/* menu */}
          <div className='text-2xl sm:hidden'>
            <button onClick={handleMenu}>{menu ? "-" : "+"}</button>
          </div>

          {/* nav-items large screen */}
          <div className='hidden sm:block'>
            <NavItem />
          </div>

          <div className='block sm:hidden'>
            {menu &&<NavItem mobile />}
          </div>
          
        </div>
      </div>
    </section>
  )
}

export default NavBar