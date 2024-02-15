import { InfoPageContentContainer, InfoPageHeader, InfoPageText, InfoPageTextLink } from "./AboutPage";

export default function ContactPage() {
    return (<InfoPageContentContainer>
        <InfoPageHeader>Lets talk!</InfoPageHeader>
        <InfoPageText>
            I am always looking to meet new people and discuss ideas 😊
            <br/><br/>
            If you have any feedback, questions, or comments about blog posts
            or anything in general please message me on&nbsp;
            <InfoPageTextLink
                dark
                onClick={()=>{window.open("https://www.linkedin.com/in/jhuo11/", "_blank")?.focus()}}
            >LinkedIn</InfoPageTextLink>
            &nbsp;or through&nbsp;
            <InfoPageTextLink
                dark
                onClick={()=>{window.open("mailto:jonhuo11@gmail.com?subject=Hi there!", "_blank")?.focus()}}
            >
                email
            </InfoPageTextLink>.
            In real life, I am usually on campus during school terms so you might see me there sometimes.
            <br/><br/>
            If you are a recruiter, please connect on Linkedin!
        </InfoPageText>
    </InfoPageContentContainer>);
}