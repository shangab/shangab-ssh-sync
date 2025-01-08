const { execSync } = require("child_process");
const core = require("@actions/core");

try {
  const sshKey = core.getInput("ssh-private-key");
  const remoteUser = core.getInput("remote-user");
  const remoteHost = core.getInput("remote-host");
  const localPath = core.getInput("local-path");
  const remotePath = core.getInput("remote-path");

  // Configure SSH
  execSync(`echo "${sshKey}" > ~/.ssh/id_rsa && chmod 600 ~/.ssh/id_rsa`);

  // Run rsync command
  const command = `rsync -avz --delete -e "ssh -i ~/.ssh/id_rsa" ${localPath} ${remoteUser}@${remoteHost}:${remotePath}`;
  console.log(`Running: ${command}`);
  execSync(command, { stdio: "inherit" });

  // Success message
  core.setOutput("success-message", "Sync completed successfully!");
} catch (error) {
  core.setFailed(error.message);
}
