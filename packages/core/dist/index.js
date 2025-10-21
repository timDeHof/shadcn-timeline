"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  Timeline: () => Timeline,
  TimelineConnector: () => TimelineConnector,
  TimelineContent: () => TimelineContent,
  TimelineDescription: () => TimelineDescription,
  TimelineEmpty: () => TimelineEmpty,
  TimelineHeader: () => TimelineHeader,
  TimelineIcon: () => TimelineIcon,
  TimelineItem: () => TimelineItem,
  TimelineLayout: () => TimelineLayout,
  TimelineTime: () => TimelineTime,
  TimelineTitle: () => TimelineTitle,
  cn: () => cn
});
module.exports = __toCommonJS(index_exports);

// src/components/timeline/timeline.tsx
var React = __toESM(require("react"));

// src/lib/utils.ts
var import_clsx = require("clsx");
var import_tailwind_merge = require("tailwind-merge");
function cn(...inputs) {
  return (0, import_tailwind_merge.twMerge)((0, import_clsx.clsx)(inputs));
}

// src/components/timeline/timeline.tsx
var import_class_variance_authority = require("class-variance-authority");
var import_framer_motion = require("framer-motion");
var import_lucide_react = require("lucide-react");
var import_jsx_runtime = require("react/jsx-runtime");
var timelineVariants = (0, import_class_variance_authority.cva)("flex flex-col relative", {
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
  ({ className, iconSize, size, children, ...props }, ref) => {
    const items = React.Children.toArray(children);
    if (items.length === 0) {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimelineEmpty, {});
    }
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
              ...iconSize !== void 0 ? { iconSize } : {},
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
    iconSize,
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
    if (loading) {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_framer_motion.motion.li,
        {
          ref,
          className: commonClassName,
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          role: "status",
          ...props,
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "grid grid-cols-[minmax(auto,8rem)_auto_1fr] items-start px-4", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pr-4 text-right", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 w-24 animate-pulse rounded bg-muted" }) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "mx-3 flex flex-col items-center justify-start gap-y-2", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: cn("relative flex h-8 w-8 animate-pulse items-center justify-center rounded-full bg-muted ring-8 ring-background"), children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                TimelineIcon,
                {
                  icon,
                  iconSize,
                  status: "in-progress"
                }
              ) }),
              showConnector && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                TimelineConnector,
                {
                  status: "in-progress",
                  color: connectorColor === "destructive" ? "muted" : connectorColor
                }
              )
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex flex-col gap-2 pl-2", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "space-y-2", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-4 w-24 animate-pulse rounded bg-muted" }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3 w-48 animate-pulse rounded bg-muted" })
            ] }) })
          ] })
        }
      );
    }
    if (error) {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        import_framer_motion.motion.li,
        {
          ref,
          className: cn(commonClassName, "border border-destructive/50 bg-destructive/10"),
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          role: "alert",
          ...props,
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "grid grid-cols-[minmax(auto,8rem)_auto_1fr] items-start px-4", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pr-4 text-right", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimelineTime, { className: "text-destructive", children: date }) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "mx-3 flex flex-col items-center justify-start gap-y-2", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "relative flex h-8 w-8 items-center justify-center rounded-full bg-destructive/20 ring-8 ring-background", children: React.createElement(import_lucide_react.AlertCircle, { className: "h-4 w-4 text-destructive" }) }),
              showConnector && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimelineConnector, { status: "pending", className: "h-full" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex flex-col gap-2 pl-2", children: [
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimelineHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimelineTitle, { className: "text-destructive", children: title || "Error" }) }),
              /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimelineDescription, { className: "text-destructive", children: error })
            ] })
          ] })
        }
      );
    }
    const content = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      "div",
      {
        className: "grid grid-cols-[1fr_auto_1fr] gap-4 items-start",
        ...status === "in-progress" ? { "aria-current": "step" } : {},
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex flex-col justify-start pt-1", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimelineTime, { className: "text-right pr-4", children: date }) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex flex-col items-center", children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "relative z-10", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimelineIcon, { icon, color: iconColor, status, iconSize }) }),
            showConnector && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              TimelineConnector,
              {
                status,
                color: connectorColor === "destructive" ? "muted" : connectorColor,
                className: cn("h-16 w-0.5 mt-2")
              }
            )
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TimelineContent, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimelineHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimelineTitle, { children: title }) }),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TimelineDescription, { children: description })
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
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { ref, className: commonClassName, ...filteredProps, children: content });
  }
);
TimelineItem.displayName = "TimelineItem";
var defaultDateFormat = {
  year: "numeric",
  month: "short",
  day: "2-digit"
};
var TimelineTime = React.forwardRef(
  ({ className, date, format, ...props }, ref) => {
    let isValid = false;
    let dateObj;
    if (date !== void 0) {
      dateObj = new Date(date);
      isValid = !isNaN(dateObj.getTime());
    }
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "time",
      {
        ref,
        className: cn("text-sm font-medium tracking-tight text-muted-foreground", className),
        dateTime: isValid ? dateObj.toISOString() : void 0,
        ...props,
        children: isValid ? dateObj.toLocaleDateString("en-US", format || defaultDateFormat) : "Invalid Date"
      }
    );
  }
);
TimelineTime.displayName = "TimelineTime";
var TimelineConnector = React.forwardRef(({ className, status = "completed", color, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
  ({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ref, className: cn("flex items-center gap-4", className), ...props })
);
TimelineHeader.displayName = "TimelineHeader";
var TimelineTitle = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "div",
    {
      "data-testid": "timeline-icon",
      className: cn(
        "relative flex items-center justify-center rounded-full ring-8 ring-background shadow-sm",
        sizeClasses[iconSize],
        status ? getStatusColor(status) : colorClasses[color]
      ),
      children: icon ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: cn("flex items-center justify-center", iconSizeClasses[iconSize]), children: React.isValidElement(icon) ? icon : typeof icon === "function" ? React.createElement(icon, { className: cn(iconSizeClasses[iconSize]) }) : null }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: cn("rounded-full", iconSizeClasses[iconSize]) })
    }
  );
};
var TimelineDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { ref, className: cn("max-w-sm text-sm text-muted-foreground", className), ...props }));
TimelineDescription.displayName = "TimelineDescription";
var TimelineContent = React.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ref, className: cn("flex flex-col gap-2 pl-2", className), ...props })
);
TimelineContent.displayName = "TimelineContent";
var TimelineEmpty = React.forwardRef(
  ({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "div",
    {
      ref,
      className: cn("flex flex-col items-center justify-center p-8 text-center", className),
      ...props,
      children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "text-sm text-muted-foreground", children: children || "No timeline items to display" })
    }
  )
);
TimelineEmpty.displayName = "TimelineEmpty";

// src/components/timeline/timeline-layout.tsx
var import_jsx_runtime2 = require("react/jsx-runtime");
var TimelineLayout = ({
  items,
  size = "md",
  iconColor,
  customIcon,
  animate = true,
  connectorColor,
  className
}) => {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Timeline, { size, className, children: [...items].reverse().map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
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
});
//# sourceMappingURL=index.js.map