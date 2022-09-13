import { useEffect } from "react";
import styled from "styled-components";
import { InfoPageTextLink } from "../pages/AboutPage";
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

export const BlogPostTitle = styled(TextUnderlineButton)<{disableHover?:boolean}>`
    font-size: 28px;
    font-weight: bold;
    :hover {
        text-decoration: ${props => props.disableHover ? "none" : "underline"};
        cursor:default;
    }
`;

export const BlogPostTimestamp = styled.p`
    font-size: 16px;
    font-weight: normal;
    opacity: 0.82;
`;

export const BlogPostContent = styled.div`
    p, span{
        font-family: "Inter", sans-serif !important;
    }
    font-size: 16px;
    font-weight: normal;
    margin-left: 0px;
    margin-right: 0px;
    margin-top: 16px;
    display: flex;
    flex-direction: column;
`;

export const ISOToReadableTime = (iso:string):string => {
    return new Intl.DateTimeFormat("en-US", {
        month: 'long',
        year: 'numeric',
        day: 'numeric'
    }).format(new Date(iso));
};

const PreviewFirstNodeInHTML = (rawhtml:string) => {
    var parser = new DOMParser().parseFromString(rawhtml, "text/html");
    return WrapInBlogPostContentComponent(`${parser.querySelector("p")?.innerText}`);
};

const WrapInBlogPostContentComponent = (innerhtml:(string|undefined)) => {
    return <BlogPostContent
        dangerouslySetInnerHTML={{__html:`${innerhtml}`}}
    />;
};

interface IBlogPostProps extends IPageSwitchController {
    post: any,
    preview?:boolean
}

export default function BlogPost (props:IBlogPostProps) {

    useEffect(()=>{
        PreviewFirstNodeInHTML(props.post.content);
    }, [props.post]);
    
    return <BlogPostContainer>
        <BlogPostTitle 
            dark
            disableHover={!props.preview}
            onClick={()=>{props.onSwitchPage?.call(null, "Post", props.post);}}
        >{props.post.title}</BlogPostTitle>
        <BlogPostTimestamp>{ISOToReadableTime(props.post.published)}</BlogPostTimestamp>
        {
            props.preview ? (
                <>
                    {PreviewFirstNodeInHTML(props.post.content)}<InfoPageTextLink
                        dark
                        onClick={()=>{props.onSwitchPage?.call(null, "Post", props.post);}}
                    >Read more...</InfoPageTextLink>
                </>
            ) : (
                WrapInBlogPostContentComponent(props.post.content)
            )
        }
    </BlogPostContainer>
};