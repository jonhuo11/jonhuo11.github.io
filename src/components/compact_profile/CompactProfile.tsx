import styled from "styled-components";
import {FaLinkedin, FaGithub} from "react-icons/fa";
import TextUnderlineButtonWithIcon from "../text_underline_button_with_icon/TextUnderlineButtonWithIcon";

const ProfileContainer = styled.div`
    direction: ltr;
    width:75%;
`;

const ProfilePicture = styled.img`
    border-radius:50%;
    width: 100%;
    height: auto;
`;

export const LargeBoldText = styled.p`
    font-weight:bold;
    font-size:48px;
`;

export const RegularText = styled.p`
    font-size:16px;
`

const LeftTextContainer = styled.div`
    margin-top: 32px;
    flex-direction:column;
    justify-content:left;
    p {
        overflow-wrap: break-word;
        margin: 10px 0px;
    }
`;

const OpenURL = (url:string) => {
    window.open(url);
};

export default function CompactProfile (props: {
    name:string,
    desc:string,
    pictureSrc:string,
    linkedinUrl:string,
    githubUrl:string,
}) {
    return <ProfileContainer>
        <ProfilePicture src={props.pictureSrc}></ProfilePicture>

        <LeftTextContainer>

            <LargeBoldText>{props.name}</LargeBoldText>
            <RegularText>{props.desc}</RegularText>

            <TextUnderlineButtonWithIcon icon={<FaLinkedin/>} text="LinkedIn" yOffset="3.25px" onClick={()=>{OpenURL(props.linkedinUrl)}}/>
            <TextUnderlineButtonWithIcon icon={<FaGithub/>} text="GitHub" yOffset="3.25px" onClick={()=>{OpenURL(props.githubUrl)}}/>

        </LeftTextContainer>
    </ProfileContainer>
};