workflow "Install and Publish" {
	on = "push"
	resolves = ["Publish"]
}

action "Install" {
	uses = "actions/npm@master"
	args = "ci"
}

action "Lint" {
	needs = "Install"
	uses = "actions/npm@master"
	args = "run lint"
}

action "Filter branch" {
	needs = "Lint"
	uses = "actions/bin/filter@master"
	args = "branch master"
}

action "Publish" {
	needs = "Filter branch"
	uses = "expo/expo-github-action@3.0.0"
	args = "publish example"
	secrets = [
		"EXPO_CLI_USERNAME",
		"EXPO_CLI_PASSWORD",
	]
}
