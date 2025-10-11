import AuthBackground from "@/components/Auth/Background/AuthBackground";
import React from "react";

export default function Login() {
  return (
    <div className="relative w-screen h-screen bg-white overflow-hidden">
      {/* Fixed SVGs */}
      <AuthBackground></AuthBackground>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center">
        <h1 className="text-4xl font-bold text-gray-800">
          Welcome to PetYar 🐾
        </h1>
        <p className="text-lg text-gray-600 mt-4">
          Find care for your pet anytime, anywhere.
        </p>
      </div>
    </div>
  );
}
