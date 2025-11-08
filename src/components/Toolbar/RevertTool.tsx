import { useEditorStore } from "@/store/editorStore";
import { ToolbarButton } from "./ToolbarButton";
import { RefreshCw } from "lucide-react";

export const RevertTool = () => {
  const { revertToOriginal, originalState } = useEditorStore();

  const canRevert = originalState !== null;

  return (
    <ToolbarButton onClick={revertToOriginal} disabled={!canRevert} label="Revert" showLabel>
      <RefreshCw className="h-5 w-5" />
    </ToolbarButton>
  );
};
