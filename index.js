const { execSync } = require("child_process");
const core = require("@actions/core");

try {
  // Gather inputs
  const sshKey = core.getInput("ssh-private-key");
  const remoteUser = core.getInput("remote-user");
  const userPassword = core.getInput("user-password");
  const remoteHost = core.getInput("remote-host");
  const localPath = core.getInput("local-path");
  const remotePath = core.getInput("remote-path");

  // Step 1: Configure SSH key
  console.log("Configuring SSH key...");
  execSync(`mkdir -p ~/.ssh && echo "${sshKey}" > ~/.ssh/id_rsa && chmod 600 ~/.ssh/id_rsa`);

  // Step 2: Add public key to remote authorized_keys
  console.log("Adding public key to remote server...");
  execSync(
    `echo "${userPassword}" | sshpass -p "${userPassword}" ssh-copy-id -i ~/.ssh/id_rsa.pub ${remoteUser}@${remoteHost}`,
    { stdio: "inherit" }
  );

  // Step 3: Run rsync command for file synchronization
  const command = `rsync -rlgoDzvc --delete -e "ssh -p 22 -i ~/.ssh/id_rsa -o IdentitiesOnly=yes" ${localPath} ${remoteUser}@${remoteHost}:${remotePath}`;
  console.log(`Running rsync command: ${command}`);
  execSync(command, { stdio: "inherit" });

  // Success message
  core.setOutput("success-message", "Sync completed successfully!");
} catch (error) {
  // Handle errors
  core.setFailed(`Error during sync: ${error.message}`);
}
