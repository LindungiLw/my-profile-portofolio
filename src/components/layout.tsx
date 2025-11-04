import React from "react";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="bg-[#021526] min-h-screen overflow-x-hidden ">
      <p>Lindungi Laowo</p>

      {children}
    </div>
  );
}
