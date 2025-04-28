

const colorsCollection = {
  primary: "#C4DAFE",
  white: '#FFFFFF',
  whiteSmoke: "#f5f5f5",
  grey:"grey",
  lightGrey:"#C4C7C5",

  appThemePrimary :"#28344B",
};

const light = {
  ...colorsCollection,
  textlightGrey : colorsCollection.lightGrey,
};

const dark = {
  ...colorsCollection,
  searchIcons : colorsCollection.white,
  textlightGrey : colorsCollection.lightGrey,

};

export default { light, dark, colorsCollection };