export const mainNavigation = [
  {
    label: "About",
    path: "/about",
  },
  {
    label: "Services",
    path: "/services",
    children: [
      {
        label: "Geophysical Surveys",
        path: "/services/geophysical-surveys",
      },
      {
        label: "Geological Services",
        path: "/services/geological-services",
      },
      {
        label: "Geospatial Services",
        path: "/services/geospatial-services",
      },
      {
        label: "Hydrogeological Services",
        path: "/services/hydrogeological-services",
      },
      {
        label: "Environmental Services",
        path: "/services/environmental-services",
      },
    ],
  },
  {
    label: "Projects",
    path: "/projects",
  },
  {
    label: "Blog",
    path: "/blog",
  },
  // {
  //   label: "Gallery",
  //   path: "/gallery",
  // },
  {
    label: "Contact",
    path: "/contact",
  },
];