// src/components/timeline/timeline.tsx
import * as React from "react";

// src/lib/utils.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// src/components/timeline/timeline.tsx
import { cva } from "class-variance-authority";
import { motion } from "framer-motion";
import { AlertCircle, Loader2 } from "lucide-react";
import { jsx, jsxs } from "react/jsx-runtime";
var timelineVariants = cva("flex flex-col relative", {
  variants: {
    size: {
      sm: "gap-4",
      md: "gap-6",
      lg: "gap-8"
    }
  },
  defaultVariants: {
    size: "md"
  }
});
var Timeline = React.forwardRef(
  ({ className, iconsize, size, children, ...props }, ref) => {
    const items = React.Children.toArray(children);
    if (items.length === 0) {
      return /* @__PURE__ */ jsx(TimelineEmpty, {});
    }
    return /* @__PURE__ */ jsx(
      "ol",
      {
        ref,
        "aria-label": "Timeline",
        className: cn(
          timelineVariants({ size }),
          "relative min-h-[600px] w-full max-w-2xl mx-auto py-8",
          className
        ),
        ...props,
        children: React.Children.map(children, (child, index) => {
          if (React.isValidElement(child) && typeof child.type !== "string" && "displayName" in child.type && child.type.displayName === "TimelineItem") {
            return React.cloneElement(child, {
              iconsize,
              showConnector: index !== items.length - 1
            });
          }
          return child;
        })
      }
    );
  }
);
Timeline.displayName = "Timeline";
var TimelineItem = React.forwardRef(
  ({
    className,
    date,
    title,
    description,
    icon,
    iconColor,
    status = "completed",
    connectorColor,
    showConnector = true,
    iconsize,
    loading,
    error,
    // Omit unused Framer Motion props
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    initial,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    animate,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    transition,
    ...props
  }, ref) => {
    const commonClassName = cn(
      "relative w-full mb-8 last:mb-0",
      className
    );
    const getConnectorColor = (connectorColor2) => {
      if (connectorColor2) return connectorColor2;
      return status === "completed" ? "primary" : status === "in-progress" ? "secondary" : "muted";
    };
    if (loading) {
      return /* @__PURE__ */ jsx(
        motion.li,
        {
          ref,
          className: commonClassName,
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          role: "status",
          ...props,
          children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-[minmax(auto,8rem)_auto_1fr] items-start px-4", children: [
            /* @__PURE__ */ jsx("div", { className: "pr-4 text-right", children: /* @__PURE__ */ jsx("div", { className: "h-4 w-24 animate-pulse rounded bg-muted" }) }),
            /* @__PURE__ */ jsxs("div", { className: "mx-3 flex flex-col items-center justify-start gap-y-2", children: [
              /* @__PURE__ */ jsx("div", { className: cn("relative flex h-8 w-8 animate-pulse items-center justify-center rounded-full bg-muted ring-8 ring-background"), children: /* @__PURE__ */ jsx(
                TimelineIcon,
                {
                  icon: /* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin text-muted-foreground" }),
                  iconSize: iconsize,
                  status: "in-progress"
                }
              ) }),
              showConnector && /* @__PURE__ */ jsx(
                TimelineConnector,
                {
                  status: "in-progress",
                  className: cn("h-full w-0.5", getConnectorColor(connectorColor))
                }
              )
            ] }),
            /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-2 pl-2", children: /* @__PURE__ */ jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsx("div", { className: "h-4 w-24 animate-pulse rounded bg-muted" }),
              /* @__PURE__ */ jsx("div", { className: "h-3 w-48 animate-pulse rounded bg-muted" })
            ] }) })
          ] })
        }
      );
    }
    if (error) {
      return /* @__PURE__ */ jsx(
        motion.li,
        {
          ref,
          className: cn(commonClassName, "border border-destructive/50 bg-destructive/10"),
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          role: "alert",
          ...props,
          children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-[minmax(auto,8rem)_auto_1fr] items-start px-4", children: [
            /* @__PURE__ */ jsx("div", { className: "pr-4 text-right", children: /* @__PURE__ */ jsx(TimelineTime, { className: "text-destructive", children: date }) }),
            /* @__PURE__ */ jsxs("div", { className: "mx-3 flex flex-col items-center justify-start gap-y-2", children: [
              /* @__PURE__ */ jsx("div", { className: "relative flex h-8 w-8 items-center justify-center rounded-full bg-destructive/20 ring-8 ring-background", children: /* @__PURE__ */ jsx(AlertCircle, { className: "h-4 w-4 text-destructive" }) }),
              showConnector && /* @__PURE__ */ jsx(TimelineConnector, { status: "pending", className: "h-full" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 pl-2", children: [
              /* @__PURE__ */ jsx(TimelineHeader, { children: /* @__PURE__ */ jsx(TimelineTitle, { className: "text-destructive", children: title || "Error" }) }),
              /* @__PURE__ */ jsx(TimelineDescription, { className: "text-destructive", children: error })
            ] })
          ] })
        }
      );
    }
    const content = /* @__PURE__ */ jsxs(
      "div",
      {
        className: "grid grid-cols-[1fr_auto_1fr] gap-4 items-start",
        ...status === "in-progress" ? { "aria-current": "step" } : {},
        children: [
          /* @__PURE__ */ jsx("div", { className: "flex flex-col justify-start pt-1", children: /* @__PURE__ */ jsx(TimelineTime, { className: "text-right pr-4", children: date }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center", children: [
            /* @__PURE__ */ jsx("div", { className: "relative z-10", children: /* @__PURE__ */ jsx(TimelineIcon, { icon, color: iconColor, status, iconSize: iconsize }) }),
            showConnector && /* @__PURE__ */ jsx("div", { className: "h-16 w-0.5 bg-border mt-2" })
          ] }),
          /* @__PURE__ */ jsxs(TimelineContent, { children: [
            /* @__PURE__ */ jsx(TimelineHeader, { children: /* @__PURE__ */ jsx(TimelineTitle, { children: title }) }),
            /* @__PURE__ */ jsx(TimelineDescription, { children: description })
          ] })
        ]
      }
    );
    const {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      style,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onDrag,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onDragStart,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onDragEnd,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onAnimationStart,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onAnimationComplete,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      transformTemplate,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      whileHover,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      whileTap,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      whileDrag,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      whileFocus,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      whileInView,
      ...filteredProps
    } = props;
    return /* @__PURE__ */ jsx("li", { ref, className: commonClassName, ...filteredProps, children: content });
  }
);
TimelineItem.displayName = "TimelineItem";
var defaultDateFormat = {
  year: "numeric",
  month: "short",
  day: "2-digit"
};
var TimelineTime = React.forwardRef(
  ({ className, date, format, children, ...props }, ref) => {
    const formattedDate = React.useMemo(() => {
      if (!date) return "";
      try {
        const dateObj = new Date(date);
        if (isNaN(dateObj.getTime())) return "";
        return new Intl.DateTimeFormat("en-US", {
          ...defaultDateFormat,
          ...format
        }).format(dateObj);
      } catch (error) {
        console.error("Error formatting date:", error);
        return "";
      }
    }, [date, format]);
    return /* @__PURE__ */ jsx(
      "time",
      {
        ref,
        dateTime: date ? new Date(date).toISOString() : void 0,
        className: cn("text-sm font-medium tracking-tight text-muted-foreground", className),
        ...props,
        children: children || formattedDate
      }
    );
  }
);
TimelineTime.displayName = "TimelineTime";
var TimelineConnector = React.forwardRef(({ className, status = "completed", color, ...props }, ref) => /* @__PURE__ */ jsx(
  "div",
  {
    ref,
    className: cn(
      "w-0.5",
      {
        "bg-primary": color === "primary" || !color && status === "completed",
        "bg-muted": color === "muted" || !color && status === "pending",
        "bg-secondary": color === "secondary",
        "bg-accent": color === "accent",
        "bg-gradient-to-b from-primary to-muted": !color && status === "in-progress"
      },
      className
    ),
    ...props
  }
));
TimelineConnector.displayName = "TimelineConnector";
var TimelineHeader = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("flex items-center gap-4", className), ...props })
);
TimelineHeader.displayName = "TimelineHeader";
var TimelineTitle = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsx(
  "h3",
  {
    ref,
    className: cn("font-semibold leading-none tracking-tight text-secondary-foreground", className),
    ...props,
    children
  }
));
TimelineTitle.displayName = "TimelineTitle";
var TimelineIcon = ({
  icon,
  color = "primary",
  status = "completed",
  iconSize = "md"
}) => {
  const sizeClasses = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12"
  };
  const iconSizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6"
  };
  const colorClasses = {
    primary: "bg-primary text-primary-foreground",
    secondary: "bg-secondary text-secondary-foreground",
    muted: "bg-muted text-muted-foreground",
    accent: "bg-accent text-accent-foreground",
    destructive: "bg-destructive text-destructive-foreground"
  };
  const getStatusColor = (status2) => {
    switch (status2) {
      case "completed":
        return colorClasses["primary"];
      case "in-progress":
        return colorClasses["secondary"];
      case "pending":
        return colorClasses["muted"];
      case "error":
        return colorClasses["destructive"];
      default:
        return colorClasses[color];
    }
  };
  return /* @__PURE__ */ jsx(
    "div",
    {
      className: cn(
        "relative flex items-center justify-center rounded-full ring-8 ring-background shadow-sm",
        sizeClasses[iconSize],
        status ? getStatusColor(status) : colorClasses[color]
      ),
      children: icon ? /* @__PURE__ */ jsx("div", { className: cn("flex items-center justify-center", iconSizeClasses[iconSize]), children: icon }) : /* @__PURE__ */ jsx("div", { className: cn("rounded-full", iconSizeClasses[iconSize]) })
    }
  );
};
var TimelineDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx("p", { ref, className: cn("max-w-sm text-sm text-muted-foreground", className), ...props }));
TimelineDescription.displayName = "TimelineDescription";
var TimelineContent = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx("div", { ref, className: cn("flex flex-col gap-2 pl-2", className), ...props })
);
TimelineContent.displayName = "TimelineContent";
var TimelineEmpty = React.forwardRef(
  ({ className, children, ...props }, ref) => /* @__PURE__ */ jsx(
    "div",
    {
      ref,
      className: cn("flex flex-col items-center justify-center p-8 text-center", className),
      ...props,
      children: /* @__PURE__ */ jsx("p", { className: "text-sm text-muted-foreground", children: children || "No timeline items to display" })
    }
  )
);
TimelineEmpty.displayName = "TimelineEmpty";

