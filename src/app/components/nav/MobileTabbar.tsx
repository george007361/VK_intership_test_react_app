import { Tabbar, TabbarItem, useAdaptivityConditionalRender } from "@vkontakte/vkui";
import { Icon28SmileOutline, Icon28Users3Outline } from "@vkontakte/icons";

import { StoryNames } from "../../types/StoryNames";

interface MobileTabbarProps {
    activeStory: StoryNames;
    setActiveStory: React.Dispatch<React.SetStateAction<StoryNames>>;
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
                selected={activeStory === 'cat_facts'}
                data-story='cat_facts'
                text="О котах"
            >
                <Icon28SmileOutline />
            </TabbarItem>
            <TabbarItem
                onClick={onStoryChange}
                selected={activeStory === 'age_detector'}
                data-story="age_detector"
                text="Узнать возраст"
            >
                <Icon28Users3Outline />
            </TabbarItem>
        </Tabbar>
    );
}