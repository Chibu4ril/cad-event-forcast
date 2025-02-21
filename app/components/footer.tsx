"use client";

import { Footer } from "flowbite-react";

export function FooterBar() {
  return (
    <div className="bg-gray-100">
      <Footer
        container
        className="container mx-auto bg-transparent shadow-none "
      >
        <Footer.Copyright
          href="#"
          by="PredPro™"
          year={new Date().getFullYear()}
        />
        <Footer.LinkGroup>
          <Footer.Link href="#">About</Footer.Link>
          <Footer.Link href="#">Privacy Policy</Footer.Link>
          <Footer.Link href="#">Licensing</Footer.Link>
          <Footer.Link href="#">The Team</Footer.Link>
        </Footer.LinkGroup>
      </Footer>
    </div>
  );
}
