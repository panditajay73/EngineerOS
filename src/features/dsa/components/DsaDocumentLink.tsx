import { ExternalLink } from "lucide-react";

import {
  buttonClassName,
  type ButtonSize,
  type ButtonVariant
} from "@/shared/components/buttonStyles";
import { useSettingsStore } from "@/features/settings/store/settingsStore";

type DsaDocumentLinkProps = {
  className?: string;
  iconOnly?: boolean;
  size?: ButtonSize;
  variant?: ButtonVariant;
};

export function DsaDocumentLink({
  className,
  iconOnly = false,
  size = "md",
  variant = "primary"
}: DsaDocumentLinkProps) {
  const dsaDocumentUrl = useSettingsStore((state) => state.dsaDocumentUrl);

  return (
    <a
      aria-label="Open DSA Question List in a new browser tab"
      className={buttonClassName({ className, size, variant })}
      href={dsaDocumentUrl}
      rel="noopener noreferrer"
      target="_blank"
    >
      <ExternalLink aria-hidden="true" size={16} />
      {iconOnly ? null : <span>Open DSA Question List</span>}
    </a>
  );
}
