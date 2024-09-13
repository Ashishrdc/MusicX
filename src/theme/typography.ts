export const typography = {
  // Font-Fallbacks
  fontFamily: [
    "Ubuntu",
    "-apple-system",
    "BlinkMacSystemFont",
    '"Segoe UI"',
    "Roboto",
    '"Helvetica Neue"',
    "Arial",
    "sans-serif",
    '"Apple Color Emoji"',
    '"Segoe UI Emoji"',
    '"Segoe UI Symbol"',
  ].join(","),

  // Heading styles
  h1: {
    "@media (max-width:600px)": {
      fontSize: "1.75rem", // Smaller size on small screens
    },
    "@media (min-width:600px) and (max-width:960px)": {
      fontSize: "2rem", // Size for medium screens
    },
    "@media (min-width:960px)": {
      fontSize: "2.25rem", // Size for large screens
    },
  },
  h2: {
    "@media (max-width:600px)": {
      fontSize: "1.5rem", // Smaller size on small screens
    },
    "@media (min-width:600px) and (max-width:960px)": {
      fontSize: "1.75rem", // Size for medium screens
    },
    "@media (min-width:960px)": {
      fontSize: "2rem", // Size for large screens
    },
  },
  h3: {
    "@media (max-width:600px)": {
      fontSize: "1.25rem", // Smaller size on small screens
    },
    "@media (min-width:600px) and (max-width:960px)": {
      fontSize: "1.5rem", // Size for medium screens
    },
    "@media (min-width:960px)": {
      fontSize: "1.75rem", // Size for large screens
    },
  },
  h4: {
    "@media (max-width:600px)": {
      fontSize: "1.125rem", // Smaller size on small screens
    },
    "@media (min-width:600px) and (max-width:960px)": {
      fontSize: "1.375rem", // Size for medium screens
    },
    "@media (min-width:960px)": {
      fontSize: "1.5rem", // Size for large screens
    },
  },
  h5: {
    "@media (max-width:600px)": {
      fontSize: "1rem", // Smaller size on small screens
    },
    "@media (min-width:600px) and (max-width:960px)": {
      fontSize: "1.125rem", // Size for medium screens
    },
    "@media (min-width:960px)": {
      fontSize: "1.25rem", // Size for large screens
    },
  },
  h6: {
    "@media (max-width:600px)": {
      fontSize: "1rem", // Smaller size on small screens
    },
    "@media (min-width:600px) and (max-width:960px)": {
      fontSize: "1.125rem", // Size for medium screens
    },
    "@media (min-width:960px)": {
      fontSize: "1.125rem", // Size for large screens
    },
  },

  // Subtitle styles
  subtitle1: {
    "@media (max-width:600px)": {
      fontSize: "0.75rem", // Smaller size on small screens
    },
    "@media (min-width:600px) and (max-width:960px)": {
      fontSize: "0.8125rem", // Size for medium screens
    },
    "@media (min-width:960px)": {
      fontSize: "0.875rem", // Size for large screens
    },
  },
  subtitle2: {
    "@media (max-width:600px)": {
      fontSize: "0.625rem", // Smaller size on small screens
    },
    "@media (min-width:600px) and (max-width:960px)": {
      fontSize: "0.6875rem", // Size for medium screens
    },
    "@media (min-width:960px)": {
      fontSize: "0.75rem", // Size for large screens
    },
  },

  // Body text styles
  body1: {
    "@media (max-width:600px)": {
      fontSize: "0.875rem", // Smaller size on small screens
    },
    "@media (min-width:600px) and (max-width:960px)": {
      fontSize: "0.9375rem", // Size for medium screens
    },
    "@media (min-width:960px)": {
      fontSize: "1rem", // Size for large screens
    },
  },
  body2: {
    "@media (max-width:600px)": {
      fontSize: "0.75rem", // Smaller size on small screens
    },
    "@media (min-width:600px) and (max-width:960px)": {
      fontSize: "0.8125rem", // Size for medium screens
    },
    "@media (min-width:960px)": {
      fontSize: "0.875rem", // Size for large screens
    },
  },

  // Caption styles
  caption: {
    "@media (max-width:600px)": {
      fontSize: "0.625rem", // Smaller size on small screens
    },
    "@media (min-width:600px) and (max-width:960px)": {
      fontSize: "0.6875rem", // Size for medium screens
    },
    "@media (min-width:960px)": {
      fontSize: "0.75rem", // Size for large screens
    },
  },
};
