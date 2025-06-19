// import {
//   Menu,
//   MenuButton,
//   MenuItems,
//   MenuItem,
//   Transition,
// } from '@headlessui/react';
// import { Fragment } from 'react';
// import { FaUser } from 'react-icons/fa';
// import { Link } from 'react-router-dom';

// const UserDropdown = ({ name, onLogout }) => {
//   return (
//     <Menu as="div" className="relative inline-block text-left">
//       <MenuButton className="flex items-center gap-2 text-white hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded">
//         <FaUser />
//         {name}
//       </MenuButton>

//       <Transition
//         as={Fragment}
//         enter="transition ease-out duration-200"
//         enterFrom="transform opacity-0 scale-95"
//         enterTo="transform opacity-100 scale-100"
//         leave="transition ease-in duration-150"
//         leaveFrom="transform opacity-100 scale-100"
//         leaveTo="transform opacity-0 scale-95"
//       >
//         <MenuItems className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
//           <div className="py-1">
//             <MenuItem>
//               <Link
//                 to="/profile"
//                 className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100 data-[headlessui-state=active]:bg-gray-100 data-[headlessui-state=active]:text-gray-900"
//               >
//                 Profile
//               </Link>
//             </MenuItem>
//              <MenuItem>
//               <Link
//                 to="/orders"
//                 className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100 data-[headlessui-state=active]:bg-gray-100 data-[headlessui-state=active]:text-gray-900"
//               >
//                 Order History
//               </Link>
//             </MenuItem>
//             <MenuItem>
//               <button
//                 onClick={onLogout}
//                 className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100 data-[headlessui-state=active]:bg-gray-100 data-[headlessui-state=active]:text-gray-900"
//               >
//                 Logout
//               </button>
//             </MenuItem>
//           </div>
//         </MenuItems>
//       </Transition>
//     </Menu>
//   );
// };

// export default UserDropdown;

import {
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
  Transition,
} from '@headlessui/react';
import { Fragment } from 'react';
import { FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const UserDropdown = ({ name, onLogout }) => {
  const baseClass =
    'block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100';

  return (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton className="flex items-center gap-2 text-white hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 rounded">
        <FaUser />
        {name}
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
        <MenuItems className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
          <div className="py-1">
            <MenuItem as={Link} to="/profile" className={baseClass}>
              Profile
            </MenuItem>
            <MenuItem as={Link} to="/orders" className={baseClass}>
              Order History
            </MenuItem>
            <MenuItem>
              <button onClick={onLogout} className={baseClass}>
                Logout
              </button>
            </MenuItem>
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
};

export default UserDropdown;
