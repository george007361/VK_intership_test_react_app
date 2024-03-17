import React from "react";
import { usePlatform, useAdaptivityConditionalRender, SplitLayout, PanelHeader, SplitCol, Panel, Epic } from "@vkontakte/vkui";

import { CatFact } from "@features/CatFact";
import { AgeDetector } from "@features/AgeDetector";

import { StoryNames } from "../types/StoryNames";
import DesctopSidebar from "./nav/DesctopSidebar";
import MobileTabbar from "./nav/MobileTabbar";

export const App = () => {
  const platform = usePlatform();
  const { viewWidth } = useAdaptivityConditionalRender();
  const [activeStory, setActiveStory] = React.useState<StoryNames>('cat_facts');

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
          <CatFact id='cat_facts' />
          <AgeDetector id='age_detector' />
        </Epic>
      </SplitCol>
    </SplitLayout>
  );
};