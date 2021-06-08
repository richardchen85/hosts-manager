window.Api = {
  getData: function () {
    return hostsFile.getData();
  },
  saveData: function (str) {
    return hostsFile.save(str);
  },
  saveJSON: function (json) {
    return hostsFile.saveJSON(json);
  },
  getContent: function (state) {
    let content = state.global + '\n';
    state.projects.forEach((project) => {
      if (project.active) {
        let groups = project.groups;
        groups.forEach((group) => {
          if (group.active) {
            content += group.content + '\n';
          }
        });
      }
    });
    return content;
  },
};
