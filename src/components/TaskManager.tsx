import { useState, useEffect } from "react";
import { Plus, Trash2, Check, Bell, BellOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import { useNotifications } from "@/hooks/useNotifications";
import { useToast } from "@/hooks/use-toast";

interface Task {
  id: string;
  text: string;
  completed: boolean;
  reminder?: number; // timestamp for reminder
}

export const TaskManager = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const { permission, requestPermission, showNotification, isSupported } = useNotifications();
  const { toast } = useToast();

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

  // Check for task reminders
  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      tasks.forEach((task) => {
        if (task.reminder && task.reminder <= now && !task.completed) {
          showNotification("Task Reminder", {
            body: task.text,
            tag: task.id,
          });
          // Clear the reminder after showing
          setTasks((prevTasks) =>
            prevTasks.map((t) =>
              t.id === task.id ? { ...t, reminder: undefined } : t
            )
          );
        }
      });
    }, 10000); // Check every 10 seconds

    return () => clearInterval(interval);
  }, [tasks, showNotification]);

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

  const setTaskReminder = (taskId: string, minutes: number) => {
    if (permission !== "granted") {
      requestPermission().then((perm) => {
        if (perm === "granted") {
          setReminderForTask(taskId, minutes);
        } else {
          toast({
            title: "Permission Denied",
            description: "Please enable notifications to set reminders",
            variant: "destructive",
          });
        }
      });
    } else {
      setReminderForTask(taskId, minutes);
    }
  };

  const setReminderForTask = (taskId: string, minutes: number) => {
    const reminderTime = Date.now() + minutes * 60 * 1000;
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, reminder: reminderTime } : task
      )
    );
    toast({
      title: "Reminder Set",
      description: `You'll be notified in ${minutes} minute${minutes > 1 ? "s" : ""}`,
    });
  };

  return (
    <div className="h-full flex flex-col p-4 gap-4">
      <div className="space-y-2">
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
        
        {isSupported && permission !== "granted" && (
          <Button
            onClick={requestPermission}
            variant="outline"
            size="sm"
            className="w-full"
          >
            <Bell className="h-4 w-4 mr-2" />
            Enable Notifications for Reminders
          </Button>
        )}
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
                <div className="flex-1">
                  <span
                    className={`${
                      task.completed
                        ? "line-through text-muted-foreground"
                        : "text-foreground"
                    }`}
                  >
                    {task.text}
                  </span>
                  {task.reminder && !task.completed && (
                    <div className="flex items-center gap-1 mt-1 text-xs text-primary">
                      <Bell className="h-3 w-3" />
                      Reminder set
                    </div>
                  )}
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {!task.completed && !task.reminder && isSupported && permission === "granted" && (
                    <>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => setTaskReminder(task.id, 5)}
                        title="Remind in 5 min"
                      >
                        <Bell className="h-3 w-3" />
                      </Button>
                    </>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 hover:bg-destructive/20 hover:text-destructive"
                    onClick={() => deleteTask(task.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
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
