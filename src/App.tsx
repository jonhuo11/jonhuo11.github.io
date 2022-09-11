import styled, { ThemeProvider } from "styled-components";
import { useEffect, useState } from "react";

import Fonts from "./fonts";
import Sidebar, { TextUnderlineButton } from "./components/sidebar/Sidebar";
import MainContentContainer from "./components/main_content/MainContentContainer";
import CompactProfile from "./components/compact_profile/CompactProfile";
import ProfilePicture from "./assets/images/picofme.png";
import BlogPostPreviewPage from "./components/pages/BlogPostPreviewPage";
import { CreatePage } from "./components/pages/Page";
import AboutPage from "./components/pages/AboutPage";

export const ColorThemes = {
    main : {
        dark: "#1e1e24",
        light: "#fff8f0"
    }
};

const AppContainer = styled.div`
    display: flex;
    flex-direction: column;
    color: ${props => props.theme.light};
    font-family: "Inter", sans-serif;
    background-color: ${props => props.theme.light};
`;

const sidebarWidth = "25%";
export default function App() {
    
    const [showSidebar, setShowSidebar] = useState(true);

    // on first load
    useEffect(() => {
        document.body.style.backgroundColor = ColorThemes.main.light;
    }, []);

    return <div id="app-global-container">
        <ThemeProvider theme={ColorThemes.main}>
            <AppContainer>
                <Fonts/>

                {
                    showSidebar ? (
                        <Sidebar 
                            width={sidebarWidth}
                            onHideSidebar={()=>{setShowSidebar(false);}}
                        >
                            <CompactProfile
                                name="Jonathan Huo"
                                desc="Software engineering student at the University of Waterloo"
                                pictureSrc={ProfilePicture}
                                linkedinUrl="https://www.linkedin.com/in/jhuo11/"
                                githubUrl="https://github.com/jonhuo11"
                            />
                        </Sidebar>
                    ) : (
                        <div
                            style={{
                                position: "fixed",
                                top: 0, left: 0
                            }}
                        >
                            <TextUnderlineButton 
                                onClick={()=>{setShowSidebar(true);}}
                                fontSize="14px"
                                dark
                            >Show sidebar</TextUnderlineButton>
                        </div>
                    )
                }

                <MainContentContainer
                    leftSidebarWidth={showSidebar ? sidebarWidth : "0px"}
                    pages={[
                        CreatePage("Blog", <BlogPostPreviewPage></BlogPostPreviewPage>),
                        CreatePage("About", <AboutPage></AboutPage>),
                        CreatePage("Contact", <p>Under construction</p>)
                    ]}
                />
            </AppContainer>
        </ThemeProvider>
    </div>;
};