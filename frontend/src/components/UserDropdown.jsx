import {
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
  Transition,
} from '@headlessui/react';
import { Fragment } from 'react';
import { FaUser, FaCaretDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const UserDropdown = ({ name, onLogout }) => {
  return (
    // Wrapper for the dropdown menu
    <Menu as="div" className="relative inline-block text-left ">
      {/* Button that triggers the dropdown */}
      <MenuButton className="flex items-center gap-2 text-white hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded">
        <FaUser />
        {name}
        <FaCaretDown className="text-sm" />
      </MenuButton>

      {/* Animated dropdown transition */}
      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-150"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        {/* Dropdown items */}
        <MenuItems className="absolute right-0 mt-1 w-24 h-24 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
          <div className="py-1">
            {/* Profile link */}
            <MenuItem>
              {({ active }) => (
                <Link
                  to="/profile"
                  className={`block ps-1 py-1 text-sm ${
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                  }`}
                >
                  Profile
                </Link>
              )}
            </MenuItem>

            {/* Order history link */}
            <MenuItem>
              {({ active }) => (
                <Link
                  to="/orders"
                  className={`block ps-1 py-1 text-sm ${
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                  }`}
                >
                  Order History
                </Link>
              )}
            </MenuItem>

            {/* Logout button */}
            <MenuItem>
              {({ active }) => (
                <button
                  onClick={onLogout}
                  className={`w-full text-left block ps-1 py-1 text-sm ${
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                  }`}
                >
                  Logout
                </button>
              )}
            </MenuItem>
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
};

export default UserDropdown;
