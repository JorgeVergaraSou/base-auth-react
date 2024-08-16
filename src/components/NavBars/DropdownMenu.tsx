import { ChartPieIcon, CursorArrowRaysIcon, FingerPrintIcon, SquaresPlusIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { PrivateRoutes } from '../../models';
import Logout from '../Logout/Logout';

type MenuItem = {
  name: string;
  description?: string;
  links: { label: string; path: string; icon?: React.ElementType }[];
};

const menuItems: MenuItem[] = [
  {
    name: 'Ingresos',
    links: [
      { label: 'Compra de Insumos', path: PrivateRoutes.INGRESO_PRODUCTOS, icon: ChartPieIcon },
      { label: 'Engagement', path: '/admin/1', icon: CursorArrowRaysIcon },
      { label: 'Security', path: '/admin/2', icon: FingerPrintIcon },
      { label: 'Integrations', path: '/admin/3', icon: SquaresPlusIcon },
      { label: 'Automations', path: '/admin/4', icon: ArrowPathIcon },
    ],
  },
  {
    name: 'Item 2',
    links: [
      { label: 'Link 3', path: '/link3' },
      { label: 'Link 4', path: '/link4' },
    ],
  },
  {
    name: 'Item 3',
    links: [
      { label: 'Link 5', path: '/link5' },
      { label: 'Link 6', path: '/link6' },
    ],
  },
];

const DropdownMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const toggleMenu = () => setIsOpen(!isOpen);
  const handleItemClick = (item: string) => setActiveItem(item === activeItem ? null : item);
  const handleLinkClick = () => {
    setIsOpen(false);
    setActiveItem(null);
  };

  return (<>
    <div className="grid grid-cols-5">
      <div className=" h-20 w-full col-span-1 justify-content-center">
        <div className='text-center mt-4'>
          <Link to={`/${PrivateRoutes.ADMIN}`} replace>
          Ir a Inicio
        </Link>
        </div>
        
      </div>
      <div className=" h-20 w-full col-span-3">
        <div className={`absolute top-16 right-0 mt-2   rounded-md  ${isOpen ? 'hidden' : 'hidden'} md:static md:flex md:flex-row md:w-auto md:items-center md:justify-center`}>
          <ul className="flex flex-col md:flex-row">
            {menuItems.map((item) => (
              <li key={item.name} className="group relative mr-3">
                <button
                  onClick={() => handleItemClick(item.name)}
                  className="px-4 py-2 text-left hover:bg-cyan-300 cursor-pointer focus:outline-none  hover:animate-wiggle text-black"
                >
                  {item.name}
                </button>
                {/* Submenú en un dropdown vertical */}
                {activeItem === item.name && (
                  <ul className="flex flex-col bg-gray-50 absolute top-full left-0 mt-1 shadow-lg rounded-md w-48">
                    {item.links.map((link) => (
                      <li key={link.path}>
                        <Link
                          to={link.path}
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                          onClick={handleLinkClick}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
          <Logout />
        </div>
        {/*** Mobile menu */}
        {isOpen && (
          <div className="fixed top-11 right-0 z-50 bg-yellow-50 shadow-lg border border-gray-500 rounded-md md:hidden w-64">
            <ul className="flex flex-col p-4">
              {menuItems.map((item) => (
                <li key={item.name} className="group relative mb-1 ">
                  <button
                    onClick={() => handleItemClick(item.name)}
                    className="px-4 py-2 text-left hover:bg-cyan-300 cursor-pointer focus:outline-none  bg-cyan-700 hover:animate-wiggle text-black"
                  >
                    {item.name}
                  </button>
                  {/* Submenú en un dropdown vertical */}
                  {activeItem === item.name && (
                    <ul className="flex flex-col bg-gray-50 mt-1 shadow-lg rounded-md">
                      {item.links.map((link) => (
                        <li key={link.path}>
                          <Link
                            to={link.path}
                            className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                            onClick={handleLinkClick}
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
            <Logout />
          </div>
        )}
      </div>
      <div className=" h-20 w-full col-span-1">
        <button
          onClick={toggleMenu}
          className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center justify-center md:hidden"
        >
          Menu
        </button>

      </div>
    </div>
  </>
  );
};

export default DropdownMenu;
