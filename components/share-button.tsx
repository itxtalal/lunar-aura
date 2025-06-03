"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

interface ShareButtonProps {
  shareUrl: string;
}

export function ShareButton({ shareUrl }: ShareButtonProps) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    toast({
      title: "Link copied!",
      description: "Share link has been copied to clipboard",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Button
      onClick={handleCopyLink}
      variant="outline"
      className={cn(
        "w-full",
        copied && "bg-green-500/20 text-green-500 border-green-500"
      )}
    >
      {copied ? (
        <>
          <Check className="mr-2 h-4 w-4" />
          Copied!
        </>
      ) : (
        <>
          <Copy className="mr-2 h-4 w-4" />
          Share Link
        </>
      )}
    </Button>
  );
}
