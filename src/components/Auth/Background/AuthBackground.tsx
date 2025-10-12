import { useMediaQuery } from "react-responsive";

export default function AuthBackground() {
  const isDesktopOrTablet = useMediaQuery({
    query: "(min-width: 640px)",
  });
  return (
    <>
      {isDesktopOrTablet && (
        <>
          <img
            src="src/assets/images/Vector 56.svg"
            alt="Paw icon top left"
            className="fixed top-0 left-0 sm:h-[40vh] md:h-[50vh] lg:h-[60vh] pointer-events-none z-0 object-cover"
          />
          <img
            src="src/assets/images/Vector 53.svg"
            alt="Bone icon bottom right"
            className="fixed bottom-0 right-0 sm:h-[40vh] md:h-[50vh] lg:h-[60vh] pointer-events-none z-0 object-cover"
          />
        </>
      )}
      {!isDesktopOrTablet && (
        <>
          <img
            src="src/assets/images/login-signup-mobile-background.png"
            alt="background image"
            className="fixed h-screen w-screen object-cover object-bottom z-0"
          />
        </>
      )}
    </>
  );
}