// src/components/timeline/timeline-layout.tsx
import { jsx as jsx2 } from "react/jsx-runtime";
var TimelineLayout = ({
  items,
  size = "md",
  iconColor,
  customIcon,
  animate = true,
  connectorColor,
  className
}) => {
  return /* @__PURE__ */ jsx2(Timeline, { size, className, children: [...items].reverse().map((item, index) => /* @__PURE__ */ jsx2(
    TimelineItem,
    {
      initial: animate ? { opacity: 0, y: 20 } : void 0,
      animate: animate ? { opacity: 1, y: 0 } : void 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut"
      },
      date: item.date,
      title: item.title,
      description: item.description ?? "",
      icon: (() => {
        try {
          if (typeof item.icon === "function") {
            return item.icon();
          }
          return item.icon ?? customIcon;
        } catch (error) {
          console.error("Timeline icon function failed:", error);
          return customIcon;
        }
      })(),
      iconColor: ["primary", "secondary", "muted", "accent", "destructive"].includes(item.color) ? item.color : iconColor,
      connectorColor: ["primary", "secondary", "muted", "accent", "destructive"].includes(item.color) ? item.color : connectorColor,
      showConnector: index !== items.length - 1
    },
    index
  )) });
};
export {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineDescription,
  TimelineEmpty,
  TimelineHeader,
  TimelineIcon,
  TimelineItem,
  TimelineLayout,
  TimelineTime,
  TimelineTitle,
  cn
};
//# sourceMappingURL=index.mjs.map