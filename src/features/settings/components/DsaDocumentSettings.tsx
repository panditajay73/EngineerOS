import { RotateCcw, Save } from "lucide-react";
import { useState } from "react";

import { Button } from "@/shared/components/Button";
import { DEFAULT_DSA_DOCUMENT_URL } from "@/shared/constants/dsa";
import { isSupportedExternalUrl } from "@/shared/utils/url";
import { useSettingsStore } from "@/features/settings/store/settingsStore";

export function DsaDocumentSettings() {
  const dsaDocumentUrl = useSettingsStore((state) => state.dsaDocumentUrl);
  const setDsaDocumentUrl = useSettingsStore((state) => state.setDsaDocumentUrl);
  const resetDsaDocumentUrl = useSettingsStore(
    (state) => state.resetDsaDocumentUrl
  );
  const [draftUrl, setDraftUrl] = useState(dsaDocumentUrl);
  const [message, setMessage] = useState("All DSA links currently use this URL.");

  const isValidUrl = isSupportedExternalUrl(draftUrl);

  const handleSave = () => {
    if (!isValidUrl) {
      setMessage("Enter a valid http or https URL.");
      return;
    }

    setDsaDocumentUrl(draftUrl);
    setMessage("DSA document URL saved.");
  };

  const handleReset = () => {
    setDraftUrl(DEFAULT_DSA_DOCUMENT_URL);
    resetDsaDocumentUrl();
    setMessage("DSA document URL restored to the default document.");
  };

  return (
    <section className="rounded-lg border border-border bg-panel p-5">
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-semibold text-ink">DSA Master Document</h2>
        <p className="text-sm leading-6 text-muted">
          StudyOS links to the document only. Progress stays inside the app.
        </p>
      </div>
      <label className="mt-5 block text-sm font-medium text-ink" htmlFor="dsa-url">
        Google Document URL
      </label>
      <div className="mt-2 flex flex-col gap-3 xl:flex-row">
        <input
          aria-describedby="dsa-url-status"
          className="min-h-10 flex-1 rounded-md border border-border bg-canvas px-3 py-2 text-sm text-ink outline-none transition placeholder:text-muted focus:border-brand"
          id="dsa-url"
          inputMode="url"
          onChange={(event) => setDraftUrl(event.target.value)}
          type="url"
          value={draftUrl}
        />
        <div className="flex gap-2">
          <Button disabled={!isValidUrl} onClick={handleSave} variant="primary">
            <Save aria-hidden="true" size={16} />
            Save
          </Button>
          <Button onClick={handleReset} variant="outline">
            <RotateCcw aria-hidden="true" size={16} />
            Reset
          </Button>
        </div>
      </div>
      <p
        className={isValidUrl ? "mt-3 text-sm text-success" : "mt-3 text-sm text-danger"}
        id="dsa-url-status"
      >
        {message}
      </p>
    </section>
  );
}
