import { TerminalLoader } from "@/components/swagger/terminal-loader";

export default function Loading() {
  return (
    <div className="flex flex-col gap-8">
      <TerminalLoader />
    </div>
  );
}
