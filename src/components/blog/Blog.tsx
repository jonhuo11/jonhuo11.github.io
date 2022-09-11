import axios from "axios";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { BloggerAPIBaseURL, BloggerBlogID, BloggerPublicAPIKey } from "./BloggerAPIConstants";
import BlogPostPreview from "./BlogPostPreview";

const BlogPostPreviewListContainer = styled.div`
    display:flex;
    flex-direction:column;
`;

const FetchBlogPosts = async () => {
    const results = await axios.get(
        `${BloggerAPIBaseURL}/${BloggerBlogID}/posts?key=${BloggerPublicAPIKey}`
    );
    return results.data;
};

export default function Blog () {

    const [posts, setPosts] = useState<Array<any>>([]);

    useEffect(() => {
        const AsyncFetch = async () => {
            setPosts((await FetchBlogPosts()).items);
        };
        AsyncFetch().catch(console.error);
    }, []);

    return (<div>
        <BlogPostPreviewListContainer>
            {posts.map((post, i) => {
                return <BlogPostPreview key={i} post={post}/>;
            })}
        </BlogPostPreviewListContainer>
    </div>);
};