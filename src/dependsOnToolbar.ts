export const dependsOnToolbar = (
  // todo: type
  properties: (toolbarHeight: 48 | 56 | 64) => object
) => ({
  "@media (min-width:0px) and (orientation: landscape)": properties(48),
  "@media (min-width:600px)": properties(64),
  ...properties(56),
})
