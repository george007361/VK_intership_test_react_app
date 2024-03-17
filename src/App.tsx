import React from "react";
import DesctopSidebar from "./nav/DesctopSidebar";
import MobileTabbar from "./nav/MobileTabbar";
import { IStoryNames } from "./types/StoryNames";
import CatFact from "./pages/CatFact";
import AgeDetector from "./pages/AgeDetector";
import { usePlatform, useAdaptivityConditionalRender, SplitLayout, PanelHeader, SplitCol, Panel, Epic } from "@vkontakte/vkui";

export const App = () => {
  const platform = usePlatform();
  const { viewWidth } = useAdaptivityConditionalRender();
  const [activeStory, setActiveStory] = React.useState<IStoryNames>('cat_fact');

  const hasHeader = platform !== 'vkcom';

  return (
    <SplitLayout
      header={hasHeader && <PanelHeader delimiter="none" />}
      style={{ justifyContent: 'center' }}
    >
      {viewWidth.tabletPlus && (
        <SplitCol className={viewWidth.tabletPlus.className} fixed width={280} maxWidth={280}>
          <Panel>
            {hasHeader && <PanelHeader />}
            <DesctopSidebar activeStory={activeStory} setActiveStory={setActiveStory} />
          </Panel>
        </SplitCol>
      )}

      <SplitCol width="100%" maxWidth="560px" stretchedOnMobile autoSpaced>
        <Epic
          activeStory={activeStory}
          tabbar={
            // viewWidth.tabletMinus && (
            <MobileTabbar activeStory={activeStory} setActiveStory={setActiveStory} />
            // )
          }
        >
          <CatFact id='cat_fact' />
          <AgeDetector id='age_detector' />
        </Epic>
      </SplitCol>
    </SplitLayout>
  );
};