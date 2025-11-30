import { useState } from "react";
import { Code2, Wand2, Bug, FileCode } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const CodeAssistant = () => {
  const [code, setCode] = useState("");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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
        explain: `Explain this code in detail:\n\n${code}`,
        debug: `Help me debug this code and suggest fixes:\n\n${code}`,
        format: `Format and improve this code:\n\n${code}`,
        generate: `Generate code based on this description:\n\n${code}`,
      };

      const { data, error } = await supabase.functions.invoke("chat", {
        body: {
          messages: [
            { role: "system", content: "You are an expert code assistant. Provide clear, concise, and helpful responses." },
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

  return (
    <div className="h-full flex flex-col p-4 gap-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        <Button
          onClick={() => handleAction("explain")}
          disabled={isLoading}
          variant="outline"
          className="border-primary hover:bg-primary/10"
        >
          <Code2 className="h-4 w-4 mr-2" />
          Explain
        </Button>
        <Button
          onClick={() => handleAction("debug")}
          disabled={isLoading}
          variant="outline"
          className="border-secondary hover:bg-secondary/10"
        >
          <Bug className="h-4 w-4 mr-2" />
          Debug
        </Button>
        <Button
          onClick={() => handleAction("format")}
          disabled={isLoading}
          variant="outline"
          className="border-accent hover:bg-accent/10"
        >
          <Wand2 className="h-4 w-4 mr-2" />
          Format
        </Button>
        <Button
          onClick={() => handleAction("generate")}
          disabled={isLoading}
          variant="outline"
          className="border-primary-glow hover:bg-primary-glow/10"
        >
          <FileCode className="h-4 w-4 mr-2" />
          Generate
        </Button>
      </div>

      <div className="flex-1 grid md:grid-cols-2 gap-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-muted-foreground">Your Code</label>
          <Textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Paste your code here or describe what you want to generate..."
            className="flex-1 font-mono text-sm bg-muted border-border resize-none"
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-muted-foreground">
            {isLoading ? "Processing..." : "Result"}
          </label>
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
