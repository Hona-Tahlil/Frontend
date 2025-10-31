export type NavbarItemsProps = {
  text: string;
  icon?: React.ReactNode;
  route: string;
  className?: string;
};

export type NavbarProps = {
  isUserLoggedin: boolean;
};