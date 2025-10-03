import React from "react";
import clsx from "clsx";

interface SkeletonProps {
  className?: string;
  animate?: boolean;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className,
  animate = true,
}) => {
  return (
    <div
      className={clsx(
        "bg-gray-200 dark:bg-gray-700 rounded",
        animate && "animate-pulse",
        className
      )}
    />
  );
};

interface SkeletonQRCodeProps {
  className?: string;
}

export const SkeletonQRCode: React.FC<SkeletonQRCodeProps> = ({
  className,
}) => {
  return (
    <div
      className={clsx(
        "flex flex-col items-center space-y-3 sm:space-y-4",
        className
      )}
    >
      <div className="bg-white dark:bg-white p-4 sm:p-6 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
        <div className="w-40 h-40 sm:w-48 sm:h-48 bg-gray-200 dark:bg-gray-300 rounded animate-pulse flex items-center justify-center">
          {/* Padrão QR Code skeleton */}
          <div className="grid grid-cols-8 gap-1 w-32 h-32 sm:w-40 sm:h-40">
            {Array.from({ length: 64 }).map((_, i) => (
              <div
                key={i}
                className={clsx(
                  "rounded-sm",
                  Math.random() > 0.5
                    ? "bg-gray-400 dark:bg-gray-500"
                    : "bg-gray-300 dark:bg-gray-400"
                )}
                style={{
                  animationDelay: `${i * 20}ms`,
                  animationDuration: "1.5s",
                }}
              />
            ))}
          </div>
        </div>
      </div>
      <Skeleton className="h-3 sm:h-4 w-32 sm:w-48" />
    </div>
  );
};

interface SkeletonStatsProps {
  className?: string;
}

export const SkeletonStats: React.FC<SkeletonStatsProps> = ({ className }) => {
  return (
    <div className={clsx("grid grid-cols-2 gap-3", className)}>
      <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2 mb-2">
          <Skeleton className="w-4 h-4 rounded-full" />
          <Skeleton className="h-3 w-16" />
        </div>
        <Skeleton className="h-6 w-8" />
      </div>
      <div className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2 mb-2">
          <Skeleton className="w-4 h-4 rounded-full" />
          <Skeleton className="h-3 w-12" />
        </div>
        <Skeleton className="h-6 w-6" />
      </div>
    </div>
  );
};

interface SkeletonLoadingStateProps {
  type: "qr" | "connecting" | "stats";
  className?: string;
}

export const SkeletonLoadingState: React.FC<SkeletonLoadingStateProps> = ({
  type,
  className,
}) => {
  switch (type) {
    case "qr":
      return <SkeletonQRCode className={className} />;
    case "stats":
      return <SkeletonStats className={className} />;
    case "connecting":
    default:
      return (
        <div
          className={clsx("flex flex-col items-center space-y-3", className)}
        >
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 flex items-center justify-center">
            {/* Spinner animado */}
            <div className="relative">
              <div className="w-8 h-8 border-4 border-gray-200 dark:border-gray-600 rounded-full"></div>
              <div className="absolute top-0 left-0 w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          </div>
          <Skeleton className="h-4 w-32" />
        </div>
      );
  }
};

interface SkeletonInstanceCardProps {
  message?: string;
}

export const SkeletonInstanceCard: React.FC<SkeletonInstanceCardProps> = ({
  message,
}) => {
  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
        <div className="flex items-center">
          <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
          <div className="ml-4 flex-1">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mt-2 animate-pulse"></div>
          </div>
        </div>
        {message && (
          <div className="mt-4 text-center text-gray-500 dark:text-gray-400">
            {message}
          </div>
        )}
        <div className="mt-6 flex justify-between">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 animate-pulse"></div>
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 animate-pulse"></div>
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-1/4 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

export const SkeletonContactList: React.FC = () => {
  return (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full animate-pulse"></div>
            <div className="flex-1">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 animate-pulse"></div>
              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mt-2 animate-pulse"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
