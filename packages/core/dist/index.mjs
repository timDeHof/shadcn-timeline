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
      return /* @__PURE__ */ React.createElement(TimelineEmpty, null);
    }
    return /* @__PURE__ */ React.createElement(
      "ol",
      {
        ref,
        "aria-label": "Timeline",
        className: cn(
          timelineVariants({ size }),
          "relative min-h-[600px] w-full max-w-2xl mx-auto py-8",
          className
        ),
        ...props
      },
      React.Children.map(children, (child, index) => {
        if (React.isValidElement(child) && typeof child.type !== "string" && "displayName" in child.type && child.type.displayName === "TimelineItem") {
          return React.cloneElement(child, {
            iconsize,
            showConnector: index !== items.length - 1
          });
        }
        return child;
      })
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
      return /* @__PURE__ */ React.createElement(
        motion.li,
        {
          ref,
          className: commonClassName,
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          role: "status",
          ...props
        },
        /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-[minmax(auto,8rem)_auto_1fr] items-start px-4" }, /* @__PURE__ */ React.createElement("div", { className: "pr-4 text-right" }, /* @__PURE__ */ React.createElement("div", { className: "h-4 w-24 animate-pulse rounded bg-muted" })), /* @__PURE__ */ React.createElement("div", { className: "mx-3 flex flex-col items-center justify-start gap-y-2" }, /* @__PURE__ */ React.createElement("div", { className: "relative flex h-8 w-8 animate-pulse items-center justify-center rounded-full bg-muted ring-8 ring-background" }, /* @__PURE__ */ React.createElement(Loader2, { className: "h-4 w-4 animate-spin text-muted-foreground" })), showConnector && /* @__PURE__ */ React.createElement("div", { className: cn("h-full w-0.5 animate-pulse bg-muted", getConnectorColor(connectorColor)) })), /* @__PURE__ */ React.createElement("div", { className: "flex flex-col gap-2 pl-2" }, /* @__PURE__ */ React.createElement("div", { className: "space-y-2" }, /* @__PURE__ */ React.createElement("div", { className: "h-4 w-24 animate-pulse rounded bg-muted" }), /* @__PURE__ */ React.createElement("div", { className: "h-3 w-48 animate-pulse rounded bg-muted" }))))
      );
    }
    if (error) {
      return /* @__PURE__ */ React.createElement(
        motion.li,
        {
          ref,
          className: cn(commonClassName, "border border-destructive/50 bg-destructive/10"),
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          role: "alert",
          ...props
        },
        /* @__PURE__ */ React.createElement("div", { className: "grid grid-cols-[minmax(auto,8rem)_auto_1fr] items-start px-4" }, /* @__PURE__ */ React.createElement("div", { className: "pr-4 text-right" }, /* @__PURE__ */ React.createElement(TimelineTime, { className: "text-destructive" }, date)), /* @__PURE__ */ React.createElement("div", { className: "mx-3 flex flex-col items-center justify-start gap-y-2" }, /* @__PURE__ */ React.createElement("div", { className: "relative flex h-8 w-8 items-center justify-center rounded-full bg-destructive/20 ring-8 ring-background" }, /* @__PURE__ */ React.createElement(AlertCircle, { className: "h-4 w-4 text-destructive" })), showConnector && /* @__PURE__ */ React.createElement(TimelineConnector, { status: "pending", className: "h-full" })), /* @__PURE__ */ React.createElement("div", { className: "flex flex-col gap-2 pl-2" }, /* @__PURE__ */ React.createElement(TimelineHeader, null, /* @__PURE__ */ React.createElement(TimelineTitle, { className: "text-destructive" }, title || "Error")), /* @__PURE__ */ React.createElement(TimelineDescription, { className: "text-destructive" }, error)))
      );
    }
    const content = /* @__PURE__ */ React.createElement(
      "div",
      {
        className: "grid grid-cols-[1fr_auto_1fr] gap-4 items-start",
        ...status === "in-progress" ? { "aria-current": "step" } : {}
      },
      /* @__PURE__ */ React.createElement("div", { className: "flex flex-col justify-start pt-1" }, /* @__PURE__ */ React.createElement(TimelineTime, { className: "text-right pr-4" }, date)),
      /* @__PURE__ */ React.createElement("div", { className: "flex flex-col items-center" }, /* @__PURE__ */ React.createElement("div", { className: "relative z-10" }, /* @__PURE__ */ React.createElement(TimelineIcon, { icon, color: iconColor, status, iconSize: iconsize })), showConnector && /* @__PURE__ */ React.createElement("div", { className: "h-16 w-0.5 bg-border mt-2" })),
      /* @__PURE__ */ React.createElement(TimelineContent, null, /* @__PURE__ */ React.createElement(TimelineHeader, null, /* @__PURE__ */ React.createElement(TimelineTitle, null, title)), /* @__PURE__ */ React.createElement(TimelineDescription, null, description))
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
    return /* @__PURE__ */ React.createElement("li", { ref, className: commonClassName, ...filteredProps }, content);
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
    return /* @__PURE__ */ React.createElement(
      "time",
      {
        ref,
        dateTime: date ? new Date(date).toISOString() : void 0,
        className: cn("text-sm font-medium tracking-tight text-muted-foreground", className),
        ...props
      },
      children || formattedDate
    );
  }
);
TimelineTime.displayName = "TimelineTime";
var TimelineConnector = React.forwardRef(({ className, status = "completed", color, ...props }, ref) => /* @__PURE__ */ React.createElement(
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
  ({ className, ...props }, ref) => /* @__PURE__ */ React.createElement("div", { ref, className: cn("flex items-center gap-4", className), ...props })
);
TimelineHeader.displayName = "TimelineHeader";
var TimelineTitle = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ React.createElement(
  "h3",
  {
    ref,
    className: cn("font-semibold leading-none tracking-tight text-secondary-foreground", className),
    ...props
  },
  children
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
  return /* @__PURE__ */ React.createElement(
    "div",
    {
      className: cn(
        "relative flex items-center justify-center rounded-full ring-8 ring-background shadow-sm",
        sizeClasses[iconSize],
        status ? getStatusColor(status) : colorClasses[color]
      )
    },
    icon ? /* @__PURE__ */ React.createElement("div", { className: cn("flex items-center justify-center", iconSizeClasses[iconSize]) }, icon) : /* @__PURE__ */ React.createElement("div", { className: cn("rounded-full", iconSizeClasses[iconSize]) })
  );
};
var TimelineDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ React.createElement("p", { ref, className: cn("max-w-sm text-sm text-muted-foreground", className), ...props }));
TimelineDescription.displayName = "TimelineDescription";
var TimelineContent = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ React.createElement("div", { ref, className: cn("flex flex-col gap-2 pl-2", className), ...props })
);
TimelineContent.displayName = "TimelineContent";
var TimelineEmpty = React.forwardRef(
  ({ className, children, ...props }, ref) => /* @__PURE__ */ React.createElement(
    "div",
    {
      ref,
      className: cn("flex flex-col items-center justify-center p-8 text-center", className),
      ...props
    },
    /* @__PURE__ */ React.createElement("p", { className: "text-sm text-muted-foreground" }, children || "No timeline items to display")
  )
);
TimelineEmpty.displayName = "TimelineEmpty";

// src/components/timeline/timeline-layout.tsx
import React2 from "react";
import { motion as motion2 } from "framer-motion";
var TimelineLayout = ({
  items,
  size = "md",
  iconColor,
  customIcon,
  animate = true,
  connectorColor,
  className
}) => {
  return /* @__PURE__ */ React2.createElement(Timeline, { size, className }, [...items].reverse().map((item, index) => /* @__PURE__ */ React2.createElement(
    motion2.div,
    {
      key: index,
      initial: animate ? { opacity: 0, y: 20 } : false,
      animate: animate ? { opacity: 1, y: 0 } : false,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeOut"
      }
    },
    /* @__PURE__ */ React2.createElement(
      TimelineItem,
      {
        date: item.date,
        title: item.title,
        description: item.description,
        icon: typeof item.icon === "function" ? item.icon() : item.icon || customIcon,
        iconColor: item.color || iconColor,
        connectorColor: item.color || connectorColor,
        showConnector: index !== items.length - 1
      }
    )
  )));
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