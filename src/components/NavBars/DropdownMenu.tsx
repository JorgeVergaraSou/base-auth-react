// src/components/DropdownMenu.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

type MenuItem = {
  name: string;
  links: { label: string; path: string }[];
};

const menuItems: MenuItem[] = [
  {
    name: 'Item 1',
    links: [
      { label: 'Link 1', path: '/link1' },
      { label: 'Link 2', path: '/link2' },
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

  return (
    <div className="relative">
      <button
        onClick={toggleMenu}
        className="bg-blue-500 text-white px-4 py-2 rounded-md md:hidden"
      >
        Menu
      </button>
      <div className={`absolute top-12 right-0 mt-2 w-48 bg-white shadow-lg rounded-md border border-gray-200 ${isOpen ? 'block' : 'hidden'} md:block md:w-64`}>
        <ul className="flex flex-col">
          {menuItems.map((item) => (
            <li key={item.name} className="group">
              <button
                onClick={() => handleItemClick(item.name)}
                className="w-full px-4 py-2 text-left hover:bg-gray-100 focus:outline-none"
              >
                {item.name}
              </button>
              {activeItem === item.name && (
                <ul className="flex flex-col bg-gray-50">
                  {item.links.map((link) => (
                    <li key={link.path}>
                      <Link
                        to={link.path}
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
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
      </div>
    </div>
  );
};

export default DropdownMenu;
