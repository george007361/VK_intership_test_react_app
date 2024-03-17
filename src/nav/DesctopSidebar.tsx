import { Icon28NewsfeedOutline, Icon28ServicesOutline } from "@vkontakte/icons";
import { Group, Cell } from "@vkontakte/vkui";
import React from "react";
import { IStoryNames } from "../types/StoryNames";

interface DesctopSidebarProps {
    activeStory: IStoryNames;
    setActiveStory: React.Dispatch<React.SetStateAction<IStoryNames>>;
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
                disabled={activeStory === 'cat_fact'}
                style={activeStory === 'cat_fact' ? activeStoryStyles : undefined}
                data-story="cat_fact"
                onClick={onStoryChange}
                before={<Icon28NewsfeedOutline />}
            >
                cat fact
            </Cell>
            <Cell
                disabled={activeStory === 'age_detector'}
                style={activeStory === 'age_detector' ? activeStoryStyles : undefined}
                data-story="age_detector"
                onClick={onStoryChange}
                before={<Icon28ServicesOutline />}
            >
                services
            </Cell>
        </Group>
    );
}