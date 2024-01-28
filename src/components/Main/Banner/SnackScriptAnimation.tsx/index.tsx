import "./index.css";

const SnackScriptAnimation = () => {
  return (
    <div className="terminal-loader">
      <div className="terminal-header">
        <div className="terminal-title">Terminal</div>
        <div className="terminal-controls">
          <div className="control close"></div>
          <div className="control minimize"></div>
          <div className="control maximize"></div>
        </div>
      </div>
      <div className="text">짠짠 / 달달 / 매콤 / 쫀득 / 찹찹 / 얼큰 / 고소</div>
    </div>
  );
};

export default SnackScriptAnimation;
