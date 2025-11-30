import { useState } from "react";
import { Code2, Wand2, Bug, FileCode, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import Editor from "@monaco-editor/react";

const LANGUAGES = [
  "javascript", "typescript", "python", "java", "cpp", "csharp",
  "go", "rust", "php", "ruby", "swift", "kotlin", "html", "css", "json"
];

export const EnhancedCodeAssistant = () => {
  const [code, setCode] = useState("");
  const [result, setResult] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleAction = async (action: "explain" | "debug" | "format" | "generate") => {
    if (!code.trim() && action !== "generate") {
      toast({
        title: "Error",
        description: "Please enter some code first",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setResult("");

    try {
      const prompts = {
        explain: `Explain this ${language} code in detail:\n\n${code}`,
        debug: `Help me debug this ${language} code and suggest fixes:\n\n${code}`,
        format: `Format and improve this ${language} code with best practices:\n\n${code}`,
        generate: `Generate ${language} code based on this description:\n\n${code}`,
      };

      const { data, error } = await supabase.functions.invoke("chat", {
        body: {
          messages: [
            { role: "system", content: `You are an expert ${language} developer. Provide clear, concise, and helpful responses with properly formatted code.` },
            { role: "user", content: prompts[action] },
          ],
        },
      });

      if (error) throw error;
      setResult(data.response);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to process request",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({
      title: "Copied!",
      description: "Result copied to clipboard",
    });
  };

  return (
    <div className="h-full flex flex-col p-4 gap-4">
      <div className="flex items-center gap-2 flex-wrap">
        <Select value={language} onValueChange={setLanguage}>
          <SelectTrigger className="w-[180px] bg-muted border-border">
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent>
            {LANGUAGES.map((lang) => (
              <SelectItem key={lang} value={lang}>
                {lang.toUpperCase()}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="flex gap-2 flex-wrap">
          <Button
            onClick={() => handleAction("explain")}
            disabled={isLoading}
            variant="outline"
            size="sm"
            className="border-primary hover:bg-primary/10"
          >
            <Code2 className="h-4 w-4 mr-2" />
            Explain
          </Button>
          <Button
            onClick={() => handleAction("debug")}
            disabled={isLoading}
            variant="outline"
            size="sm"
            className="border-secondary hover:bg-secondary/10"
          >
            <Bug className="h-4 w-4 mr-2" />
            Debug
          </Button>
          <Button
            onClick={() => handleAction("format")}
            disabled={isLoading}
            variant="outline"
            size="sm"
            className="border-accent hover:bg-accent/10"
          >
            <Wand2 className="h-4 w-4 mr-2" />
            Format
          </Button>
          <Button
            onClick={() => handleAction("generate")}
            disabled={isLoading}
            variant="outline"
            size="sm"
            className="border-primary-glow hover:bg-primary-glow/10"
          >
            <FileCode className="h-4 w-4 mr-2" />
            Generate
          </Button>
        </div>
      </div>

      <div className="flex-1 grid md:grid-cols-2 gap-4 min-h-0">
        <div className="flex flex-col gap-2 min-h-0">
          <label className="text-sm font-medium text-muted-foreground">Your Code</label>
          <div className="flex-1 border border-border rounded-md overflow-hidden">
            <Editor
              height="100%"
              language={language}
              value={code}
              onChange={(value) => setCode(value || "")}
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                lineNumbers: "on",
                scrollBeyondLastLine: false,
                automaticLayout: true,
              }}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 min-h-0">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium text-muted-foreground">
              {isLoading ? "Processing..." : "Result"}
            </label>
            {result && !isLoading && (
              <Button
                onClick={copyToClipboard}
                variant="ghost"
                size="sm"
                className="h-8"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </>
                )}
              </Button>
            )}
          </div>
          <ScrollArea className="flex-1 rounded-md border border-border bg-muted p-4">
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
              </div>
            ) : (
              <pre className="text-sm whitespace-pre-wrap font-mono">
                {result || "Results will appear here..."}
              </pre>
            )}
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};
