import { Button, FormItem, FormStatus, Group, Panel, PanelHeader, Textarea, View } from "@vkontakte/vkui";
import { IStoryNames } from "../types/StoryNames";
import { useQuery } from "@tanstack/react-query";
import { CatFactData } from "../types/CatFact";
import axios from "axios";
import { useEffect, useRef } from "react";
import { Icon20InfoCircleOutline } from "@vkontakte/icons";

interface CatFactProps {
    id: IStoryNames;
}

export default function CatFact({ id }: CatFactProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const { isFetching, error, isError, data, refetch } = useQuery({
        enabled: false,
        queryKey: ['fact'],
        queryFn: async ({ signal }) => axios.get<CatFactData>('https://catfact.ninja/fact', { signal }),
        select: ({ data }) => data.fact,
    });

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