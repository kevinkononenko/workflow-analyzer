import { Chrono } from "react-chrono";
import { workflowStages } from "../data/workflowStages";
import StageNavigation from "./StageNavigation";
import WorkflowStageCard from "./WorkflowStageCard";

const timelineTheme = {
  primary: "#e7ff56",
  secondary: "#15181d",
  cardBgColor: "#0f1114",
  cardDetailsBackGround: "#0f1114",
  cardDetailsColor: "#dfe3e8",
  cardTitleColor: "#ffffff",
  titleColor: "#8c939d",
  titleColorActive: "#090a0b",
  textColor: "#dfe3e8",
  timelineBgColor: "#25292f",
  iconBackgroundColor: "#0f1114",
  iconColor: "#090a0b",
  toolbarBgColor: "#0f1114",
  toolbarBtnBgColor: "#181b20",
  toolbarTextColor: "#dfe3e8",
};

export default function WorkflowTimeline({ workflow }) {
  const recordsByStage = new Map(workflow.map((record) => [record.stageId, record]));
  const items = workflowStages.map((stage, index) => ({
    id: stage.id,
    title: (
      <div className="workflow-stage-title">
        <span>{stage.number} {stage.name}</span>
        <StageNavigation
          stageName={stage.name}
          previousStageId={workflowStages[index - 1]?.id}
          nextStageId={workflowStages[index + 1]?.id}
        />
      </div>
    ),
    timelineContent: (
      <WorkflowStageCard
        stage={stage}
        record={recordsByStage.get(stage.id)}
      />
    ),
  }));

  return (
    <div className="timeline-shell" aria-label="Eight-stage product workflow">
      <Chrono
        items={items}
        mode="vertical"
        theme={timelineTheme}
        darkMode={{ enabled: true, showToggle: false }}
        layout={{
          cardWidth: 760,
          cardHeight: "auto",
          pointSize: 20,
          timelineHeight: "auto",
          responsive: { enabled: true, breakpoint: 720 },
        }}
        interaction={{
          keyboardNavigation: true,
          pointClick: true,
          autoScroll: false,
          focusOnLoad: false,
        }}
        display={{
          borderless: true,
          allCardsVisible: true,
          toolbar: { enabled: false },
          scrollable: { scrollbar: false },
        }}
        content={{
          readMore: false,
          compactText: false,
          alignment: { horizontal: "stretch", vertical: "top" },
        }}
        style={{
          classNames: {
            card: "chrono-workflow-card",
            title: "chrono-stage-title",
            timelinePoint: "chrono-stage-point",
            timelineTrack: "chrono-stage-track",
          },
        }}
      />
    </div>
  );
}
