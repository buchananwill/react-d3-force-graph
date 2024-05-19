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
    {
      name: "no-direct-import-from-graph-tools",
      comment:
        "Disallow direct imports from Graph Tools except via /graph-tools/index.ts",
      severity: "error",
      from: {
        path: "^(src/react-flow|src/app)", // Adjust paths to your directories B and C
      },
      to: {
        path: "^src/graph-tools/(?!index\\.ts$).*", // Adjust path to your directory A
      },
    },
    {
      name: "no-direct-import-from-directoryB",
      comment:
        "Disallow direct imports from React Flow except via /react-flow/index.ts",
      severity: "error",
      from: {
        path: "^(src/app)", // Adjust paths to your directories B and C
      },
      to: {
        path: "^src/react-flow/(?!index\\.ts$).*", // Adjust path to your directory B
      },
    },
  ],
  allowed: [],
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
