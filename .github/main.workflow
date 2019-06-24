workflow "Install and Publish" {
  on = "push"
  resolves = ["Publish stable", "Publish unstable"]
}

action "Change directory" {
  uses = "actions/npm@master"
  args = "cd ./example"
}

action "Install" {
	needs = "Change directory"
  uses = "actions/npm@master"
  args = "ci"
}

action "Test" {
  needs = "Install"
  uses = "actions/npm@master"
  args = "test"
}

action "Filter stable branch" {
  needs = "Test"
  uses = "actions/bin/filter@master"
  args = "branch master"
}

action "Publish stable" {
  needs = "Filter stable branch"
  uses = "expo/expo-github-action@2.3.2"
  args = "publish"
  secrets = ["EXPO_CLI_USERNAME", "EXPO_CLI_PASSWORD"]
}

action "Filter unstable branch" {
  needs = "Test"
  uses = "actions/bin/filter@master"
  args = "branch develop"
}

action "Publish unstable" {
  needs = "Filter unstable branch"
  uses = "expo/expo-github-action@2.3.2"
  args = "publish --release-channel test"
  secrets = ["EXPO_CLI_USERNAME", "EXPO_CLI_PASSWORD"]
}
