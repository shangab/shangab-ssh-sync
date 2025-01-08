import { execSync } from "child_process";
import { getInput, setOutput, setFailed } from "@actions/core";

try {
  const sshKey = getInput("ssh-private-key");
  const remoteUser = getInput("remote-user");
  const remoteHost = getInput("remote-host");
  const localPath = getInput("local-path");
  const remotePath = getInput("remote-path");

  // Configure SSH
  execSync(`echo "${sshKey}" > ~/.ssh/id_rsa && chmod 600 ~/.ssh/id_rsa`);

  // Run rsync command
  const command = `rsync -avz --delete -e "ssh -i ~/.ssh/id_rsa" ${localPath} ${remoteUser}@${remoteHost}:${remotePath}`;
  console.log(`Running: ${command}`);
  execSync(command, { stdio: "inherit" });

  // Success message
  setOutput("success-message", "Sync completed successfully!");
} catch (error) {
  setFailed(error.message);
}
