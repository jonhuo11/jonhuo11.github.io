import styled, { ThemeProvider } from "styled-components";
import { useState } from "react";

import Fonts from "./fonts";
import Sidebar, { TextUnderlineButton } from "./components/sidebar/Sidebar";
import MainContentContainer from "./components/main_content/MainContentContainer";
import CompactProfile from "./components/compact_profile/CompactProfile";
import ProfilePicture from "./assets/images/picofme.jpg";

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
`;

const sidebarWidth = "25%";
export default function App() {
    
    const [showSidebar, setShowSidebar] = useState(true);

    return <div>
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
                        <TextUnderlineButton 
                            onClick={()=>{setShowSidebar(true);}}
                            fontSize="14px"
                            dark
                        >Show sidebar</TextUnderlineButton>
                    )
                }

                <MainContentContainer
                    leftSidebarWidth={showSidebar ? sidebarWidth : "0px"}
                >
                    <p>Main content under construction</p>
                </MainContentContainer>
            </AppContainer>
        </ThemeProvider>
    </div>;
};