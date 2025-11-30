import { useState, useEffect } from "react";
import { Plus, Trash2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";

interface Task {
  id: string;
  text: string;
  completed: boolean;
}

export const TaskManager = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");

  // Load tasks from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("agni-tasks");
    if (saved) {
      setTasks(JSON.parse(saved));
    }
  }, []);

  // Save tasks to localStorage
  useEffect(() => {
    localStorage.setItem("agni-tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!newTask.trim()) return;
    
    setTasks([
      ...tasks,
      {
        id: Date.now().toString(),
        text: newTask.trim(),
        completed: false,
      },
    ]);
    setNewTask("");
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      addTask();
    }
  };

  return (
    <div className="h-full flex flex-col p-4 gap-4">
      <div className="flex gap-2">
        <Input
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add a new task..."
          className="bg-muted border-border"
        />
        <Button
          onClick={addTask}
          className="bg-gradient-fire hover:opacity-90"
        >
          <Plus className="h-5 w-5" />
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="space-y-2">
          {tasks.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p>No tasks yet. Add one to get started!</p>
            </div>
          ) : (
            tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center gap-3 p-3 rounded-lg bg-muted hover:bg-muted/80 transition-colors group"
              >
                <Checkbox
                  checked={task.completed}
                  onCheckedChange={() => toggleTask(task.id)}
                  className="border-primary data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <span
                  className={`flex-1 ${
                    task.completed
                      ? "line-through text-muted-foreground"
                      : "text-foreground"
                  }`}
                >
                  {task.text}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteTask(task.id)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity hover:bg-destructive/20 hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))
          )}
        </div>
      </ScrollArea>

      <div className="pt-2 border-t border-border">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>{tasks.filter((t) => !t.completed).length} active</span>
          <span>{tasks.filter((t) => t.completed).length} completed</span>
        </div>
      </div>
    </div>
  );
};
