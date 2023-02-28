import { promisify } from 'util'
import download from 'download-git-repo'
import ora from 'ora'
import { logGreen } from './index.js'

export const cloneGitRepo = async (repo: string, desc: string) => {
    const process = ora(`下载.....${repo}`)
    process.start()
    await promisify(download as any)(repo, desc)
    process.succeed()
    logGreen(`下载${repo}结束`)
}
