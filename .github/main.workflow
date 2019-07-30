workflow "Install and Publish" {
	on = "push"
	resolves = ["Publish"]
}

action "Install" {
	uses = "actions/npm@master"
	args = "ci"
}

action "Build" {
	needs = "Install"
	uses = "actions/npm@master"
	args = "run build"
}

action "Test" {
	needs = "Build"
	uses = "actions/npm@master"
	args = "test"
}

action "Filter branch" {
	needs = "Test"
	uses = "actions/bin/filter@master"
	args = "branch master"
}

action "Publish" {
	needs = "Filter branch"
	uses = "expo/expo-github-action@3.0.0"
	runs = "npm run example-action -- /entrypoint.sh publish"
	secrets = [
		"EXPO_CLI_USERNAME",
		"EXPO_CLI_PASSWORD",
	]
}
