import { codeSnippets, fonts } from "@/options";
import React, { useEffect } from "react";
import Editor from "react-simple-code-editor";
import { cn } from "@/lib/utils";
import hljs from "highlight.js";
import useStore from "@/store";
import flourite from "flourite";

const CodeEditor = () => {
  const store = useStore();

  useEffect(() => {
    const randomSnippet = codeSnippets[Math.floor(Math.random() * codeSnippets.length)]
    useStore.setState(randomSnippet);
  }, [])

  useEffect(() => {
    if (store.autoDetectLanguage) {
      const { language } = flourite(store.code, { noUnknown: true })
      useStore.setState({
        language: language.toLowerCase() || "plaintext",
      })
    }
  }, [store.autoDetectLanguage, store.code])

  const isMobileView = window.innerWidth < 450;

  return (
    <div
      className={cn(
        "min-w-[300px] border-2 rounded-xl shadow-2xl",
        store.darkMode
          ? "bg-black/75 border-gray-600/40"
          : "bg-white/75 border-gray-200/20"
      )}
    >
      <header className="grid grid-cols-6 gap-3 items-center px-4 py-3">
        <div className="flex gap-1.5 w-12">
          <div className="rounded-full h-3 w-3 bg-red-500" />
          <div className="rounded-full h-3 w-3 bg-yellow-500" />
          <div className="rounded-full h-3 w-3 bg-green-500" />
        </div>

        <div className="col-span-4 flex justify-center">
          <input
            id="title"
            type="text"
            value={store.title}
            spellCheck={false}
            onChange={(e) => useStore.setState({ title: e.target.value })}
            onClick={(e) => e.target.select()}
            className={cn("bg-transparent text-center text-sm font-medium focus:outline-none", store.darkMode
              ? "text-gray-200/75"
              : "text-black/75")}
          />
        </div>
      </header>

      <div
        className={cn(
          "px-4 pb-4 w-[300px]",
          store.darkMode
            ? "brightness-110"
            : "text-gray-800 brightness-50 saturate-200 contrast-200"
        )}
      >
        <Editor
          id="code"
          name="code"
          value={store.code}
          onValueChange={code => useStore.setState({ code })}
          highlight={(code) =>
            hljs.highlight(code, { language: store.language || "plaintext" }).value
          }
          style={{
            fontFamily: fonts[store.fontStyle]?.name,
            fontSize: isMobileView ? 15 : store.fontSize,
          }}
          textareaClassName="focus:outline-none"
          onClick={(e) => e.target.select()}
        />
      </div>
    </div>
  );
};

export default CodeEditor;
