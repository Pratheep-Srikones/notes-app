import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <header>
      <Link href="/">
        <Image
          src={"/logo.png"}
          alt="Logo"
          height={80}
          width={80}
          className="rounded-xl"
          priority
        />
      </Link>
    </header>
  );
};

export default Header;
