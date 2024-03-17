import { useEffect, useRef } from "react";
import { Button, FormItem, FormStatus, Group, Panel, PanelHeader, Textarea, View } from "@vkontakte/vkui";
import { Icon20InfoCircleOutline } from "@vkontakte/icons";

import { CatFactStoryName } from "../types/StoryName";
import { useGetFact } from "../api/useGetFact";

interface CatFactProps {
    id: CatFactStoryName;
}

export default function CatFact({ id }: CatFactProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const { isFetching, error, isError, data, refetch } = useGetFact();

    const onGetFactClick = () => {
        refetch();
    }


    useEffect(() => {
        if (!textareaRef.current || !data) return;

        const endOfFirstWord = data.split(' ')[0].length;
        textareaRef.current.focus();
        textareaRef.current.setSelectionRange(endOfFirstWord, endOfFirstWord);
    }, [data, textareaRef]);

    return (
        <View id={id} activePanel="cat_fact">
            <Panel id='cat_fact'>
                <PanelHeader style={{
                    textAlign: 'center'
                }}>
                    {'Интересный факт о котах'}
                </PanelHeader>
                <Group style={{
                    flex: 1,
                }}>
                    {isError && (
                        <FormStatus
                            header='Ошибка получения факта'
                            mode='error'
                        >
                            {error.message}
                        </FormStatus>
                    )}

                    <FormItem>
                        <Button
                            size="m"
                            before={<Icon20InfoCircleOutline />}
                            onClick={onGetFactClick}
                            stretched
                            disabled={isFetching}
                            loading={isFetching}
                        >
                            {'Узнать факт'}
                        </Button>
                    </FormItem>

                    <FormItem top="Факт">
                        <Textarea
                            grow
                            disabled={isFetching || isError || !data}
                            placeholder='Нажми кнопку чтобы получить факт'
                            value={data ? data : ''}
                            getRef={textareaRef}
                        />
                    </FormItem>
                </Group>
            </Panel>
        </View>
    );
}