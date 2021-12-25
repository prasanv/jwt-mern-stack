import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <div>
      <nav>
        <h1>
          <Link href="/">
            <a>Ninja Smoothies</a>
          </Link>
        </h1>
      </nav>
    </div>
  );
};

export default Header;
