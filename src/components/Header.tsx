"use client";
import { shadow } from "@/styles/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { ModeToggle } from "./DarkModeToggle";
import LogOutButton from "./LogOutButton";

function Header({ user }: { user: unknown }) {
  return (
    <header
      className="bg-popover fixed top-0 left-0 w-full h-16 flex items-center justify-between px-4 sm:px-8 shadow-md z-5"
      style={{
        boxShadow: shadow,
      }}
    >
      {/* Logo */}
      <Link href="/" className="flex items-center">
        <Image
          src="/logo.png"
          alt="Logo"
          height={60}
          width={60}
          className="rounded-lg"
          priority
        />
      </Link>

      {/* Navigation & Actions */}
      <div className="flex items-center gap-4">
        {user ? (
          <LogOutButton />
        ) : (
          <div className="flex items-center gap-2">
            <Button asChild size="sm">
              <Link href="/login">Login</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="hidden sm:inline-flex"
            >
              <Link href="/signup">Signup</Link>
            </Button>
          </div>
        )}
        <ModeToggle />
      </div>
    </header>
  );
}

export default Header;
