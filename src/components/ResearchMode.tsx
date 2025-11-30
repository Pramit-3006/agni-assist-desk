import { useState } from "react";
import { Search, Loader2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface SearchResult {
  title: string;
  snippet: string;
  url?: string;
}

export const ResearchMode = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSearch = async () => {
    if (!query.trim()) return;

    setIsLoading(true);
    setResults([]);

    try {
      // Use AI to research the topic
      const { data, error } = await supabase.functions.invoke("research", {
        body: { query: query.trim() },
      });

      if (error) throw error;

      setResults(data.results || []);
    } catch (error: any) {
      console.error("Research error:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to research topic",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="h-full flex flex-col p-4 gap-4">
      <div className="flex gap-2">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="What would you like to research?"
          className="bg-muted border-border"
          disabled={isLoading}
        />
        <Button
          onClick={handleSearch}
          disabled={isLoading || !query.trim()}
          className="bg-gradient-fire hover:opacity-90"
        >
          {isLoading ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <Search className="h-5 w-5" />
          )}
        </Button>
      </div>

      <ScrollArea className="flex-1">
        {results.length === 0 && !isLoading ? (
          <div className="text-center py-12 text-muted-foreground">
            <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Enter a topic to research</p>
            <p className="text-sm mt-2">I'll help you find and summarize information</p>
          </div>
        ) : isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <Loader2 className="h-12 w-12 mx-auto mb-4 animate-spin text-primary" />
              <p className="text-muted-foreground">Researching...</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {results.map((result, index) => (
              <Card key={index} className="p-4 hover:border-primary transition-colors">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <h3 className="font-semibold mb-2">{result.title}</h3>
                    <p className="text-sm text-muted-foreground">{result.snippet}</p>
                  </div>
                  {result.url && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => window.open(result.url, "_blank")}
                      className="shrink-0"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};
