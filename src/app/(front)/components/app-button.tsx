"use client"

import { Button } from "@/components/ui/button";

export default function AppButton() {

  const handleClickMe = () => alert('Hello Next.js');

  return (
    <Button onClick={handleClickMe}>
      Click Me!
    </Button>
  );
}
