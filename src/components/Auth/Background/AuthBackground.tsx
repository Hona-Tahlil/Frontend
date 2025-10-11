import Desktop from "@/providers/Desktop";
import Mobile from "@/providers/Mobile";
import Tablet from "@/providers/Tablet";
import React from "react";

export default function AuthBackground() {
  return (
    <>
        <img
          src="src/assets/images/Vector 56.svg"
          alt="Paw icon top left"
          className="fixed top-0 left-0 sm:h-[40vh] md:h-[80vh] lg:h-[60vh] pointer-events-none z-0 object-cover"
        />
        <img
          src="src/assets/images/Vector 53.svg"
          alt="Bone icon bottom right"
          className="fixed bottom-0 right-0 sm:h-[40vh] md:h-[80vh] lg:h-[60vh]  pointer-events-none z-0 object-cover"
        />

    </>
  );
}
