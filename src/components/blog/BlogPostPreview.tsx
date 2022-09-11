import styled from "styled-components";
import { TextUnderlineButton } from "../sidebar/Sidebar";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    margin: 16px 0px;
    p {
        margin: 4px 0px;
    }
`;

const BlogPostTitle = styled(TextUnderlineButton)`
    font-size: 28px;
    font-weight: bold;
`;

const BlogPostTimestamp = styled.p`
    font-size: 16px;
    font-weight: normal;
    opacity: 0.82;
`;

const BlogPostContent = styled.div`
    font-family
    font-size: 16px;
    font-weight: normal;
    margin-left: 0px;
    margin-right: 0px;
    margin-top: 16px;
`;

const ISOToReadableTime = (iso:string) => {
    return new Intl.DateTimeFormat("en-US", {
        month: 'long',
        year: 'numeric',
        day: 'numeric'
    }).format(new Date(iso));
};

export default function BlogPostPreview (props:{post:any}) {
    
    return <Container>
        <BlogPostTitle dark>{props.post.title}</BlogPostTitle>
        <BlogPostTimestamp>{ISOToReadableTime(props.post.published)}</BlogPostTimestamp>
        <BlogPostContent
            dangerouslySetInnerHTML={{
                __html: `${props.post.content}`
            }}
        />
    </Container>
};