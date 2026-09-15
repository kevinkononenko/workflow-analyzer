import {
  Activity,
  BadgeCheck,
  CheckCircle2,
  Crosshair,
  PencilLine,
  Play,
  Search,
  Wrench,
} from "lucide-react";

const stageIcons = {
  define: Crosshair,
  locate: Search,
  prepare: Wrench,
  confirm: BadgeCheck,
  execute: Play,
  monitor: Activity,
  modify: PencilLine,
  conclude: CheckCircle2,
};

export default function StageIcon({ stageId, size = 20 }) {
  const Icon = stageIcons[stageId] ?? Crosshair;
  return <Icon aria-hidden="true" size={size} strokeWidth={1.8} />;
}
