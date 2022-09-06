import { ReactNode } from "react";
import styled from "styled-components";

const MainContent = styled("div")<{leftSidebarWidth:string}>`
    margin-left:${props => props.leftSidebarWidth};
    color:${props => props.theme.dark}
`;

export default function MainContentContainer (props:{
    leftSidebarWidth:string,
    children?:ReactNode
}) {
    return <MainContent leftSidebarWidth={props.leftSidebarWidth}>
        {props.children}
    </MainContent>
}