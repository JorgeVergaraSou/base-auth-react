'use client'

import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import {
    Dialog,
    DialogPanel,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    Popover,
    PopoverButton,
    PopoverGroup,
    PopoverPanel,
} from '@headlessui/react'
import {
    ArrowPathIcon,
    Bars3Icon,
    ChartPieIcon,
    CursorArrowRaysIcon,
    FingerPrintIcon,
    SquaresPlusIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import Logout from '../Logout/Logout'
import { Link } from 'react-router-dom'
import { PrivateRoutes } from '../../models'

const products = [
    { name: 'Compra de Insumos', description: 'Get a better understanding of your traffic', to: PrivateRoutes.INGRESO_PRODUCTOS, icon: ChartPieIcon },
    { name: 'Engagement', description: 'Speak directly to your customers', to: `/${PrivateRoutes.ADMIN}/IngresoProductos`, icon: CursorArrowRaysIcon },
    { name: 'Security', description: 'Your customers’ data will be safe and secure', to: `/${PrivateRoutes.ADMIN}/IngresoProductos`, icon: FingerPrintIcon },
    { name: 'Integrations', description: 'Connect with third-party tools', to: `/${PrivateRoutes.ADMIN}/IngresoProductos`, icon: SquaresPlusIcon },
    { name: 'Automations', description: 'Build strategic funnels that will convert', to: `/${PrivateRoutes.ADMIN}/IngresoProductos`, icon: ArrowPathIcon },
]

export default function NavBars() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [isPopoverOpen, setIsPopoverOpen] = useState(false) // Estado para controlar el Popover
    const location = useLocation()

    // Cerrar el menú móvil cuando cambia la ruta
    useEffect(() => {
        setMobileMenuOpen(false)
    }, [location])

    // Función para manejar el clic en los enlaces y cerrar el Popover
    const handleLinkClick = () => {
        setIsPopoverOpen(false)
    }

    return (
        <header className="bg-white">
            <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
                <div className="flex lg:flex-1">
                    <Link to={`/${PrivateRoutes.ADMIN}`} replace>
                        Ir a Inicio
                    </Link>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen(true)}
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon aria-hidden="true" className="h-6 w-6" />
                    </button>
                </div>
                <PopoverGroup className="hidden lg:flex lg:gap-x-12">
                    <Popover className="relative">
                        <PopoverButton
                            className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900"
                            onClick={() => setIsPopoverOpen(!isPopoverOpen)} // Alternar el estado del Popover
                        >
                            Ingresos
                            <ChevronDownIcon aria-hidden="true" className="h-5 w-5 flex-none text-gray-400" />
                        </PopoverButton>

                        {isPopoverOpen && ( // Mostrar PopoverPanel solo si isPopoverOpen es true
                            <PopoverPanel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5 transition data-[closed]:translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in">
                                <div className="p-4">
                                    {products.map((item) => (
                                        item && (
                                            <div
                                                key={item.name}
                                                className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                                            >
                                                <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                                    <item.icon aria-hidden="true" className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" />
                                                </div>
                                                <div className="flex-auto">
                                                    <Link
                                                        to={item.to}
                                                        className="block font-semibold text-gray-900"
                                                        onClick={handleLinkClick} // Cerrar el Popover al hacer clic en un enlace
                                                    >
                                                        {item.name}
                                                        <span className="absolute inset-0" />
                                                    </Link>
                                                    <p className="mt-1 text-gray-600">{item.description}</p>
                                                </div>
                                            </div>
                                        )
                                    ))}
                                </div>
                            </PopoverPanel>
                        )}
                    </Popover>

                    <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                        Features
                    </a>
                    <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                        Marketplace
                    </a>
                    <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
                        Company
                    </a>
                </PopoverGroup>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <Logout />
                </div>
            </nav>
            <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
                <div className="fixed inset-0 z-10" />
                <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-end">
                        <button
                            type="button"
                            onClick={() => setMobileMenuOpen(false)}
                            className="-m-2.5 rounded-md p-2.5 text-gray-700"
                        >
                            <span className="sr-only">Close menu</span>
                            <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                        </button>
                    </div>
                    <div className="mt-6 flow-root">
                        <div className="-my-6 divide-y divide-gray-500/10">
                            <div className="space-y-2 py-6">
                                <Disclosure as="div" className="-mx-3">
                                    <DisclosureButton className="group flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                                        Product
                                        <ChevronDownIcon aria-hidden="true" className="h-5 w-5 flex-none group-data-[open]:rotate-180" />
                                    </DisclosureButton>
                                    <DisclosurePanel className="mt-2 space-y-2">
                                        {products.map((item) => (
                                            item && (
                                                <Link
                                                    key={item.name}
                                                    to={item.to}
                                                    className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                                    onClick={() => setMobileMenuOpen(false)} // Cerrar el menú móvil
                                                >
                                                    {item.name}
                                                </Link>
                                            )
                                        ))}
                                    </DisclosurePanel>
                                </Disclosure>

                                <a
                                    href="#"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Features
                                </a>
                                <a
                                    href="#"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Marketplace
                                </a>
                                <a
                                    href="#"
                                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Company
                                </a>
                            </div>
                            <div className="py-6">
                                <a
                                    href="#"
                                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                >
                                    Log in
                                </a>
                            </div>
                        </div>
                    </div>
                </DialogPanel>
            </Dialog>
        </header>
    )
}
