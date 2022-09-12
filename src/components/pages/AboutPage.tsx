import styled from "styled-components";
import { TextUnderlineButton } from "../sidebar/Sidebar";
import { IPageComponentProps } from "./Page";

export const InfoPageContentContainer = styled.div`
    margin: 0px 0px;
    margin-top: 16px;
`;

export const InfoPageHeader = styled.p`
    font-size: 28px;
    font-weight: bold;
    margin: 4px 0px;
    margin-bottom: 24px;
`;

export const InfoPageText = styled.div`
    font-size: 16px;
    font-weight: normal;
    margin: 4px 0px;
    line-height: 24px;
`;

export const InfoPageTextLink = styled(TextUnderlineButton)`
    display: inline;
    text-decoration: underline;
    :hover {
        opacity: 0.72;
    }
`;

export default function AboutPage(props:IPageComponentProps) {
    return <InfoPageContentContainer>
        <InfoPageHeader>Who made this blog?</InfoPageHeader>
        <InfoPageText>
            Hi guys, my name is Jonathan, and I'm currently a software engineering student
            at the University of Waterloo.
            In this blog, I like to write about stuff that I think would be useful to share
            with others. My main hobbies are programming, video games, weightlifting, and 
            music, so you can expect most of my content to be related to these things.
            <br/><br/>
            My website and its content are largely inspired by&nbsp;
            <InfoPageTextLink 
                fontSize="16px"
                onClick={()=>{window.open("https://bopeng.io/", "_blank")?.focus()}}
                dark
            >Bo Peng</InfoPageTextLink>'s personal blog.
            I really like his blog and reading it has helped me greatly in the past.
            I hope to achieve something similar with the content here.
            If you are interested in seeing how this site was made,&nbsp;
            <InfoPageTextLink
                fontSize="16px"
                onClick={()=>{window.open("https://github.com/jonhuo11/jonhuo11.github.io", "_blank")?.focus()}}
                dark
            >click here</InfoPageTextLink>.
        </InfoPageText>
    </InfoPageContentContainer>;
};