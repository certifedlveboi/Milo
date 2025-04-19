
import React from "react";
import { motion } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { Mail, Paperclip, Star } from "lucide-react";

const EmailList = ({ accounts, emails }) => {
  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Mail className="h-5 w-5 text-blue-500" />
          Your Emails
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[500px] pr-4">
          <div className="space-y-4">
            {emails.map((email, index) => (
              <motion.div
                key={email.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 rounded-lg border border-gray-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all cursor-pointer"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <Mail className="h-5 w-5 text-blue-500" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-medium text-gray-900 truncate">
                        {email.sender || "No sender"}
                      </h4>
                      <span className="text-sm text-gray-500">
                        {email.date ? format(new Date(email.date), 'MMM d, yyyy') : 'No date'}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-gray-800 mb-1 truncate">
                      {email.subject || "No subject"}
                    </p>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {email.snippet || "No preview available"}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      {email.hasAttachments && (
                        <Paperclip className="h-4 w-4 text-gray-400" />
                      )}
                      {email.isStarred && (
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default EmailList;
