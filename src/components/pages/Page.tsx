import { ReactElement } from "react"

export interface IPageComponentProps extends IPageSwitchController{
    context?: any
};

export interface IPageSwitchController {
    onSwitchPage?: (destPageTitle:string, context: any) => void
}

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