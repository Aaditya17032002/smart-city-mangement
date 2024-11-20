import * as React from "react"
import { cn } from "../lib/utils.ts"

const Timeline = React.forwardRef<
  HTMLOListElement,
  React.HTMLAttributes<HTMLOListElement>
>(({ className, ...props }, ref) => (
  <ol
    ref={ref}
    className={cn("relative border-l border-muted-foreground", className)}
    {...props}
  />
))
Timeline.displayName = "Timeline"

const TimelineItem = React.forwardRef<
  HTMLLIElement,
  React.HTMLAttributes<HTMLLIElement>
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("mb-10 ml-4", className)} {...props} />
))
TimelineItem.displayName = "TimelineItem"

const TimelineItemContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("mb-4 text-base font-normal", className)}
    {...props}
  />
))
TimelineItemContent.displayName = "TimelineItemContent"

const TimelineItemIndicator = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "absolute -left-1.5 mt-1.5 h-3 w-3 rounded-full border border-white bg-gray-200 dark:border-gray-900 dark:bg-gray-700",
      className
    )}
    {...props}
  />
))
TimelineItemIndicator.displayName = "TimelineItemIndicator"

export { Timeline, TimelineItem, TimelineItemContent, TimelineItemIndicator }