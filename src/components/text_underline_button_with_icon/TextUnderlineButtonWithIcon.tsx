import { ReactNode } from "react";
import styled from "styled-components";

import { TextUnderlineButton } from "../sidebar/Sidebar";

const ButtonContainer = styled.div`
    display:flex;
    flex-direction:row;
    align-items:center;
`;

export default function TextUnderlineButtonWithIcon (props : {
    icon:ReactNode,
    text:string,
    onClick:()=>void,
    yOffset?:string
}) {
    return <ButtonContainer>
        {props.icon}
        <TextUnderlineButton
            style={{
                paddingTop:props.yOffset,
                paddingLeft:"3px",
                margin:"1px 0px"
            }}
            onClick={props.onClick}
        >{props.text}</TextUnderlineButton>
    </ButtonContainer>;
};