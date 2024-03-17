import { Icon20InfoCircleOutline } from "@vkontakte/icons";
import { Button, FormItem, FormStatus, Group, Panel, PanelHeader, SplitCol, SplitLayout, Text, View } from "@vkontakte/vkui";
import { IStoryNames } from "../types/StoryNames";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useCountdown from "../hooks/useCountdown";
import ControlledFormItemInput from "./ControlledFormItemInput";
import { useDebounce } from "../hooks/useDebounce";
import { useCallback, useEffect } from "react";
import { ageDetectorFormShema } from "../validation/ageDetectorFormSchema";
import { AgeDetectorData } from "../types/AgeDetector";

interface AgeDetectorProps {
    id: IStoryNames;
}


export default function AgeDetector({ id }: AgeDetectorProps) {
    const counter = useCountdown(1000);

    const { control, getValues, handleSubmit } = useForm({
        mode: 'all',
        resolver: yupResolver(ageDetectorFormShema),
        defaultValues: {
            name: '',
        },
    });

    const { data, isFetching, isLoading, error, isError, refetch } = useQuery({
        enabled: false,
        queryKey: ['age', getValues().name],
        queryFn: async ({ signal }) => {
            return axios.get<AgeDetectorData>('https://api.agify.io/', {
                params: {
                    name: getValues().name,
                },
                signal,
            })
        },
        select: ({ data }) => data.age,
    })

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

                    <ControlledFormItemInput
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