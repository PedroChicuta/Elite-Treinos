import type React from "react";

export type navItemType = {
  name: string;
  page: string;
  icon: React.ReactNode;
  showCondition?: boolean;
};
