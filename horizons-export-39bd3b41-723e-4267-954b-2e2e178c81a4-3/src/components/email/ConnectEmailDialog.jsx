
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

const ConnectEmailDialog = ({ open, onOpenChange, onConnect }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent flex items-center gap-2">
            <Mail className="h-6 w-6 text-blue-500" />
            Connect Email Account
          </DialogTitle>
          <DialogDescription>
            Choose your email provider to get started
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Button
            onClick={() => onConnect("Gmail")}
            className="bg-red-500 hover:bg-red-600"
          >
            Connect Gmail
          </Button>
          <Button
            onClick={() => onConnect("Outlook")}
            className="bg-blue-500 hover:bg-blue-600"
          >
            Connect Outlook
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ConnectEmailDialog;
