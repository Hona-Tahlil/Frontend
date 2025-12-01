import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

import { cn } from "@/lib/utils";

const TabsVariantContext = React.createContext(false);

const Tabs = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root> & {
    isPetsitter?: boolean;
  }
>(({ isPetsitter = false, ...props }, ref) => (
  <TabsVariantContext.Provider value={isPetsitter}>
    <TabsPrimitive.Root ref={ref} {...props} />
  </TabsVariantContext.Provider>
));
Tabs.displayName = TabsPrimitive.Root.displayName;


const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <>
    <TabsPrimitive.List
      ref={ref}
      className={cn(
        "inline-flex h-9 items-end justify-start rounded-lg text-muted-foreground bg-none rtl w-full",
        className
      )}
      {...props}
    />
    <div className="h-0.5 bg-black/30"></div>
  </>
));
TabsList.displayName = TabsPrimitive.List.displayName;


const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, children, ...props }, ref) => {
  const isPetsitter = React.useContext(TabsVariantContext);

  const activeTextClass = isPetsitter
    ? "data-[state=active]:text-secondary"
    : "data-[state=active]:text-primary";

  const hoverTextClass = isPetsitter
    ? "group-hover:text-secondary"
    : "group-hover:text-primary";

  const focusTextClass = isPetsitter
    ? "group-focus-visible:text-secondary"
    : "group-focus-visible:text-primary";

  const hoverBgClass = isPetsitter
    ? "group-hover:bg-secondary"
    : "group-hover:bg-primary";

  const focusBgClass = isPetsitter
    ? "group-focus-visible:bg-secondary"
    : "group-focus-visible:bg-primary";

  const activeBgClass = isPetsitter
    ? "group-data-[state=active]:bg-secondary"
    : "group-data-[state=active]:bg-primary";

  return (
    <TabsPrimitive.Trigger
      ref={ref}
      className={cn(
        "group inline-flex flex-col text-black items-center justify-between whitespace-nowrap rounded-md px-3 text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 -mb-0.5",
        activeTextClass,
        className
      )}
      {...props}
    >
      <span className={cn(hoverTextClass, focusTextClass)}>{children}</span>

      <span
        className={cn(
          "mt-1 h-0.5 w-full bg-black/30 opacity-0",
          hoverBgClass,
          focusBgClass,
          activeBgClass,
          "group-hover:opacity-100 group-focus-visible:opacity-100 group-data-[state=active]:opacity-100"
        )}
      />
    </TabsPrimitive.Trigger>
  );
});
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
      className
    )}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsList, TabsTrigger, TabsContent };
