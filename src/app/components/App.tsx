import * as React from "react";
import { Counts } from "../../plugin/lib";
import "../styles/ui.css";

function useMessageListenerEffect(setCounts) {
  React.useEffect(() => {
    window.onmessage = event => {
      setCounts(event.data.pluginMessage);
    };
  }, []);
}

const defaultCounts: Counts = {
  characters: 0,
  charactersNoSpaces: 0,
  words: 0,
  numSelected: 0
};

const App = ({}) => {
  const [counts, setCounts] = React.useState<Counts>(defaultCounts);
  const { characters, charactersNoSpaces, words, numSelected } = counts;

  useMessageListenerEffect(setCounts);

  return (
    <>
      <table className="counts-table">
        <tbody>
          <tr>
            <td>Characters</td>
            <td>{characters}</td>
          </tr>
          <tr>
            <td>Characters excluding spaces</td>
            <td>{charactersNoSpaces}</td>
          </tr>
          <tr>
            <td>Words</td>
            <td>{words}</td>
          </tr>
        </tbody>
      </table>

      <p className="layer-count">{numSelected} text layers selected</p>

      <div className="github">
        <a href="https://github.com/Ligerx/figma-word-counter" target="_blank">
          GitHub
        </a>
      </div>
    </>
  );
};

export default App;
