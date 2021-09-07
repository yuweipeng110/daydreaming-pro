export const RuleBranchState = {
  100: '开发阶段',
  300: '提交发布（待审批）',
  400: '线上发布',
  500: '取消发布（待审批）',
  600: '合并至基线（待审批）',
  700: '归档',
};

export const RuleBranchType = {
  0: '基线分支',
  1: 'Feature分支',
};

export const RunType = {
  0: '实跑',
  1: '陪跑',
};

export const PublishAction = {
  0: '待发布',
  1: '待发布', // 发布待审批
  2: '已发布',
  3: '已发布', // 暂停待审批
  4: '已发布', // 已发布有更新待审批
};

const colors = {
  B: '#5B8FF9',
  R: '#F46649',
  Y: '#EEBC20',
  G: '#5BD8A6',
  DI: '#A7A7A7',
  C: '#C2CC37',
};

export const CalleArr = (data: any) => {
  for (const i in data) {
    const currentData = data[i];
    const colorsArr = Object.keys(colors);
    const colorsIndex = Math.floor((Math.random() * colorsArr.length));
    currentData.id = currentData.id.toString();
    currentData.branchType = RuleBranchType[currentData.branchType];// GetObjectValueByKey(RuleBranchType, currentData.branchType);
    currentData.branchStatus = RuleBranchState[currentData.branchStatus]; // GetObjectValueByKey(RuleBranchState, currentData.branchStatus);
    currentData.publishState = PublishAction[currentData.publishState]; // GetObjectValueByKey(PublishAction, currentData.publishState);
    currentData.runType = RunType[currentData.runType]; // GetObjectValueByKey(RunType, currentData.runType);
    currentData.status = colorsArr[colorsIndex];
    currentData.rate = 1;
    if (currentData.children) {
      CalleArr(currentData.children);
    }
  }
};
