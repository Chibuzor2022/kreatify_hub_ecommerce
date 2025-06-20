import {
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
  Transition,
} from '@headlessui/react';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

const AdminDropdown = () => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton className="text-white hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded">
        Admin
      </MenuButton>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-150"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems className="absolute right-0 mt-1 w-18 h-24 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
          <div className="py-1">
            <MenuItem>
              <Link
                to="/admin/productlist"
                className="block ps-3 py-1 text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100 data-[headlessui-state=active]:bg-gray-100 data-[headlessui-state=active]:text-gray-900"
              >
                Products
              </Link>
            </MenuItem>
            <MenuItem>
              <Link
                to="/admin/userlist"
                className="block ps-4  py-1 text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100 data-[headlessui-state=active]:bg-gray-100 data-[headlessui-state=active]:text-gray-900"
              >
                Users
              </Link>
            </MenuItem>
            <MenuItem>
              <Link
                to="/admin/orderlist"
                className="block ps-4  py-1 text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100 data-[headlessui-state=active]:bg-gray-100 data-[headlessui-state=active]:text-gray-900"
              >
                Orders
              </Link>
            </MenuItem>
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
};

export default AdminDropdown;
