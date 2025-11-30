import { useState } from "react";
import { FloatingWidget } from "@/components/FloatingWidget";
import { AgniPanel } from "@/components/AgniPanel";

const Index = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-ember opacity-50" />
      <div className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-secondary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8 text-center">
        <div className="space-y-6 max-w-3xl">
          <div className="inline-block">
            <div className="h-24 w-24 mx-auto mb-6 rounded-full bg-gradient-fire flex items-center justify-center shadow-glow-red animate-pulse-glow">
              <span className="text-5xl">🔥</span>
            </div>
          </div>
          
          <h1 className="text-6xl font-bold bg-gradient-fire bg-clip-text text-transparent">
            AGNI
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your intelligent AI assistant that works everywhere. Get instant help with coding, 
            tasks, research, and more - just like having Jarvis at your fingertips.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="p-6 rounded-xl bg-card border border-border hover:border-primary transition-colors">
              <div className="h-12 w-12 mx-auto mb-4 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-2xl">💬</span>
              </div>
              <h3 className="font-semibold mb-2">Quick Q&A</h3>
              <p className="text-sm text-muted-foreground">
                Get instant answers without switching context
              </p>
            </div>

            <div className="p-6 rounded-xl bg-card border border-border hover:border-secondary transition-colors">
              <div className="h-12 w-12 mx-auto mb-4 rounded-full bg-secondary/20 flex items-center justify-center">
                <span className="text-2xl">💻</span>
              </div>
              <h3 className="font-semibold mb-2">Code Assistant</h3>
              <p className="text-sm text-muted-foreground">
                Debug, format, and generate code with AI
              </p>
            </div>

            <div className="p-6 rounded-xl bg-card border border-border hover:border-accent transition-colors">
              <div className="h-12 w-12 mx-auto mb-4 rounded-full bg-accent/20 flex items-center justify-center">
                <span className="text-2xl">✅</span>
              </div>
              <h3 className="font-semibold mb-2">Task Management</h3>
              <p className="text-sm text-muted-foreground">
                Keep track of tasks, notes, and reminders
              </p>
            </div>
          </div>

          <div className="mt-12 p-4 rounded-lg bg-muted/50 border border-border">
            <p className="text-sm text-muted-foreground">
              👉 Click the floating fire button to open Agni and start working smarter!
            </p>
          </div>
        </div>
      </div>

      {/* Floating Widget */}
      <FloatingWidget
        onToggle={() => setIsExpanded(!isExpanded)}
        isExpanded={isExpanded}
      />

      {/* Agni Panel */}
      {isExpanded && <AgniPanel onClose={() => setIsExpanded(false)} />}
    </div>
  );
};

export default Index;
