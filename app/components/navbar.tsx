"use client";

import Link from "next/link";
import { Navbar } from "flowbite-react";

export function NavigationBar() {
  return (
    <div className="bg-gradient-to-r from-purple-700 to-orange-400 text-white py-2">
      <Navbar
        fluid
        rounded
        className="container mx-auto bg-transparent text-white"
      >
        <Navbar.Brand as={Link} href="/">
          <span className="self-center whitespace-nowrap text-2xl font-bold">
            PredPro
          </span>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Navbar.Link href="/about" className="text-white">
            About This Project
          </Navbar.Link>
          <Navbar.Link href="#" className="text-white">
            The Team
          </Navbar.Link>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
