import BlogPost from "../blog/BlogPost";
import { IPageComponentProps } from "./Page";

export default function BlogPostPage (props:IPageComponentProps) {
    return <BlogPost
        post={props.context}
        preview={false}
    />;
}