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
    const [activePage, setActivePage] = useState({index: 0, context: ""});

    return <MainContent leftSidebarWidth={props.leftSidebarWidth}>
        <PageSwitcherContainer>{
            props.pages.map((page, i) => {
                if (page.visibleInPageSwitcher) {
                    return <TextUnderlineButton 
                        key={i}
                        fontSize="32px"
                        dark
                        onClick={()=>{
                            setActivePage({
                                index: i,
                                context: ""
                            });
                        }}
                    >{page.title}</TextUnderlineButton>;
                }
            })
        }</PageSwitcherContainer>

        {(activePage.index !== undefined && activePage.index >= 0 && activePage.index < props.pages.length) ? (
            cloneElement(props.pages[activePage.index].content, {
                onSwitchPage:(destPageTitle:string, context:any) => {
                    setActivePage({
                        index: props.pages.findIndex(e => e.title === destPageTitle),
                        context: context
                    });
                },
                context: activePage.context
            })
        ) : (
            <div><p>Bad active page index or no pages</p></div>
        )}
    </MainContent>
};