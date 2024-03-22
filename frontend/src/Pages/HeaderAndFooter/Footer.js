import React from "react";

const Footer = () => {
  return (
    <footer className="md hidden bg-gray-800 p-4 text-center text-white dark:bg-secondary-700 dark:text-secondary-200 fixed bottom-0 w-full">
      <div className="text-secondary-800 dark:text-secondary-400">
        © 2023 Copyright:
        <a
          className="text-secondary-100 dark:text-secondary-400"
          href="https://nehrucolleges.com/"
        >
          NIT
        </a>
      </div>
    </footer>
  );
};

export default Footer;
