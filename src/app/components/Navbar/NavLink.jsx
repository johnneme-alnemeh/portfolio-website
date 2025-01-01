import Link from "next/link";

const NavLink = ({ href, title, isActive, onClick }) => {
  return (
    <Link
      href={`#${href}`}
      onClick={onClick}
      className={`block py-2 pl-3 pr-4 sm:text-lg font-medium rounded-md md:bg-transparent md:p-0 ${
        isActive
          ? "text-white text-shadow-lg shadow-sky-500 transition-all duration-300"
          : "text-white hover:text-gray-400 transition-all duration-300"
      }`}
      
      aria-current={isActive ? "page" : undefined}
    >
      {title}
    </Link>
  );
};

export default NavLink;
