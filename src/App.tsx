import styled, { ThemeProvider } from "styled-components";
import { useEffect, useState } from "react";
import {Helmet} from "react-helmet";

import Sidebar, { TextUnderlineButton } from "./components/sidebar/Sidebar";
import MainContentContainer from "./components/main_content/MainContentContainer";
import CompactProfile from "./components/compact_profile/CompactProfile";
import ProfilePicture from "./assets/images/picofme.png";
import BlogPostPreviewPage from "./components/pages/BlogPostPreviewPage";
import { CreatePage } from "./components/pages/Page";
import AboutPage from "./components/pages/AboutPage";
import ContactPage from "./components/pages/ContactPage";
import BlogPostPage from "./components/pages/BlogPostPage";

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

const SidebarButtonContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
`;

const sidebarWidth = "25%";
export default function App() {
    
    const [showSidebar, setShowSidebar] = useState(true);

    // on first load
    useEffect(() => {
        document.body.style.backgroundColor = ColorThemes.main.light;
    }, []);

    return <div id="app-global-container">
        <Helmet>
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin=""/>
            <link href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap" rel="stylesheet"/> 
        </Helmet>

        <ThemeProvider theme={ColorThemes.main}>
            <AppContainer>

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
                        <SidebarButtonContainer>
                            <TextUnderlineButton 
                                onClick={()=>{setShowSidebar(true);}}
                                fontSize="14px"
                                dark
                            >Show sidebar</TextUnderlineButton>
                        </SidebarButtonContainer>
                    )
                }

                <MainContentContainer
                    leftSidebarWidth={showSidebar ? sidebarWidth : "0px"}
                    pages={[
                        CreatePage("Blog", <BlogPostPreviewPage></BlogPostPreviewPage>),
                        CreatePage("About", <AboutPage></AboutPage>),
                        CreatePage("Contact", <ContactPage></ContactPage>),
                        CreatePage("Post", <BlogPostPage></BlogPostPage>, false)
                    ]}
                />
            </AppContainer>
        </ThemeProvider>
    </div>;
};