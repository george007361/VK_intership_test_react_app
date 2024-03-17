import React from "react";
import { Group, Cell } from "@vkontakte/vkui";
import { Icon28SmileOutline, Icon28Users3Outline } from "@vkontakte/icons";

import { StoryNames } from "../../types/StoryNames";

interface DesctopSidebarProps {
    activeStory: StoryNames;
    setActiveStory: React.Dispatch<React.SetStateAction<StoryNames>>;
}

export default function DesctopSidebar({ setActiveStory, activeStory }: DesctopSidebarProps) {
    const activeStoryStyles = {
        backgroundColor: 'var(--vkui--color_background_secondary)',
        borderRadius: 8,
    };

    const onStoryChange = (e: any) => {
        setActiveStory(e.currentTarget.dataset.story);
    }

    return (
        <Group>
            <Cell
                disabled={activeStory === 'cat_facts'}
                style={activeStory === 'cat_facts' ? activeStoryStyles : undefined}
                data-story="cat_facts"
                onClick={onStoryChange}
                before={<Icon28SmileOutline />}
            >
                Факт про кота
            </Cell>
            <Cell
                disabled={activeStory === 'age_detector'}
                style={activeStory === 'age_detector' ? activeStoryStyles : undefined}
                data-story="age_detector"
                onClick={onStoryChange}
                before={<Icon28Users3Outline />}
            >
                Узнать возраст
            </Cell>
        </Group>
    );
}