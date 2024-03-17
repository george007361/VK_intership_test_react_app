import { useCallback, useEffect } from "react";
import { Button, FormItem, FormStatus, Group, Panel, PanelHeader, SplitCol, SplitLayout, Text, View } from "@vkontakte/vkui";
import { Icon20InfoCircleOutline } from "@vkontakte/icons";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useDebounce, useCountdown, ControlledFormInput } from "@shared";

import { REQUEST_FORM_SCHEMA } from "../const/RequestFormSchema";
import { AgeDetectorStoryName } from "../types/StoryName";
import { useGetAgeQuery } from "../api/useGetAgeQuery";

interface AgeDetectorProps {
    id: AgeDetectorStoryName;
}

export default function AgeDetector({ id }: AgeDetectorProps) {
    const counter = useCountdown(1000);

    const { control, getValues, handleSubmit } = useForm({
        mode: 'all',
        resolver: yupResolver(REQUEST_FORM_SCHEMA),
        defaultValues: {
            name: '',
        },
    });

    const { data, isFetching, isLoading, error, isError, refetch } = useGetAgeQuery(getValues().name);

    const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        counter.stop();
        nameChangeDebouncer.fn(e);
    }

    function onAutoSubmit() {
        counter.start(3);
    }

    const nameChangeDebouncer = useDebounce(handleSubmit(onAutoSubmit), 200);

    const onManualSubmit = () => {
        counter.stop();
        nameChangeDebouncer.cancel();
        onSubmit();
    }

    const onSubmit = useCallback(() => {
        if (!data) refetch().finally(() => counter.reset());
    }, [data, counter, refetch]);

    useEffect(() => {
        if (counter.state === 'done') {
            onSubmit();
        }
    }, [counter.state, onSubmit]);

    useEffect(() => {
        if (data) counter.reset();
    }, [data, counter]);

    return (
        <View id={id} activePanel="age_detector">
            <Panel id="age_detector">
                <PanelHeader
                    style={{
                        textAlign: 'center'
                    }}
                >
                    {'Определение возраста по имени'}
                </PanelHeader>
                <Group style={{
                    flex: 1
                }}>
                    {isError && (
                        <FormStatus
                            mode='error'
                            header='Ошибка получения возраста'
                        >
                            {error.message}
                        </FormStatus>
                    )}

                    <ControlledFormInput
                        control={control}
                        name='name'
                        FormItemProps={{
                            top: 'Ваше имя'
                        }}
                        InputProps={{
                            onChange: onNameChange
                        }}
                    />

                    <SplitLayout>
                        <SplitCol>
                            <FormItem top="Ваш возраст:">
                                <Text>
                                    {data ? data : 'Не определён'}
                                </Text>
                            </FormItem>
                        </SplitCol>
                        {true && (
                            <SplitCol>
                                <FormItem top="Автопределение через:">
                                    <Text>
                                        {counter.state === 'done' && 'В процессе'}
                                        {counter.state === 'inProgress' && counter.count}
                                        {counter.state === 'cancelled' && 'Отменено'}
                                        {counter.state === 'initial' && 'Введите имя'}
                                    </Text>
                                </FormItem>
                            </SplitCol>
                        )}
                    </SplitLayout>

                    <FormItem>
                        <Button
                            loading={isFetching || isLoading}
                            disabled={isFetching || isLoading}
                            stretched
                            before={<Icon20InfoCircleOutline />}
                            onClick={handleSubmit(onManualSubmit)}
                        >
                            Определить возраст
                        </Button>
                    </FormItem>
                </Group>
            </Panel>
        </View>
    );
}