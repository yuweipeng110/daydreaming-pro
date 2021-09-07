import React, { useState, useRef } from 'react';
import Editor from '@monaco-editor/react';

const codeValue = `
Facts.Load("UserMtee","UserThunder","UserCreateOrderProfileTags","UserAccountFeature","UserVelocity","UserWhiteList","UserOneIdUnfinishedOrder","UserNewUser","UserUnfinishedRecord","UserRiskAccount",
    "UserHistoryLevel_totalCount","GetMidHighRiskCount","UserSdkActive","UserAlipayOneId","UserMobileOneId","UserAmapDevice","UserRegisterInfo","UserLastOrderDetail","UserJoinHighQualityV2","UserGravityIpRange","UserNavigateBadBill",
    "UserOrderFinishOneDay","UserBlackList","UserStartRgeo","UserUsedApp","UserAccountFeature","UserHistoryLevel","UserAlipaySecurity","UserAlipayNewSecurity","UserYidun","UserAlipaySecurity_decision","UserAlipayNewSecurity_decision","UserYidun_decision","UserThunder_decision",
    "UserRuleHitUser","UserTransportCore","UserInfoGet")
Facts.Set("MidHighRiskCount", GetMidHighRiskCount(UserAlipaySecurity_decision,UserAlipayNewSecurity_decision,UserYidun_decision,UserThunder_decision))
`;

export default (props: any) => {
  const { index } = props;
  const [editHeight, setEditorHeight] = useState<number>();
  const editorRef = useRef();

  const onEditorResize = () => {
    // console.log('editorRef.current',editorRef.current);

    // @ts-ignore
    const width = editorRef.current.getLayoutInfo()?.width;
    // @ts-ignore
    const height = editorRef.current.getContentHeight();
    // console.log('editorRef.current.getContentHeight()', editorRef.current.getContentHeight());

    // @ts-ignore
    editorRef.current.layout({ width, height });
    setEditorHeight(height);
  };

  const onEditorChange = (e: any, value: any) => {
    onEditorResize();
  };

  const handleEditorDidMount = (editor: any, monaco: any) => {
    editorRef.current = editor;
    onEditorResize();
  };

  return (
    <>
      索引：{index}
      <Editor
        value={codeValue}
        width='100%'
        height={editHeight}
        language='go'
        // theme='vs-dark'
        onChange={onEditorChange}
        onMount={handleEditorDidMount}
        options={{
          // readOnly: readOnly || !visualMode,
          renderWhitespace: 'boundary',
          scrollbar: {
            alwaysConsumeMouseWheel: false,
          },
          minimap: {
            enabled: false,
          },
          scrollBeyondLastLine: false,
          // automaticLayout: true,
          // folding: false,
          wordWrap: 'on',
        }}
      />
    </>
  );
};
