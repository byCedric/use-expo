workflow "Install and Publish" {
	on = "push"
	resolves = ["Publish stable"]
}

action "Install" {
	uses = "actions/npm@master"
	args = "run example-action -- npm ci"
}

action "Test" {
	needs = "Install"
	uses = "actions/npm@master"
	args = "run example-action -- npm test"
}

action "Filter stable branch" {
	needs = "Test"
	uses = "actions/bin/filter@master"
	args = "branch master"
}

action "Publish stable" {
	needs = "Test"
	uses = "expo/expo-github-action@2.3.2"
	runs = "npm run example-action -- /entrypoint.sh publish"
	secrets = [
		"EXPO_CLI_USERNAME",
		"EXPO_CLI_PASSWORD",
	]
}
