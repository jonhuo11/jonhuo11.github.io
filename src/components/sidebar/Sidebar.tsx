import { ReactNode } from "react";
import styled from "styled-components";

interface ISidebarProps {
    width:string,
    onHideSidebar:()=>void,
    hideable?:boolean,
    children?:ReactNode
}

const SidebarContainer = styled("div")<{
    width:string
}>`
    position:fixed;
    top:0;
    left:0;
    direction: rtl;
    height:100%;
    width: ${props => props.width};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow-y:scroll;
    background-color: ${props => props.theme.dark};
`;

export const TextUnderlineButton = styled("p")<{fontSize?:string, dark?:boolean}>`
    margin:0px 0px;
    color:${props => props.dark ? props.theme.dark : props.theme.light};
    font-size:${props => props.fontSize ? props.fontSize : "inherit"};
    user-select: none;
    :hover{
        text-decoration:underline;
        cursor: pointer;
    }
`;

export default function Sidebar (props : ISidebarProps) {
    return <SidebarContainer width={props.width}>
        {
            props.hideable ? (
                <TextUnderlineButton 
                    style={{
                        position:"absolute",
                        top:"5px",
                        right:"5px",
                    }}
                    onClick={props.onHideSidebar}
                    fontSize="14px"
                >Hide</TextUnderlineButton>
            ) : null
        }
        {props.children}
    </SidebarContainer>;
};