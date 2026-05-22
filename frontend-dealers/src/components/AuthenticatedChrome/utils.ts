type ChromeRouteConfig = {
  path: string;
  match?: "exact" | "prefix";
  showSidebar?: boolean;
  showNavbar?: boolean;
};

const normalizePath = (path: string) => {
  if (path === "/") {
    return path;
  }

  return path.replace(/\/+$/, "");
};

const routeMatches = (pathname: string, route: ChromeRouteConfig) => {
  const normalizedPathname = normalizePath(pathname);
  const routePath = normalizePath(route.path);

  if (route.match === "prefix") {
    return (
      normalizedPathname === routePath ||
      normalizedPathname.startsWith(`${routePath}/`)
    );
  }

  return normalizedPathname === routePath;
};

export const authenticatedChromeRoutes: ChromeRouteConfig[] = [
  {
    path: "/car-evaluation",
    match: "prefix",
    showSidebar: false,
    showNavbar: false,
  },
];

export const getAuthenticatedChromeVisibility = (pathname: string) => {
  const matchingRoute = authenticatedChromeRoutes.find((route) =>
    routeMatches(pathname, route)
  );

  return {
    showSidebar: matchingRoute?.showSidebar ?? true,
    showNavbar: matchingRoute?.showNavbar ?? true,
  };
};
