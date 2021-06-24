const fs = require('fs-extra');
const execa = require('execa');

const TOKEN = 'a748e202-7803-41b0-97a9-d8e849a6f53d';

const projects = fs
	.readdirSync('./packages', { withFileTypes: true })
	.filter(entity => entity.isDirectory())
	.map(entity => entity.name);

projects.forEach(project => {
	execa.commandSync(`yarn codecov -t ${TOKEN} -f packages/${project}/coverage/coverage-final.json -F ${project}`, { stdio: 'inherit' });
});
