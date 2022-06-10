import { showHUD, Clipboard } from "@raycast/api";
import { runAppleScript } from "run-applescript";

export default async function main() {
  const activeTabUrl = await runAppleScript(
    `tell application "Google Chrome" to get URL of active tab of first window`
  );
  if (activeTabUrl.startsWith("http://localhost")) {
    const localIP = await runAppleScript(`IPv4 address of (get system info)`);
    const localUrl = activeTabUrl.replace("http://localhost", `http://${localIP}`);
    await Clipboard.copy(localUrl);
    await showHUD(`Copied "${localUrl}" to clipboard`);
  }
}
