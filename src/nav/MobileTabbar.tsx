import { Icon28NewsfeedOutline, Icon28ServicesOutline } from "@vkontakte/icons";
import { Tabbar, TabbarItem, useAdaptivityConditionalRender } from "@vkontakte/vkui";
import { IStoryNames } from "../types/StoryNames";

interface MobileTabbarProps {
    activeStory: IStoryNames;
    setActiveStory: React.Dispatch<React.SetStateAction<IStoryNames>>;
}
export default function MobileTabbar({ activeStory, setActiveStory }: MobileTabbarProps) {
    const onStoryChange = (e: any) => {
        setActiveStory(e?.currentTarget?.dataset?.story);
    }
    const { viewWidth } = useAdaptivityConditionalRender();

    return (
        <Tabbar className={viewWidth.tabletMinus ? viewWidth.tabletMinus.className : ''}>
            <TabbarItem
                onClick={onStoryChange}
                selected={activeStory === 'cat_fact'}
                data-story='cat_fact'
                text="cat fact"
            >
                <Icon28NewsfeedOutline />
            </TabbarItem>
            <TabbarItem
                onClick={onStoryChange}
                selected={activeStory === 'age_detector'}
                data-story="age_detector"
                text="age detector"
            >
                <Icon28ServicesOutline />
            </TabbarItem>
        </Tabbar>
    );
}