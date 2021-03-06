import * as path from 'path';
import * as task from 'vsts-task-lib/task';
import { getPlatform } from './taskutil';
import { usePythonVersion } from './usepythonversion';

(async () => {
    try {
        task.setResourcePath(path.join(__dirname, 'task.json'));
        await usePythonVersion({
            versionSpec: task.getInput('versionSpec', true),
            addToPath: task.getBoolInput('addToPath', true)
        },
        getPlatform());
        task.setResult(task.TaskResult.Succeeded, "");
    } catch (error) {
        task.error(error.message);
        task.setResult(task.TaskResult.Failed, error.message);
    }
})();
