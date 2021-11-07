const { exec } = require('child_process');
const {
  sourceLocale,
  pathToOriginalContent,
  targetLocale,
  pathToLocalizedContent,
} = require('../config');

/**
 * Execute simple shell command (async wrapper).
 * @param {String} cmd
 * @return {Object} { stdout: String, stderr: String }
 */
async function sh(cmd) {
  return new Promise(function (resolve, reject) {
    exec(cmd, (err, stdout, stderr) => {
      if (err) {
        reject(err);
      } else {
        resolve({ stdout, stderr });
      }
    });
  });
}

// Provides a date in ISO 8601 format, like 2021-07-28T14:15:50-07:00
async function getLastCommitDate(filePath, repoPath) {
  const { stdout, stderr } = await sh(
    `cd ${repoPath} && git log -1 --pretty="format:%cI" "files/${targetLocale.toLowerCase()}${filePath}"`
  );
  if (stderr) {
    throw new Error(
      `Failed to get the last commit date on ${filePath}: ${stderr}`
    );
  }
  return stdout;
}

/**
 * Provides a list of commits hashes that were made after given date.
 * @param {string} lastCommitDate date in ISO 8601 format
 * @param {string} filePath
 * @param {string} repoPath
 * @returns set of stings in format "hash - date", like "603c0bdfbd977b665067358865a5cb54ceef7d75 - 2021-08-03T13:20:47+10:00"
 */
async function getCommitsSince(lastCommitDate, filePath, repoPath) {
  const { stdout, stderr } = await sh(
    `cd ${repoPath} && git log --since="${lastCommitDate}" --pretty="format:%H - %aI" "files/${sourceLocale.toLowerCase()}${filePath}"`
  );
  if (stderr) {
    throw new Error(
      `Failed to get new commit information on ${filePath}: ${stderr}`
    );
  }
  return stdout;
}

async function getNewCommits(file) {
  const pathToOriginalRepo = pathToOriginalContent.replace(/\/files$/, '');
  const pathToLocalizedRepo = pathToLocalizedContent.replace(/\/files$/, '');
  const normalisedFilePath = file.split(`files/${targetLocale}`)[1];

  if (normalisedFilePath) {
    const lastCommitDate = await getLastCommitDate(
      normalisedFilePath,
      pathToLocalizedRepo
    );
    const lastCommits = await getCommitsSince(
      lastCommitDate,
      normalisedFilePath,
      pathToOriginalRepo
    );

    return lastCommits.split('\n').filter(Boolean);
  }

  return [];
}

module.exports = {
  getNewCommits,
};
