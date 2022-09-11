import { ReactElement } from "react"

export interface IPageComponentProps {
    onSwitchPage?: (destPageTitle:string, context:Object)=>void,
    context?: Object
};

export interface IPage {
    title: string,
    visibleInPageSwitcher?: boolean,
    content: ReactElement<IPageComponentProps>
};

export function CreatePage(title:string, content:ReactElement<IPageComponentProps>, visibleInPageSwitcher:boolean = true):IPage {
    return {
        title: title,
        content: content,
        visibleInPageSwitcher: visibleInPageSwitcher
    };
};