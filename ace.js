const fs = require('fs');
const { execSync } = require('child_process');

exports.runAceMetrics = function (source, extension) {

    const randomInt = getRandomInt(100000);
    const temp = `/tmp/ace_metrics_${randomInt}.${extension}`;
    console.log(`tempfile is ${temp}`);

    try {
        fs.writeFileSync(temp, source, {});

        const treesitter_lib = `/workspaces/treesitter-api/treesitter-lib/libjava-tree-sitter.so`;
        const ace_metrics_jar = `/workspaces/treesitter-api/treesitter-lib/AceMetrics.jar`;

        // const stdout = execSync('dir', { encoding: 'utf8' });
        const stdout = execSync(`java -Dlibtreesitter.path=${treesitter_lib} -jar ${ace_metrics_jar} -f ${temp}`, { encoding: 'utf8' });

        return stdout;
    }
    finally {
        fs.rmSync(temp);
    }

}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}