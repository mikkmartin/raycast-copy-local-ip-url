import { Clipboard, getDefaultApplication, showHUD } from "@raycast/api";
import { readFile, writeFile } from "fs/promises";
import { resolve } from "path";
import { runAppleScript } from "run-applescript";

export default async function main() {
  let file = await readFile(resolve(__dirname, "test.html")).catch(() => undefined);
  if (!file) await writeFile(resolve(__dirname, "test.html"), "");
  const { name } = await getDefaultApplication(resolve(__dirname, "test.html"));

  const activeTabUrl = await runAppleScript(
    `tell application "${name}" to get URL of active tab of first window`
  );
  if (activeTabUrl.startsWith("http://localhost")) {
    const localIP = await runAppleScript(`IPv4 address of (get system info)`);
    const localUrl = activeTabUrl.replace("http://localhost", `http://${localIP}`);
    await Clipboard.copy(localUrl);
    await showHUD(`Copied "${localUrl}" to clipboard`);
  }
}
