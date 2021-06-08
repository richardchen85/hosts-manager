const { ipcRenderer } = require('electron');
const { save, saveJSON, getJSON } = require('./electron/hosts');

let pwdCallback = null;

function showPwdDialog(callback) {
  const dialog = document.querySelector('.pwd-dialog');
  dialog.classList.remove('hide');
  dialog.querySelector('.txt-pwd').focus();
  pwdCallback = callback;
}

window.hostsFile = {
  /**
   * 保存hosts信息到文件
   */
  save: function (str, pwd) {
    return save(str, pwd).catch((e) => {
      if (e === 'need_sudo') {
        showPwdDialog(function (pwd) {
          hostsFile.save(str, pwd);
        });
      } else {
        alert('save error: ' + JSON.stringify(e));
      }
      return null;
    });
  },
  /**
   * 保存到本地json文件
   */
  saveJSON: function (json) {
    return saveJSON(json).catch((e) => {
      throw new Error('saveJSON error: ' + JSON.stringify(e));
    });
  },
  /**
   * 读取本地json文件
   */
  getData: function () {
    return getJSON()
      .then((data) => {
        data = JSON.parse(data);
        data.projects.forEach((proj) => {
          proj.groups.forEach((group) => {
            group.expand = true;
          });
        });
        return data;
      })
      .catch((e) => {
        throw new Error('getData error: ' + JSON.stringify(e));
      });
  },
};

// 代理事件绑定
window.addEventListener(
  'load',
  function () {
    document.body.addEventListener(
      'click',
      function (e) {
        let elemId = e.target.id;
        // 导入配置
        if (elemId === 'importBtn') {
          doImport();
        } else if (elemId === 'exportBtn') {
          doExport();
        }
      },
      false,
    );
    document.querySelector('.pwd-dialog .txt-pwd').addEventListener(
      'keyup',
      function (e) {
        const txt = e.currentTarget;
        if (e.keyCode === 13 && pwdCallback) {
          pwdCallback(txt.value);
          txt.parentNode.parentNode.classList.add('hide');
          txt.value = '';
        }
      },
      false,
    );
  },
  false,
);

// 导入配置
function doImport() {
  ipcRenderer.on('importData-callback', (event, args) => {
    window.hostsFile
      .saveJSON(args.data)
      .then(() => {
        window.location.reload();
        alert('导入成功！');
      })
      .catch((e) => {
        alert('import error: ' + e);
      });
  });
  ipcRenderer.send('importData');
}

// 导出配置
function doExport() {
  window.hostsFile
    .getData()
    .then((data) => {
      ipcRenderer.send('exportData', {
        data: JSON.stringify(data, null, 2),
      });
      alert('导出成功！');
    })
    .catch((e) => {
      alert('export error: ' + e);
    });
}
