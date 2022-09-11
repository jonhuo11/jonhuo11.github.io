import { cloneElement, useState } from "react";
import styled from "styled-components";
import { IPage } from "../pages/Page";
import { TextUnderlineButton } from "../sidebar/Sidebar";

const MainContent = styled("div")<{leftSidebarWidth:string}>`
    margin-top: 32px;
    margin-bottom: 32px;
    margin-left:${props => props.leftSidebarWidth};
    color:${props => props.theme.dark};
    background-color:${props=>props.theme.light};
    display:flex;
    flex-direction:column;
    width: 55%;
    align-self: center;
`;

const PageSwitcherContainer = styled.div`
    display:flex;
    flex-direction:row;
    overflow-x: scroll;
    margin: 0px 4px;
    margin-left: 0px;
    margin-bottom: 32px;
    p {
        font-size: 32px;
        font-weight: bold;
        margin-right: 32px;
    }
`;

export default function MainContentContainer (props:{
    leftSidebarWidth:string,
    pages:Array<IPage>
}) {
    const [activePageIndex, setActivePageIndex] = useState(0);

    return <MainContent leftSidebarWidth={props.leftSidebarWidth}>
        <PageSwitcherContainer>{
            props.pages.map((page, i) => {
                if (page.visibleInPageSwitcher) {
                    return <TextUnderlineButton 
                        key={i}
                        fontSize="32px"
                        dark
                        onClick={()=>{
                            setActivePageIndex(i);
                        }}
                    >{page.title}</TextUnderlineButton>;
                }
            })
        }</PageSwitcherContainer>

        {(activePageIndex !== null && activePageIndex >= 0 && activePageIndex < props.pages.length) ? (
            cloneElement(props.pages[activePageIndex].content, {
                onSwitchPage:(destPageTitle:string, context:Object) => {
                    setActivePageIndex(props.pages.findIndex(e => e.title === destPageTitle));
                }
            })
        ) : (
            <div><p>Bad active page index or no pages</p></div>
        )}
    </MainContent>
};