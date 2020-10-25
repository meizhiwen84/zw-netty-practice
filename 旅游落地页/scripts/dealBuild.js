//获取node执行的参数

const desPath = '/Users/shaozhaoyang/code/jr-rebate/jr-rebate-web/src/main/webapp/';

var child_process = require('child_process');

async function copyIt(from, to) {
    await child_process.spawn('cp', ['-r', from, to]);
    console.log(from + '复制成功');
}
function cbk(path, res) {
    if (!res || !res.Error) {
        console.log(path + '删除成功')
    }
}

async function deleteFile(file) {
    await child_process.exec('rm ' + file, cbk.bind(this, file));
}
async function deleteFloder(path) {
    await child_process.exec('rm -rf ' + path, cbk.bind(this, path));
}

async function main() {
    await deleteFile(desPath + 'index.html');
    await deleteFloder(desPath + 'static/js/');
    await deleteFloder(desPath + 'static/css/');
    await copyIt('../build/index.html', desPath + 'index.html');
    await copyIt('../build/static/css/', desPath + 'static/css/');
    await copyIt('../build/static/js/', desPath + 'static/js/');
}


main();