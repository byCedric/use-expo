const fs = require('fs-extra');
const path = require('path');

const combined = require('./coverage/coverage-final.json');

const projects = {};

Object.keys(combined).forEach(file => {
	const project = getPackageName(file);

	projects[project] = projects[project] || {};
	projects[project][file] = combined[file];
});

Object.keys(projects).forEach(name => {
	const targetDir = path.resolve(__dirname, 'packages', name, 'coverage');

	fs.mkdirpSync(targetDir);
	fs.writeJSONSync(path.join(targetDir, 'coverage-final.json'), projects[name]);
});

function getPackageName(file) {
	const match = file.match(/packages\/([a-z-]+)\//i);
	return match[1];
}
