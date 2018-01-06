const fs = require("fs");

const util = require("./utils");

async function showAll() {
    const gcidata = await readJSON("./data/data.json");

    const arrResponse = gcidata.map(
        org =>
            `[${org.name}](https://codein.withgoogle.com/organizations/${
                org.slug
            })\n\n_Tasks Completed: ${
                org.completed_task_instance_count
            }_\n\n${getLeadersNameList(org.leaders).join("\n")}\n`
    );

    return `${arrResponse.join("\n")}\n${stamp()}`;
}

async function readJSON(path) {
    return JSON.parse(fs.readFileSync(path));
}

function getLeadersNameList(leader) {
    return leader.map(lead => lead.display_name);
}

function stamp() {
    const updated = fs.statSync("./data/data.json").mtime;
    const sentence =
        "Last updated " +
        util.timeDifference(new Date().getTime(), new Date(updated).getTime());

    return sentence;
}

module.exports = {
    showAll
};
