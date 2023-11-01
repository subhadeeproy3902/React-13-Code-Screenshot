import CodeEditor from "./components/CodeEditor";
import useStore from "./store";
import { fonts, themes } from "./options";
import { useEffect, useRef, useState } from "react";
import { cn } from "./lib/utils";
import { Card, CardContent } from "./components/ui/card";
import ExportOptions from "./components/controls/ExportOptions";
import ThemeSelection from "./components/controls/ThemeSelection";
import LanguageSelection from "./components/controls/LanguageSelection";
import FontSelection from "./components/controls/FontSelection";
import FontSize from "./components/controls/FontSize";
import Toggle from "./components/controls/Toggle";
import DarkWhite from "./components/controls/DarkWhite";
import { Resizable } from "re-resizable";
import PaddingSlider from "./components/controls/PaddingSlider";
import "./App.css"
import Footer from "./components/Footer";
import PreLoader from "./components/PreLoader";

function App() {
  const theme = useStore((state) => state.theme);
  const padding = useStore((state) => state.padding);
  const fontStyle = useStore((state) => state.fontStyle);
  const showBackground = useStore((state) => state.showBackground);

  const editorRef = useRef(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    if (queryParams.size === 0) return;
    const state = Object.fromEntries(queryParams);
    useStore.setState({
      ...state,
      code: state.code ? atob(state.code) : "",
      autoDetectLanguage: state.autoDetectLanguage === "true",
      fontSize: Number(state.fontSize || 18),
      padding: Number(state.padding || 64),
      darkMode: state.darkMode === "true",
    });
  }, []);

  const isMobileView = window.innerWidth < 450;

  const ok = () => {
    if (!isMobileView) {
      return <PaddingSlider />;
    }
    return null;
  };

  return (
    <>
      <PreLoader/>
      <h1 class="heading">Capture and Share Code in a Snap!</h1>
      <div>
        <main className="dark min-h-screen flex items-center justify-center text-white overflow-x-hidden main">
          <link rel="stylesheet" href={themes[theme].theme} crossOrigin="anonymous" />
          <link rel="stylesheet" href={fonts[fontStyle]?.src} crossOrigin="anonymous" />

          <div className={`mt-12 p-4 md:p-0 flex flex-col items-center md:gap-4 ${isMobileView ? 'px-2' : ''}`}>
            {/* Code Editor */}
            <div>
              <Resizable
                enable={{ left: true, right: true }}
                minWidth={isMobileView ? undefined : padding * 2 + 400}
                maxWidth={isMobileView ? undefined : window.innerWidth * 0.7}
              >
                <div
                  className={cn("mb-2 transition-all ease-out", showBackground ? themes[theme].background : "ring ring-neutral-900")}
                  style={{ padding: isMobileView ? "32px" : `${padding}px` }}
                  ref={editorRef}
                >
                  <CodeEditor />
                </div>
              </Resizable>
            </div>

            {/* Controls */}
            <div className="w-[95vw] mt-6 mb-12">
              <Card className="py-6 px-4 bg-neutral-900/90 backdrop-blur" id="controlcard">
                <CardContent className="flex flex-wrap justify-between gap-4 p-0">
                  <ThemeSelection />
                  <LanguageSelection />
                  <FontSelection />
                  <FontSize />
                  {ok()}
                  <Toggle />
                  <DarkWhite />
                  <div className="w-px bg-gray-400" />
                  <div className="place-self-center">
                    <ExportOptions targetRef={editorRef} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
