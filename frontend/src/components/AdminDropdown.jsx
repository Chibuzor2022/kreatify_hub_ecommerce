// Import required components from @headlessui/react for building accessible dropdown UI
import {
  Menu,         
  MenuButton,   
  MenuItems,    
  MenuItem,    
  Transition,   
} from '@headlessui/react';

// Import Fragment for wrapping components without adding extra nodes to the DOM
import { Fragment } from 'react';

// Import a caret (down arrow) icon from react-icons
import { FaCaretDown } from 'react-icons/fa';

// Import Link from react-router-dom for navigation without full page reload
import { Link } from 'react-router-dom';

// Define and export a functional React component for the admin dropdown menu
const AdminDropdown = () => {
  return (
    // Menu acts as the root container for the dropdown, styled as an inline block with right margin
    <Menu as="div" className="relative inline-block text-left me-10">
      
      {/* MenuButton toggles the dropdown visibility when clicked */}
      <MenuButton className="flex items-center text-white hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded">
        Admin
        {/* Down arrow icon next to the "Admin" label */}
        <FaCaretDown className="text-sm" />
      </MenuButton>

      {/* Transition adds enter/leave animations for the dropdown items */}
      <Transition
        as={Fragment}  // No extra wrapper in the DOM
        enter="transition ease-out duration-200"           
        enterFrom="transform opacity-0 scale-95"           
        enterTo="transform opacity-100 scale-100"         
        leave="transition ease-in duration-150"           
        leaveFrom="transform opacity-100 scale-100"        
        leaveTo="transform opacity-0 scale-95"             
      >
        {/* MenuItems is the dropdown content area */}
        <MenuItems className="absolute right-0 mt-1 w-18 h-24 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
          
          {/* Dropdown items container with vertical padding */}
          <div className="py-1">
            {/* Individual MenuItem for Products link */}
            <MenuItem>
              <Link
                to="/admin/productlist"
                className="block ps-3 py-1 text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100 
                  data-[headlessui-state=active]:bg-gray-100 
                  data-[headlessui-state=active]:text-gray-900"
              >
                Products
              </Link>
            </MenuItem>

            {/* Individual MenuItem for Users link */}
            <MenuItem>
              <Link
                to="/admin/userlist"
                className="block ps-4 py-1 text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100 
                  data-[headlessui-state=active]:bg-gray-100 
                  data-[headlessui-state=active]:text-gray-900"
              >
                Users
              </Link>
            </MenuItem>

            {/* Individual MenuItem for Orders link */}
            <MenuItem>
              <Link
                to="/admin/orderlist"
                className="block ps-4 py-1 text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100 
                  data-[headlessui-state=active]:bg-gray-100 
                  data-[headlessui-state=active]:text-gray-900"
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

// Export the component for use in other parts of the app
export default AdminDropdown;
