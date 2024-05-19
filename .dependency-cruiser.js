module.exports = {
  forbidden: [
    {
      name: "no-import-from-react-flow-to-graph-tools",
      comment: "Disallow imports from React Flow to Graph Tools",
      severity: "error",
      from: {
        path: "^src/graph-tools", // Adjust this path to point to your actual directory B
      },
      to: {
        path: "^src/react-flow", // Adjust this path to point to your actual directory A
      },
    },
    {
      name: "no-import-from-app-to-graph-tools",
      comment: "Disallow imports from App to Graph Tools",
      severity: "error",
      from: {
        path: "^src/graph-tools", // Adjust this path to point to your actual directory B
      },
      to: {
        path: "^src/app", // Adjust this path to point to your actual directory A
      },
    },
    {
      name: "no-import-from-app-to-react-flow",
      comment: "Disallow imports from App to React Flow",
      severity: "error",
      from: {
        path: "^src/react-flow", // Adjust this path to point to your actual directory A
      },
      to: {
        path: "^src/app", // Adjust this path to point to your actual directory B
      },
    },
  ],
  options: {
    tsConfig: {
      fileName: "./tsconfig.json",
    },
    exclude: {
      path: "node_modules",
    },
    includeOnly: "^src/", // Adjust this path to include your source directories
  },
};
