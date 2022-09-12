import styled from "styled-components";
import { IPageSwitchController } from "../pages/Page";
import { TextUnderlineButton } from "../sidebar/Sidebar";

export const BlogPostContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin: 16px 0px;
    p {
        margin: 4px 0px;
    }
`;

export const BlogPostTitle = styled(TextUnderlineButton)`
    font-size: 28px;
    font-weight: bold;
`;

export const BlogPostTimestamp = styled.p`
    font-size: 16px;
    font-weight: normal;
    opacity: 0.82;
`;

export const BlogPostContent = styled.div`
    font-family
    font-size: 16px;
    font-weight: normal;
    margin-left: 0px;
    margin-right: 0px;
    margin-top: 16px;
`;

export const ISOToReadableTime = (iso:string):string => {
    return new Intl.DateTimeFormat("en-US", {
        month: 'long',
        year: 'numeric',
        day: 'numeric'
    }).format(new Date(iso));
};

interface IBlogPostProps extends IPageSwitchController {
    post: any,
    preview?:boolean
}

export default function BlogPost (props:IBlogPostProps) {
    // TODO: trim content if preview is true
    // try https://github.com/TroyAlford/react-jsx-parser to parse blogger html
    
    return <BlogPostContainer>
        <BlogPostTitle 
            dark
            onClick={()=>{
                props.onSwitchPage?.call(null, "Post", props.post);
            }}
        >{props.post.title}</BlogPostTitle>
        <BlogPostTimestamp>{ISOToReadableTime(props.post.published)}</BlogPostTimestamp>
        <BlogPostContent
            dangerouslySetInnerHTML={{
                __html: `${props.post.content}`
            }}
        />
    </BlogPostContainer>
};