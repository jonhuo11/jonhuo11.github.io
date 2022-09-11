import { createGlobalStyle } from "styled-components";

const Fonts = createGlobalStyle`
    @import url("https://fonts.googleapis.com/css2?family=Inter&display=swap")
`;

// TODO: font import not working on live github pages build
// try react-helmet

export default Fonts;