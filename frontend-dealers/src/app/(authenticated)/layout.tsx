import AuthenticatedChrome from "../../components/AuthenticatedChrome";

const AuthenticatedLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <AuthenticatedChrome>{children}</AuthenticatedChrome>;
};

export default AuthenticatedLayout;
