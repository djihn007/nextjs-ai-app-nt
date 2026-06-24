"use client"

import { useEffect, useState } from "react";

export default function AppFooter() {
  const [company, setCompany] = useState('COSCI');

  const currentDate = <div>{ new Date().toLocaleDateString()}</div>;

  useEffect(() => {
    console.log('Runs on every re-render');
  });

  useEffect(() => {
    console.log('Runs once on mount');
  }, []);

  useEffect(() => {
    console.log('Runs when company changes');
  }, [company]);

  const handleMouseOver = () => {
    setCompany('SWU');
  }

  return (
    <div className="border-t border-[#E3E0DD] py-6 text-center text-sm text-[#797067]">
       <p onMouseOver={handleMouseOver} className="mb-2">{company}</p>
       {currentDate}
       <p className="mt-2">codingthailand@gmail.com &copy; { new Date().getFullYear() }</p>
    </div>
  );
}
