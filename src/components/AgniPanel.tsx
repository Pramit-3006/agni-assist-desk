import { useState } from "react";
import { X, MessageSquare, Code2, ListTodo, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChatInterface } from "./ChatInterface";
import { EnhancedCodeAssistant } from "./EnhancedCodeAssistant";
import { TaskManager } from "./TaskManager";
import { ResearchMode } from "./ResearchMode";
import { cn } from "@/lib/utils";

interface AgniPanelProps {
  onClose: () => void;
}

export const AgniPanel = ({ onClose }: AgniPanelProps) => {
  const [activeTab, setActiveTab] = useState("chat");

  return (
    <div className="fixed inset-0 z-[9998] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-4xl h-[85vh] bg-card border-2 border-primary rounded-2xl shadow-2xl shadow-primary/20 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-gradient-fire">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
              <span className="text-2xl">🔥</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">AGNI</h1>
              <p className="text-xs text-white/80">Your AI Assistant</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-white hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <TabsList className="w-full justify-start rounded-none border-b border-border bg-muted/50 p-0 h-auto">
            <TabsTrigger
              value="chat"
              className={cn(
                "rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3",
                "hover:bg-muted/50"
              )}
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              Chat
            </TabsTrigger>
            <TabsTrigger
              value="code"
              className={cn(
                "rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3",
                "hover:bg-muted/50"
              )}
            >
              <Code2 className="h-4 w-4 mr-2" />
              Code Assistant
            </TabsTrigger>
            <TabsTrigger
              value="tasks"
              className={cn(
                "rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3",
                "hover:bg-muted/50"
              )}
            >
              <ListTodo className="h-4 w-4 mr-2" />
              Tasks
            </TabsTrigger>
            <TabsTrigger
              value="research"
              className={cn(
                "rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3",
                "hover:bg-muted/50"
              )}
            >
              <Search className="h-4 w-4 mr-2" />
              Research
            </TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-hidden">
            <TabsContent value="chat" className="h-full mt-0">
              <ChatInterface />
            </TabsContent>
            <TabsContent value="code" className="h-full mt-0">
              <EnhancedCodeAssistant />
            </TabsContent>
            <TabsContent value="tasks" className="h-full mt-0">
              <TaskManager />
            </TabsContent>
            <TabsContent value="research" className="h-full mt-0">
              <ResearchMode />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
};
